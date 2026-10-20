import { useMemo } from 'react';
import { site } from '../content/cv';
import { useIsPhone } from '../lib/useIsPhone';
import { appTitle, NavContext, type AppId, type Nav } from '../os/apps';
import { SECTIONS } from '../sections';
import Home from '../sections/Home';
import Resume from '../sections/Resume';

const ORDER: AppId[] = ['research', 'publications', 'projects', 'awards', 'skills', 'resume', 'contact'];

/** All content on one scrolling page, no windows. Used at /simple and on phones. */
export default function SimplePage() {
    const phone = useIsPhone();
    const nav = useMemo<Nav>(
        () => ({
            mode: 'simple',
            open: (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
        }),
        []
    );

    return (
        <NavContext.Provider value={nav}>
            <div className="simple">
                <header className="simple-nav">
                    <a className="simple-brand" href="#home">
                        <span className="start-logo">M</span>
                        {site.osName}
                    </a>
                    <nav className="simple-links">
                        {ORDER.map((id) => (
                            <a key={id} href={`#${id}`}>
                                {appTitle(id)}
                            </a>
                        ))}
                    </nav>
                    {!phone && (
                        <a className="text-link simple-desktop" href="/">
                            {site.buttons.desktopView}
                        </a>
                    )}
                </header>

                <main className="simple-main">
                    <section id="home" className="simple-section simple-hero">
                        <Home />
                    </section>
                    {ORDER.map((id) => {
                        const Section = SECTIONS[id];
                        return (
                            <section id={id} key={id} className="simple-section">
                                <h2 className="simple-h2">{appTitle(id)}</h2>
                                {id === 'resume' ? <Resume preview={!phone} /> : <Section />}
                            </section>
                        );
                    })}
                    <footer className="simple-footer">
                        <p>
                            {site.credit.text}{' '}
                            <a className="text-link" href={site.credit.link} target="_blank" rel="noreferrer">
                                {site.credit.linkLabel}
                            </a>
                        </p>
                    </footer>
                </main>
            </div>
        </NavContext.Provider>
    );
}
