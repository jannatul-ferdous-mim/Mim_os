import { experience, researchInterests, site, summary } from '../content/cv';
import { emphasizeNumbers } from '../lib/format';
import { Chip, Heading, joinMeta, Meta } from './ui';

export default function Research() {
    return (
        <div className="stack">
            <div className="prose">
                {summary.map((p) => (
                    <p key={p}>{emphasizeNumbers(p)}</p>
                ))}
            </div>

            <div>
                <Heading>{site.headings.researchInterests}</Heading>
                <div className="chips">
                    {researchInterests.map((interest) => (
                        <Chip key={interest} accent>
                            {interest}
                        </Chip>
                    ))}
                </div>
            </div>

            <div>
                <Heading>{site.headings.experience}</Heading>
                <div className="stack">
                    {experience.map((lab) => (
                        <section className="lab" key={lab.org}>
                            <h4 className="lab-org">{lab.org}</h4>
                            <Meta>{joinMeta(lab.role, lab.period, lab.location)}</Meta>
                            <div className="stack-sm">
                                {lab.projects.map((project) => (
                                    <article className="card" key={project.name}>
                                        <h5 className="card-title">{project.name}</h5>
                                        <p className="card-subtitle">{project.subtitle}</p>
                                        <ul className="points">
                                            {project.points.map((point) => (
                                                <li key={point}>{emphasizeNumbers(point)}</li>
                                            ))}
                                        </ul>
                                    </article>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}
