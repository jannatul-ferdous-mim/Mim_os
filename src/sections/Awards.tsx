import { awards, leadership, site } from '../content/cv';
import { isSet } from '../lib/format';
import { Icon } from '../os/icons';
import { Heading, joinMeta, Meta } from './ui';

export default function Awards() {
    return (
        <div className="stack">
            <div className="stack-sm">
                {awards.map((award) => (
                    <article className="card award" key={award.title + award.event}>
                        <span className="award-icon">
                            <Icon name="awards" size={26} />
                        </span>
                        <div>
                            <h4 className="award-title">
                                {award.title}
                                {isSet(award.year) && <span className="award-year">{award.year}</span>}
                            </h4>
                            <p className="award-event">{award.event}</p>
                        </div>
                    </article>
                ))}
            </div>

            <div>
                <Heading>{site.headings.leadership}</Heading>
                <div className="stack-sm">
                    {leadership.map((item) => (
                        <article className="card" key={item.org}>
                            <h5 className="card-title">{item.org}</h5>
                            <Meta>{joinMeta(item.role, item.period)}</Meta>
                            <ul className="points">
                                {item.points.map((point) => (
                                    <li key={point}>{point}</li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
