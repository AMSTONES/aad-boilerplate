<?php

/** Theme support */
add_theme_support('post-thumbnails');
add_theme_support('menus');

/** Enqueue - frontend */
function aad__custom_scripts() {
  wp_enqueue_style('style', get_stylesheet_uri());
  wp_enqueue_script('script', get_template_directory_uri().'/assets/lib/app.min.js' , array('jquery'), false, true);
}
add_action('wp_enqueue_scripts', 'aad__custom_scripts');

/** Enqueue - admin */
function aad__enqueue_custom_admin_style() {
  wp_enqueue_style('admin', get_stylesheet_directory_uri().'/admin.css', false, '1.0.0');
}
add_action('admin_enqueue_scripts', 'aad__enqueue_custom_admin_style');

/** Menus */
function aad__register_my_menu() {
  register_nav_menu('primary', __('Primary'));
}
add_action('init', 'aad__register_my_menu');