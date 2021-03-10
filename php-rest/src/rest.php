<?php

namespace Rest;

class Rest {
	private $uri;

	/**
	 * @var Route[]
	 */
	private $routes;
	/**
	 * @var Route
	 */
	private $route;

	/**
	 * @var Request
	 */
	public $request;
	/**
	 * @var Response
	 */
	public $response;

	/**
	 * @var Route
	 */
	private $e404;

	const regex = 'A-Za-z0-9\-,_';

	private $running = false;

	function __construct() {
		$this->routes = [];

		$this->e404 = new Route('/404', null, Request::METHOD_GET);

		$this->response = new Response();
	}

	function json() {
		$this->response->header('Content-Type', 'application/json');

		return $this;
	}

	private function add(Route $route) {
		$this->routes[] = $route;
	}

	/**
	 * @param string $uri
	 * @param object $callback
	 */
	function get($uri, $callback) {
		$this->any($uri, $callback, Request::METHOD_GET);
	}

	/**
	 * @param string $uri
	 * @param object $callback
	 */
	function post($uri, $callback) {
		$this->any($uri, $callback, Request::METHOD_POST);
	}

	/**
	 * @param string $uri
	 * @param object $callback
	 */
	function put($uri, $callback) {
		$this->any($uri, $callback, Request::METHOD_PUT);
	}

	/**
	 * @param string $uri
	 * @param object $callback
	 */
	function delete($uri, $callback) {
		$this->any($uri, $callback, Request::METHOD_DELETE);
	}

	/**
	 * @param string $uri
	 * @param object $callback
	 * @param string $method
	 */
	function any($uri, $callback, $method) {
		$route = new Route($uri, $callback, $method);

		$this->add($route);
	}

	function run() {
		if ($this->running) {
			return;
		}

		$this->running = true;

		// initialise

		$this->request = new Request($_SERVER['REQUEST_METHOD']);
		$this->uri = $this->request->parseUri($_SERVER['REQUEST_URI']);

		// sort

		usort($this->routes, function ($one, $two) {
			$pathOne = preg_replace('#:([' . Rest::regex . ']+)#', '$', $one->uri);
			$pathTwo = preg_replace('#:([' . Rest::regex . ']+)#', '$', $two->uri);

			return strlen($pathTwo) - strlen($pathOne);
		});

		// match

		foreach ($this->routes as $route) {
			if ($this->request->method !== $route->method) {
				continue;
			}

			if ($route->match($this->uri)) {
				$this->route = $route;

				break;
			}
		}

		// call

		if (is_null($this->route)) {
			$this->route = $this->e404;

			$this->response->status(404);
		} else {
			$path = parse_url($this->route->uri, PHP_URL_PATH);

			$pattern = preg_replace('#\:([' . Rest::regex . ']+)#', '([' . Rest::regex . ']+)', $path);

			preg_match_all('#:([' . Rest::regex . ']+)#', $this->route->uri, $keys);

			$keys = $keys[0];

			if (count($keys) > 0) {
				array_walk($keys, function ($value, $key) {
					$keys[$key] = ltrim($value, ':');

				});

				preg_match_all('#' . $pattern . '#', $this->uri, $values, PREG_SET_ORDER);
				array_shift($values[0]);

				$values = $values[0];

				$vars = array_combine($keys, $values);

				if (is_callable($this->route->callback)) {
					$this->response->body = call_user_func_array($this->route->callback, $vars);
				}
			} else {
				if (is_callable($this->route->callback)) {
					$this->response->body = call_user_func($this->route->callback);
				}
			}
		}

		if (!empty($this->response->headers)) {
			foreach ($this->response->headers as $header) {
				$header = sprintf('%s: %s', $header['name'], $header['value']);

				header($header);
			}
		}

		if (!is_null($this->response->body)) {
			if (gettype($this->response->body) === 'array') {
				$this->response->body = json_encode($this->response->body);
			}

			echo $this->response->body;
		}
	}
}

class Route {
	public $uri;
	public $callback;
	public $method;

	function __construct($uri, $callback, $method) {
		$this->uri = $uri;
		$this->callback = $callback;
		$this->method = $method;
	}

	function match($uri) {
		$path = parse_url($this->uri, PHP_URL_PATH);

		$pattern = preg_replace('#\:([' . Rest::regex . ']+)#', '([' . Rest::regex . ']+)', $path);

		if (substr($this->uri, -1) === '/') {
			$pattern .= '?';
		}

		if (preg_match('#^' . $pattern . '$#', $uri) == true) {
			return true;
		}

		return false;
	}
}

class Request {
	const METHOD_HEAD = 'HEAD';
	const METHOD_GET = 'GET';
	const METHOD_POST = 'POST';
	const METHOD_PUT = 'PUT';
	const METHOD_PATCH = 'PATCH';
	const METHOD_DELETE = 'DELETE';
	const METHOD_OPTIONS = 'OPTIONS';
	const METHOD_OVERRIDE = '_METHOD';

	public $method;

	function __construct($method) {
		$method = 'self::METHOD_' . strtoupper($method);

		$this->method = constant($method);
	}

	function parseUri($uri) {
		$uri = parse_url($uri, PHP_URL_PATH);

		return substr($uri, strlen(dirname($_SERVER['SCRIPT_NAME'])));
	}

	/**
	 * @return array
	 */
	function params() {
		if ($this->method == Request::METHOD_GET) {
			$data = $_GET;
		} elseif ($this->method == Request::METHOD_POST) {
			$data = array_merge($_POST, $_FILES);
		} else {
			$data = '';

			$input = fopen('php://input', 'r');

			while ($byte = fread($input, 1024)) {
				$data .= $byte;
			}

			if ($this->json()) {
				$data = json_decode($data, true);
			} else {
				$data = explode('&', $data);

				foreach ($data as $key => $value) {
					$param = explode('=', $value);

					$data[urldecode($param[0])] = urldecode($param[1]);

					unset($data[$key]);
				}
			}

			$data = array_merge($data, $_FILES);
		}

		return $data;
	}

	/**
	 * @return array|false
	 */
	function headers() {
		return getallheaders();
	}

	/**
	 * @param $name
	 * @return string|null
	 */
	function header($name) {
		$name = strtolower($name);

		$headers = $this->headers();

		foreach ($headers as $key => $value) {
			if (strtolower($key) === $name) {
				return $value;
			}
		}

		return null;
	}

	private function json() {
		return $this->header('Content-Type') === 'application/json';
	}
}

class Response {
	public $headers;
	public $body;

	static $messages = [
		//	Informational 1xx
		100 => '100 Continue',
		101 => '101 Switching Protocols',

		//	Successful 2xx
		200 => '200 OK',
		201 => '201 Created',
		202 => '202 Accepted',
		203 => '203 Non-Authoritative Information',
		204 => '204 No Content',
		205 => '205 Reset Content',
		206 => '206 Partial Content',

		//	Redirection 3xx
		300 => '300 Multiple Choices',
		301 => '301 Moved Permanently',
		302 => '302 Found',
		303 => '303 See Other',
		304 => '304 Not Modified',
		305 => '305 Use Proxy',
		306 => '306 (Unused)',
		307 => '307 Temporary Redirect',

		//	Client Error 4xx
		400 => '400 Bad Request',
		401 => '401 Unauthorized',
		402 => '402 Payment Required',
		403 => '403 Forbidden',
		404 => '404 Not Found',
		405 => '405 Method Not Allowed',
		406 => '406 Not Acceptable',
		407 => '407 Proxy Authentication Required',
		408 => '408 Request Timeout',
		409 => '409 Conflict',
		410 => '410 Gone',
		411 => '411 Length Required',
		412 => '412 Precondition Failed',
		413 => '413 Request Entity Too Large',
		414 => '414 Request-URI Too Long',
		415 => '415 Unsupported Media Type',
		416 => '416 Requested Range Not Satisfiable',
		417 => '417 Expectation Failed',
		422 => '422 Unprocessable Entity',
		423 => '423 Locked',

		//	Server Error 5xx
		500 => '500 Internal Server Error',
		501 => '501 Not Implemented',
		502 => '502 Bad Gateway',
		503 => '503 Service Unavailable',
		504 => '504 Gateway Timeout',
		505 => '505 HTTP Version Not Supported',
	];

	function __construct() {
		$this->headers = [];

		$this->body = null;
	}

	/**
	 * @param string $name
	 * @param string $value
	 */
	function header($name, $value) {
		$this->headers[] = ['name' => $name, 'value' => $value];
	}

	/**
	 * @param string $uri
	 * @param int $code
	 */
	function redirect($uri, $code = 302) {
		header('Location: ' . $uri, true, $code);
	}

	/**
	 * @param int $code
	 */
	function status($code) {
		if (isset(self::$messages[$code])) {
			header($_SERVER['SERVER_PROTOCOL'] . ' ' . self::$messages[$code]);
		}
	}
}
