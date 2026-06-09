import { useEffect } from 'react';

export function useKeyboard({ onSpace, onEscape, onClear, onSettings, onCopy, onExport }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is typed in an input or textarea
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        if (e.key === 'Escape') {
            e.target.blur();
        }
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        onSpace?.();
      } else if (e.key === 'Escape') {
        onEscape?.();
      } else if (e.ctrlKey) {
        if (e.key.toLowerCase() === 'l') {
          e.preventDefault();
          onClear?.();
        } else if (e.key.toLowerCase() === 'k') {
          e.preventDefault();
          onSettings?.();
        } else if (e.key.toLowerCase() === 'c') {
          // Let default COPY happen if user highlighted text
          if (!window.getSelection().toString()) {
            e.preventDefault();
            onCopy?.();
          }
        } else if (e.key.toLowerCase() === 'e') {
          e.preventDefault();
          onExport?.();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSpace, onEscape, onClear, onSettings, onCopy, onExport]);
}
