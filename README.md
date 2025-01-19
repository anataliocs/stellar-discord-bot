<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) TypeScript Discord Bot for the [Stellar Development Foundation](https://stellar.org/).

Check out the Discord here [Stellar Discord](https://discord.com/invite/zVYdY3ktTn).

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Docker

Build image locally
```
docker build --platform linux/amd64 -t stellar-discord-bot .
```

Push to DockerHub
``` 
docker tag stellar-discord-bot:latest chrisstellar/stellar-discord-bot:latest
docker push chrisstellar/stellar-discord-bot:latest
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
