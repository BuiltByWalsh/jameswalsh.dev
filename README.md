# Portfolio

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge)

Built with React, Next.js, TailwindCSS, & Typescript.

## Setup

1. `pnpm i`

1. Create a `.env.local` and add the following:

   ```sh
   NEXT_PUBLIC_POSTHOG_KEY=<ph_project_api_key>
   NEXT_PUBLIC_POSTHOG_HOST=<ph_client_api_host>
   ```

## Dev

To start the development server:

```sh
pnpm i && pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) and take a look around.

## Testing

### Run unit tests

```sh
pnpm test:unit
```

### Run integration tests

```sh
npx playwright install
pnpm test:e2e:run
# or to run headed
pnpm test:e2e:open
```

## CI/CD 🚀

### Continous Integration

Powered by some basic build, lint, and test actions on Github.

### Continuous Development

This project is deployed using [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

[Checkout my portfolio running live](https://jameswalsh.dev).
