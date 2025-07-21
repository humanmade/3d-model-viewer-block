#!/bin/bash

# Setup script for Model Viewer 3D plugin development environment
echo "🚀 Setting up Model Viewer 3D development environment..."

# Check if wp-env is available
if ! command -v npx &> /dev/null; then
    echo "❌ npm/npx is required but not installed. Please install Node.js first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the plugin
echo "🔨 Building plugin assets..."
npm run build

# Start wp-env
echo "🐳 Starting WordPress environment..."
npm run wp-env:start

# Wait for WordPress to be ready
echo "⏳ Waiting for WordPress to be ready..."
sleep 10

# Activate the plugin
echo "🔌 Activating Model Viewer 3D plugin..."
npx wp-env run cli wp plugin activate model-viewer-3d

# Install and activate a block theme for better testing
echo "🎨 Installing Twenty Twenty-Four theme..."
npx wp-env run cli wp theme install twentytwentyfour --activate

# Create a test post with some sample content
echo "📝 Creating sample content..."
npx wp-env run cli wp post create --post_type=post --post_status=publish --post_title="3D Model Test Post" --post_content="<!-- wp:paragraph -->
<p>This is a test post for the Model Viewer 3D plugin. Use the block editor to add a 3D Model Viewer block below this paragraph.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>You can upload GLB files through the Media Library and then select them in the 3D Model Viewer block.</p>
<!-- /wp:paragraph -->"

# Set up permalink structure
echo "🔗 Setting up permalink structure..."
npx wp-env run cli wp rewrite structure '/%postname%/'

# Create admin user (if not exists)
echo "👤 Setting up admin user..."
npx wp-env run cli wp user create admin admin@example.com --role=administrator --user_pass=admin --skip-email 2>/dev/null || echo "Admin user already exists"

# Enable debugging
echo "🐛 Enabling WordPress debugging..."
npx wp-env run cli wp config set WP_DEBUG true --raw
npx wp-env run cli wp config set WP_DEBUG_LOG true --raw
npx wp-env run cli wp config set WP_DEBUG_DISPLAY false --raw
npx wp-env run cli wp config set SCRIPT_DEBUG true --raw

# Update file upload settings
echo "📁 Configuring file upload settings..."
npx wp-env run cli wp config set UPLOADS true --raw

echo ""
echo "✅ Setup complete!"
echo ""
echo "🌐 WordPress is now running at: http://localhost:8888"
echo "🔑 Admin login: http://localhost:8888/wp-admin"
echo "   Username: admin"
echo "   Password: admin"
echo ""
echo "📚 Useful commands:"
echo "   npm run wp-env:stop    - Stop the environment"
echo "   npm run wp-env:start   - Start the environment"
echo "   npm run wp-env:reset   - Reset and restart"
echo "   npm run wp-env:logs    - View logs"
echo "   npm run dev            - Watch and rebuild assets"
echo ""
echo "🎯 To test the plugin:"
echo "1. Go to http://localhost:8888/wp-admin"
echo "2. Upload some GLB files to Media Library"
echo "3. Create a new post and add the '3D Model Viewer' block"
echo "4. Select your GLB file and customize the settings"
