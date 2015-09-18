<?php

trait ThemeContext {
  public function add_to_context() {
    $context['site'] = $this;
    $context['menu'] = new TimberMenu();
    return $context;
  }
}
