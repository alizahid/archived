# PHP Rest

A very light-weight REST library written in PHP

## Installation

Include the `src/rest.php` file into your code

	include 'src/rest.php';

And create the REST object

	$api = new \Rest\Rest();

## Examples

You can find examples [here](https://github.com/alizahid/php-rest/blob/master/index.php)

	$api->get('/', function () {
		return 'Hello, world!';
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

## API

Methods on your `$api` object

Method | Description
------ | -----------
`json` | Convenience method that sets the JSON response header
`run` | Call at the end of your code to run your app

### Request

Accessible from your `$api` object: `$api->request`

Method | Return | Parameters | Description
------ | ------ | ---------- | -----------
`params` | `array` | - | Returns all request parameters as key-value pairs
`headers` | `array` | - | Returns all request headers as key-value pairs
`header` | `string` | `string $name` | Returns value of request header if present, else `null`

### Response

Accessible from your `$api` object: `$api->response`

Method | Parameters | Description
------ | ---------- | -----------
`header` | `string $name`, `string $value` | Sets response header as `$key: $value`
`redirect` | `string $uri`, `int $code` | Redirects to `$uri`, setting `$code` as status code if present, else `302`
`status` | `int $code` | Sets status code with message if [valid](https://developer.mozilla.org/en-US/docs/Web/HTTP/Response_codes)
