import { projects, site } from '../content/cv';
import { isSet } from '../lib/format';
import { Button, Chip } from './ui';

export default function Projects() {
    return (
        <div className="grid-2">
            {projects.map((project) => (
                <article className="card project" key={project.name}>
                    <h4 className="card-title">{project.name}</h4>
                    <p className="project-desc">{project.description}</p>
                    <div className="chips">
                        {project.tags.map((tag) => (
                            <Chip key={tag}>{tag}</Chip>
                        ))}
                    </div>
                    {isSet(project.link) && (
                        <div className="button-row">
                            <Button icon="external" href={project.link} newTab>
                                {site.buttons.link}
                            </Button>
                        </div>
                    )}
                </article>
            ))}
        </div>
    );
}
