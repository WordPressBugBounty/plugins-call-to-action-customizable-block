<?php
/**
 * Plugin Name: Call to Action Customizable Block
 * Author: Bhavesh Khadodara
 * Version: 1.1.2
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Description: Call to Action Gutenberg Block.
 */

defined( 'ABSPATH' ) || exit;

function call_to_action_register_block() {
    // Register block editor script.
    wp_register_script('call-to-action-block-editor-script',plugins_url( 'block/build/index.js', __FILE__ ), array( 'wp-blocks', 'wp-element', 'wp-editor' ), filemtime( plugin_dir_path( __FILE__ ) . 'block/build/index.js' ));

    // Register block editor styles.
    wp_register_style('call-to-action-block-editor-style', plugins_url( 'block/build/index.css', __FILE__ ), array( 'wp-edit-blocks' ), filemtime( plugin_dir_path( __FILE__ ) . 'block/build/index.css' ));

    // Register block frontend styles.
    wp_register_style('call-to-action-block-frontend-style', plugins_url( 'block/build/style-index.css', __FILE__ ), array(), filemtime( plugin_dir_path( __FILE__ ) . 'block/build/style-index.css' ));

    // Register block.
    register_block_type( 'call/to-action-block', array(
        'editor_script' => 'call-to-action-block-editor-script',
        'editor_style' => 'call-to-action-block-editor-style',
        'style'        => 'call-to-action-block-frontend-style',
    ) );
}

add_action( 'init', 'call_to_action_register_block' );
