# easycv-pdf

Microservice for generating PDF documents from [easycv](https://www.easycv.vercel.app)

- express server
- pdfjs-dist for rendering pdfs
- canvas for creating png thumbnails from pdfs

## Usage

```bash
npm run start
```

## Docker

```bash
npm run build
npm run start:docker
```

## Deploy

```bash
cp .env.example .env
```

sign up for a fly.io account

create a new secret called `FLY_API_KEY` in the fly.io dashboard

copy the secret into the `.env` file

```bash
brew install flyctl
```

```bash
fly auth login
```

```bash
npm run build
flyctl deploy
```
