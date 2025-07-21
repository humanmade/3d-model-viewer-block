# Human Made Model Viewer 3D Plugin - Usage Guide

## Development Quick Start

```bash
# Setup the development environment (requires Docker)
./setup-dev.sh

# Access your development environment
# WordPress: http://localhost:8888
# Admin: http://localhost:8888/wp-admin (admin/admin)
```

## Development Commands
```bash
./dev-utils.sh start     # Start WordPress environment
./dev-utils.sh build     # Build plugin assets
./dev-utils.sh watch     # Watch for changes and rebuild
./dev-utils.sh wp plugin list  # Run WP-CLI commands
./test-demo.sh          # Quick test setup
```

## Production Usage

## Quick Start

1. **Activate the Plugin**
   - Upload the plugin to `/wp-content/plugins/`
   - Activate "Model Viewer 3D" in your WordPress admin

2. **Upload 3D Models**
   - Go to Media Library
   - Upload your `.glb` or `.gltf` files (they're now supported!)

3. **Add the Block**
   - In any post/page, add the "3D Model Viewer" block
   - Select your uploaded 3D model file
   - Customize settings in the sidebar

## Block Settings

### Model Settings
- **Select Model**: Choose your GLB/GLTF file
- **Alt Text**: Accessibility description

### Display Settings
- **Width**: CSS width (100%, 500px, etc.)
- **Height**: CSS height (400px, 50vh, etc.)
- **Background Color**: Color picker for background

### Interaction Controls
- **Auto Rotate**: Automatically rotate the model
- **Camera Controls**: Allow user interaction (zoom, pan, rotate)
- **Loading**: When to load the model (auto/lazy/eager)
- **Reveal**: When to show the model (auto/interaction/manual)

### Lighting & Environment
- **Exposure**: Brightness level (0-3)
- **Shadow Intensity**: Shadow strength (0-3)
- **Environment Image**: HDR image for realistic lighting
- **Skybox Image**: Background image

## Best Practices

### File Optimization
- Keep GLB files under 10MB for good performance
- Use compressed textures when possible
- Consider using Draco compression for geometry

### Performance Tips
- Use "lazy" loading for models below the fold
- Set appropriate width/height to avoid layout shifts
- Use environment images sparingly (they increase load time)

### Accessibility
- Always provide meaningful alt text
- Consider users with limited bandwidth
- Test on mobile devices

## Troubleshooting

### GLB Files Won't Upload
- Check your hosting provider allows GLB file uploads
- Check WordPress upload settings in wp-admin → Media
- Some hosts may need manual MIME type configuration

### Models Not Displaying
- Ensure model-viewer script is loading (check browser console)
- Verify GLB file is valid (test at https://gltf-viewer.donmccurdy.com/)
- Check for JavaScript errors in browser console

### Performance Issues
- Reduce model complexity/file size
- Use lazy loading
- Consider using a CDN for large model files

## Sample Models

You can test with these free models:
- [Astronaut](https://modelviewer.dev/shared-assets/models/Astronaut.glb)
- [Horse](https://modelviewer.dev/shared-assets/models/Horse.glb)
- [Shishkebab](https://modelviewer.dev/shared-assets/models/shishkebab.glb)

## Support

For issues or questions:
1. Check the browser console for JavaScript errors
2. Verify your GLB file works in other model viewers
3. Test with the included demo.html file
4. Check WordPress error logs
