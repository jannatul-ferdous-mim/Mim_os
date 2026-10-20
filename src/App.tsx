import { useEffect } from 'react';
import { forwardInputToParent } from './lib/bridge';
import { useIsPhone } from './lib/useIsPhone';
import Desktop from './os/Desktop';
import SimplePage from './simple/SimplePage';

const isSimplePath = () => window.location.pathname.replace(/\/+$/, '') === '/simple';

export default function App() {
    const phone = useIsPhone();
    const simple = isSimplePath() || phone;

    useEffect(() => forwardInputToParent(), []);

    useEffect(() => {
        document.body.classList.toggle('is-desktop', !simple);
    }, [simple]);

    return simple ? <SimplePage /> : <Desktop />;
}
