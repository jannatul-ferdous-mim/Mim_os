import type { ReactNode } from 'react';

// Standalone numbers such as 70.1%, 0.938, 1,053 or 20,000. Years (2026)
// and model names (Qwen2.5-72B, GPT-4o, Gemini 1.5 Pro, db2, ≤8B) are left alone.
const NUMBER = /(?<![\w.\-≤])(?!(?:19|20)\d\d(?![\d,.%]))\d(?:[\d,.]*\d)?%?(?![\w\-]|[.,]\d)(?!\s(?:Pro|Flash|Ultra)\b)/g;

/** Wraps every standalone number in <strong>. */
export function emphasizeNumbers(text: string): ReactNode[] {
    const out: ReactNode[] = [];
    let last = 0;
    for (const match of text.matchAll(NUMBER)) {
        const start = match.index;
        if (start > last) out.push(text.slice(last, start));
        out.push(<strong key={start}>{match[0]}</strong>);
        last = start + match[0].length;
    }
    if (last < text.length) out.push(text.slice(last));
    return out;
}

/** Bolds every occurrence of `name` inside an author list. */
export function highlightName(authors: string, name: string): ReactNode[] {
    return authors
        .split(name)
        .flatMap((part, i) => (i === 0 ? [part] : [<strong key={i}>{name}</strong>, part]))
        .filter((part) => part !== '');
}

/** "Jannatul Ferdous Mim" -> "JM" */
export function initials(name: string): string {
    const words = name.trim().split(/\s+/);
    return (words[0][0] + (words.length > 1 ? words[words.length - 1][0] : '')).toUpperCase();
}

export const isSet = (value: string | undefined | null): value is string => !!value && value.trim() !== '';

/** Turns a URL into a short label, e.g. "linkedin.com/in/…" */
export const prettyUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
