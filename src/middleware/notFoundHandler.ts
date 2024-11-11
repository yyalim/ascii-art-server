import { Request, Response } from 'express';

export default function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({ error: 'Page not found' });
}
