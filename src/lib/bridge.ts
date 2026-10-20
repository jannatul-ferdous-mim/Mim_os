// When MimOS runs inside the 3D scene's <iframe>, the parent page cannot see
// our mouse and keyboard events. The scene listens for postMessage calls of
// the shape { type, clientX, clientY, key } and re-dispatches them on the
// iframe, which keeps the camera on the monitor and plays the keyboard and
// mouse sounds. This forwards exactly those events.

const FORWARDED = ['mousemove', 'mousedown', 'mouseup', 'keydown', 'keyup'] as const;

export const isEmbedded = () => window.parent !== window;

export function forwardInputToParent(): () => void {
    if (!isEmbedded()) return () => {};

    const send = (event: Event) => {
        const data: { type: string; clientX?: number; clientY?: number; key?: string } = {
            type: event.type,
        };
        if (event instanceof MouseEvent) {
            data.clientX = event.clientX;
            data.clientY = event.clientY;
        } else if (event instanceof KeyboardEvent) {
            data.key = event.key;
        }
        window.parent.postMessage(data, '*');
    };

    FORWARDED.forEach((type) => window.addEventListener(type, send, { capture: true, passive: true }));
    return () => FORWARDED.forEach((type) => window.removeEventListener(type, send, { capture: true }));
}

/** Link props for the simple view: inside the monitor it opens in a new tab. */
export const simpleViewLinkProps = () => (isEmbedded() ? { target: '_blank', rel: 'noreferrer' } : {});
