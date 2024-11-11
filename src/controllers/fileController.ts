import express, { Request, Response } from 'express';
import multer from 'multer';
import { storeAsciiArt } from '../services/asciiService';
import { generateUUID } from '../utils/uuid';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('file'), (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }

  const fileId = generateUUID();
  const interval = parseInt(req.body.interval, 10);
  const fileContent = req.file.buffer.toString();

  storeAsciiArt(fileId, fileContent, interval);
  res.json({ fileId });
});

export default router;
