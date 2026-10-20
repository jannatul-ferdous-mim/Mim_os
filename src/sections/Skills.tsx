import { education, site, skills } from '../content/cv';
import { Chip, Heading, joinMeta, Meta } from './ui';

export default function Skills() {
    return (
        <div className="stack">
            {Object.entries(skills).map(([category, items]) => (
                <div key={category}>
                    <Heading>{category}</Heading>
                    <div className="chips">
                        {items.map((skill) => (
                            <Chip key={skill}>{skill}</Chip>
                        ))}
                    </div>
                </div>
            ))}

            <div>
                <Heading>{site.headings.education}</Heading>
                <ol className="timeline">
                    {education.map((item) => (
                        <li key={item.school}>
                            <h5 className="card-title">{item.school}</h5>
                            <p className="timeline-degree">{item.degree}</p>
                            <Meta>{joinMeta(item.period, 'location' in item ? item.location : undefined)}</Meta>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}
