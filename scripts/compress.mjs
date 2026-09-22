let sharp
try {
  sharp = (await import('sharp')).default
} catch {
  console.error('Erro: sharp nao instalado. Rode "npm i -D sharp" antes de comprimir imagens.')
  process.exit(1)
}
import { readdir, mkdir } from 'node:fs/promises'
import path from 'node:path'

const jobs = [
  { dir: 'public/packages', out: 'public/packages', width: 1200, quality: 80 },
  { dir: 'public/testimonials', out: 'public/testimonials', width: 800, quality: 80 },
]

for (const job of jobs) {
  const files = (await readdir(job.dir)).filter(f => f.endsWith('.png') && !f.startsWith('icon-') && f !== 'apple-touch-icon.png')
  for (const file of files) {
    const src = path.join(job.dir, file)
    const name = file.toLowerCase().replace(/\s+/g, '-').replace('.png', '.webp')
    const dest = path.join(job.out, name)
    const meta = await sharp(src).metadata()
    await sharp(src)
      .resize({ width: Math.min(job.width, meta.width) })
      .webp({ quality: job.quality })
      .toFile(dest)
    const size = (await sharp(dest).metadata()).size
    console.log(`${file} -> ${name} [${meta.width}x${meta.height}] ${(size / 1024).toFixed(0)} KB`)
  }
}
