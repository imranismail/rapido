<?php

trait ThemeAction {
  public function set_theme_action() {
    add_action('init', array($this,'register_post_types'));
    add_action('init', array($this,'register_taxonomies'));
    add_action('after_setup_theme', array($this,'register_i18n'));
  }

  function register_post_types() {
    //this is where you can register custom post types
  }

  function register_taxonomies() {
    //this is where you can register custom taxonomies
  }

  function register_i18n() {
    load_theme_textdomain('rapido', get_template_directory() . '/lang');
  }
}
