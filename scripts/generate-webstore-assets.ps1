$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$assetsDir = Join-Path $root "assets/webstore"
$iconsDir = Join-Path $root "src/icons"
$iconPath = Join-Path $iconsDir "icon-128.png"

if (-not (Test-Path $iconPath)) {
  throw "Icon not found: $iconPath. Run 'npm run icons:prepare' first."
}

if (-not (Test-Path $assetsDir)) {
  New-Item -ItemType Directory -Path $assetsDir | Out-Null
}

Add-Type -AssemblyName System.Drawing

function New-Canvas {
  param(
    [int]$Width,
    [int]$Height
  )

  $bmp = New-Object System.Drawing.Bitmap $Width, $Height
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  return @{ Bitmap = $bmp; Graphics = $g }
}

function Save-And-Dispose {
  param(
    [System.Drawing.Bitmap]$Bitmap,
    [System.Drawing.Graphics]$Graphics,
    [string]$Path
  )

  $Bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
  $Graphics.Dispose()
  $Bitmap.Dispose()
  Write-Output ("[assets] Generated: " + $Path)
}

$icon = [System.Drawing.Image]::FromFile($iconPath)

# 440x280 small promo tile
$small = New-Canvas -Width 440 -Height 280
$gSmall = $small.Graphics
$gSmall.Clear([System.Drawing.Color]::FromArgb(252, 252, 251))
$brushSoft = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(235, 247, 243))
$gSmall.FillRectangle($brushSoft, 0, 0, 440, 280)
$gSmall.DrawImage($icon, 26, 76, 128, 128)
$fontTitle = New-Object System.Drawing.Font ("Segoe UI", 30, [System.Drawing.FontStyle]::Bold)
$fontSub = New-Object System.Drawing.Font ("Segoe UI", 13, [System.Drawing.FontStyle]::Regular)
$brushText = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(32, 33, 35))
$gSmall.DrawString("GPT Voyager", $fontTitle, $brushText, 172, 92)
$gSmall.DrawString("ChatGPT Productivity Extension", $fontSub, $brushText, 176, 146)
Save-And-Dispose -Bitmap $small.Bitmap -Graphics $gSmall -Path (Join-Path $assetsDir "small-promo-440x280.png")

# 1400x560 marquee promo tile
$marquee = New-Canvas -Width 1400 -Height 560
$gMarquee = $marquee.Graphics
$gMarquee.Clear([System.Drawing.Color]::FromArgb(250, 251, 249))
$brushAccent = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(232, 246, 242))
$gMarquee.FillRectangle($brushAccent, 0, 0, 1400, 560)
$gMarquee.DrawImage($icon, 88, 176, 220, 220)
$fontTitleLarge = New-Object System.Drawing.Font ("Segoe UI", 72, [System.Drawing.FontStyle]::Bold)
$fontSubLarge = New-Object System.Drawing.Font ("Segoe UI", 30, [System.Drawing.FontStyle]::Regular)
$gMarquee.DrawString("GPT Voyager", $fontTitleLarge, $brushText, 356, 192)
$gMarquee.DrawString("ChatGPT Productivity Extension", $fontSubLarge, $brushText, 366, 304)
Save-And-Dispose -Bitmap $marquee.Bitmap -Graphics $gMarquee -Path (Join-Path $assetsDir "marquee-1400x560.png")

# 1280x800 screenshot frame template
$shot = New-Canvas -Width 1280 -Height 800
$gShot = $shot.Graphics
$gShot.Clear([System.Drawing.Color]::White)
$brushLight = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(246, 247, 244))
$gShot.FillRectangle($brushLight, 0, 0, 1280, 800)
$pen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(218, 222, 216), 2)
$gShot.DrawRectangle($pen, 80, 80, 1120, 640)
$gShot.DrawImage($icon, 116, 116, 96, 96)
$fontShotTitle = New-Object System.Drawing.Font ("Segoe UI", 36, [System.Drawing.FontStyle]::Bold)
$fontShotSub = New-Object System.Drawing.Font ("Segoe UI", 18, [System.Drawing.FontStyle]::Regular)
$gShot.DrawString("Replace With Real Screenshot", $fontShotTitle, $brushText, 240, 122)
$gShot.DrawString("Recommended size: 1280 x 800", $fontShotSub, $brushText, 244, 182)
$gShot.DrawString("Capture the extension panel on chatgpt.com", $fontShotSub, $brushText, 244, 214)
$gShot.DrawString("File: assets/webstore/screenshot-01-1280x800.png", $fontShotSub, $brushText, 244, 246)
Save-And-Dispose -Bitmap $shot.Bitmap -Graphics $gShot -Path (Join-Path $assetsDir "screenshot-01-1280x800.png")

$icon.Dispose()
$brushSoft.Dispose()
$brushAccent.Dispose()
$brushText.Dispose()
$brushLight.Dispose()
$pen.Dispose()
$fontTitle.Dispose()
$fontSub.Dispose()
$fontTitleLarge.Dispose()
$fontSubLarge.Dispose()
$fontShotTitle.Dispose()
$fontShotSub.Dispose()

Write-Output "[assets] Web Store asset generation completed."
