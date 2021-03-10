<?php

	date_default_timezone_set( 'Asia/Karachi' );

	define( 'APP_URL', '/pill' );

	define( 'APP_DIR', substr( __DIR__, 0, -9 ) );

	define( 'APP_TITLE', 'Dubai Healtcare City Authority' );

	define( 'YEAR', ( date('n') > 10 ? date('Y') + 1 : date('Y') ) );

?>
