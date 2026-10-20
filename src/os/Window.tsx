import { memo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { motion } from 'framer-motion';
import { site } from '../content/cv';
import { SECTIONS } from '../sections';
import { APPS, appTitle, type AppId } from './apps';
import { Icon } from './icons';

export interface WindowState {
    id: AppId;
    minimized: boolean;
    x: number;
    y: number;
    w: number;
    h: number;
}

interface WindowProps {
    win: WindowState;
    z: number;
    focused: boolean;
    bounds: { w: number; h: number };
    onFocus: (id: AppId) => void;
    onClose: (id: AppId) => void;
    onMinimize: (id: AppId) => void;
}

// How much of a window must stay on screen while dragging
const KEEP_VISIBLE = 140;
const TITLE_BAR_H = 46;

// Content only depends on the id, so dragging or focusing never re-renders it
const WindowContent = memo(function WindowContent({ id }: { id: AppId }) {
    const Section = SECTIONS[id];
    return <Section />;
});

export default function Window({ win, z, focused, bounds, onFocus, onClose, onMinimize }: WindowProps) {
    const { id, minimized, w, h } = win;
    const [pos, setPos] = useState({ x: win.x, y: win.y });
    const drag = useRef<{ dx: number; dy: number } | null>(null);

    const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
        if (e.button !== 0 || (e.target as HTMLElement).closest('button')) return;
        // No preventDefault here: it would suppress mousedown/mouseup, which
        // the 3D scene needs. .desktop's user-select: none stops text selection.
        try {
            e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
            // Synthetic events have no active pointer to capture
        }
        drag.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y };
    };

    const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
        if (!drag.current) return;
        const x = Math.min(Math.max(e.clientX - drag.current.dx, KEEP_VISIBLE - w), bounds.w - KEEP_VISIBLE);
        const y = Math.min(Math.max(e.clientY - drag.current.dy, 0), bounds.h - TITLE_BAR_H);
        setPos({ x, y });
    };

    const endDrag = () => {
        drag.current = null;
    };

    return (
        <motion.section
            className={focused ? 'window is-focused' : 'window'}
            style={{ left: pos.x, top: pos.y, width: w, height: h, zIndex: z, pointerEvents: minimized ? 'none' : 'auto' }}
            initial={{ opacity: 0, scale: 0.94, y: 14 }}
            animate={minimized ? { opacity: 0, scale: 0.9, y: 80 } : { opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 14, transition: { duration: 0.16 } }}
            transition={{ type: 'spring', stiffness: 420, damping: 34, mass: 0.8 }}
            onPointerDownCapture={() => onFocus(id)}
            aria-hidden={minimized || undefined}
            aria-label={appTitle(id)}
            role="dialog"
        >
            <div
                className="titlebar"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
            >
                <span className="titlebar-title">
                    <Icon name={APPS[id].icon} size={17} />
                    {appTitle(id)}
                </span>
                <span className="titlebar-actions">
                    <button className="win-btn" onClick={() => onMinimize(id)} aria-label={site.buttons.minimize} title={site.buttons.minimize}>
                        <Icon name="minimize" size={16} strokeWidth={2} />
                    </button>
                    <button className="win-btn win-btn-close" onClick={() => onClose(id)} aria-label={site.buttons.close} title={site.buttons.close}>
                        <Icon name="close" size={16} strokeWidth={2} />
                    </button>
                </span>
            </div>
            <div className="window-body">
                <WindowContent id={id} />
            </div>
        </motion.section>
    );
}
