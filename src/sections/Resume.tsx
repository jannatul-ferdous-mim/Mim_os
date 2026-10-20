import { profile, site } from '../content/cv';
import { Button } from './ui';

export default function Resume({ preview = true }: { preview?: boolean }) {
    return (
        <div className="resume">
            <p className="lead">{site.resume.intro}</p>
            <div className="button-row">
                <Button variant="primary" icon="download" href={profile.resumePdf} download>
                    {site.buttons.downloadCv}
                </Button>
                <Button icon="external" href={profile.resumePdf} newTab>
                    {site.buttons.openPdf}
                </Button>
            </div>
            {preview && (
                <object className="resume-pdf" data={`${profile.resumePdf}#view=FitH&navpanes=0`} type="application/pdf" aria-label={site.windows.resume}>
                    <p className="meta">{site.resume.fallback}</p>
                </object>
            )}
        </div>
    );
}
