<?php

	namespace Pill;

	class PillBase
	{
		private $includes;
		private $meta;

		const INCLUDE_TYPE_ALL = 'all';
		const INCLUDE_TYPE_CSS = 'css';
		const INCLUDE_TYPE_JS = 'js';

		function __construct()
		{
			$this -> includes = array( PillBase::INCLUDE_TYPE_CSS => array(), PillBase::INCLUDE_TYPE_JS => array() );

			$this -> meta = array();
		}

		function includes( $type = PillBase::INCLUDE_TYPE_ALL )
		{
			if ( $type == PillBase::INCLUDE_TYPE_ALL )
			{
				return $this -> includes;
			}

			return $this -> includes[$type];
		}

		function addCSS( $href, $media = 'screen' )
		{
			if ( strpos( $href, '://' ) == false )
			{
				$href = APP_URL . '/' . $href;
			}

			array_push( $this -> includes[PillBase::INCLUDE_TYPE_CSS], new CSS( $href, $media ) );
		}

		function addJS( $src )
		{
			if ( strpos( $src, '://' )=== false )
			{
				$src = APP_URL . '/' . $src;
			}

			array_push( $this -> includes[PillBase::INCLUDE_TYPE_JS], new JS( $src ) );
		}

		function meta( $name = null, $content = null )
		{
			if ( is_null( $name ) && is_null( $content ) )
			{
				return $this -> meta;
			}
			elseif ( is_null( $content ) )
			{
				return $this -> meta[$name];
			}
			else
			{
				$this -> meta[$name] = new Meta( $name, $content );
			}
		}
	}

	class Pill extends PillBase
	{
		public $uri;

		private $template;
		private $controller;
		private $view;

		function __construct( $uri )
		{
			parent::__construct();

			$this -> uri = substr( $uri, strlen( APP_URL ) );

			$this -> template = APP_DIR . '/includes/template.php';
		}

		function controller()
		{
			if ( is_null( $this -> controller ) )
			{
				$path = APP_DIR . '/controllers' . $this -> uri . ( $this -> uri == '/' ? 'index.php' : '.php' );

				if ( !file_exists( $path ) )
				{
					$path = str_replace( '.php', '/index.php', $path );
				}

				$this -> controller = new Controller( $path );
			}

			return $this -> controller;
		}

		function view()
		{
			if ( is_null( $this -> view ) )
			{
				$path = APP_DIR . '/views' . $this -> uri . ( $this -> uri == '/' ? 'index.php' : '.php' );

				if ( !file_exists( $path ) )
				{
					$path = str_replace( '.php', '/index.php', $path );
				}

				$this -> view = new View( $path );
			}

			return $this -> view;
		}

		function render()
		{
			include( $this -> template );
		}
	}

	class Controller extends PillBase
	{
		var $path;

		var $title;

		function __construct( $path )
		{
			parent::__construct();

			$this -> path = $path;
		}

		function invoke()
		{
			if ( file_exists( $this -> path ) )
			{
				include_once $this -> path;
			}
		}

		function title( $title = null )
		{
			if ( !is_null( $title ) )
			{
				$this -> title = $title;
			}
			else
			{
				if ( empty( $this -> title ) )
				{
					return APP_TITLE;
				}
				else
				{
					return $this -> title;
				}
			}
		}
	}

	class View
	{
		var $path;

		function __construct( $path )
		{
			$this -> path = $path;
		}

		function render()
		{
			if ( file_exists( $this -> path ) )
			{
				include_once $this -> path;
			}
			else
			{
				include_once APP_DIR . '/views/404.php';
			}
		}
	}

	class CSS
	{
		var $href;
		var $media;

		function __construct( $href, $media = 'screen' )
		{
			$this -> href = $href;
			$this -> media = $media;
		}
	}

	class JS
	{
		var $src;

		function __construct( $src )
		{
			$this -> src = $src;
		}
	}

	class Meta
	{
		var $name;
		var $content;

		function __construct( $name, $content )
		{
			$this -> name = $name;
			$this -> content = $content;
		}
	}

?>
