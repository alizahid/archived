# API

## Dev

### Prerequisites

- Git
- Node

### Instructions

Start by cloning this repo and setting up the `.env` file. Run `cp .env.example .env` to create the `.env` file. You'll need to grab a key from [CoinMarketCap](https://pro.coinmarketcap.com).

Then install dependencies with `yarn`.

`yarn dev` will boot up the API.

## Test

I've included a [Paw](http://paw.cloud) file in the `assets` directory. Paw is like Postman for macOS. It has all the endpoints listed so you can just test them.

## Tech

I've built this with TypeScript, using `fastify` for the server and `axios` for data fetching.

I've also used `fluent-schema` for input and output validation. `fluent` is like Joi for Fastify.

## Endpoints

I've added two endpoints for the `/currencies` route and three for `/people`. CoinMarketCap doesn't have a search endpoint.

| Endpoint                    | Response                     |
| --------------------------- | ---------------------------- |
| `/currencies`               | Paginated list of currencies |
| `/currencies/id`            | Currency                     |
| `/people`                   | Paginated list of people     |
| `/people/id`                | Person                       |
| `/people/search?query=Luke` | List of people               |
