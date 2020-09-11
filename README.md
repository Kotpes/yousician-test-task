## Intro

Have been wanting to try [Next.js](https://nextjs.org/) and this test task felt like a perfect opportunity do take it into use. The befenits are server-side rendered html page with initial data from the server. The app can also be deployed to [Vercel](https://vercel.com) and served to a user from a closest server of their edge network.

The project has been bootstrapped with [create-next-app](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
```

Then, the api server:

```bash
yarn start-api
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## What's working

- songs are fetched from API
- search is working
- filters are working
- site is responsive
- songs can be added/removed from favorites
- infinite scroll

## What's not working (mostly due to limited time)

- no loading spinner (just ...Loading text)
- infinite scroll's not working when something's searched or filters selected
- test coverage could be better
