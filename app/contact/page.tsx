"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, MessageCircle, Send, ArrowLeft } from "lucide-react"

export default function ContactPage() {
  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={handleGoBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-balance">Get in Touch</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Ready to elevate your athletic performance? Contact us to learn more about our products or get personalized
            recommendations from our experts.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Phone & WhatsApp
                </CardTitle>
                <CardDescription>Call or message us directly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Sales Hotline</p>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="tel:+15551234567">Call Now</Link>
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">WhatsApp</p>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="https://wa.me/15551234567" target="_blank">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Email
                </CardTitle>
                <CardDescription>Send us a message anytime</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Sales & Orders</p>
                    <p className="text-muted-foreground">sales@athleon.com</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="mailto:sales@athleon.com">Email</Link>
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Customer Support</p>
                    <p className="text-muted-foreground">support@athleon.com</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="mailto:support@athleon.com">Email</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Zalo
                </CardTitle>
                <CardDescription>Connect with us on Zalo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Zalo Official Account</p>
                    <p className="text-muted-foreground">@athleon_official</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="https://zalo.me/athleon_official" target="_blank">
                      Connect
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Facebook className="h-5 w-5 text-primary" />
                  Social Media
                </CardTitle>
                <CardDescription>Follow us for updates and inspiration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Facebook</p>
                    <p className="text-muted-foreground">@AthleonOfficial</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="https://facebook.com/AthleonOfficial" target="_blank">
                      <Facebook className="h-4 w-4 mr-2" />
                      Follow
                    </Link>
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Instagram</p>
                    <p className="text-muted-foreground">@athleon_official</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="https://instagram.com/athleon_official" target="_blank">
                      <Instagram className="h-4 w-4 mr-2" />
                      Follow
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Visit Our Store
                </CardTitle>
                <CardDescription>Experience our products in person</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium">Flagship Store</p>
                  <p className="text-muted-foreground">
                    123 Athletic Avenue
                    <br />
                    Sports District, City 12345
                    <br />
                    United States
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Mon-Sat: 9AM-9PM, Sun: 10AM-8PM</span>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://maps.google.com" target="_blank">
                    <MapPin className="h-4 w-4 mr-2" />
                    Get Directions
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Have a question about our products? Need sizing advice? We're here to help!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">
                      First Name *
                    </label>
                    <Input id="firstName" placeholder="Enter your first name" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">
                      Last Name *
                    </label>
                    <Input id="lastName" placeholder="Enter your last name" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address *
                  </label>
                  <Input id="email" type="email" placeholder="Enter your email" required />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </label>
                  <Input id="phone" type="tel" placeholder="Enter your phone number" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject *
                  </label>
                  <Input id="subject" placeholder="What can we help you with?" required />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message *
                  </label>
                  <Textarea id="message" placeholder="Tell us more about your inquiry..." rows={5} required />
                </div>

                <Button className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>

                <p className="text-xs text-muted-foreground">
                  * Required fields. We'll respond within 24 hours during business days.
                </p>
              </CardContent>
            </Card>

            {/* Quick Contact Options */}
            <Card>
              <CardHeader>
                <CardTitle>Need Immediate Help?</CardTitle>
                <CardDescription>Choose the fastest way to reach us</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2">
                <Button variant="outline" className="h-auto p-4 flex-col gap-2 bg-transparent" asChild>
                  <Link href="tel:+15551234567">
                    <Phone className="h-5 w-5 text-primary" />
                    <span className="font-medium">Call Now</span>
                    <span className="text-xs text-muted-foreground">Instant support</span>
                  </Link>
                </Button>

                <Button variant="outline" className="h-auto p-4 flex-col gap-2 bg-transparent" asChild>
                  <Link href="https://wa.me/15551234567" target="_blank">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <span className="font-medium">WhatsApp</span>
                    <span className="text-xs text-muted-foreground">Quick chat</span>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">What are your shipping options?</h3>
                    <p className="text-sm text-muted-foreground">
                      We offer free standard shipping on orders over $75, with express options available.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Do you offer size exchanges?</h3>
                    <p className="text-sm text-muted-foreground">
                      Yes! We offer free size exchanges within 30 days of purchase.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">How can I track my order?</h3>
                    <p className="text-sm text-muted-foreground">
                      You'll receive a tracking number via email once your order ships.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Do you have a loyalty program?</h3>
                    <p className="text-sm text-muted-foreground">
                      Yes! Join our rewards program to earn points on every purchase.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
