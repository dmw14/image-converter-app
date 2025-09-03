import ImageConverter from "@/components/image-converter"

export default function ConvertPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <header className="mb-8">
        <h1 className="text-pretty text-3xl font-semibold tracking-tight">Image File Type Converter</h1>
        <p className="mt-2 text-muted-foreground">
          Convert images between PNG, JPEG, WebP, and SVG. All processing happens in your browser.
        </p>
      </header>
      <ImageConverter />
    </main>
  )
}
