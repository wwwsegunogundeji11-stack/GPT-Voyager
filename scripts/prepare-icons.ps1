param(
  [string]$SourceUrl = "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/618x618/1F37E.png"
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$iconsDir = Join-Path $root "src/icons"
$sourcePath = Join-Path $iconsDir "source-bottle.png"
$sizes = @(16, 32, 48, 128)

if (-not (Test-Path $iconsDir)) {
  New-Item -ItemType Directory -Path $iconsDir | Out-Null
}

Write-Output ("[icons] Downloading source image: " + $SourceUrl)
Invoke-WebRequest -Uri $SourceUrl -OutFile $sourcePath

Add-Type -AssemblyName System.Drawing
$sourceImage = [System.Drawing.Image]::FromFile($sourcePath)

foreach ($size in $sizes) {
  $bitmap = New-Object System.Drawing.Bitmap $size, $size
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $graphics.Clear([System.Drawing.Color]::Transparent)
  $graphics.DrawImage($sourceImage, 0, 0, $size, $size)

  $targetPath = Join-Path $iconsDir ("icon-" + $size + ".png")
  $bitmap.Save($targetPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $graphics.Dispose()
  $bitmap.Dispose()

  Write-Output ("[icons] Generated: " + $targetPath)
}

$sourceImage.Dispose()
Write-Output "[icons] Done."
