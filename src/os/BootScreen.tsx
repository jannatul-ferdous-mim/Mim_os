import { useEffect, useState } from 'react';
import { motion, useIsPresent } from 'framer-motion';
import { profile, site } from '../content/cv';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*/<>';
const SCRAMBLE_MS = 750;
export const BOOT_MS = 1150; // + 300ms fade = under 1.5s total

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

/** Text-scramble: each letter locks in from left to right over SCRAMBLE_MS. */
function useScramble(word: string, reduced: boolean) {
    const [text, setText] = useState(reduced ? word : word.replace(/./g, randomGlyph));
    useEffect(() => {
        if (reduced) return;
        const start = performance.now();
        let frame = 0;
        const tick = (now: number) => {
            const progress = Math.min(1, (now - start) / SCRAMBLE_MS);
            const locked = Math.floor(progress * word.length);
            setText(word.split('').map((ch, i) => (i < locked ? ch : randomGlyph())).join(''));
            if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [word, reduced]);
    return text;
}

export default function BootScreen({ reduced }: { reduced: boolean }) {
    const text = useScramble(site.osName, reduced);
    // Let clicks through to the desktop as soon as the fade-out starts
    const present = useIsPresent();
    return (
        <motion.div
            className="boot"
            style={{ pointerEvents: present ? 'auto' : 'none' }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="boot-inner">
                <p className="boot-mark" aria-label={site.osName}>
                    {text}
                </p>
                <div className="boot-bar">
                    <motion.span
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: BOOT_MS / 1000, ease: 'easeInOut' }}
                    />
                </div>
                <p className="boot-line">
                    {site.bootLine} · {profile.name}
                </p>
            </div>
        </motion.div>
    );
}
