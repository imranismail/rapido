<?php

trait ThemeFilter {
  public function set_theme_filter() {
    add_filter('timber_context',array($this,'add_to_context'));
    add_filter('get_twig',array($this,'add_to_twig'));
  }
}
