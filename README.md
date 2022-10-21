# Express API with session based authenticated. Powered by Prisma and Postgres database.

### Features
- Feature based architecture
- Session based authentication
- Redis session store
- Prisma for querying
- Logging with winston and morgan
- Request validations
- Dependency injection with tsyringe
- Testing with Jest and Supertest

### Run in development mode
```
yarn install
yarn migrate
yarn watch
```

### Run in production mode
```
yarn install
// setup production db and run migrations
yarn build
yarn serve
```

### Run tests
```
yarn install
yarn migrate-test
yarn test
```
