import { useEffect, useState } from 'react';

// Below this width the 3D scene and the window desktop are hard to use,
// so phones get the one-page simple view.
const PHONE_QUERY = '(max-width: 767px)';

export const isPhone = () => window.matchMedia(PHONE_QUERY).matches;

export function useIsPhone() {
    const [phone, setPhone] = useState(isPhone);
    useEffect(() => {
        const mq = window.matchMedia(PHONE_QUERY);
        const onChange = () => setPhone(mq.matches);
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, []);
    return phone;
}
