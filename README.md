# 🖼️ Image File Converter

A modern web application that allows users to convert images between different file formats (JPG, PNG, WebP, SVG, etc.) directly in the browser.

---

## 🚀 Features
- Convert images **instantly in-browser** (no server needed)
- Supports **JPG → PNG → WebP → SVG** and more
- Drag-and-drop or file picker upload
- Responsive UI with smooth animations
- Lightweight, fast, and privacy-friendly (files never leave your device)

---

## 🛠️ Tech Stack

### 🔹 Core Framework
- [Next.js (App Router)](https://nextjs.org/)
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)

### 🎨 Styling & UI
- [Tailwind CSS v4](https://tailwindcss.com/) – utility-first styling
- [shadcn/ui](https://ui.shadcn.com/) components (built on Radix UI primitives)
- Utility libraries:  
  - [`class-variance-authority`](https://github.com/joe-bell/cva)  
  - [`tailwind-merge`](https://github.com/dcastil/tailwind-merge)  
  - [`clsx`](https://github.com/lukeed/clsx)
- Animations: [tailwindcss-animate](https://github.com/joe-bell/tailwindcss-animate)

### 🖌️ Icons & Fonts
- [lucide-react](https://lucide.dev/) – Icon library
- [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) – Performant font loading (Geist family)

### 🖼️ Client-Side Image Conversion
- HTML5 **Canvas API** (`drawImage`, `toDataURL`)
- File APIs (`File`, `Blob`, `URL.createObjectURL`)
- Optional: **OffscreenCanvas** (when supported)
- Basic **SVG handling** (preserve or wrap raster into SVG if requested)

### 🧑‍💻 Dev Environment
- Node.js (v18+)
- npm (or pnpm/yarn)
- VS Code (recommended editor)

---

## 📂 Getting Started

### 1️⃣ Clone the repo
```bash
git clone https://github.com/your-username/image-converter-app.git
cd image-converter-app
