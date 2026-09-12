$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$BackendRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $BackendRoot

if (-not (Test-Path -LiteralPath ".env")) {
  Copy-Item -LiteralPath ".env.example" -Destination ".env"
  Write-Host "Created .env from .env.example."
  Write-Host "Add your existing Razorpay, Gmail and Google credentials before testing live integrations."
}

npm install
npm run check

Write-Host ""
Write-Host "Backend setup and build completed successfully."
Write-Host "Run: npm run dev"
Write-Host "Then open: http://localhost:4000/health"
