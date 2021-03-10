# Jado Pado API

[Demo](https://jado-pado-api.herokuapp.com/)

## Prerequisites

- [Git](http://git-scm.com/)
- [Node.js](http://nodejs.org/) (with NPM)

## Installation

- `git clone <repository-url>` this repository
- `cd jado-pado-api`
- `npm install`

## Running

- `npm run dev`
- Open [http://localhost:3000](http://localhost:3000)

## Building

- `npm run build`

## Configuration variables

	AUTHY_API_KEY=<API key from Authy dashboard>
	AUTHY_API_URL=https://api.authy.com
	AUTHY_ONETOUCH_CALLBACK_URL=<Must point to /one-touch/callback and set in Authy OneTouch settings>
	MONGO_URL=<Compose or local URL>
