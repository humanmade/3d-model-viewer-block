<?php
/**
 * Plugin Name: Human Made Model Viewer 3D
 * Description: Embed 3D models in WordPress posts using model-viewer with Gutenberg block support
 * Version: 1.0.0
 * Author: Human Made
 * Author URI: https://humanmade.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: hm-model-viewer-3d
 * Domain Path: /languages
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('HM_MODEL_VIEWER_3D_VERSION', '1.0.0');
define('HM_MODEL_VIEWER_3D_PLUGIN_URL', plugin_dir_url(__FILE__));
define('HM_MODEL_VIEWER_3D_PLUGIN_PATH', plugin_dir_path(__FILE__));

// Include configuration
require_once HM_MODEL_VIEWER_3D_PLUGIN_PATH . 'includes/config.php';

/**
 * Main plugin class
 */
class HM_ModelViewer3D {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('enqueue_block_editor_assets', array($this, 'enqueue_block_editor_assets'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_frontend_assets'));
        add_filter('upload_mimes', array($this, 'allow_glb_uploads'));
        add_filter('wp_check_filetype_and_ext', array($this, 'check_glb_filetype'), 10, 5);
        add_filter('script_loader_tag', array($this, 'add_module_type_to_script'), 10, 3);
    }
    
    /**
     * Initialize the plugin
     */
    public function init() {
        // Register the block
        register_block_type(
            'hm/model-viewer-3d',
            array(
                'editor_script' => 'hm-model-viewer-3d-editor',
                'editor_style' => 'hm-model-viewer-3d-editor',
                'style' => 'hm-model-viewer-3d-frontend',
                'render_callback' => array($this, 'render_block'),
                'supports' => array(
                    'align' => array('left', 'center', 'right', 'wide', 'full'),
                    'spacing' => array(
                        'margin' => true,
                        'padding' => true
                    )
                ),
                'attributes' => array(
                    'src' => array(
                        'type' => 'string',
                        'default' => ''
                    ),
                    'alt' => array(
                        'type' => 'string',
                        'default' => '3D Model'
                    ),
                    'autoRotate' => array(
                        'type' => 'boolean',
                        'default' => false
                    ),
                    'cameraControls' => array(
                        'type' => 'boolean',
                        'default' => true
                    ),
                    'environmentImage' => array(
                        'type' => 'string',
                        'default' => ''
                    ),
                    'skyboxImage' => array(
                        'type' => 'string',
                        'default' => ''
                    ),
                    'exposure' => array(
                        'type' => 'number',
                        'default' => 1
                    ),
                    'shadowIntensity' => array(
                        'type' => 'number',
                        'default' => 1
                    ),
                    'width' => array(
                        'type' => 'string',
                        'default' => '100%'
                    ),
                    'height' => array(
                        'type' => 'string',
                        'default' => '400px'
                    ),
                    'backgroundColor' => array(
                        'type' => 'string',
                        'default' => '#ffffff'
                    ),
                    'loading' => array(
                        'type' => 'string',
                        'default' => 'auto'
                    ),
                    'reveal' => array(
                        'type' => 'string',
                        'default' => 'auto'
                    )
                )
            )
        );
    }
    
    /**
     * Enqueue block editor assets
     */
    public function enqueue_block_editor_assets() {
        wp_enqueue_script(
            'hm-model-viewer-3d-editor',
            HM_MODEL_VIEWER_3D_PLUGIN_URL . 'build/index.js',
            array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-block-editor'),
            HM_MODEL_VIEWER_3D_VERSION
        );
        
        wp_enqueue_style(
            'hm-model-viewer-3d-editor',
            HM_MODEL_VIEWER_3D_PLUGIN_URL . 'src/editor.css',
            array('wp-edit-blocks'),
            HM_MODEL_VIEWER_3D_VERSION
        );
        
        // Enqueue model-viewer for editor preview as ES module
        wp_enqueue_script(
            'model-viewer-lib-editor',
            'https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js',
            array(),
            '4.0.0',
            true
        );
    }
    
    /**
     * Add module type to model-viewer scripts
     */
    public function add_module_type_to_script($tag, $handle, $src) {
        // Check for both frontend and editor model-viewer scripts
        if ($handle === 'model-viewer-lib' || $handle === 'model-viewer-lib-editor') {
            $tag = str_replace('<script ', '<script type="module" ', $tag);
        }
        return $tag;
    }
    
    /**
     * Enqueue frontend assets
     */
    public function enqueue_frontend_assets() {
        wp_enqueue_script(
            'model-viewer-lib',
            'https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js',
            array(),
            '4.0.0',
            true
        );
        wp_script_add_data('model-viewer-lib', 'type', 'module');
        
        wp_enqueue_style(
            'hm-model-viewer-3d-frontend',
            HM_MODEL_VIEWER_3D_PLUGIN_URL . 'src/style.css',
            array(),
            HM_MODEL_VIEWER_3D_VERSION
        );
    }
    
    /**
     * Allow GLB file uploads
     */
    public function allow_glb_uploads($mimes) {
        $mimes['glb'] = 'model/gltf-binary';
        $mimes['gltf'] = 'model/gltf+json';
        return $mimes;
    }
    
    /**
     * Check GLB file type
     */
    public function check_glb_filetype($data, $file, $filename, $mimes, $real_mime = null) {
        $wp_file_type = wp_check_filetype($filename, $mimes);
        
        if ($wp_file_type['ext'] === 'glb') {
            $data['ext'] = 'glb';
            $data['type'] = 'model/gltf-binary';
        } elseif ($wp_file_type['ext'] === 'gltf') {
            $data['ext'] = 'gltf';
            $data['type'] = 'model/gltf+json';
        }
        
        return $data;
    }
    
    /**
     * Render the block on the frontend
     */
    public function render_block($attributes) {
        if (empty($attributes['src'])) {
            return '<p>Please select a 3D model file.</p>';
        }
        
        $model_viewer_attributes = array();
        
        // Required attributes
        $model_viewer_attributes[] = 'src="' . esc_url($attributes['src']) . '"';
        $model_viewer_attributes[] = 'alt="' . esc_attr($attributes['alt']) . '"';
        
        // Optional boolean attributes
        if ($attributes['autoRotate']) {
            $model_viewer_attributes[] = 'auto-rotate';
        }
        if ($attributes['cameraControls']) {
            $model_viewer_attributes[] = 'camera-controls';
        }
        
        // Optional string attributes
        if (!empty($attributes['environmentImage'])) {
            $model_viewer_attributes[] = 'environment-image="' . esc_url($attributes['environmentImage']) . '"';
        }
        if (!empty($attributes['skyboxImage'])) {
            $model_viewer_attributes[] = 'skybox-image="' . esc_url($attributes['skyboxImage']) . '"';
        }
        if (!empty($attributes['loading']) && $attributes['loading'] !== 'auto') {
            $model_viewer_attributes[] = 'loading="' . esc_attr($attributes['loading']) . '"';
        }
        if (!empty($attributes['reveal']) && $attributes['reveal'] !== 'auto') {
            $model_viewer_attributes[] = 'reveal="' . esc_attr($attributes['reveal']) . '"';
        }
        
        // Numeric attributes
        if ($attributes['exposure'] !== 1) {
            $model_viewer_attributes[] = 'exposure="' . floatval($attributes['exposure']) . '"';
        }
        if ($attributes['shadowIntensity'] !== 1) {
            $model_viewer_attributes[] = 'shadow-intensity="' . floatval($attributes['shadowIntensity']) . '"';
        }
        
        // Style attributes
        $style_parts = array();
        if (!empty($attributes['width'])) {
            $style_parts[] = 'width: ' . esc_attr($attributes['width']);
        }
        if (!empty($attributes['height'])) {
            $style_parts[] = 'height: ' . esc_attr($attributes['height']);
        }
        if (!empty($attributes['backgroundColor'])) {
            $style_parts[] = 'background-color: ' . esc_attr($attributes['backgroundColor']);
        }
        
        if (!empty($style_parts)) {
            $model_viewer_attributes[] = 'style="' . implode('; ', $style_parts) . '"';
        }
        
        return '<model-viewer ' . implode(' ', $model_viewer_attributes) . '></model-viewer>';
    }
}

// Initialize the plugin
new HM_ModelViewer3D();
