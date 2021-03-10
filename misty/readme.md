# Misty

World of Warcraft guild on Magtheridon EU

[View on Battle.net](http://eu.battle.net/wow/en/guild/magtheridon/Misty)

You're welcome to fork this repository and create your own World of Warcraft guild website based on this template. It's incredibly easy to modify and use

## Prerequisites

1. [Git](http://git-scm.com)
2. [Node.js](http://nodejs.org)
3. [Yarn](https://yarnpkg.com)

### .env

For [Battle.net API](https://dev.battle.net) and FTP deployment to work, you need to setup your `.env` file

    BATTLENET_API_KEY=

    FTP_HOST=
    FTP_USER=
    FTP_PASSWORD=

## Start

1. `yarn install`
2. `yarn start`

## Deployment

If you have your `.env` setup, just run

	yarn deploy

It's smart; it'll only upload the files changed since the last deployment

## Scripts

There's a few included Node scripts to help you setup your website

### Guild

Gets your guild roster from the World of Warcraft Armory

#### Usage

	yarn guild <args>

Sample usage

	yarn guild --name Misty --realm Magtheridon --server EU --ranks 0 1 2 3 --leadership 0 --pretty

View all options by passing `--help`

	yarn guild --help

## Author

- [Ali Zahid](https://designplox.com)
