import { readdir } from 'node:fs/promises'
import { existsSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

function findFfmpeg() {
  const candidates = ['ffmpeg']
  const wingetBase = path.join(
    process.env.LOCALAPPDATA || '',
    'Microsoft',
    'WinGet',
    'Packages'
  )
  if (existsSync(wingetBase)) {
    for (const dir of [].concat(tryReaddir(wingetBase))) {
      if (!dir.toLowerCase().includes('ffmpeg')) continue
      const binDir = findBinRecursive(path.join(wingetBase, dir))
      if (binDir) candidates.push(path.join(binDir, 'ffmpeg.exe'))
    }
  }
  for (const c of candidates) {
    const res = spawnSync(c, ['-version'], { stdio: 'ignore' })
    if (!res.error) return c
  }
  return null
}

function tryReaddir(dir) {
  try {
    return readdirSync(dir)
  } catch {
    return []
  }
}

function findBinRecursive(dir) {
  const stack = [dir]
  while (stack.length) {
    const current = stack.pop()
    let entries
    try {
      entries = readdirSync(current, { withFileTypes: true })
    } catch {
      continue
    }
    for (const e of entries) {
      if (e.isFile() && e.name.toLowerCase() === 'ffmpeg.exe') return current
      if (e.isDirectory()) stack.push(path.join(current, e.name))
    }
  }
  return null
}

const ffmpeg = findFfmpeg()
if (!ffmpeg) {
  console.error('Erro: ffmpeg nao encontrado. Instale com "winget install ffmpeg".')
  process.exit(1)
}
console.log(`Usando ffmpeg: ${ffmpeg}`)

const dir = 'public/testimonials'
const files = (await readdir(dir)).filter(f => /\.(mp4|mov|MP4|MOV)$/.test(f))

for (const file of files) {
  const src = path.join(dir, file)
  const match = file.match(/(\d+)/)
  const num = match ? match[1] : null
  if (!num) {
    console.warn(`Pulando ${file}: nao achei numero no nome.`)
    continue
  }
  const name = `review-${num}.webm`
  const dest = path.join(dir, name)

  if (existsSync(dest)) {
    console.log(`Pulando ${file}: ${name} ja existe.`)
    continue
  }

  console.log(`Comprimindo ${file} -> ${name} ...`)
  const res = spawnSync(
    ffmpeg,
    [
      '-y',
      '-i', src,
      '-c:v', 'libvpx-vp9',
      '-crf', '32',
      '-b:v', '0',
      '-c:a', 'libopus',
      '-b:a', '96k',
      dest,
    ],
    { stdio: 'inherit' }
  )

  if (res.status !== 0) {
    console.error(`Falha ao comprimir ${file}`)
    continue
  }

  const srcSize = statSync(src).size
  const destSize = statSync(dest).size
  console.log(
    `${file}: ${(srcSize / 1024 / 1024).toFixed(1)} MB -> ${name}: ${(destSize / 1024 / 1024).toFixed(1)} MB`
  )
}

console.log('Concluido.')
