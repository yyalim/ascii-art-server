import { Request, Response } from 'express';

export default function errorHandler(err: Error, req: Request, res: Response) {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
}
