import { useEffect, useRef, useState } from 'react';

const useWebSocket = (url: string): {
  socket: WebSocket | null;
  isConnected: boolean;
  message: string | null;
  sendWebSocketMessage: (message: string) => void;
} => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Create a new WebSocket instance
    socketRef.current = new WebSocket(url);

    // Set the socket state and handle connection status
    setSocket(socketRef.current);
    setIsConnected(true);

    // WebSocket event listeners
    socketRef.current.onopen = () => {
      setIsConnected(true);
    };

    socketRef.current.onmessage = (event) => {
      setMessage(event.data);
    };

    socketRef.current.onclose = () => {
      setIsConnected(false);
    };

    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Clean up the WebSocket connection
    return () => {
      socketRef.current?.close();
    };
  }, [url]);

  const sendWebSocketMessage = (message: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    }
  };

  return { socket, isConnected, message, sendWebSocketMessage };
};

export default useWebSocket;