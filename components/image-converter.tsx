"use client"

import type React from "react"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { downloadBlob } from "@/lib/download-blob"

type TargetFormat = "png" | "jpeg" | "webp" | "svg"

type ImageMeta = {
  width: number
  height: number
  type: string
  name: string
}

export default function ImageConverter() {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [meta, setMeta] = useState<ImageMeta | null>(null)

  const [format, setFormat] = useState<TargetFormat>("png")
  const [quality, setQuality] = useState<number>(90) // UI shows 1–100, mapped to 0–1 for toBlob
  const [bgForJpeg, setBgForJpeg] = useState<string>("#ffffff")
  const [converting, setConverting] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isLossy = useMemo(() => format === "jpeg" || format === "webp", [format])
  const isSvgInput = useMemo(() => (meta?.type || "").includes("svg"), [meta])
  const showSvgRasterWarning = useMemo(() => format === "svg" && !isSvgInput, [format, isSvgInput])

  function onFileChosen(f: File | null) {
    if (!f) return
    const isImage = f.type.startsWith("image/") || f.name.toLowerCase().endsWith(".svg")
    if (!isImage) {
      setError("Please select an image file (PNG, JPG, WEBP, or SVG).")
      return
    }
    setError(null)
    setFile(f)
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    const url = URL.createObjectURL(f)
    setPreviewUrl(url)

    // Load to get dimensions reliably
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      const type = f.type || (f.name.toLowerCase().endsWith(".svg") ? "image/svg+xml" : "")
      // Fallback if SVG reports 0x0 (rare): try a default canvas size
      const w = img.naturalWidth || 1024
      const h = img.naturalHeight || 768
      setMeta({ width: w, height: h, type, name: f.name })
    }
    img.onerror = () => {
      setMeta(null)
      setError("Could not read the image. Try a different file.")
    }
    img.src = url
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] || null
    onFileChosen(f)
  }

  function onDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault()
    const f = e.dataTransfer.files?.[0]
    if (f) onFileChosen(f)
  }

  async function convertAndDownload() {
    setError(null)
    if (!file || !meta || !previewUrl) {
      setError("Please select an image first.")
      return
    }
    setConverting(true)
    try {
      const output = await convertImage({
        file,
        sourceUrl: previewUrl,
        meta,
        target: format,
        quality: isLossy ? quality / 100 : undefined,
        bgForJpeg,
      })
      if (!output) {
        setError("Conversion failed. Please try a different image or format.")
        return
      }
      const outName = generateOutputName(meta.name, format)
      downloadBlob(output, outName)
    } catch (err: any) {
      setError(err?.message || "Conversion error.")
    } finally {
      setConverting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Convert your image</CardTitle>
        <CardDescription>Local conversion (no uploads). Supports PNG, JPEG, WebP, and SVG.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className={cn("rounded-md border", "bg-muted/20", "transition-colors")}>
          <Label
            htmlFor="file"
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            className="flex cursor-pointer flex-col items-center justify-center gap-3 px-6 py-10 text-center"
          >
            <span className="sr-only">Choose image</span>
            <div className="text-sm text-muted-foreground">Drag & drop an image here, or click to browse</div>
            <div className="text-xs text-muted-foreground">Supported: PNG, JPG/JPEG, WEBP, SVG</div>
          </Label>
          <Input id="file" type="file" accept="image/*,image/svg+xml" className="hidden" onChange={onInputChange} />
        </div>

        {file && meta && (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <div className="text-sm font-medium">Preview</div>
              <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-background">
                {previewUrl ? (
                  <img
                    src={previewUrl || "/placeholder.svg?height=400&width=600&query=selected%20image%20preview"}
                    alt="Selected image preview"
                    className="h-full w-full object-contain"
                  />
                ) : null}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-10"
                  style={{
                    backgroundImage:
                      "linear-gradient(45deg, #e5e7eb 25%, transparent 25%), linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e7eb 75%), linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)",
                    backgroundSize: "20px 20px",
                    backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                  }}
                />
              </div>
              <div className="text-xs text-muted-foreground">
                {meta.width}×{meta.height} • {meta.type || "unknown"} • {file.name}
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <Label>Target format</Label>
                <Select value={format} onValueChange={(v) => setFormat(v as TargetFormat)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="png">PNG (.png)</SelectItem>
                    <SelectItem value="jpeg">JPEG (.jpg)</SelectItem>
                    <SelectItem value="webp">WebP (.webp)</SelectItem>
                    <SelectItem value="svg">SVG (.svg)</SelectItem>
                  </SelectContent>
                </Select>
                {showSvgRasterWarning && (
                  <p className="text-xs text-amber-600">
                    Selected SVG for a raster image. This will create an SVG that embeds a bitmap (not a true vector).
                  </p>
                )}
                {isSvgInput && format === "svg" && (
                  <p className="text-xs text-muted-foreground">The original SVG will be preserved (no quality loss).</p>
                )}
              </div>

              {isLossy && (
                <div className="space-y-2">
                  <Label>Quality: {quality}</Label>
                  <Slider
                    min={1}
                    max={100}
                    step={1}
                    value={[quality]}
                    onValueChange={(vals) => setQuality(vals[0] ?? 90)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Applies to JPEG and WebP exports. Higher = better quality and larger file size.
                  </p>
                </div>
              )}

              {format === "jpeg" && (
                <div className="space-y-2">
                  <Label htmlFor="bg">Background color for JPEG</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="bg"
                      type="color"
                      value={bgForJpeg}
                      onChange={(e) => setBgForJpeg(e.target.value)}
                      className="h-10 w-16 p-1"
                      aria-label="JPEG background color"
                    />
                    <Input
                      type="text"
                      value={bgForJpeg}
                      onChange={(e) => setBgForJpeg(e.target.value)}
                      className="flex-1"
                      placeholder="#ffffff"
                      aria-label="JPEG background color hex"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    JPEG does not support transparency. Choose a background color to fill transparent areas.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          Tip: For the best results, start from the highest-quality source image you have.
        </div>
        <Button onClick={convertAndDownload} disabled={!file || converting}>
          {converting ? "Converting..." : "Convert & Download"}
        </Button>
      </CardFooter>
    </Card>
  )
}

function generateOutputName(original: string, target: TargetFormat) {
  const base = original.replace(/\.[^.]+$/, "")
  const ext = target === "jpeg" ? "jpg" : target
  return `${base}.${ext}`
}

async function convertImage(opts: {
  file: File
  sourceUrl: string
  meta: ImageMeta
  target: TargetFormat
  quality?: number
  bgForJpeg?: string
}): Promise<Blob | null> {
  const { file, sourceUrl, meta, target, quality = 0.9, bgForJpeg = "#ffffff" } = opts

  if (target === "svg") {
    if (meta.type.includes("svg")) {
      // Keep original SVG unchanged
      return file.slice(0, file.size, "image/svg+xml")
    }
    // Raster → SVG: embed raster as PNG inside SVG wrapper
    const pngBlob = await rasterToBlob(sourceUrl, meta, "image/png", 1, undefined)
    if (!pngBlob) return null
    const pngDataUrl = await blobToDataURL(pngBlob)
    const svg = buildEmbeddedSvg(pngDataUrl, meta.width, meta.height)
    return new Blob([svg], { type: "image/svg+xml" })
  }

  const mime: Record<TargetFormat, string> = {
    png: "image/png",
    jpeg: "image/jpeg",
    webp: "image/webp",
    svg: "image/svg+xml",
  }

  const bg = target === "jpeg" ? bgForJpeg : undefined
  return rasterToBlob(sourceUrl, meta, mime[target], quality, bg)
}

function buildEmbeddedSvg(dataUrl: string, width: number, height: number) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" version="1.1">
  <image href="${dataUrl}" width="${width}" height="${height}" />
</svg>`
}

async function rasterToBlob(
  srcUrl: string,
  meta: ImageMeta,
  targetMime: string,
  quality: number,
  bgColor?: string,
): Promise<Blob | null> {
  const img = await loadImage(srcUrl)
  const canvas = document.createElement("canvas")
  canvas.width = meta.width
  canvas.height = meta.height
  const ctx = canvas.getContext("2d")
  if (!ctx) return null

  if (bgColor) {
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

  const blob: Blob | null = await new Promise((resolve) => {
    canvas.toBlob(
      (b) => resolve(b),
      targetMime,
      sanitizeQuality(quality), // JPEG/WebP respect quality; PNG ignores
    )
  })

  return blob
}

function sanitizeQuality(q: number) {
  if (typeof q !== "number" || Number.isNaN(q)) return 0.92
  return Math.min(1, Math.max(0.01, q))
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => resolve(img)
    img.onerror = (e) => reject(e)
    img.src = src
  })
}

function blobToDataURL(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}
