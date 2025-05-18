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
npm run build
flyctl deploy
```