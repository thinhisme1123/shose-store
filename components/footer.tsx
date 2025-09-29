import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react"

const footerLinks = {
  shop: [
    { name: "Men", href: "/collections/men" },
    { name: "Women", href: "/collections/women" },
    { name: "Footwear", href: "/collections/footwear" },
    { name: "Accessories", href: "/collections/accessories" },
    { name: "Sale", href: "/collections/sale" },
  ],
  help: [
    { name: "Size Guide", href: "/size-guide" },
    { name: "Shipping", href: "/shipping" },
    { name: "Returns", href: "/returns" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Sustainability", href: "/sustainability" },
  ],
}

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
]

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter */}
        <div className="mb-12 text-center">
          <h3 className="heading-md mb-4">Stay in the Game</h3>
          <p className="body-md mb-6 text-primary-foreground/80 max-w-md mx-auto">
            Get the latest drops, exclusive offers, and athletic insights delivered to your inbox.
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
            />
            <Button variant="secondary">Subscribe</Button>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Help</h4>
            <ul className="space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{social.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="h-6 w-6 bg-primary-foreground rounded-sm flex items-center justify-center">
              <span className="text-primary font-bold text-sm">A</span>
            </div>
            <span className="font-sans font-bold text-lg">ATHLEON</span>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-primary-foreground/80">
            <span>&copy; 2025 Athleon. All rights reserved.</span>
            <div className="flex space-x-4">
              <Link href="/privacy" className="hover:text-primary-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
