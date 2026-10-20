import { useState, type FormEvent } from 'react';
import { profile, site } from '../content/cv';
import { isSet, prettyUrl } from '../lib/format';
import { Icon, type IconName } from '../os/icons';
import { Button, Heading } from './ui';

type Status = 'idle' | 'sending' | 'sent' | 'error';

function ContactRow({ icon, label, value, href }: { icon: IconName; label: string; value: string; href: string }) {
    const external = !href.startsWith('mailto:');
    return (
        <a className="contact-row" href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
            <span className="contact-icon">
                <Icon name={icon} size={20} />
            </span>
            <span className="contact-text">
                <span className="contact-label">{label}</span>
                <span className="contact-value">{value}</span>
            </span>
            <Icon name="arrowRight" size={18} className="contact-arrow" />
        </a>
    );
}

export default function Contact() {
    const [status, setStatus] = useState<Status>('idle');
    const { fields, placeholders } = site.contact;
    const { links } = profile;

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        setStatus('sending');
        try {
            const res = await fetch(site.contact.formspreeEndpoint, {
                method: 'POST',
                body: new FormData(form),
                headers: { Accept: 'application/json' },
            });
            if (!res.ok) throw new Error(String(res.status));
            form.reset();
            setStatus('sent');
        } catch {
            setStatus('error');
        }
    };

    return (
        <div className="stack">
            <p className="lead">{site.contact.intro}</p>

            <div className="contact-list">
                <ContactRow icon="mail" label={site.labels.email} value={profile.email} href={`mailto:${profile.email}`} />
                {isSet(links.linkedin) && <ContactRow icon="link" label={site.labels.linkedin} value={prettyUrl(links.linkedin)} href={links.linkedin} />}
                {isSet(links.github) && <ContactRow icon="code" label={site.labels.github} value={prettyUrl(links.github)} href={links.github} />}
                {isSet(links.scholar) && <ContactRow icon="publications" label={site.labels.scholar} value={new URL(links.scholar).hostname} href={links.scholar} />}
            </div>

            <form className="contact-form" onSubmit={onSubmit}>
                <Heading>{site.headings.form}</Heading>
                <div className="form-row">
                    <label>
                        <span>{fields.name}</span>
                        <input name="name" required autoComplete="name" placeholder={placeholders.name} />
                    </label>
                    <label>
                        <span>{fields.email}</span>
                        <input name="email" type="email" required autoComplete="email" placeholder={placeholders.email} />
                    </label>
                </div>
                <label>
                    <span>{fields.message}</span>
                    <textarea name="message" required rows={4} placeholder={placeholders.message} />
                </label>
                {/* Honeypot field: Formspree drops submissions that fill it in */}
                <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="honeypot" aria-hidden="true" />
                <div className="form-footer">
                    <Button variant="primary" icon="send" type="submit" disabled={status === 'sending'}>
                        {status === 'sending' ? site.buttons.sending : site.buttons.send}
                    </Button>
                    {status === 'sent' && <p className="form-status ok">{site.contact.success}</p>}
                    {status === 'error' && <p className="form-status err">{site.contact.error}</p>}
                </div>
            </form>

            <p className="meta">{site.contact.referencesNote}</p>
        </div>
    );
}
