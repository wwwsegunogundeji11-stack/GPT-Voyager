$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$distDir = Join-Path $root "dist"
$releaseDir = Join-Path $root "release"

if (-not (Test-Path $distDir)) {
  throw "dist directory not found. Run 'npm run build' first."
}

if (-not (Test-Path $releaseDir)) {
  New-Item -ItemType Directory -Path $releaseDir | Out-Null
}

$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$zipPath = Join-Path $releaseDir ("gpt-voyager-extension-" + $stamp + ".zip")

Compress-Archive -Path (Join-Path $distDir "*") -DestinationPath $zipPath -CompressionLevel Optimal -Force
Write-Output ("[package] Release archive generated: " + $zipPath)
