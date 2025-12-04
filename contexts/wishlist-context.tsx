"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useAuth } from "./auth-context";
import type { WishlistItem } from "@/lib/types";
import { AccountApi } from "@/infrastructure/product/account-api";
import { AccountService } from "@/application/product/usercase/account.usecase";
import { toast } from "react-toastify";

// ------------------ STATE ------------------

interface WishlistState {
  items: WishlistItem[];
}

type WishlistAction =
  | { type: "SET_WISHLIST"; payload: WishlistItem[] }
  | { type: "ADD_ITEM"; payload: WishlistItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR" };

function wishlistReducer(
  state: WishlistState,
  action: WishlistAction
): WishlistState {
  switch (action.type) {
    case "SET_WISHLIST":
      return { items: action.payload };

    case "ADD_ITEM":
      if (state.items.some((i) => i._id === action.payload._id))
        return state;
      return { items: [...state.items, action.payload] };

    case "REMOVE_ITEM":
      return {
        items: state.items.filter((i) => i._id !== action.payload),
      };

    case "CLEAR":
      return { items: [] };

    default:
      return state;
  }
}

// ------------------ CONTEXT ------------------

interface WishlistContextType {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
  totalItems: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

// ------------------ PROVIDER ------------------

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] });
  const [initialized, setInitialized] = useState(false);
  const repoWishlist = new AccountApi();
  const usecaseWishlist = new AccountService(repoWishlist);

  // ------------------ LOAD WISHLIST ------------------

  useEffect(() => {
    const load = async () => {
      if (isAuthenticated) {
        // Logged-in → Load from DB
        const res = await usecaseWishlist.getWishlist();
        const formatted = res.wishlist.map((p: any) => ({
          _id: p._id,
          title: p.title,
          price: p.price,
          image: p.images?.[0],
          slug: p.slug,
        }));
        dispatch({ type: "SET_WISHLIST", payload: formatted });
      } else {
        // Guest → Load from localStorage
        const local = localStorage.getItem("athleon-wishlist");
        if (local) {
          dispatch({ type: "SET_WISHLIST", payload: JSON.parse(local) });
        }
      }
      setInitialized(true);
    };

    load();
  }, [isAuthenticated]);

  // ------------------ SAVE TO LOCALSTORAGE (GUEST ONLY) ------------------

  useEffect(() => {
    if (!initialized || isAuthenticated) return;

    localStorage.setItem("athleon-wishlist", JSON.stringify(state.items));
  }, [state.items, initialized, isAuthenticated]);

  // ------------------ ACTIONS ------------------

  const addItem = async (item: WishlistItem) => {
    if (isAuthenticated) {
      // Save to DB
      await usecaseWishlist.addToWishlist(item._id);
      toast.success("Item is added to wishlist!");
      const res = await usecaseWishlist.getWishlist();
      const formatted = res.wishlist.map((p: any) => ({
        _id: p._id,
        title: p.title,
        price: p.price,
        image: p.images?.[0],
        slug: p.slug,
      }));
      dispatch({ type: "SET_WISHLIST", payload: formatted });
    } else {
      // Save locally
      dispatch({ type: "ADD_ITEM", payload: item });
    }
  };

  const removeItem = async (productId: string) => {
    if (isAuthenticated) {
      await usecaseWishlist.removeWishlist(productId);
      const res = await usecaseWishlist.getWishlist();
      const formatted = res.wishlist.map((p: any) => ({
        _id: p._id,
        title: p.title,
        price: p.price,
        image: p.images?.[0],
        slug: p.slug,
      }));
      dispatch({ type: "SET_WISHLIST", payload: formatted });
    } else {
      dispatch({ type: "REMOVE_ITEM", payload: productId });
    }
  };

  const clearWishlist = () => {
    dispatch({ type: "CLEAR" });
    if (!isAuthenticated) localStorage.removeItem("athleon-wishlist");
  };

  const isInWishlist = (productId: string) => {
    return state.items.some((item) => item._id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        clearWishlist,
        isInWishlist,
        totalItems: state.items.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

// ------------------ HOOK ------------------

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
