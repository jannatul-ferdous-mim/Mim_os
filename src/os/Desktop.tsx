import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type MouseEvent } from 'react';
import { AnimatePresence, useReducedMotion } from 'framer-motion';
import { profile, site } from '../content/cv';
import { APPS, appTitle, DESKTOP_APPS, NavContext, type AppId, type Nav } from './apps';
import Background from './Background';
import BootScreen, { BOOT_MS } from './BootScreen';
import { Icon } from './icons';
import StartMenu from './StartMenu';
import Taskbar from './Taskbar';
import Window, { type WindowState } from './Window';

const MARGIN = 16;
const CASCADE = 30;

export default function Desktop() {
    const reduced = useReducedMotion() ?? false;
    const [booting, setBooting] = useState(true);
    // Windows in the order they were opened (stable, so DOM nodes never move)
    const [windows, setWindows] = useState<WindowState[]>([]);
    // Stacking order, last = top
    const [stack, setStack] = useState<AppId[]>([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [selected, setSelected] = useState<AppId | null>(null);

    const areaRef = useRef<HTMLDivElement>(null);
    const [bounds, setBounds] = useState({ w: window.innerWidth, h: window.innerHeight });
    const boundsRef = useRef(bounds);

    useLayoutEffect(() => {
        const el = areaRef.current;
        if (!el) return;
        const measure = () => {
            const next = { w: el.clientWidth, h: el.clientHeight };
            boundsRef.current = next;
            setBounds(next);
        };
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const raise = useCallback((id: AppId) => {
        setStack((prev) => (prev[prev.length - 1] === id ? prev : [...prev.filter((s) => s !== id), id]));
    }, []);

    const open = useCallback(
        (id: AppId) => {
            setWindows((prev) => {
                const existing = prev.find((w) => w.id === id);
                if (existing) return existing.minimized ? prev.map((w) => (w.id === id ? { ...w, minimized: false } : w)) : prev;

                const b = boundsRef.current;
                const w = Math.min(APPS[id].size.w, b.w - MARGIN * 2);
                const h = Math.min(APPS[id].size.h, b.h - MARGIN * 2);
                const offset = (prev.filter((p) => !p.minimized).length % 6) * CASCADE;
                const x = Math.max(MARGIN, Math.min(Math.round((b.w - w) / 2) + offset, b.w - w - MARGIN));
                const y = Math.max(MARGIN, Math.min(Math.round((b.h - h) / 2) + offset, b.h - h - MARGIN));
                return [...prev, { id, minimized: false, x, y, w, h }];
            });
            raise(id);
        },
        [raise]
    );

    const close = useCallback((id: AppId) => {
        setWindows((prev) => prev.filter((w) => w.id !== id));
        setStack((prev) => prev.filter((s) => s !== id));
    }, []);

    const minimize = useCallback((id: AppId) => {
        setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
    }, []);

    const focusedId = useMemo(() => {
        const visible = new Set(windows.filter((w) => !w.minimized).map((w) => w.id));
        for (let i = stack.length - 1; i >= 0; i--) if (visible.has(stack[i])) return stack[i];
        return null;
    }, [windows, stack]);

    const onTab = (id: AppId) => {
        const win = windows.find((w) => w.id === id);
        if (!win) return;
        if (win.minimized) open(id);
        else if (id === focusedId) minimize(id);
        else raise(id);
    };

    // Boot, then open Home
    useEffect(() => {
        const timer = setTimeout(
            () => {
                setBooting(false);
                open('home');
            },
            reduced ? 300 : BOOT_MS
        );
        return () => clearTimeout(timer);
    }, [open, reduced]);

    const onIconClick = (id: AppId) => (e: MouseEvent) => {
        setSelected(id);
        // Keyboard activation (Enter/Space) arrives as a click with detail 0
        if (e.detail === 0) open(id);
    };

    const nav = useMemo<Nav>(() => ({ mode: 'desktop', open }), [open]);
    const closeMenu = useCallback(() => setMenuOpen(false), []);

    return (
        <NavContext.Provider value={nav}>
            <div className="desktop">
                <Background />
                <div className="desk-area" ref={areaRef} onPointerDown={(e) => e.target === e.currentTarget && setSelected(null)}>
                    <div className="desk-icons">
                        {DESKTOP_APPS.map((id) => (
                            <button
                                key={id}
                                className={selected === id ? 'desk-icon is-selected' : 'desk-icon'}
                                onClick={onIconClick(id)}
                                onDoubleClick={() => open(id)}
                                onPointerUp={(e) => e.pointerType === 'touch' && open(id)}
                            >
                                <span className="desk-icon-glyph">
                                    <Icon name={APPS[id].icon} size={30} strokeWidth={1.5} />
                                </span>
                                <span className="desk-icon-label">{appTitle(id)}</span>
                            </button>
                        ))}
                    </div>

                    <div className="watermark" aria-hidden="true">
                        <span className="watermark-os">{site.osName}</span>
                        <span className="watermark-name">
                            {profile.name} · {profile.title}
                        </span>
                    </div>

                    <AnimatePresence>
                        {windows.map((win) => (
                            <Window
                                key={win.id}
                                win={win}
                                z={10 + stack.indexOf(win.id)}
                                focused={win.id === focusedId}
                                bounds={bounds}
                                onFocus={raise}
                                onClose={close}
                                onMinimize={minimize}
                            />
                        ))}
                    </AnimatePresence>
                </div>

                <AnimatePresence>{menuOpen && <StartMenu onOpen={open} onClose={closeMenu} />}</AnimatePresence>

                <Taskbar windows={windows} focusedId={focusedId} menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((o) => !o)} onTab={onTab} />

                <AnimatePresence>{booting && <BootScreen reduced={reduced} />}</AnimatePresence>
            </div>
        </NavContext.Provider>
    );
}
