#!/bin/bash

# HM Model Viewer 3D Release Script
# Usage: ./release.sh <version>
# Example: ./release.sh 1.1.0

set -e

if [ -z "$1" ]; then
    echo "Usage: $0 <version>"
    echo "Example: $0 1.1.0"
    exit 1
fi

VERSION=$1
echo "🚀 Preparing release v$VERSION..."

# Check if working directory is clean
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Working directory is not clean. Please commit or stash changes first."
    exit 1
fi

# Update version in package.json
echo "📝 Updating package.json version..."
npm version $VERSION --no-git-tag-version

# Update version in main plugin file
echo "📝 Updating plugin version..."
sed -i '' "s/Version: .*/Version: $VERSION/" hm-model-viewer-3d.php
sed -i '' "s/define( 'HM_MODEL_VIEWER_3D_VERSION', '.*' );/define( 'HM_MODEL_VIEWER_3D_VERSION', '$VERSION' );/" hm-model-viewer-3d.php

# Build production version
echo "🔨 Building production version..."
npm run build

# Add changes to git
echo "📋 Committing changes..."
git add .
git commit -m "Release v$VERSION

- Updated version numbers
- Production build included"

# Create tag
echo "🏷️  Creating tag v$VERSION..."
git tag -a "v$VERSION" -m "Release v$VERSION"

# Create distribution zip
echo "📦 Creating distribution zip..."
mkdir -p releases
zip -r "releases/hm-model-viewer-3d-v$VERSION.zip" . \
    -x "node_modules/*" \
    -x ".git/*" \
    -x "releases/*" \
    -x "*.sh" \
    -x ".wp-env*" \
    -x "webpack.config.js" \
    -x "package*.json" \
    -x "src/*" \
    -x ".*"

echo "✅ Release v$VERSION completed!"
echo "📋 Next steps:"
echo "   1. Push changes: git push origin main"
echo "   2. Push tags: git push origin v$VERSION"
echo "   3. Upload releases/hm-model-viewer-3d-v$VERSION.zip to WordPress.org or distribution"
echo ""
echo "🎉 Release package created: releases/hm-model-viewer-3d-v$VERSION.zip"
