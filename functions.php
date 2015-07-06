<?php

if ( ! class_exists( 'Timber' ) ) {
	add_action( 'admin_notices', function() {
			echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
		} );
	return;
} elseif ( ! class_exists( 'Polylang' ) ) {
	add_action( 'admin_notices', function() {
			echo '<div class="error"><p>Polylang not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#polylang' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
		} );
	return;
}

$cache_modes = array(
	TimberLoader::CACHE_NONE,
	TimberLoader::CACHE_USE_DEFAULT,
	TimberLoader::CACHE_OBJECT,
	TimberLoader::CACHE_TRANSIENT,
	TimberLoader::CACHE_SITE_TRANSIENT
	);
$GLOBALS['cache_mode'] = $cache_modes[0];
$GLOBALS['cache_time'] = 600;

class StarterSite extends TimberSite {

	function __construct() {
		add_theme_support( 'post-formats' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'menus' );
		add_filter( 'timber_context', array( $this, 'add_to_context' ) );
		add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		add_action('after_setup_theme', array($this, 'add_i18n'));
		parent::__construct();
	}

	function register_post_types() {
		//this is where you can register custom post types
	}

	function register_taxonomies() {
		//this is where you can register custom taxonomies
	}

	function add_to_context( $context ) {
		$context['languages'] = pll_the_languages(array('echo'=>0, 'hide_current'=>1));
		$context['menu'] = new TimberMenu('menu_'.pll_current_language());
		$context['site'] = $this;
		$context['current_user'] = new TimberUser();
		$context['current_language'] = strtoupper(pll_current_language());
		return $context;
	}

	function add_to_twig( $twig ) {
		/* this is where you can add your own fuctions to twig */
		$twig->addExtension( new Twig_Extension_StringLoader() );
		$twig->addFilter( 'myfoo', new Twig_Filter_Function( 'myfoo' ) );
		return $twig;
	}

	function add_i18n() {
		load_theme_textdomain( 'rapido', get_template_directory() . '/languages' );
	}
}

new StarterSite();

include "services/controller.php";
include "services/routes.php";
