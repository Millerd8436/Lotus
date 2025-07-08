# Simplified Lotus Setup Script
Write-Host "Setting up Lotus development environment..." -ForegroundColor Magenta

# Install Chocolatey if not present
if (!(Get-Command choco -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Chocolatey..." -ForegroundColor Yellow
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
} else {
    Write-Host "Chocolatey already installed" -ForegroundColor Green
}

# Refresh PATH
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Install Node.js
Write-Host "Installing Node.js LTS..." -ForegroundColor Cyan
choco install nodejs-lts -y

# Install Git
Write-Host "Installing Git..." -ForegroundColor Cyan  
choco install git -y

# Install VS Code
Write-Host "Installing VS Code..." -ForegroundColor Cyan
choco install vscode -y

# Final message
Write-Host "Core tools installed! Please restart PowerShell and run npm install" -ForegroundColor Green
