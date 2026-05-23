import { WebSocket, WebSocketServer } from 'ws';
import { Server } from 'http';

interface WSClient {
  ws: WebSocket;
  assignmentId?: string;
}

const clients = new Map<string, WSClient>();

export const initWebSocket = (server: Server) => {
  const wss = new WebSocketServer({ server, path: '/ws' });

  wss.on('connection', (ws, req) => {
    const clientId = Math.random().toString(36).slice(2);
    clients.set(clientId, { ws });

    console.log(`WS client connected: ${clientId}`);

    ws.on('message', (data) => {
      try {
        const msg = JSON.parse(data.toString());
        if (msg.type === 'subscribe' && msg.assignmentId) {
          const client = clients.get(clientId);
          if (client) {
            client.assignmentId = msg.assignmentId;
            clients.set(clientId, client);
          }
          ws.send(JSON.stringify({ type: 'subscribed', assignmentId: msg.assignmentId }));
        }
      } catch (_) {}
    });

    ws.on('close', () => {
      clients.delete(clientId);
      console.log(`WS client disconnected: ${clientId}`);
    });

    ws.send(JSON.stringify({ type: 'connected', clientId }));
  });

  return wss;
};

export const notifyAssignmentUpdate = (assignmentId: string, data: object) => {
  clients.forEach((client) => {
    if (client.assignmentId === assignmentId && client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(JSON.stringify({ type: 'assignment_update', assignmentId, ...data }));
    }
  });
};
