import http from 'http';
import app from './app';
import { setupWebSocket } from './config/websocket';

const server = http.createServer(app);

// Setup WebSocket on the HTTP server
setupWebSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
