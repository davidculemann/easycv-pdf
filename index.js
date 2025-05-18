import { createCanvas } from 'canvas';
import express from 'express';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.js';

const app = express();
app.use(express.raw({ type: 'application/pdf', limit: '10mb' })); 

app.post('/render', async (req, res) => {
  try {
    const pdfData = req.body;
    const loadingTask = pdfjsLib.getDocument({ data: pdfData });
    const pdfDocument = await loadingTask.promise;

    const page = await pdfDocument.getPage(1);
    const viewport = page.getViewport({ scale: 1.0 });

    const canvas = createCanvas(viewport.width, viewport.height);
    const context = canvas.getContext('2d');

    await page.render({
      canvasContext: context,
      viewport: viewport
    }).promise;

    const pngBuffer = canvas.toBuffer('image/png');

    res.set('Content-Type', 'image/png');
    res.send(pngBuffer);

  } catch (err) {
    console.error('Render error:', err);
    res.status(500).json({ error: 'Failesd to render PDF' });
  }
});

app.get('/healthz', (_req, res) => res.send('OK'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`PDF thumbnail service listening on port ${PORT}`);
});
