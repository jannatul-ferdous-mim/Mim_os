import { profile, publications, site } from '../content/cv';
import { highlightName, isSet } from '../lib/format';
import { Button } from './ui';

const statusClass = (status: string) => `badge badge-${status.toLowerCase().replace(/\s+/g, '-')}`;

export default function Publications() {
    return (
        <div className="stack-sm">
            {publications.map((pub) => (
                <article className="card pub" key={pub.title}>
                    <div className="pub-top">
                        <span className={statusClass(pub.status)}>{pub.status}</span>
                        <span className="meta">{pub.venue}</span>
                    </div>
                    <h4 className="pub-title">{pub.title}</h4>
                    {isSet(pub.authors) && <p className="pub-authors">{highlightName(pub.authors, profile.name)}</p>}
                    {isSet(pub.note) && <p className="pub-note">{pub.note}</p>}
                    {(isSet(pub.links.code) || isSet(pub.links.paper)) && (
                        <div className="button-row">
                            {isSet(pub.links.paper) && (
                                <Button icon="paper" href={pub.links.paper} newTab>
                                    {site.buttons.paper}
                                </Button>
                            )}
                            {isSet(pub.links.code) && (
                                <Button icon="code" href={pub.links.code} newTab>
                                    {site.buttons.code}
                                </Button>
                            )}
                        </div>
                    )}
                </article>
            ))}
        </div>
    );
}
