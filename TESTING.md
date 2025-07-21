# Testing Checklist for Human Made Model Viewer 3D Plugin

## Development Environment Setup
- [ ] Run `./setup-dev.sh` successfully
- [ ] WordPress loads at http://localhost:8888
- [ ] Can login to admin with admin/admin
- [ ] Plugin is activated and visible in plugins list

## File Upload Testing
- [ ] Download sample models: `./download-samples.sh`
- [ ] Upload GLB file through Media Library
- [ ] GLB file appears in media grid
- [ ] GLB file can be selected in media picker
- [ ] GLTF file upload works (if you have one)

## Block Editor Testing
- [ ] "3D Model Viewer" block appears in block inserter
- [ ] Block can be added to post/page
- [ ] Block shows file selection interface when no model selected
- [ ] Can select GLB file from media library
- [ ] Model preview appears in editor after selection
- [ ] "Change Model" button works
- [ ] "Remove Model" button works

## Block Controls Testing
### Model Settings Panel
- [ ] Alt text field updates model alt attribute
- [ ] Model file selection works
- [ ] Remove model button clears the selection

### Display Settings Panel
- [ ] Width field accepts CSS values (100%, 500px, etc.)
- [ ] Height field accepts CSS values (400px, 50vh, etc.)
- [ ] Background color picker changes model background

### Interaction Controls Panel
- [ ] Auto Rotate toggle enables/disables rotation
- [ ] Camera Controls toggle enables/disables user interaction
- [ ] Loading dropdown changes loading behavior
- [ ] Reveal dropdown changes reveal timing

### Lighting & Environment Panel
- [ ] Exposure slider affects model brightness
- [ ] Shadow Intensity slider affects shadows
- [ ] Environment Image selection works
- [ ] Skybox Image selection works
- [ ] Remove buttons for environment/skybox work

## Frontend Testing
- [ ] Published post shows 3D model correctly
- [ ] Model is interactive (if camera controls enabled)
- [ ] Model auto-rotates (if enabled)
- [ ] Model loads with correct dimensions
- [ ] Background color is applied
- [ ] Model works on mobile devices
- [ ] Loading states work properly

## Performance Testing
- [ ] Large GLB files (>5MB) upload successfully
- [ ] Models load without JavaScript errors
- [ ] Lazy loading works (check Network tab)
- [ ] Multiple models on same page work
- [ ] Models work with different themes

## Accessibility Testing
- [ ] Alt text is properly set on model-viewer element
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility (basic test)

## Browser Compatibility
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari (if on Mac)
- [ ] Mobile browsers

## Error Handling
- [ ] Invalid GLB file shows error message
- [ ] Missing model file shows placeholder
- [ ] Network errors are handled gracefully
- [ ] Console shows no JavaScript errors

## Development Workflow
- [ ] `npm run dev` watches for changes
- [ ] Changes to src/block.js rebuild automatically
- [ ] CSS changes update in editor
- [ ] `./dev-utils.sh` commands work

## WordPress Integration
- [ ] Plugin doesn't conflict with other plugins
- [ ] Works with different themes
- [ ] Gutenberg block patterns work
- [ ] WordPress REST API endpoints don't break
- [ ] Plugin deactivation/activation works cleanly

## Cleanup Testing
- [ ] Plugin can be deactivated without errors
- [ ] Plugin files can be deleted safely
- [ ] No database errors after plugin removal
- [ ] GLB files remain in media library after plugin removal

---

## Test Models Information

### Astronaut.glb
- Size: ~4MB
- Features: Simple character, good for basic testing
- Use for: Initial testing, performance baseline

### Horse.glb  
- Size: ~1MB
- Features: Animated model
- Use for: Animation testing, camera controls

### shishkebab.glb
- Size: ~3MB
- Features: PBR materials, complex lighting
- Use for: Environment image testing, lighting controls

### DamagedHelmet.glb
- Size: ~4MB
- Features: Complex PBR, industry standard test model
- Use for: Advanced material testing, performance testing

---

## Common Issues & Solutions

### GLB Files Won't Upload
1. Check WordPress upload settings in wp-admin
2. Verify file permissions
3. Check WordPress upload_max_filesize setting

### Models Not Displaying
1. Check browser console for errors
2. Verify model-viewer script is loading
3. Test model file in other viewers
4. Check for JavaScript conflicts

### Performance Issues
1. Reduce model file size
2. Enable lazy loading
3. Optimize textures
4. Use environment images sparingly
