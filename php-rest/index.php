<?php

include 'src/rest.php';

$api = new \Rest\Rest();

$api->get('/', function () use ($api) {
	return ['message' => 'Hello, world'];
});

$api->post('/', function () use ($api) {
	return $api->request->params();
});

$api->put('/', function () use ($api) {
	return $api->request->params();
});

$api->delete('/', function () use ($api) {
	return $api->request->params();
});

$api->json()->run();
