import { useMemo, useEffect } from 'react';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';

export function useYjsProvider(roomName) {
  const ydoc = useMemo(() => new Y.Doc(), []);
  const provider = useMemo(() => new WebrtcProvider(roomName, ydoc), [roomName]);

  useEffect(() => {
    return () => {
      provider?.destroy();
      ydoc?.destroy();
    };
  }, [provider, ydoc]);

  return { ydoc, provider };
}
