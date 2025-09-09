import { useEffect, useRef, useState, useCallback } from 'react';
import { baseUrl } from '../base';

// Long-polling hook for notifications
// - Calls notifications/long-polling/ to wait for changes
// - On 200, triggers fetch of notifications via provided callback
// - On 204, loops again immediately
// - On network/error, backs off with exponential delay
export const useLongPollingNotifications = (onUpdate) => {
  const isActiveRef = useRef(false);
  const abortControllerRef = useRef(null);
  const [isPolling, setIsPolling] = useState(false);
  const [lastStatus, setLastStatus] = useState(null);

  const startPolling = useCallback(() => {
    if (isActiveRef.current) return;
    isActiveRef.current = true;
    loop();
  }, []);

  const stopPolling = useCallback(() => {
    isActiveRef.current = false;
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsPolling(false);
  }, []);

  const loop = useCallback(async () => {
    if (!isActiveRef.current) return;

    const token = localStorage.getItem('token');
    if (!token) {
      setLastStatus('no_token');
      setIsPolling(false);
      return;
    }

    setIsPolling(true);
    let attempt = 0;

    while (isActiveRef.current) {
      try {
        abortControllerRef.current = new AbortController();
        const response = await fetch(`${baseUrl}notifications/long-polling/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
          signal: abortControllerRef.current.signal,
        });

        setLastStatus(response.status);

        if (response.status === 200) {
          // There is an update, trigger refresh
          if (typeof onUpdate === 'function') {
            await onUpdate();
          }
          attempt = 0; // reset backoff
          continue; // immediately wait for next change
        }

        if (response.status === 204) {
          // No updates; immediately continue waiting
          attempt = 0;
          continue;
        }

        // For other status codes, backoff
        attempt += 1;
        const delayMs = Math.min(30000, 1000 * Math.pow(2, attempt));
        await new Promise((r) => setTimeout(r, delayMs));
      } catch (error) {
        if (error?.name === 'AbortError') {
          // Stopped
          return;
        }
        attempt += 1;
        const delayMs = Math.min(30000, 1000 * Math.pow(2, attempt));
        await new Promise((r) => setTimeout(r, delayMs));
      } finally {
        abortControllerRef.current = null;
      }
    }
  }, [onUpdate]);

  useEffect(() => {
    return () => {
      stopPolling();
    };
  }, [stopPolling]);

  return { startPolling, stopPolling, isPolling, lastStatus };
};

export default useLongPollingNotifications;


