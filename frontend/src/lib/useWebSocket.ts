import { useEffect, useRef, useCallback } from 'react';
import { useAssignmentStore } from '@/store/assignmentStore';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:5000/ws';

export const useWebSocket = (assignmentId?: string) => {
  const ws = useRef<WebSocket | null>(null);
  const { updateAssignmentStatus, setWsProgress, fetchAssignment } = useAssignmentStore();

  const connect = useCallback(() => {
    if (ws.current?.readyState === WebSocket.OPEN) return;

    ws.current = new WebSocket(WS_URL);

    ws.current.onopen = () => {
      if (assignmentId && ws.current) {
        ws.current.send(JSON.stringify({ type: 'subscribe', assignmentId }));
      }
    };

    ws.current.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);

        if (msg.type === 'assignment_update' && msg.assignmentId) {
          setWsProgress(msg.progress || 0, msg.message || '');

          if (msg.status === 'completed') {
            updateAssignmentStatus(msg.assignmentId, 'completed');
            fetchAssignment(msg.assignmentId);
          } else if (msg.status === 'failed') {
            updateAssignmentStatus(msg.assignmentId, 'failed', { error: msg.error });
          } else {
            updateAssignmentStatus(msg.assignmentId, msg.status);
          }
        }
      } catch (_) {}
    };

    ws.current.onclose = () => {
      // Reconnect after 3s
      setTimeout(connect, 3000);
    };

    ws.current.onerror = () => {
      ws.current?.close();
    };
  }, [assignmentId, updateAssignmentStatus, setWsProgress, fetchAssignment]);

  useEffect(() => {
    connect();
    return () => {
      ws.current?.close();
    };
  }, [connect]);

  const subscribe = useCallback((id: string) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type: 'subscribe', assignmentId: id }));
    }
  }, []);

  return { subscribe };
};
