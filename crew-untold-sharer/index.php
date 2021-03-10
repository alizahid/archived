<?php

if (!$_SERVER['REDIRECT_URL']) {
	header('Location: http://crewuntold.com/');

	exit();
}

date_default_timezone_set('Asia/Dubai');

const TOKEN = 'f2a879d6a69a2625a61d6f049931c4533f29303812524284d57f4c94543c4484';

function pretty_time($time) {
	$time = strtotime($time);

	return date('H:i \o\n d.m.Y', $time);
}

$id = array_pop(explode('/', $_SERVER['REDIRECT_URL']));

if (strlen($id) !== 24) {
	header('Location: http://crewuntold.com/');

	exit();
}

$url = "https://app.crewuntold.com/s/$id";

$cache = "cache/$id.json";

if (!file_exists($cache) || time() > filemtime($cache) + 24 * 60 * 60) {
	$options = array(
		'http' => array(
			'method' => 'GET',
			'header' => 'token: ' . TOKEN
		)
	);

	$context = stream_context_create($options);

	$file = file_get_contents("https://api.crewuntold.com/v1/posts/$id", false, $context);

	file_put_contents($cache, $file);
} else {
	$file = file_get_contents($cache);
}

$post = json_decode($file)->post;

$themes = array(
	'linear-gradient(to right bottom, rgb(118, 94, 230), rgb(28, 159, 255))',
	'linear-gradient(to right bottom, rgb(232, 79, 83), rgb(235, 189, 148))',
	'linear-gradient(to right bottom, rgb(149, 77, 176), rgb(113, 89, 240))',
	'linear-gradient(to right bottom, rgb(81, 160, 62), rgb(170, 223, 93))',
	'linear-gradient(to right bottom, rgb(85, 141, 235), rgb(83, 210, 229))'
);

$theme = $themes[array_rand($themes)];

?>
<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
	<title>Crew Untold</title>
	<meta name="description" content="Crew Untold - The untold stories of air stewards everywhere">
	<meta property="og:title" content="<?=$post->body?>">
	<meta property="og:description" content="Crew Untold - The untold stories of air stewards everywhere">
	<meta property="og:image" content="https://app.crewuntold.com/s/assets/facebook-share.png">
	<meta property="og:url" content="<?=$url?>">
	<meta property="og:type" content="website">
	<style>
		*, *:after, *:before {
			border-radius: 0;
			box-sizing: border-box;
			font-weight: normal;
			margin: 0;
			outline: none;
			padding: 0;
			-webkit-user-select: none;
			   -moz-user-select: none;
			    -ms-user-select: none;
			        user-select: none;
			-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		}

		body {
			-webkit-box-align: center;
			    -ms-flex-align: center;
			        align-items: center;
			color: #fff;
			cursor: default;
			display: -webkit-box;
			display: -ms-flexbox;
			display: flex;
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			    -ms-flex-direction: column;
			        flex-direction: column;
			font: normal 0.875em/1 -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
			-webkit-box-pack: center;
			    -ms-flex-pack: center;
			        justify-content: center;
			min-height: 100vh;
			padding: 2em;
		}

		main {
			max-width: 40em;
			width: 100%;
		}

		header, section, footer {}

		header {
			padding: 1em;
		}

		header h1 {
			font-size: 1em;
			text-align: center;
		}

		section {
			border-bottom: 1px solid rgba(0, 0, 0, 0.05);
			border-top: 1px solid rgba(0, 0, 0, 0.05);
			padding: 1em;
		}

		section p {
			font-size: 2em;
			line-height: 1.2;
			word-break: break-word;
		}

		section aside {
			display: -webkit-box;
			display: -ms-flexbox;
			display: flex;
			margin-top: 1em;
		}

		section aside div {
			-webkit-box-align: center;
			    -ms-flex-align: center;
			        align-items: center;
			display: -webkit-box;
			display: -ms-flexbox;
			display: flex;
		}

		section aside div:before {
			background-position: center;
			background-repeat: no-repeat;
			background-size: cover;
			content: '';
			-webkit-filter: invert(1);
			        filter: invert(1);
			height: 1em;
			margin-right: 0.5em;
			width: 1em;
		}

		section aside div.hearts:before {
			background-image: url('assets/like.png');
		}

		section aside div.tag:before {
			background-image: url('assets/tag.png');
		}

		section aside div.time:before {
			background-image: url('assets/time.png');
		}

		footer {
			display: -webkit-box;
			display: -ms-flexbox;
			display: flex;
			-webkit-box-pack: center;
			    -ms-flex-pack: center;
			        justify-content: center;
		}

		footer a {
			background-position: center;
			background-repeat: no-repeat;
			background-size: 1em;
			height: 1em;
			padding: 1.5em;
			width: 1em;
		}

		footer a.facebook {
			background-image: url('assets/facebook.png');
			-webkit-filter: invert(1);
			        filter: invert(1);
		}

		footer a.twitter {
			background-image: url('assets/twitter.png');
			-webkit-filter: invert(1);
			        filter: invert(1);
		}

		footer a.app-store {
			background-image: url('assets/app-store.png');
		}

		footer a.google-play {
			background-image: url('assets/google-play.png');
		}

		@media (max-width: 600px) {
			body {
				background: <?=$theme?>;
				padding: 0;
				text-align: center;
			}

			section {
				margin: 2em 0;
			}

			section aside {
				-webkit-box-align: center;
				    -ms-flex-align: center;
				        align-items: center;
				-webkit-box-orient: vertical;
				-webkit-box-direction: normal;
				    -ms-flex-direction: column;
				        flex-direction: column;
			}

			section aside div:not(:first-child) {
				margin-top: 1em;
			}
		}

		@media (min-width: 600px) {
			main {
				background: <?=$theme?>;
			}

			section aside div:not(:first-child) {
				margin-left: 2em;
			}
		}
	</style>
</head>

<body>
	<main>
		<header>
			<h1>Crew Untold</h1>
		</header>
		<section>
			<p><?=$post->body?></p>
			<aside>
				<div class="hearts"><?=$post->hearts?></div>
				<div class="tag"><?=$post->tag?></div>
				<div class="time"><?=pretty_time($post->created)?></div>
			</aside>
		</section>
		<footer>
			<a href="http://www.facebook.com/sharer.php?t=<?=urlencode($post->body)?>&amp;u=<?=$url?>" class="facebook"></a>
			<a href="http://twitter.com/share?text=<?=urlencode($post->body)?>&amp;url=<?=$url?>&amp;hashtags=crewuntold" class="twitter"></a>
			<a href="https://itunes.apple.com/us/app/crew-untold/id1231022491?mt=8" class="app-store"></a>
			<a href="https://play.google.com/store/apps/details?id=com.crewuntold&hl=en" class="google-play"></a>
		</footer>
	</main>
</body>

</html>
