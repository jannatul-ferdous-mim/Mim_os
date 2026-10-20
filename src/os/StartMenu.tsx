import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { profile, site } from '../content/cv';
import { Avatar } from '../sections/Home';
import { APPS, appTitle, DESKTOP_APPS, type AppId } from './apps';
import { Icon } from './icons';
import { simpleViewLinkProps } from '../lib/bridge';

interface StartMenuProps {
    onOpen: (id: AppId) => void;
    onClose: () => void;
}

export default function StartMenu({ onOpen, onClose }: StartMenuProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onPointer = (e: PointerEvent) => {
            const target = e.target as HTMLElement;
            if (!ref.current?.contains(target) && !target.closest('[data-start-toggle]')) onClose();
        };
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        window.addEventListener('pointerdown', onPointer);
        window.addEventListener('keydown', onKey);
        return () => {
            window.removeEventListener('pointerdown', onPointer);
            window.removeEventListener('keydown', onKey);
        };
    }, [onClose]);

    const pick = (id: AppId) => {
        onOpen(id);
        onClose();
    };

    return (
        <motion.div
            ref={ref}
            className="start-menu"
            role="menu"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.16 }}
        >
            <div className="start-profile">
                <Avatar size={52} />
                <div>
                    <p className="start-name">{profile.name}</p>
                    <p className="start-title">{profile.title}</p>
                </div>
            </div>
            <p className="start-group">{site.menu.apps}</p>
            <div className="start-apps">
                {DESKTOP_APPS.map((id) => (
                    <button key={id} className="start-item" role="menuitem" onClick={() => pick(id)}>
                        <Icon name={APPS[id].icon} size={19} />
                        {appTitle(id)}
                    </button>
                ))}
            </div>
            <p className="start-group">{site.menu.system}</p>
            <button className="start-item" role="menuitem" onClick={() => pick('about')}>
                <Icon name="about" size={19} />
                {appTitle('about')}
            </button>
            <a className="start-item" role="menuitem" href="/simple" {...simpleViewLinkProps()} onClick={onClose}>
                <Icon name="layout" size={19} />
                {site.buttons.simpleView}
            </a>
        </motion.div>
    );
}
