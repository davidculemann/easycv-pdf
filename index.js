import { createCanvas } from "canvas";
import cors from "cors";
import express from "express";
import pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";

const app = express();
app.use(express.raw({ type: "application/pdf", limit: "10mb" }));

const allowedOrigins = ["https://easycv.vercel.app", "http://localhost:3000", "https://localhost:3000"];

app.use(
	cors({
		origin: function (origin, callback) {
			if (!origin) return callback(null, true);
			if (allowedOrigins.includes(origin)) {
				return callback(null, true);
			} else {
				return callback(new Error("Not allowed by CORS"));
			}
		},
	}),
);

app.use((req, res, next) => {
	const apiKey = process.env.FLY_API_KEY;
	if (!apiKey) return next();
	if (req.headers["x-api-key"] === apiKey) {
		return next();
	}
	res.status(403).json({ error: "Forbidden" });
});

app.post("/generate-thumbnail", async (req, res) => {
	try {
		const pdfData = new Uint8Array(req.body);
		const loadingTask = pdfjsLib.getDocument({ data: pdfData });
		const pdfDocument = await loadingTask.promise;

		const page = await pdfDocument.getPage(1);
		const scale = 0.6;
		const viewport = page.getViewport({ scale });

		const canvas = createCanvas(viewport.width, viewport.height);
		const context = canvas.getContext("2d");

		await page.render({
			canvasContext: context,
			viewport: viewport,
		}).promise;

		const pngBuffer = canvas.toBuffer("image/png");

		res.set("Content-Type", "image/png");
		res.send(pngBuffer);
	} catch (err) {
		console.error("Render error:", err);
		res.status(500).json({ error: "Failed to render PDF" });
	}
});

app.get("/healthz", (_req, res) => res.send("OK"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`PDF thumbnail service listening on port ${PORT}`);
});
