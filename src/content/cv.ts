// src/content/cv.ts
// Single source of truth for all portfolio content (MimOS inner site).
// Every window/page reads from this file — edit content here, not in components.
// Items marked TODO(mim) need a real value from Mim before going live.
// Empty strings ('') hide the matching button/line in the UI.

export const profile = {
    name: 'Jannatul Ferdous Mim',
    shortName: 'Mim',
    title: 'AI Researcher',
    tagline: 'Trustworthy, human-centered AI in Bangla and English',
    location: 'Dhaka, Bangladesh',
    email: 'mimahmed0140@gmail.com',
    // Phone intentionally left off the public site.
    links: {
        linkedin: 'https://www.linkedin.com/in/jannatul-ferdous-mim-629054228',
        github: 'https://github.com/jannatul-ferdous-mim',
        scholar: 'https://scholar.google.com/citations?view_op=list_works&hl=en&user=D6hrMToAAAAJ',
    },
    photo: '/mim-photo.jpg', // file in mim-os/public; '' shows an initials placeholder
    resumePdf: '/Jannatul_Ferdous_Mim_CV.pdf', // copy the CV PDF into /public with this name
};

export const summary = [
    'Final-year CSE student (AI/ML major) at North South University and student researcher at the TriModal AI Lab and ELITE Research Lab.',
    'I work on trustworthy, human-centered AI in Bangla and English, and my work rests on careful quantitative analysis: stratified ablations, bootstrap confidence intervals, and benchmark design.',
    'Co-first author of CultAct-ML (ORACLE @ EMNLP 2026) and MIMAL; co-author of PRECEPT (under review at NAACL 2027).',
    'Champion of NASA Space Apps 2023 and 1st Place at the IBM Granite Hackathon.',
];

export const researchInterests = [
    'Trustworthy and human-centered AI',
    'Evaluation of LLMs and AI chatbots',
    'Multilingual and Bangla NLP',
    'AI for health',
];

// Headline numbers for a "highlights" strip on the home window.
export const highlights = [
    { value: '70.1%', label: 'of Bangla scenarios planned in English by a reasoning model (CultAct-ML)' },
    { value: '85.5%', label: 'accuracy of MIMAL, where 8 VLMs fall below a constant guess' },
    { value: '91.1%', label: 'accuracy of the full PRECEPT system in the agent ablation' },
    { value: '1st', label: 'NASA Space Apps 2023 Champion · IBM Granite Hackathon' },
];

export const education = [
    {
        school: 'North South University',
        degree: 'B.Sc. in Computer Science and Engineering — Major in AI & Machine Learning',
        period: 'Spring 2022 – Present',
        location: 'Dhaka, Bangladesh',
    },
    {
        school: 'Udayan Higher Secondary School',
        degree: 'Higher Secondary Certificate, Science — GPA 5.00',
        period: '2020',
    },
    {
        school: 'Ahmed Bawany Academy School and College',
        degree: 'Secondary School Certificate, Science — GPA 5.00',
        period: '2018',
    },
];

export const experience = [
    {
        org: 'North South University — TriModal AI Lab',
        role: 'Student Research Assistant',
        period: 'Nov 2025 – Present',
        location: 'Dhaka, Bangladesh',
        projects: [
            {
                name: 'CultAct-ML',
                subtitle: 'Cultural value defaults in multilingual LLM agents · ORACLE @ EMNLP 2026 · co-first author',
                points: [
                    'Plan-then-act benchmark testing whether LLM agents default to Western values when they must commit to an action: 39 GLOBE-tagged value-conflict dilemmas in English, Indonesian and Bangla, run on Qwen2.5-72B, Kimi K2 and Qwen3-235B (1,053 valid trajectories). The Western-cluster default was significant in 7 of 9 model–language cells.',
                    'Ran the ablation stratifying plan drift by the language each plan was actually written in. Pooled, Qwen3-235B’s Bangla plans looked near-identical to English (LaBSE 0.938), but on plans genuinely written in Bangla similarity fell to 0.838 — the largest drift in the grid. The English-planning rate climbed 0% → 9.4% → 70.1% across English, Indonesian and Bangla, identifying planning-stage language abandonment as the mechanism.',
                    'Extended the ablation with a 95% bootstrap over the 39 scenarios (B = 20,000): the per-language shift is model-dependent and none is significant, so the paper reports direction rather than magnitude.',
                ],
            },
            {
                name: 'PRECEPT',
                subtitle: 'Memory-driven multi-agent reasoning for reliable medical QA · NAACL 2027 (under review) · co-author',
                points: [
                    'Helped develop a four-agent framework that answers a medical question, reflects on each graded error, routes the insight to a medical sector, and curates it into an episodic memory — improving reliability at inference time without fine-tuning, on ReMedQA in English and the new ReMedQA-Bangla.',
                    'Ran part of the evaluation across an eleven-LLM grid (small ≤8B models to large open and proprietary ones), each scored on seven meaning-preserving variants of every question.',
                    'Ran the cumulative agent ablation (GPT-OSS-20B, MMLU College Medicine): reflection raised ReAcc from 55.0% to 72.0%, the full system reached 91.1% accuracy, and the curator agent shrank memory by 62% (521 → 198 rules).',
                ],
            },
        ],
    },
    {
        org: 'ELITE Research Lab',
        role: 'Student Researcher',
        period: 'Sep 2026 – Present',
        location: 'Remote',
        projects: [
            {
                name: 'MIMAL',
                subtitle: 'Training-free detection of AI-generated scientific diagrams · co-first author · led implementation and experiments',
                points: [
                    'Training-free detector: splits a diagram into crops, drops blank ones, perturbs each along its db2 wavelet high-frequency band, and scores how frozen DINOv2 patch-token embeddings respond. Reaches 85.5% accuracy and 0.851 AUROC, while eight VLMs including GPT-4o and Gemini 1.5 Pro score 18.3–34.2%.',
                    'Built SciFigBench: 1,220 images pairing 610 real NeurIPS 2025 methodology diagrams with counterparts generated from the same paper context.',
                    'Stage-wise ablation: dense patch tokens lifted accuracy from 55.5% to 71.3% (82.7% of the AUROC gain); the wavelet with background masking added 14.2 points. Showed the signal runs opposite to photographs — synthetic diagrams are the stable ones.',
                ],
            },
        ],
    },
];

export const publications = [
    {
        title: 'CultAct-ML: Measuring Cultural Value Defaults in Multilingual LLM Agents Under Action',
        authors: 'Ahmad Fahmid*, Jannatul Ferdous Mim*, Md Adnan Arefeen',
        venue: 'ORACLE Workshop @ EMNLP 2026',
        status: 'Accepted',
        note: '*equal contribution',
        links: { code: 'https://github.com/alvi00/CultAct-ML', paper: '' }, // paper: add once published
    },
    {
        title: 'PRECEPT: Memory-Driven Multi-Agent Reasoning for Reliable Medical Question Answering in English and Bangla',
        authors: '', // hidden while under anonymous review
        venue: 'NAACL 2027',
        status: 'Under review',
        note: 'Introduces ReMedQA-Bangla, an item-aligned Bangla version of MedQA, MedMCQA and medical MMLU.',
        links: { code: '', paper: '' }, // add once published
    },
    {
        title: 'MIMAL: A Self-Supervised Model Is a Training-Free Detector of AI-Generated Scientific Diagrams',
        authors: 'Ahmad Fahmid*, Jannatul Ferdous Mim*, Md Kishor Morol',
        venue: 'ELITE Research Lab, 2026',
        status: 'Manuscript',
        note: '*equal contribution',
        links: { code: 'https://github.com/eliteresearchlab/mimal', paper: '' }, // paper: add once published; repo must be public before launch
    },
];

export const projects = [
    {
        name: 'MediTalk AI',
        description: 'Multimodal medical pre-diagnosis assistant. Built the intake pipeline combining OCR for medical reports, speech recognition for consultations, and image analysis for scans, with a structured summary format so clinicians can review a case quickly.',
        tags: ['OCR', 'Speech recognition', 'Medical imaging', 'LLMs'],
        link: '', // TODO(mim): project link ('' hides the button)
    },
    {
        name: 'Ask Alvi',
        description: 'Multi-model AI search engine on Next.js and Express that routes queries across multiple LLMs with retrieval augmentation and function calling, extended to image, music and video retrieval and chat-platform interfaces.',
        tags: ['Next.js', 'Express', 'RAG', 'Function calling'],
        link: '', // TODO(mim): project link ('' hides the button)
    },
    {
        name: 'Accent Recognition System',
        description: 'Fine-tuned Qwen models on accent-specific speech patterns, served inference through Groq and Mixtral for low-latency classification, and iterated until it beat pre-trained baselines.',
        tags: ['Qwen', 'Fine-tuning', 'Groq', 'Speech'],
        link: '', // TODO(mim): project link ('' hides the button)
    },
    {
        name: 'Research Paper Automation',
        description: 'Retrieval-augmented pipeline (LangChain, OpenAI) that ingests papers, answers questions against them, and returns sectioned summaries grounded in the source text.',
        tags: ['LangChain', 'RAG', 'OpenAI'],
        link: '', // TODO(mim): project link ('' hides the button)
    },
];

export const awards = [
    { title: 'Champion', event: 'NASA Space Apps Challenge', year: '2023' },
    { title: '1st Runner-Up', event: 'NASA Space Apps Challenge', year: '2025' },
    { title: '1st Place', event: 'IBM Granite Hackathon', year: '' }, // TODO(mim): year (optional)
    {
        title: 'Top-30',
        event: 'UIU Project Showcase, BUBT Hackathon, Solvio Hackathon, Lovable AI Hackathon, Co-Creating with GPT-5 Hackathon',
        year: '',
    },
];

export const skills = {
    'Research Methods & Analysis': [
        'Bootstrap confidence intervals', 'Significance testing', 'Stratified & ablation analysis',
        'Evaluation protocol & metric design', 'Benchmark construction', 'LLM robustness evaluation',
        'LLM-as-judge error analysis', 'Bangla–English multilingual evaluation', 'Reproducible pipelines',
    ],
    'Programming & Data': [
        'Python', 'SQL', 'C++', 'C', 'Java', 'JavaScript', 'TypeScript', 'Scikit-learn', 'MySQL',
        'MongoDB', 'FastAPI', 'Django', 'React.js', 'Next.js', 'Node.js', 'Git', 'Linux', 'LaTeX',
    ],
    'AI & Machine Learning': [
        'PyTorch', 'TensorFlow', 'Hugging Face Transformers', 'LoRA / PEFT', 'RAG', 'LangChain',
        'sentence-transformers', 'LaBSE', 'Multi-agent orchestration', 'Agent memory & retrieval',
        'Vision-language models', 'DINOv2', 'Computer vision', 'OCR', 'Speech recognition',
        'Medical imaging',
    ],
    Languages: ['Bangla (native)', 'English (professional working proficiency)'],
};

export const leadership = [
    {
        org: 'NSU Computer and Engineering Club',
        role: 'General Member, Corporate Team',
        period: 'Jan 2022 – Present',
        points: [
            'Run the corporate team’s communication with sponsors and guests, and host corporate guests at flagship club events.',
            'Organise professional development sessions with core members, coordinating scheduling and on-day logistics.',
        ],
    },
    {
        org: 'NSU ACM Student Chapter',
        role: 'General Member, Logistics and Team Provision',
        period: 'Jun 2022 – Feb 2023',
        points: [
            'Handled procurement, distribution and asset tracking for cross-functional teams at major events.',
        ],
    },
];

// ---------------------------------------------------------------------------
// Site copy: window titles, headings, buttons and form labels.
// Kept here so no component contains hardcoded text.
// References are NOT shown on the public site — "available on request" only.
// ---------------------------------------------------------------------------

export const site = {
    osName: 'MimOS',
    bootLine: 'Loading portfolio',
    credit: {
        text: "3D scene based on Henry Heffernan's portfolio (MIT License).",
        linkLabel: 'portfolio-website on GitHub',
        link: 'https://github.com/henryjeff/portfolio-website',
        builtWith: 'MimOS itself is built from scratch with React, TypeScript and Framer Motion.',
    },
    windows: {
        home: 'Home',
        research: 'Research',
        publications: 'Publications',
        projects: 'Projects',
        awards: 'Awards',
        skills: 'Skills',
        resume: 'Resume',
        contact: 'Contact',
        about: 'About MimOS',
    },
    headings: {
        highlights: 'Highlights',
        about: 'About',
        researchInterests: 'Research interests',
        experience: 'Research experience',
        publications: 'Publications',
        projects: 'Projects',
        awards: 'Awards',
        leadership: 'Leadership',
        skills: 'Skills',
        education: 'Education',
        resume: 'Resume',
        contact: 'Contact',
        form: 'Send a message',
    },
    buttons: {
        viewResearch: 'View Research',
        downloadCv: 'Download CV',
        contact: 'Contact',
        simpleView: 'Simple view',
        desktopView: 'Open the MimOS desktop',
        code: 'Code',
        paper: 'Paper',
        link: 'Visit',
        openPdf: 'Open in new tab',
        send: 'Send message',
        sending: 'Sending…',
        close: 'Close',
        minimize: 'Minimize',
        startMenu: 'MimOS',
    },
    labels: {
        email: 'Email',
        linkedin: 'LinkedIn',
        github: 'GitHub',
        scholar: 'Google Scholar',
    },
    contact: {
        intro: 'The fastest way to reach me is email. You can also leave a message here.',
        referencesNote: 'References available on request.',
        // TODO(mim): create a free form at https://formspree.io and replace YOUR_ID with its ID
        formspreeEndpoint: 'https://formspree.io/f/YOUR_ID',
        fields: { name: 'Name', email: 'Email', message: 'Message' },
        placeholders: { name: 'Your name', email: 'you@example.com', message: 'Hi Mim, …' },
        success: 'Thanks! Your message was sent.',
        error: 'Sorry, the message could not be sent. Please email me directly instead.',
    },
    resume: {
        intro: 'A preview of my CV. Download it for the full PDF.',
        fallback: 'Your browser cannot show the PDF here.',
    },
    menu: {
        apps: 'Apps',
        system: 'System',
    },
};
