#!/bin/bash

# Test the WordPress development environment
echo "🚀 Testing Model Viewer 3D Plugin..."

# Check if wp-env is available
if ! command -v npx &> /dev/null; then
    echo "❌ npm/npx is required. Please install Node.js first."
    exit 1
fi

# Build assets first
echo "🔨 Building plugin assets..."
npm run build

# Start wp-env if not running
echo "� Starting WordPress environment..."
npm run wp-env:start

# Wait for WordPress to be ready
echo "⏳ Waiting for WordPress to be ready..."
sleep 5

# Activate the plugin
echo "� Activating plugin..."
npx wp-env run cli wp plugin activate model-viewer-3d

echo ""
echo "✅ Test environment ready!"
echo ""
echo "🌐 WordPress Site: http://localhost:8888"
echo "� Admin Panel: http://localhost:8888/wp-admin"
echo "   Username: admin"
echo "   Password: admin"
echo ""
echo "🎯 Next steps:"
echo "1. Download sample models: ./download-samples.sh"
echo "2. Go to WordPress admin and upload GLB files"
echo "3. Create a new post and add the '3D Model Viewer' block"
echo "4. Test the block controls in the sidebar"
