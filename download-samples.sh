#!/bin/bash

# Download sample GLB files for testing
echo "📦 Downloading sample GLB files for testing..."

# Create assets directory if it doesn't exist
mkdir -p assets/sample-models

cd assets/sample-models

# Download sample models from model-viewer examples
echo "⬇️  Downloading Astronaut model..."
curl -L -o Astronaut.glb "https://modelviewer.dev/shared-assets/models/Astronaut.glb"

echo "⬇️  Downloading Horse model..."
curl -L -o Horse.glb "https://modelviewer.dev/shared-assets/models/Horse.glb"

echo "⬇️  Downloading Shishkebab model..."  
curl -L -o shishkebab.glb "https://modelviewer.dev/shared-assets/models/shishkebab.glb"

echo "⬇️  Downloading Damaged Helmet model..."
curl -L -o DamagedHelmet.glb "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb"

cd ../..

echo "✅ Sample models downloaded to assets/sample-models/"
echo ""
echo "📋 Available test models:"
echo "  - Astronaut.glb (Simple character model)"
echo "  - Horse.glb (Animal model with animations)"
echo "  - shishkebab.glb (Food model with PBR materials)"
echo "  - DamagedHelmet.glb (Complex PBR model)"
echo ""
echo "💡 You can upload these files through WordPress Media Library to test the plugin!"
