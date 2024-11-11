import { WebSocketServer } from 'ws';
import { Server } from 'http';
import { streamAsciiArt } from '../services/asciiService';

export function setupWebSocket(server: Server) {
  const wss = new WebSocketServer({ noServer: true });

  wss.on('connection', (ws, req) => {
    const fileId = req.url?.split('=')[1];
    if (fileId) {
      streamAsciiArt(ws, fileId);
    }
  });

  server.on('upgrade', (req, socket, head) => {
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit('connection', ws, req);
    });
  });
}
