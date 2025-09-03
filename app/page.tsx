import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <main>
      {/* Header */}
      <header className="border-b">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="Image File Converter home">
            <span className="sr-only">Image File Converter</span>
            <span className="text-lg font-semibold tracking-tight">Image File Converter</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/convert">
              <Button className="bg-primary text-primary-foreground hover:bg-secondary transition-colors">
                Start Converting
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <h1 className="text-balance text-3xl md:text-4xl font-bold">Convert Your Images Easily</h1>
            <p className="text-pretty text-muted-foreground">
              Fast, reliable, and secure image conversion—right in your browser. Turn JPG ↔ PNG ↔ WebP, and more, with
              academic-friendly defaults and accessible UI.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <Link href="/convert">
                <Button className="bg-primary text-primary-foreground hover:bg-secondary transition-colors">
                  Start Converting
                </Button>
              </Link>
              <a href="#how-it-works" className="text-accent hover:underline">
                See how it works
              </a>
            </div>
          </div>
          <div className="rounded-lg border bg-card">
            <img
              src={
                "/placeholder.svg?height=320&width=560&query=illustration%20of%20image%20conversion%20arrows%20between%20jpg%2C%20png%2C%20webp"
              }
              alt="Illustration showing JPG, PNG, and WebP conversion"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="text-balance text-2xl font-semibold mb-6">Why use this converter?</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Multiple Formats</CardTitle>
              <CardDescription>PNG, JPEG, and WebP — convert in seconds.</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={"/placeholder.svg?height=120&width=240&query=icons%20for%20png%2C%20jpeg%2C%20webp"}
                alt="Icons representing PNG, JPEG, and WebP formats"
                className="w-full h-auto rounded"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Private & Secure</CardTitle>
              <CardDescription>Runs in your browser — no uploads needed.</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={"/placeholder.svg?height=120&width=240&query=browser%20shield%20privacy%20illustration"}
                alt="Browser privacy shield illustration"
                className="w-full h-auto rounded"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quality Controls</CardTitle>
              <CardDescription>Adjust quality for JPEG/WebP when exporting.</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={"/placeholder.svg?height=120&width=240&query=sliders%20and%20quality%20controls"}
                alt="Quality control sliders illustration"
                className="w-full h-auto rounded"
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="mx-auto max-w-5xl px-4 py-10 bg-muted rounded-lg">
        <h2 className="text-balance text-2xl font-semibold mb-6">How it works</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-lg">1. Add your image</CardTitle>
              <CardDescription>Drag and drop or select a file.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-lg">2. Choose format</CardTitle>
              <CardDescription>Select PNG, JPEG, or WebP.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-lg">3. Download</CardTitle>
              <CardDescription>Export and save instantly.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="text-balance text-2xl font-semibold mb-6">What students say</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">“Perfect for my report”</CardTitle>
              <CardDescription>Converted all screenshots to the exact format I needed — fast and easy.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">— CS Student, State University</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">“No upload worries”</CardTitle>
              <CardDescription>Loved that everything runs locally in the browser. Super convenient.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">— Design Student, City College</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-10 border-t">
        <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-2">
          <p>&copy; {new Date().getFullYear()} Image File Converter</p>
          <nav className="flex items-center gap-4">
            <a href="#" className="hover:underline">
              Privacy
            </a>
            <a href="#" className="hover:underline">
              Terms
            </a>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </nav>
        </div>
      </footer>
    </main>
  )
}
