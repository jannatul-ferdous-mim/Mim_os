import { useEffect, useState } from 'react';
import { site } from '../content/cv';
import { APPS, appTitle, type AppId } from './apps';
import { Icon } from './icons';
import type { WindowState } from './Window';

function Clock() {
    const [now, setNow] = useState(() => new Date());
    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);
    return (
        <div className="clock">
            <span className="clock-time">{now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <span className="clock-date">{now.toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' })}</span>
        </div>
    );
}

interface TaskbarProps {
    windows: WindowState[];
    focusedId: AppId | null;
    menuOpen: boolean;
    onToggleMenu: () => void;
    onTab: (id: AppId) => void;
}

export default function Taskbar({ windows, focusedId, menuOpen, onToggleMenu, onTab }: TaskbarProps) {
    // Tabs keep the order windows were opened in, not the z-order
    const [tabOrder, setTabOrder] = useState<AppId[]>([]);
    useEffect(() => {
        setTabOrder((prev) => {
            const open = new Set(windows.map((w) => w.id));
            const kept = prev.filter((id) => open.has(id));
            const added = windows.map((w) => w.id).filter((id) => !kept.includes(id));
            return [...kept, ...added];
        });
    }, [windows]);
    const byId = new Map(windows.map((w) => [w.id, w]));

    return (
        <footer className="taskbar">
            <button
                className={menuOpen ? 'start-btn is-open' : 'start-btn'}
                onClick={onToggleMenu}
                aria-expanded={menuOpen}
                aria-haspopup="menu"
                data-start-toggle
            >
                <span className="start-logo">M</span>
                {site.buttons.startMenu}
            </button>
            <div className="taskbar-divider" />
            <nav className="tabs">
                {tabOrder.map((id) => {
                    const win = byId.get(id);
                    if (!win) return null;
                    const state = id === focusedId ? 'is-active' : win.minimized ? 'is-minimized' : '';
                    return (
                        <button key={id} className={`tab ${state}`} onClick={() => onTab(id)}>
                            <Icon name={APPS[id].icon} size={17} />
                            <span>{appTitle(id)}</span>
                        </button>
                    );
                })}
            </nav>
            <Clock />
        </footer>
    );
}
