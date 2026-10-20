import type { ReactNode } from 'react';
import { Icon, type IconName } from '../os/icons';

type Variant = 'primary' | 'ghost';

interface ButtonProps {
    children: ReactNode;
    icon?: IconName;
    variant?: Variant;
    href?: string;
    download?: boolean;
    newTab?: boolean;
    onClick?: () => void;
    type?: 'button' | 'submit';
    disabled?: boolean;
}

export function Button({ children, icon, variant = 'ghost', href, download, newTab, onClick, type = 'button', disabled }: ButtonProps) {
    const className = `btn btn-${variant}`;
    const inner = (
        <>
            {icon && <Icon name={icon} size={18} />}
            <span>{children}</span>
        </>
    );
    if (href) {
        return (
            <a
                className={className}
                href={href}
                download={download || undefined}
                target={newTab ? '_blank' : undefined}
                rel={newTab ? 'noreferrer' : undefined}
                onClick={onClick}
            >
                {inner}
            </a>
        );
    }
    return (
        <button className={className} type={type} onClick={onClick} disabled={disabled}>
            {inner}
        </button>
    );
}

export function Chip({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
    return <span className={accent ? 'chip chip-accent' : 'chip'}>{children}</span>;
}

export function Heading({ children }: { children: ReactNode }) {
    return <h3 className="sub-heading">{children}</h3>;
}

export function Meta({ children }: { children: ReactNode }) {
    return <p className="meta">{children}</p>;
}

/** Joins non-empty parts with a middle dot. */
export const joinMeta = (...parts: (string | undefined)[]) => parts.filter((p) => p && p.trim() !== '').join(' · ');
