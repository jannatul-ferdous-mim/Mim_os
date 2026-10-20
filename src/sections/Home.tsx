import { highlights, profile, site } from '../content/cv';
import { initials, isSet } from '../lib/format';
import { useNav } from '../os/apps';
import { Icon } from '../os/icons';
import { Button } from './ui';
import { simpleViewLinkProps } from '../lib/bridge';

export function Avatar({ size = 132 }: { size?: number }) {
    return (
        <div className="avatar" style={{ width: size, height: size }}>
            {isSet(profile.photo) ? (
                <img src={profile.photo} alt={profile.name} />
            ) : (
                <span className="avatar-initials" style={{ fontSize: size * 0.36 }}>
                    {initials(profile.name)}
                </span>
            )}
        </div>
    );
}

export default function Home() {
    const nav = useNav();
    return (
        <div className="home">
            <header className="home-header">
                <Avatar />
                <div className="home-id">
                    <h1 className="home-name">{profile.name}</h1>
                    <p className="home-title">{profile.title}</p>
                    <p className="home-tagline">{profile.tagline}</p>
                    <p className="home-location">
                        <Icon name="pin" size={18} />
                        {profile.location}
                    </p>
                </div>
            </header>

            <div className="highlights">
                {highlights.map((h) => (
                    <div className="highlight" key={h.label}>
                        <span className="highlight-value">{h.value}</span>
                        <span className="highlight-label">{h.label}</span>
                    </div>
                ))}
            </div>

            <div className="button-row">
                <Button variant="primary" icon="research" onClick={() => nav.open('research')}>
                    {site.buttons.viewResearch}
                </Button>
                <Button icon="download" href={profile.resumePdf} download>
                    {site.buttons.downloadCv}
                </Button>
                <Button icon="mail" onClick={() => nav.open('contact')}>
                    {site.buttons.contact}
                </Button>
                {nav.mode === 'desktop' && (
                    <a className="text-link home-simple" href="/simple" {...simpleViewLinkProps()}>
                        <Icon name="layout" size={16} />
                        {site.buttons.simpleView}
                    </a>
                )}
            </div>
        </div>
    );
}
