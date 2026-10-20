import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { profile, site } from './content/cv';
import App from './App';
import './styles/base.css';
import './styles/os.css';
import './styles/content.css';
import './styles/simple.css';

document.title = `${profile.name} · ${site.osName}`;
document.querySelector('meta[name="description"]')?.setAttribute('content', `${profile.name}, ${profile.title}. ${profile.tagline}.`);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
