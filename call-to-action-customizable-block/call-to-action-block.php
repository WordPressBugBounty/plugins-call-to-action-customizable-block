<?php
/**
 * Plugin Name: Call to Action Customizable Block
 * Author: Bhavesh Khadodara
 * Version: 1.1.3
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Description: Call to Action Gutenberg Block.
 * Playground: true
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

add_action('admin_notices', 'cta_custom_block_admin_notice');

function cta_custom_block_admin_notice() {
    // Only show to admins and only once a year
    if (!current_user_can('manage_options')) return;

    $last_shown = get_option('cta_custom_block_notice_time');
    $one_year = 365 * DAY_IN_SECONDS;

    if ($last_shown && (time() - $last_shown < $one_year)) return;

    // Check if dismissed
    if (get_user_meta(get_current_user_id(), 'cta_custom_block_dismissed', true)) return;

    ?>
    <div class="notice notice-info is-dismissible cta-custom-notice">
        <p>
            💡 Love using <strong>Call To Action Customizable Block</strong>? Please 
            <a href="https://wordpress.org/support/plugin/call-to-action-customizable-block/reviews/#new-post" target="_blank">rate us ★★★★★</a> or 
            <a href="https://ko-fi.com/bhaveshkhadodara" target="_blank">buy me a coffee ☕</a>!
        </p>
    </div>
    <script>
    jQuery(document).on('click', '.cta-custom-notice .notice-dismiss', function () {
        jQuery.post(ajaxurl, {
            action: 'cta_custom_block_dismiss_notice'
        });
    });
    </script>
    <?php
    // Set timestamp so we show it next year
    update_option('cta_custom_block_notice_time', time());
}

add_action('wp_ajax_cta_custom_block_dismiss_notice', function () {
    update_user_meta(get_current_user_id(), 'cta_custom_block_dismissed', true);
    wp_die();
});
