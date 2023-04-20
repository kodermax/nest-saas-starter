<img src="https://api.codiga.io/project/36143/score/svg"/><img src="https://api.codiga.io/project/36143/status/svg"/>

# Nest Monorepo SaaS Starter

## What's inside?

This turborepo uses [Yarn](https://classic.yarnpkg.com/) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `main`: a [Next.js](https://nextjs.org/) app
- `tenant`: a [Next.js](https://nextjs.org/) app
- `backend`: another [Nest.js](https://nestjs.org/) app
- `strapi`: [Strapi](https://strapi.io)
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
yarn run build
```

### Develop

To develop all apps and packages, run the following command:

```
yarn run dev
```
