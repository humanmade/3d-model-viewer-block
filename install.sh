#!/bin/bash

# Model Viewer 3D Plugin Installation Script
echo "Installing Model Viewer 3D WordPress Plugin..."

# Check if we're in a WordPress installation
if [ ! -f "wp-config.php" ]; then
    echo "Error: This doesn't appear to be a WordPress installation."
    echo "Please run this script from your WordPress root directory."
    exit 1
fi

# Create plugins directory if it doesn't exist
mkdir -p wp-content/plugins

# Copy plugin files
echo "Copying plugin files..."
cp -r model-viewer-3d wp-content/plugins/

echo "Plugin files copied successfully!"
echo ""
echo "Next steps:"
echo "1. Go to your WordPress admin dashboard"
echo "2. Navigate to Plugins > Installed Plugins"
echo "3. Activate the 'Model Viewer 3D' plugin"
echo "4. You can now upload GLB/GLTF files and use the 3D Model Viewer block in Gutenberg!"
echo ""
echo "Note: Make sure your server allows GLB file uploads (check with your hosting provider if needed)"
