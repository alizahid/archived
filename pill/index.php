<?php

	//	Pill, a controller-view framework
	//	for static page generation
	//	https://github.com/alizahid/pill

	session_start();

	require 'includes/config.php';
	require 'includes/pill.php';

	$uri = strtolower( parse_url( $_SERVER['REQUEST_URI'], PHP_URL_PATH ) );

	$pill = new \Pill\Pill( $uri, APP_URL );

	$pill -> addCSS( 'assets/css/gotham/gotham.css' );
	$pill -> addCSS( 'assets/css/master.css' );

	$pill -> addJS( 'assets/js/script.js' );

	$pill -> meta( 'viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' );

	$pill -> render();

?>
