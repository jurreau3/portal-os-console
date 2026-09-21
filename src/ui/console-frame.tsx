import { useEffect, useRef } from 'react';
import { createPortalScene } from '../core/portal';
import './styles.css';

export function ConsoleFrame() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = createPortalScene(mount, {
      title: 'BE-MAX',
      baseColor: '#6ee7ff',
      glowColor: '#2ae8ff',
    });

    return () => {
      scene.dispose();
    };
  }, []);

  return <div className="be-max-portal-frame"><div ref={mountRef} className="be-max-canvas" /></div>;
}
