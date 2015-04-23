<?php
// Custom functions can be passed here to be used
function isAjax(){
	return isset( $_SERVER['HTTP_X_REQUESTED_WITH'] ) && $_SERVER['HTTP_X_REQUESTED_WITH'] === 'XMLHttpRequest';
}

function myfoo( $text ) {
	$text .= ' bar!';
	return $text;
}