import { WebSocket } from 'ws';
import { AsciiArt } from '../types/AsciiArt';
import { AsciiMessage } from '../types/AsciiMessage';

const asciiArts: Map<string, AsciiArt> = new Map();

export function storeAsciiArt(
  fileId: string,
  fileContent: string,
  interval: number,
) {
  asciiArts.set(fileId, { fileContent, interval });
}

export function streamAsciiArt(ws: WebSocket, fileId: string) {
  const NEW_LINE_DELIMITER = /(?=\n)/; // regex to split new lines without without excluding newline

  const asciiArt = asciiArts.get(fileId);
  if (!asciiArt) {
    ws.close(1000, 'File not found');
    return;
  }

  const lines = asciiArt.fileContent.split(NEW_LINE_DELIMITER);
  let lineIndex = 0;

  const interval = setInterval(() => {
    if (lineIndex < lines.length) {
      const percentage = ((lineIndex + 1) / lines.length) * 100;
      const message: AsciiMessage = { line: lines[lineIndex++], percentage };
      ws.send(JSON.stringify(message));
    } else {
      ws.close(1000, 'Transmission complete');
      clearInterval(interval);
      asciiArts.delete(fileId);
    }
  }, asciiArt.interval);

  ws.on('close', () => {
    clearInterval(interval);
    asciiArts.delete(fileId);
  });
}
