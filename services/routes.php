<?php 
// Custom routes goes here
Timber::add_route(':lang/author/:author_name/page/:page', function($params){
    $query = array(
    	'author_name'	=>	$params['author_name'],
    	'paged'			=>	$params['page']
    );
    Timber::load_template('author.php', $query, 200, $params);
});