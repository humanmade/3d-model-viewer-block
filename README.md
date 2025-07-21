# HM Model Viewer 3D

> **⚠️ AI-Generated Plugin Notice**  
> This entire WordPress plugin was created using AI assistance (GitHub Copilot). Every line of code, documentation, configuration, and build setup was generated through conversational AI prompting. The complete prompt history and development process are documented in [PROMPTS.md](PROMPTS.md) for transparency and educational purposes.

A WordPress plugin that allows you to easily embed 3D models in your posts and pages using Google's model-viewer web component.

## Features

- 🎯 **Gutenberg Block**: Native WordPress block editor integration
- 🎨 **Style Controls**: Width, height, and background color controls in the Style tab
- 🎮 **Interaction Controls**: Auto-rotate, camera controls, loading options
- 🌈 **Lighting & Environment**: Exposure, shadow intensity, environment/skybox images
- 📱 **Responsive**: Support for various units (px, %, em, rem, vw, vh)
- ♿ **Accessible**: Proper alt text and ARIA support
- 🔧 **Developer Friendly**: Modern build tools and development workflow

## Supported File Formats

- GLB (binary glTF)
- GLTF (JSON glTF)

## Installation

1. Download the plugin
2. Upload to your WordPress `wp-content/plugins/` directory
3. Activate the plugin through the WordPress admin
4. Start using the "3D Model Viewer" block in the block editor

## Development

### Prerequisites

- Node.js 16+ and npm
- WordPress 6.0+
- Docker (for local development environment)

### Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd hm-model-viewer-3d
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development environment:
   ```bash
   npm run env:start
   ```

4. Start the build watcher:
   ```bash
   npm run dev
   ```

### Build Commands

- `npm run build` - Production build
- `npm run dev` - Development build with watcher
- `npm run env:start` - Start WordPress development environment
- `npm run env:stop` - Stop WordPress development environment
- `npm run env:clean` - Clean WordPress environment

### Project Structure

```
├── src/
│   ├── block.js          # Main block definition
│   ├── editor.css        # Editor styles
│   └── style.css         # Frontend styles
├── includes/
│   └── config.php        # Plugin configuration
├── assets/
│   └── sample-models/    # Sample GLB files for testing
├── build/
│   └── index.js          # Compiled JavaScript
├── hm-model-viewer-3d.php # Main plugin file
├── package.json          # Node.js dependencies
└── webpack.config.js     # Build configuration
```

## Usage

1. Add a new block in the WordPress editor
2. Search for "3D Model Viewer"
3. Click to select a GLB or GLTF file from your media library
4. Configure the model using the sidebar controls:
   - **Settings Tab**: Alt text, interaction controls, lighting
   - **Style Tab**: Dimensions and background color
5. Preview and publish

## Configuration Options

### Model Settings
- **Alt Text**: Accessibility description

### Interaction Controls
- **Auto Rotate**: Automatically rotate the model
- **Camera Controls**: Allow users to orbit/zoom
- **Loading**: Control when the model loads (auto/lazy/eager)
- **Reveal**: Control when the model becomes interactive

### Lighting & Environment
- **Exposure**: Brightness adjustment (0-3)
- **Shadow Intensity**: Shadow strength (0-3)
- **Environment Image**: HDR environment for reflections
- **Skybox Image**: Background environment image

### Style Controls
- **Width/Height**: Responsive dimensions with unit controls
- **Background Color**: Model viewer background

## Browser Support

The plugin uses Google's model-viewer web component which supports:
- Chrome 66+
- Firefox 60+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This plugin is licensed under the GPL v2 or later.

## Credits

- Built by [Human Made](https://humanmade.com/)
- Powered by [Google's model-viewer](https://modelviewer.dev/)
- Sample models from [glTF Sample Models](https://github.com/KhronosGroup/glTF-Sample-Models)

## Changelog

### 1.0.0
- Initial release
- Gutenberg block with full feature set
- WordPress core UI patterns
- Responsive controls and styling
