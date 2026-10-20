import type { ComponentType } from 'react';
import type { AppId } from '../os/apps';
import About from './About';
import Awards from './Awards';
import Contact from './Contact';
import Home from './Home';
import Projects from './Projects';
import Publications from './Publications';
import Research from './Research';
import Resume from './Resume';
import Skills from './Skills';

export const SECTIONS: Record<AppId, ComponentType> = {
    home: Home,
    research: Research,
    publications: Publications,
    projects: Projects,
    awards: Awards,
    skills: Skills,
    resume: Resume,
    contact: Contact,
    about: About,
};
