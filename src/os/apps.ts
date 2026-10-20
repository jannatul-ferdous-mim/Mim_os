import { createContext, useContext } from 'react';
import { site } from '../content/cv';
import type { IconName } from './icons';

export type AppId = keyof typeof site.windows;

export interface AppDef {
    id: AppId;
    icon: IconName;
    /** Preferred window size; clamped to the desktop at open time. */
    size: { w: number; h: number };
}

export const APPS: Record<AppId, AppDef> = {
    home: { id: 'home', icon: 'home', size: { w: 880, h: 668 } },
    research: { id: 'research', icon: 'research', size: { w: 940, h: 780 } },
    publications: { id: 'publications', icon: 'publications', size: { w: 880, h: 800 } },
    projects: { id: 'projects', icon: 'projects', size: { w: 900, h: 640 } },
    awards: { id: 'awards', icon: 'awards', size: { w: 780, h: 700 } },
    skills: { id: 'skills', icon: 'skills', size: { w: 880, h: 760 } },
    resume: { id: 'resume', icon: 'resume', size: { w: 860, h: 820 } },
    contact: { id: 'contact', icon: 'contact', size: { w: 760, h: 860 } },
    about: { id: 'about', icon: 'about', size: { w: 560, h: 380 } },
};

/** Icons shown on the desktop, in order. */
export const DESKTOP_APPS: AppId[] = ['home', 'research', 'publications', 'projects', 'awards', 'skills', 'resume', 'contact'];

export const appTitle = (id: AppId) => site.windows[id];

/**
 * How sections move around. On the desktop this opens a window; on the
 * simple page it scrolls to the matching section.
 */
export interface Nav {
    mode: 'desktop' | 'simple';
    open: (id: AppId) => void;
}

export const NavContext = createContext<Nav>({ mode: 'simple', open: () => {} });
export const useNav = () => useContext(NavContext);
