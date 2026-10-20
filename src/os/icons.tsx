// Line icons drawn for MimOS on a 24×24 grid. Stroke uses currentColor.

const PATHS = {
    home: ['M3.5 10.5 12 3.5l8.5 7', 'M5.5 9v10.5h4.5V14h4v5.5h4.5V9'],
    research: ['M9 3.5h6', 'M10 3.5v6.2L4.6 18.4A1.6 1.6 0 0 0 6 20.5h12a1.6 1.6 0 0 0 1.4-2.1L14 9.7V3.5', 'M7.2 15h9.6'],
    publications: ['M7 3.5h7l4.5 4.5v12.5H7z', 'M14 3.5V8h4.5', 'M9.5 12.5h6', 'M9.5 16h4'],
    projects: ['M12 3.5 19.5 7.8v8.4L12 20.5l-7.5-4.3V7.8z', 'M4.5 7.8 12 12l7.5-4.2', 'M12 12v8.5'],
    awards: ['M8 4h8v5.5a4 4 0 0 1-8 0z', 'M8 6H5.5a2.5 2.5 0 0 0 2.6 3.6', 'M16 6h2.5a2.5 2.5 0 0 1-2.6 3.6', 'M12 13.5v3.5', 'M8.5 20.5h7', 'M9.5 17h5v3.5h-5z'],
    skills: ['M7.5 7.5h9v9h-9z', 'M10.5 10.5h3v3h-3z', 'M10 3.5v4', 'M14 3.5v4', 'M10 16.5v4', 'M14 16.5v4', 'M3.5 10h4', 'M3.5 14h4', 'M16.5 10h4', 'M16.5 14h4'],
    resume: ['M6.5 3.5h11v17h-11z', 'M9.5 8.5h5', 'M9.5 12h5', 'M9.5 15.5h3'],
    contact: ['M3.5 6h17v12h-17z', 'm3.5 6.5 8.5 6.5 8.5-6.5'],
    about: ['M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17z', 'M12 11v5.5', 'M12 7.6v.4'],
    minimize: ['M6.5 12h11'],
    close: ['m7 7 10 10', 'M17 7 7 17'],
    external: ['M13.5 4.5h6v6', 'm19.5 4.5-8.5 8.5', 'M17.5 14v5.5h-13v-13H10'],
    download: ['M12 4v11', 'm7 10.5 5 5 5-5', 'M5 19.5h14'],
    code: ['m8.5 8-4 4 4 4', 'm15.5 8 4 4-4 4', 'm13.5 5-3 14'],
    paper: ['M7 3.5h7l4.5 4.5v12.5H7z', 'M14 3.5V8h4.5'],
    pin: ['M12 20.5s-6-5.4-6-10.5a6 6 0 0 1 12 0c0 5.1-6 10.5-6 10.5z', 'M12 12.3a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6z'],
    link: ['M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1', 'M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1'],
    mail: ['M3.5 6h17v12h-17z', 'm3.5 6.5 8.5 6.5 8.5-6.5'],
    send: ['M20.5 3.5 10 14', 'm20.5 3.5-6.5 17-4-6.5-6.5-4z'],
    layout: ['M4 4.5h16v15H4z', 'M4 9h16', 'M10 9v10.5'],
    arrowRight: ['M4.5 12h15', 'm13.5 6 6 6-6 6'],
    spark: ['M12 3.5v4', 'M12 16.5v4', 'M3.5 12h4', 'M16.5 12h4', 'm6 6 2.6 2.6', 'm15.4 15.4 2.6 2.6', 'm18 6-2.6 2.6', 'M8.6 15.4 6 18'],
} as const;

export type IconName = keyof typeof PATHS;

interface IconProps {
    name: IconName;
    size?: number;
    strokeWidth?: number;
    className?: string;
}

export function Icon({ name, size = 20, strokeWidth = 1.6, className }: IconProps) {
    return (
        <svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            {PATHS[name].map((d) => (
                <path key={d} d={d} />
            ))}
        </svg>
    );
}
