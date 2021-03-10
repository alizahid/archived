<?php

	$this -> controller() -> invoke();

?>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<?php

	foreach ( array_merge( $this -> meta(), $this -> controller() -> meta() ) as $meta )
	{
		printf( '		<meta name="%s" content="%s">', $meta -> name, $meta -> content );

		echo PHP_EOL;
	}

?>
		<title><?= $this -> controller() -> title() ?></title>		
<?php

	foreach ( array_merge( $this -> includes( self::INCLUDE_TYPE_CSS ), $this -> controller() -> includes( self::INCLUDE_TYPE_CSS ) ) as $css )
	{
		printf( '		<link rel="stylesheet" media="%s" href="%s">', $css -> media, $css -> href );

		echo PHP_EOL;
	}

?>
	</head>

	<body>
		<header>
			<h1>Pill</h1>
			<h2>A controller-view framework for PHP</h2>
		</header>
		<nav>
			<ul>
				<li>
					<a href="<?= APP_URL ?>">Home</a>
				</li>
				<li>
					<a href="<?= APP_URL ?>/about">About</a>
				</li>
				<li>
					<a href="<?= APP_URL ?>/download">Download</a>
				</li>
				<li>
					<a href="<?= APP_URL ?>/docs">Docs</a>
				</li>
			</ul>
		</nav>
		<section>
<?php

	$this -> view() -> render();

?>
		</section>
		<footer>
			&copy; <?= YEAR ?> / Powered by Ali Zahid
		</footer>
	</body>

<?php

	foreach ( array_merge( $this -> includes( self::INCLUDE_TYPE_JS ), $this -> controller() -> includes( self::INCLUDE_TYPE_JS ) ) as $js )
	{
		printf( '	<script type="text/javascript" src="%s"></script>', $js -> src );

		echo PHP_EOL;
	}

?>
</html>
