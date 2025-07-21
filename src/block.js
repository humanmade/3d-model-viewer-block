const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { 
    InspectorControls, 
    InspectorAdvancedControls,
    BlockControls,
    MediaUpload, 
    MediaUploadCheck,
    useBlockProps,
    PanelColorSettings
} = wp.blockEditor;
const { 
    PanelBody, 
    Button, 
    ToggleControl, 
    TextControl, 
    RangeControl, 
    SelectControl,
    ColorPicker,
    ToolbarGroup,
    ToolbarButton,
    Dropdown,
    ColorPalette
} = wp.components;
const UnitControl = wp.components.__experimentalUnitControl || TextControl;
const { useState, useEffect, useRef } = wp.element;

registerBlockType('hm/hm-model-viewer-3d', {
    title: __('3D Model Viewer', 'hm-hm-model-viewer-3d'),
    description: __('Embed 3D models using model-viewer', 'hm-hm-model-viewer-3d'),
    icon: 'format-image',
    category: 'media',
    supports: {
        align: ['left', 'center', 'right', 'wide', 'full'],
        spacing: {
            margin: true,
            padding: true
        }
    },
    attributes: {
        src: {
            type: 'string',
            default: ''
        },
        alt: {
            type: 'string',
            default: '3D Model'
        },
        autoRotate: {
            type: 'boolean',
            default: false
        },
        cameraControls: {
            type: 'boolean',
            default: true
        },
        environmentImage: {
            type: 'string',
            default: ''
        },
        skyboxImage: {
            type: 'string',
            default: ''
        },
        exposure: {
            type: 'number',
            default: 1
        },
        shadowIntensity: {
            type: 'number',
            default: 1
        },
        width: {
            type: 'string',
            default: '100%'
        },
        height: {
            type: 'string',
            default: '400px'
        },
        backgroundColor: {
            type: 'string',
            default: '#ffffff'
        },
        loading: {
            type: 'string',
            default: 'auto'
        },
        reveal: {
            type: 'string',
            default: 'auto'
        }
    },

    edit: function(props) {
        const { attributes, setAttributes } = props;
        const {
            src,
            alt,
            autoRotate,
            cameraControls,
            environmentImage,
            skyboxImage,
            exposure,
            shadowIntensity,
            width,
            height,
            backgroundColor,
            loading,
            reveal
        } = attributes;

        const blockProps = useBlockProps({
            className: 'hm-model-viewer-3d-block'
        });

        // Move useRef to top level - hooks must be called unconditionally
        const containerRef = useRef(null);

        const onSelectModel = (media) => {
            setAttributes({
                src: media.url,
                alt: media.alt || '3D Model'
            });
        };

        const onSelectEnvironmentImage = (media) => {
            setAttributes({
                environmentImage: media.url
            });
        };

        const onSelectSkyboxImage = (media) => {
            setAttributes({
                skyboxImage: media.url
            });
        };

        // Move useEffect to top level - hooks must be called unconditionally
        useEffect(() => {
            if (containerRef.current && src) {
                // Clear any existing content
                containerRef.current.innerHTML = '';
                
                // Create model-viewer element
                const modelViewer = document.createElement('model-viewer');
                modelViewer.setAttribute('src', src);
                modelViewer.setAttribute('alt', alt);
                modelViewer.style.width = width;
                modelViewer.style.height = height;
                modelViewer.style.backgroundColor = backgroundColor;
                
                if (autoRotate) modelViewer.setAttribute('auto-rotate', '');
                if (cameraControls) modelViewer.setAttribute('camera-controls', '');
                if (environmentImage) modelViewer.setAttribute('environment-image', environmentImage);
                if (skyboxImage) modelViewer.setAttribute('skybox-image', skyboxImage);
                if (exposure !== 1) modelViewer.setAttribute('exposure', exposure);
                if (shadowIntensity !== 1) modelViewer.setAttribute('shadow-intensity', shadowIntensity);
                if (loading !== 'auto') modelViewer.setAttribute('loading', loading);
                if (reveal !== 'auto') modelViewer.setAttribute('reveal', reveal);
                
                containerRef.current.appendChild(modelViewer);
            }
        }, [src, alt, autoRotate, cameraControls, environmentImage, skyboxImage, exposure, shadowIntensity, width, height, backgroundColor, loading, reveal]);

        // Render the model viewer preview
        const renderModelViewer = () => {
            if (!src) {
                return (
                    <div className="model-viewer-placeholder">
                        <p>{__('No 3D model selected', 'hm-model-viewer-3d')}</p>
                    </div>
                );
            }

            return (
                <div 
                    ref={containerRef} 
                    className="model-viewer-container"
                    style={{ minHeight: '300px' }}
                />
            );
        };

        return (
            <>
                {/* Block Controls (Toolbar) */}
                {src && (
                    <BlockControls>
                        <ToolbarGroup>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={onSelectModel}
                                    allowedTypes={['model/gltf-binary', 'model/gltf+json']}
                                    value={src}
                                    render={({ open }) => (
                                        <ToolbarButton
                                            onClick={open}
                                            icon="update"
                                        >
                                            {__('Replace', 'hm-model-viewer-3d')}
                                        </ToolbarButton>
                                    )}
                                />
                            </MediaUploadCheck>
                        </ToolbarGroup>
                    </BlockControls>
                )}

                <div {...blockProps}>
                    {!src ? (
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={onSelectModel}
                                allowedTypes={['model/gltf-binary', 'model/gltf+json']}
                                value={src}
                                render={({ open }) => (
                                    <Button
                                        onClick={open}
                                        className="button button-large"
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            textAlign: 'center',
                                            padding: '20px',
                                            border: '2px dashed #ccc',
                                            backgroundColor: '#f9f9f9'
                                        }}
                                    >
                                        {__('Select 3D Model File', 'hm-model-viewer-3d')}
                                    </Button>
                                )}
                            />
                        </MediaUploadCheck>
                    ) : (
                        renderModelViewer()
                    )}
                </div>

                <InspectorControls>
                    <PanelBody
                        title={__('Model Settings', 'hm-model-viewer-3d')}
                        initialOpen={true}
                    >
                        <TextControl
                            label={__('Alt Text', 'hm-model-viewer-3d')}
                            value={alt}
                            onChange={(value) => setAttributes({ alt: value })}
                        />
                    </PanelBody>

                    <PanelBody
                        title={__('Interaction Controls', 'hm-model-viewer-3d')}
                        initialOpen={false}
                    >
                        <ToggleControl
                            label={__('Auto Rotate', 'hm-model-viewer-3d')}
                            checked={autoRotate}
                            onChange={(value) => setAttributes({ autoRotate: value })}
                            help={__('Automatically rotate the model', 'hm-model-viewer-3d')}
                        />
                        <ToggleControl
                            label={__('Camera Controls', 'hm-model-viewer-3d')}
                            checked={cameraControls}
                            onChange={(value) => setAttributes({ cameraControls: value })}
                            help={__('Allow users to control the camera', 'hm-model-viewer-3d')}
                        />
                        <SelectControl
                            label={__('Loading', 'hm-model-viewer-3d')}
                            value={loading}
                            options={[
                                { label: 'Auto', value: 'auto' },
                                { label: 'Lazy', value: 'lazy' },
                                { label: 'Eager', value: 'eager' }
                            ]}
                            onChange={(value) => setAttributes({ loading: value })}
                        />
                        <SelectControl
                            label={__('Reveal', 'hm-model-viewer-3d')}
                            value={reveal}
                            options={[
                                { label: 'Auto', value: 'auto' },
                                { label: 'Interaction', value: 'interaction' },
                                { label: 'Manual', value: 'manual' }
                            ]}
                            onChange={(value) => setAttributes({ reveal: value })}
                        />
                    </PanelBody>

                    <PanelBody
                        title={__('Lighting & Environment', 'hm-model-viewer-3d')}
                        initialOpen={false}
                    >
                        <RangeControl
                            label={__('Exposure', 'hm-model-viewer-3d')}
                            value={exposure}
                            onChange={(value) => setAttributes({ exposure: value })}
                            min={0}
                            max={3}
                            step={0.1}
                        />
                        <RangeControl
                            label={__('Shadow Intensity', 'hm-model-viewer-3d')}
                            value={shadowIntensity}
                            onChange={(value) => setAttributes({ shadowIntensity: value })}
                            min={0}
                            max={3}
                            step={0.1}
                        />
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                                {__('Environment Image', 'hm-model-viewer-3d')}
                            </label>
                            {environmentImage ? (
                                <div style={{ display: 'flex', alignItems: 'center', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
                                    <img 
                                        src={environmentImage} 
                                        alt={__('Environment Image', 'hm-model-viewer-3d')}
                                        style={{ 
                                            width: '40px', 
                                            height: '40px', 
                                            objectFit: 'cover', 
                                            borderRadius: '4px',
                                            marginRight: '12px'
                                        }}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '14px', fontWeight: '500' }}>
                                            {environmentImage.split('/').pop().substring(0, 30)}...
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() => setAttributes({ environmentImage: '' })}
                                        isDestructive={true}
                                        variant="tertiary"
                                        size="small"
                                    >
                                        {__('Remove', 'hm-model-viewer-3d')}
                                    </Button>
                                </div>
                            ) : (
                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={onSelectEnvironmentImage}
                                        allowedTypes={['image']}
                                        value={environmentImage}
                                        render={({ open }) => (
                                            <Button
                                                onClick={open}
                                                variant="secondary"
                                                style={{ width: '100%' }}
                                            >
                                                {__('Select Environment Image', 'hm-model-viewer-3d')}
                                            </Button>
                                        )}
                                    />
                                </MediaUploadCheck>
                            )}
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                                {__('Skybox Image', 'hm-model-viewer-3d')}
                            </label>
                            {skyboxImage ? (
                                <div style={{ display: 'flex', alignItems: 'center', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
                                    <img 
                                        src={skyboxImage} 
                                        alt={__('Skybox Image', 'hm-model-viewer-3d')}
                                        style={{ 
                                            width: '40px', 
                                            height: '40px', 
                                            objectFit: 'cover', 
                                            borderRadius: '4px',
                                            marginRight: '12px'
                                        }}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '14px', fontWeight: '500' }}>
                                            {skyboxImage.split('/').pop().substring(0, 30)}...
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() => setAttributes({ skyboxImage: '' })}
                                        isDestructive={true}
                                        variant="tertiary"
                                        size="small"
                                    >
                                        {__('Remove', 'hm-model-viewer-3d')}
                                    </Button>
                                </div>
                            ) : (
                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={onSelectSkyboxImage}
                                        allowedTypes={['image']}
                                        value={skyboxImage}
                                        render={({ open }) => (
                                            <Button
                                                onClick={open}
                                                variant="secondary"
                                                style={{ width: '100%' }}
                                            >
                                                {__('Select Skybox Image', 'hm-model-viewer-3d')}
                                            </Button>
                                        )}
                                    />
                                </MediaUploadCheck>
                            )}
                        </div>
                    </PanelBody>
                </InspectorControls>

                {/* Style Controls - moved to Style tab */}
                <InspectorControls group="styles">
                    <PanelBody
                        title={__('Dimensions', 'hm-model-viewer-3d')}
                        initialOpen={true}
                    >
                        {UnitControl && (
                            <>
                                <UnitControl
                                    label={__('Width', 'hm-model-viewer-3d')}
                                    value={width}
                                    onChange={(value) => setAttributes({ width: value || '100%' })}
                                    units={[
                                        { value: 'px', label: 'px' },
                                        { value: '%', label: '%' },
                                        { value: 'em', label: 'em' },
                                        { value: 'rem', label: 'rem' },
                                        { value: 'vw', label: 'vw' }
                                    ]}
                                />
                                <UnitControl
                                    label={__('Height', 'hm-model-viewer-3d')}
                                    value={height}
                                    onChange={(value) => setAttributes({ height: value || '400px' })}
                                    units={[
                                        { value: 'px', label: 'px' },
                                        { value: '%', label: '%' },
                                        { value: 'em', label: 'em' },
                                        { value: 'rem', label: 'rem' },
                                        { value: 'vh', label: 'vh' }
                                    ]}
                                />
                            </>
                        )}
                        {!UnitControl && (
                            <>
                                <TextControl
                                    label={__('Width', 'hm-model-viewer-3d')}
                                    value={width}
                                    onChange={(value) => setAttributes({ width: value })}
                                    help={__('CSS width value (e.g., 100%, 500px)', 'hm-model-viewer-3d')}
                                />
                                <TextControl
                                    label={__('Height', 'hm-model-viewer-3d')}
                                    value={height}
                                    onChange={(value) => setAttributes({ height: value })}
                                    help={__('CSS height value (e.g., 400px, 50vh)', 'hm-model-viewer-3d')}
                                />
                            </>
                        )}
                    </PanelBody>

                    {PanelColorSettings && (
                        <PanelColorSettings
                            title={__('Color', 'hm-model-viewer-3d')}
                            initialOpen={false}
                            colorSettings={[
                                {
                                    value: backgroundColor,
                                    onChange: (color) => setAttributes({ backgroundColor: color || '#ffffff' }),
                                    label: __('Background', 'hm-model-viewer-3d'),
                                }
                            ]}
                        />
                    )}
                    {!PanelColorSettings && (
                        <PanelBody
                            title={__('Color', 'hm-model-viewer-3d')}
                            initialOpen={false}
                        >
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                                    {__('Background Color', 'hm-model-viewer-3d')}
                                </label>
                                <ColorPicker
                                    color={backgroundColor}
                                    onChangeComplete={(color) => setAttributes({ backgroundColor: color.hex })}
                                />
                            </div>
                        </PanelBody>
                    )}
                </InspectorControls>
            </>
        );
    },

    save: function() {
        // Server-side rendering
        return null;
    }
});
