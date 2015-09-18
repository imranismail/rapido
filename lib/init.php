<?php

class Rapido extends TimberSite {
  use ThemeSupport, ThemeFilter, ThemeAction, ThemeContext, ExtendsTwig;

  function __construct() {
    $this->set_theme_support();
    $this->set_theme_filter();
    $this->set_theme_action();
    parent::__construct();
  }
}

new Rapido();
