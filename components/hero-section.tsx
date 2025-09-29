import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      <Image
        src="/athletic-runner-in-motion-dynamic-sports-photograp.jpg"
        alt="Athletic performance"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="heading-xl mb-6 animate-fade-in-up text-balance">
          UNLEASH YOUR
          <span className="block gradient-text">POTENTIAL</span>
        </h1>

        <p className="body-lg mb-8 text-white/90 max-w-2xl mx-auto text-balance">
          Premium athletic wear engineered for champions. Experience the perfect fusion of performance, style, and
          innovation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
            <Link href="/collections/men">Shop Men</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black bg-transparent"
            asChild
          >
            <Link href="/collections/women">Shop Women</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
