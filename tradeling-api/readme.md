# Tradeling api

## Run

### Prerequisites

- Node
- Yarn
- Redis

### Steps

1. `git clone https://github.com/alizahid/tradeling-api`
2. `cd tradeling-api`
3. `yarn`
4. Populate `.env` from `.env.example`
5. `yarn dev`
6. Open in REST client [http://localhost:3030/api](http://localhost:3000/api)

## Test

`yarn test`

## Stack

This app is built with Express and TypeScript, and uses Redis for caching. Tests are written with AVA and code coverage generated with NYC.
