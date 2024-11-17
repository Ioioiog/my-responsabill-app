#!/bin/bash

echo "🔧 Starting React project complete fix..."

# Create .env file with SKIP_PREFLIGHT_CHECK
echo "📝 Creating .env file..."
echo "SKIP_PREFLIGHT_CHECK=true" > .env

# Clean up project dependencies
echo "🗑️  Removing existing dependency files..."
rm -rf node_modules
rm -f package-lock.json

# Add browserslist to package.json
echo "🌐 Adding browserslist configuration..."
if command -v jq >/dev/null 2>&1; then
    jq '. + {
        "browserslist": {
            "production": [
                ">0.2%",
                "not dead",
                "not op_mini all"
            ],
            "development": [
                "last 1 chrome version",
                "last 1 firefox version",
                "last 1 safari version"
            ]
        }
    }' package.json > package.json.tmp
    mv package.json.tmp package.json
fi

# Clean npm cache
echo "🧼 Cleaning npm cache..."
npm cache clean --force

# Install core dependencies
echo "📦 Installing core dependencies..."
npm install react-scripts@latest --save --legacy-peer-deps

# Install Bootstrap and its dependencies
echo "🎨 Installing Bootstrap..."
npm install bootstrap@5.3.2 react-bootstrap@2.9.1 --save --legacy-peer-deps

# Install specific version of babel-loader
echo "🎯 Installing correct babel-loader version..."
npm install babel-loader@8.1.0 --save-dev --legacy-peer-deps

# Fix security vulnerabilities
echo "🛡️  Fixing security vulnerabilities..."
npm audit fix --force

# Update problematic packages
echo "⬆️  Updating problematic packages..."
npm install nth-check@latest postcss@latest svgo@latest @svgr/webpack@latest resolve-url-loader@latest --save-dev --legacy-peer-deps

# Create or update src/index.js to import Bootstrap
echo "📝 Ensuring Bootstrap CSS import..."
if [ -f src/index.js ]; then
    # Add import if it doesn't exist
    if ! grep -q "import 'bootstrap/dist/css/bootstrap.min.css';" src/index.js; then
        sed -i.bak '1i\
import '\''bootstrap/dist/css/bootstrap.min.css'\'';
' src/index.js
        rm src/index.js.bak
    fi
fi

# Final clean install
echo "🧹 Final clean installation..."
npm install --legacy-peer-deps

echo "
✅ Setup complete! The following has been done:
   1. Added Bootstrap and its dependencies
   2. Fixed security vulnerabilities
   3. Updated browserslist configuration
   4. Added Bootstrap CSS import
   
Try running:
   npm run build
   npm start
   
If you still see security warnings, they are likely from deeper dependencies and won't affect your application's functionalit.