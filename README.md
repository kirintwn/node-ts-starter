# Boilerplate

The Boilerplate is a professional backend template for building fast, robust, and adaptable TypeScript Application.

## Quick start

1. Clone the git repo
2. Install dependencies with: `npm ci`
3. Build & start the server with: `npm start`

### Advanced scripts

- `npm test`: run tests
- `npm run lint`: lint with auto-fixing
- `npm run typecheck`: typecheck with tsc (without building the code)
- `npm run build`: build without execution
- `npm run dev`: dev with hot reloading (provided by [`nodemon`](https://github.com/remy/nodemon) & [`ts-node`](https://github.com/TypeStrong/ts-node))

## Features

- Production ready. Use newest features without worrying about any incompatibility.
- Hierarchical config with [`nconf`](https://github.com/indexzero/nconf)
- Logging elegantly with [`winston`](https://github.com/winstonjs/winston)
- Testing with [`Jest`](https://github.com/facebook/jest)
- Lint the code with airbnb based [`ESLint`](https://github.com/eslint/eslint) config & [`Prettier`](https://github.com/prettier/prettier)
- Code quality protection by linting with git hook
