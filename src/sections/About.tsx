import { site } from '../content/cv';

export default function About() {
    return (
        <div className="about">
            <p className="about-mark">{site.osName}</p>
            <p className="lead">{site.credit.text}</p>
            <p>
                <a className="text-link" href={site.credit.link} target="_blank" rel="noreferrer">
                    {site.credit.linkLabel}
                </a>
            </p>
            <p className="meta">{site.credit.builtWith}</p>
        </div>
    );
}
