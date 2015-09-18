<?php

/**
 * Configuration values
 */
if (!defined('WP_ENV')) {
  // Fallback if WP_ENV isn't defined in your WordPress config
  // Used in lib/assets.php to check for 'development' or 'production'
  define('WP_ENV', 'production');
}

if (!defined('DIST_DIR')) {
  // Path to the build directory for front-end assets
  define('DIST_DIR', '/dist/');
}

if (!defined('CACHE_MODE')) {
  define('CACHE_MODE', TimberLoader::CACHE_NONE);
}

if (!defined('CACHE_DURATION')) {
  define('CACHE_DURATION', 600);
}

Timber::$dirname = array('templates', 'views');

require __DIR__.'/init.php';
