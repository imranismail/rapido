<?php

trait ExtendsTwig {
  public function add_to_twig( $twig ) {
    $twig->addExtension(new Twig_Extension_StringLoader());
    return $twig;
  }
}
