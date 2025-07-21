<?php
/**
 * Configuration and helper functions for Human Made Model Viewer 3D plugin
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Plugin configuration class
 */
class HM_ModelViewer3DConfig {
    
    /**
     * Get default model-viewer attributes
     */
    public static function get_default_attributes() {
        return array(
            'src' => '',
            'alt' => '3D Model',
            'autoRotate' => false,
            'cameraControls' => true,
            'environmentImage' => '',
            'skyboxImage' => '',
            'exposure' => 1,
            'shadowIntensity' => 1,
            'width' => '100%',
            'height' => '400px',
            'backgroundColor' => '#ffffff',
            'loading' => 'auto',
            'reveal' => 'auto'
        );
    }
    
    /**
     * Get supported 3D file types
     */
    public static function get_supported_file_types() {
        return array(
            'glb' => array(
                'type' => 'model/gltf-binary',
                'description' => 'GLB (Binary glTF)'
            ),
            'gltf' => array(
                'type' => 'model/gltf+json',
                'description' => 'GLTF (Text-based glTF)'
            )
        );
    }
    
    /**
     * Get loading options
     */
    public static function get_loading_options() {
        return array(
            'auto' => __('Auto', 'model-viewer-3d'),
            'lazy' => __('Lazy', 'model-viewer-3d'),
            'eager' => __('Eager', 'model-viewer-3d')
        );
    }
    
    /**
     * Get reveal options
     */
    public static function get_reveal_options() {
        return array(
            'auto' => __('Auto', 'model-viewer-3d'),
            'interaction' => __('On Interaction', 'model-viewer-3d'),
            'manual' => __('Manual', 'model-viewer-3d')
        );
    }
    
    /**
     * Validate model-viewer attributes
     */
    public static function validate_attributes($attributes) {
        $defaults = self::get_default_attributes();
        $validated = array();
        
        foreach ($defaults as $key => $default_value) {
            if (isset($attributes[$key])) {
                switch ($key) {
                    case 'src':
                    case 'environmentImage':
                    case 'skyboxImage':
                        $validated[$key] = esc_url($attributes[$key]);
                        break;
                    case 'alt':
                    case 'width':
                    case 'height':
                    case 'backgroundColor':
                        $validated[$key] = sanitize_text_field($attributes[$key]);
                        break;
                    case 'autoRotate':
                    case 'cameraControls':
                        $validated[$key] = (bool) $attributes[$key];
                        break;
                    case 'exposure':
                    case 'shadowIntensity':
                        $validated[$key] = floatval($attributes[$key]);
                        break;
                    case 'loading':
                        $loading_options = array_keys(self::get_loading_options());
                        $validated[$key] = in_array($attributes[$key], $loading_options) ? $attributes[$key] : 'auto';
                        break;
                    case 'reveal':
                        $reveal_options = array_keys(self::get_reveal_options());
                        $validated[$key] = in_array($attributes[$key], $reveal_options) ? $attributes[$key] : 'auto';
                        break;
                    default:
                        $validated[$key] = $attributes[$key];
                }
            } else {
                $validated[$key] = $default_value;
            }
        }
        
        return $validated;
    }
    
    /**
     * Get environment image presets (you can expand this)
     */
    public static function get_environment_presets() {
        return array(
            '' => __('None', 'model-viewer-3d'),
            'https://modelviewer.dev/shared-assets/environments/aircraft_workshop_01_1k.hdr' => __('Aircraft Workshop', 'model-viewer-3d'),
            'https://modelviewer.dev/shared-assets/environments/moon_1k.hdr' => __('Moon Surface', 'model-viewer-3d'),
            'https://modelviewer.dev/shared-assets/environments/spruit_sunrise_1k_HDR.hdr' => __('Sunrise', 'model-viewer-3d')
        );
    }
}

/**
 * Helper functions
 */
function model_viewer_3d_get_block_attributes() {
    return ModelViewer3DConfig::get_default_attributes();
}

function model_viewer_3d_validate_attributes($attributes) {
    return ModelViewer3DConfig::validate_attributes($attributes);
}
