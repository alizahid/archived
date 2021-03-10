# Fumblr

Tumblr is removing adult content from their platform on December 17. You can use Fumblr to download a blog and all its content to your computer.

Stop judging and get to work!

## Dependencies

1. You need to have [Node](https://nodejs.org/en/), [Yarn](https://yarnpkg.com/lang/en/), and Git installed
2. Clone this repo with `git clone https://github.com/alizahid/fumblr`
3. Install dependencies with `yarn`

## Authentication

1. You need to register an OAuth app [on Tumblr](https://www.tumblr.com/oauth/apps)
2. Head over to [Tumblr console](https://api.tumblr.com/console) and authenticate with the consumer key and secret from the app you just registered
3. Once authenticated with console, click _Show keys_ on the top right and you'll see all your keys
4. Update `.env.example` with the correct values and rename it to `.env`

## Usage

- To download a blog, run Fumblr with `yarn fetch --name BLOG_NAME` and wait for it to finish
- To download all blogs you follow, run Fumblr with `yarn --following` and wait for it to finish

## Tips

- You can tweak with `CONCURRENCY` to make it download images and videos faster. But I've found 4 to be a number that works for me well
- When you view a blog, you can press the left and right arrow keys to navigate between posts
