<?php

/**
 * Plugin Checker
 */
if (!class_exists('Timber')) {
  add_action( 'admin_notices', function() {
    echo '<div class="error"><p>Timber not activated. Make sure you download and activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber')) . '">' . esc_url(admin_url('plugins.php')) . '</a></p></div>';
  });
  return;
}

if (!class_exists('Polylang') ) {
  add_action( 'admin_notices', function() {
    echo '<div class="error"><p>Polylang not activated. Make sure you activate download and activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#polylang')) . '">' . esc_url(admin_url('plugins.php')) . '</a></p></div>';
    } );
  return;
}

foreach (glob(__DIR__.'/traits/*.php') as $filename)
{
    require $filename;
}

require __DIR__.'/app.php';
