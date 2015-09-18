<?php

trait ThemeSupport {
  public function set_theme_support() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('post-formats', ['aside', 'gallery', 'link', 'image', 'quote', 'video', 'audio']);
    add_theme_support('html5', ['caption', 'comment-form', 'comment-list']);
    add_theme_support('menus');
  }
}
