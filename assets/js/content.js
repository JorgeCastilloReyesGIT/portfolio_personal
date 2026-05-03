// Edita este archivo o usa editor.html para cambiar el contenido del portfolio.
window.defaultPortfolioContent = {
    navigation: [
        { label: 'Proyectos', href: '#proyectos' },
        { label: 'Experiencia', href: '#experiencia' },
        { label: 'Skills', href: '#skills' },
        { label: 'Formación', href: '#formacion' },
        { label: 'Sobre mí', href: '#sobre-mi' },
        { label: 'Contacto', href: '#contacto' }
    ],

    headerCta: {
        label: 'Hablemos',
        href: '#contacto'
    },

    sectionOrder: [
        'hero',
        'features',
        'projects',
        'skills',
        'experience',
        'about',
        'education',
        'certificates',
        'contact'
    ],

    hero: {
        titleFirst: 'Jorge',
        titleLast: 'Castillo',
        description: 'Desarrollador junior enfocado en backend, automatización e IA aplicada. Trabajo con Java, Spring Boot, Python, Django y SQL para construir APIs, herramientas internas e integraciones reales. También uso n8n, OpenAI API, Docker, Nginx y VPS para crear soluciones útiles desde la idea hasta producción.',
        photo: {
            src: 'assets/img/selfie.jpg',
            alt: 'Retrato profesional de Jorge Castillo'
        },
        actions: [
            { label: 'Ver proyectos →', href: '#proyectos', variant: 'primary' },
            { label: 'Descargar CV', href: 'assets/docs/cv-jorge-castillo.pdf', variant: 'secondary' }

        ],
        stats: [
            {
                title: 'Backend',
                text: 'Java, Spring Boot, Python, Django y SQL'
            },
            {
                title: 'Automatización + IA',
                text: 'n8n, OpenAI API, webhooks e integraciones'
            },
            {
                title: 'Deploy',
                text: 'Docker, Linux, Nginx, Coolify y VPS'
            }
        ]
    },

    features: [
        {
            icon: '01',
            title: 'Backend que resuelve',
            description: 'Construyo APIs, lógica de negocio y acceso a datos con una base limpia para que el producto sea mantenible y pueda crecer.'
        },
        {
            icon: '02',
            title: 'Automatización útil',
            description: 'Creo flujos con n8n y APIs para conectar herramientas, reducir trabajo manual y acelerar tareas repetitivas.'
        },
        {
            icon: '03',
            title: 'Deploy con criterio',
            description: 'Puedo preparar entornos con Docker, Portainer, Coolify y VPS para publicar proyectos y dejarlos funcionando con orden.'
        }
    ],

    projects: {
        eyebrow: 'Proyectos',
        title: 'Proyectos destacados',
        copy: 'Proyectos propios y casos prácticos donde aplico backend, automatización, APIs, IA y despliegue en entornos reales.',
        items: [
            {
                label: 'IA · Automatización',
                title: 'Calculadora de afinidad CV-oferta',
                description: 'Aplicación pensada para analizar una oferta de empleo, compararla con un CV y generar una puntuación de afinidad usando IA, APIs y lógica de negocio.',
                tags: ['IA', 'APIs', 'Python', 'Automatización'],
                links: [
                    { label: 'Ver código', href: 'https://github.com/JorgeCastilloReyesGIT/calculadora_de_afinidad' }
                ]
            },
            {
                label: 'Web · n8n · Leads',
                title: 'Web profesional con captación automatizada',
                description: 'Página web conectada a n8n mediante webhooks para recibir formularios, enviar avisos internos y automatizar respuestas profesionales por email.',
                tags: ['HTML', 'CSS', 'JavaScript', 'n8n', 'Webhooks']
            },
            {
                label: 'Deploy · Infraestructura',
                title: 'Despliegue de servicios en VPS',
                description: 'Configuración de servicios en servidor Linux con Docker, Nginx, dominios, HTTPS, Portainer y herramientas de administración para publicar proyectos reales.',
                tags: ['Linux', 'Docker', 'Nginx', 'VPS', 'HTTPS']
            }
        ]
    },

    skills: {
        eyebrow: 'Skills',
        title: 'Tecnologías y herramientas',
        copy: 'Stack orientado a desarrollo backend, automatización de procesos, integración con APIs, IA aplicada y despliegue de proyectos reales.',
        items: [
            'Java',
            'Spring Boot',
            'JPA / Hibernate',
            'Maven / Gradle',

            'Python',
            'Django',
            'Django REST Framework',
            'REST APIs',
            'API Integration',
            'Webhooks',
            'JSON',

            'PostgreSQL',
            'MySQL',
            'SQLite',
            'SQL',

            'n8n',
            'Automation Workflows',
            'OpenAI API',
            'AI Automation',

            'Docker',
            'Portainer',
            'Coolify',
            'VPS',
            'Linux',
            'Nginx',
            'SSH',
            'HTTPS',

            'Git',
            'GitHub',

            'HTML',
            'CSS',
            'JavaScript',
            'Bootstrap',
            'Testing básico'
        ]
    },

    experience: {
        eyebrow: 'Experiencia',
        title: 'Experiencia profesional',
        copy: 'Mi recorrido mezcla desarrollo, operaciones y soporte. Eso me ayuda a entender mejor el producto, la entrega y el contexto real del negocio.',
        items: [
            {
                status: 'Certificado',
                title: 'Python',
                image: {
                    src: '',
                    alt: 'Certificado Python Santander Open Academy'
                },
                text: 'Santander Open Academy · Formación en fundamentos de Python y programación.'
            },
            {
                status: 'Certificado',
                title: 'IA aplicada al entorno de trabajo',
                image: {
                    src: '',
                    alt: 'Certificado IA aplicada al entorno de trabajo'
                },
                text: 'thePower · Formación práctica en uso de inteligencia artificial aplicada a productividad y entorno profesional.'
            },
            {
                status: 'En progreso',
                title: 'Backend, Docker y automatización',
                image: {
                    src: '',
                    alt: 'Formación en backend, Docker y automatización'
                },
                text: 'Ampliando formación en APIs, despliegue, servidores Linux, Docker, n8n e integración de herramientas con IA.'
            }
        ]
    },

    about: {
        eyebrow: 'Sobre mí',
        title: 'Perfil técnico con mentalidad resolutiva',
        description: 'Soy desarrollador con base en software, sistemas y redes. Me adapto rápido, aprendo nuevas herramientas con facilidad y disfruto construyendo soluciones que funcionen bien tanto en desarrollo como en producción.',
        cards: [
            {
                title: 'Mentalidad',
                text: 'Aprender rápido, aportar valor pronto y seguir mejorando con cada proyecto.'
            },
            {
                title: 'Fortaleza',
                text: 'Combino backend, automatización y despliegue para entregar soluciones más completas.'
            },
            {
                title: 'Forma de trabajar',
                text: 'Me gusta trabajar con orden, comunicar claro y dejar una base limpia para que el proyecto pueda crecer.'
            },
            {
                title: 'Objetivo',
                text: 'Incorporarme a un equipo donde pueda crecer, aportar desde el primer día y seguir ganando experiencia como developer.'
            }
        ]
    },

    education: {
        eyebrow: 'Formación',
        title: 'Formación técnica',
        copy: 'Una base técnica que une desarrollo, sistemas y redes, algo muy útil para entender el producto completo.',
        items: [
            {
                period: '2023 - 2025',
                title: 'F.P. Grado Superior en Desarrollo de Aplicaciones Multiplataforma',
                place: 'IES Pío Baroja',
                text: 'Profundización en backend, bases de datos, interfaces gráficas, programación orientada a objetos y desarrollo de software multiplataforma.'
            },
            {
                period: '2021 - 2023',
                title: 'F.P. Grado Medio en Sistemas Microinformáticos y Redes',
                place: 'CFPE Fundación Tomillo',
                text: 'Base técnica en sistemas, mantenimiento, redes, servidores, hardware y administración de entornos informáticos.'
            },
            {
                period: '2019 - 2021',
                title: 'F.P. Básica en Informática y Comunicaciones',
                place: 'CFPE Fundación Tomillo',
                text: 'Primeros cimientos sólidos en informática, soporte, entorno de oficina y conocimientos técnicos esenciales.'
            }
        ]
    },

    certificates: {
        eyebrow: 'Certificados',
        title: 'Formación complementaria',
        copy: 'Sección preparada para mostrar certificados, diplomas y formación técnica verificable relacionada con backend, despliegue, automatización e IA aplicada.',
        windowLabel: 'certificados.dev',
        items: [
            {
                status: 'En progreso',
                title: 'Backend, cloud y automatización',
                image: {
                    src: '',
                    alt: 'Formación en backend, cloud y automatización'
                },
                text: 'Actualmente estoy ampliando mi formación en APIs, despliegue, servidores Linux, automatización e integración de herramientas con IA.'
            },
            {
                status: 'Práctico',
                title: 'Proyectos propios',
                image: {
                    src: '',
                    alt: 'Proyectos propios de desarrollo y automatización'
                },
                text: 'Portfolio, automatizaciones con n8n, despliegues en VPS y pruebas reales con APIs, webhooks y flujos de IA aplicados a casos concretos.'
            },
            {
                status: 'Objetivo',
                title: 'Certificaciones técnicas',
                image: {
                    src: '',
                    alt: 'Certificaciones técnicas futuras'
                },
                text: 'Esta sección está lista para añadir certificados verificables de backend, Docker, cloud, bases de datos, automatización o desarrollo profesional.'
            }
        ]
    },

    contact: {
        eyebrow: 'Contacto',
        title: 'Busco mi siguiente oportunidad',
        copy: 'Si buscas un perfil junior con buena base tecnica, capacidad de adaptacion y ganas reales de aportar en backend, automatizacion o despliegue, estare encantado de hablar contigo.',
        details: [
            {
                text: 'jorge.a.castilloreyes@gmail.com',
                href: 'mailto:jorge.a.castilloreyes@gmail.com'
            },
            {
                text: '+34 645 321 979',
                href: 'tel:+34645321979'
            }
        ],
        actions: [
            { label: 'Escribirme', href: 'mailto:jorge.a.castilloreyes@gmail.com', variant: 'primary' },
            { label: 'Ver trabajo', href: '#proyectos', variant: 'secondary' }
        ],
        socials: [
            {
                short: 'GH',
                label: 'GitHub',
                href: 'https://github.com/JorgeCastilloReyesGIT'
            },
            {
                short: 'in',
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/jorge-a-castillo/'
            },
            {
                short: '@',
                label: 'Correo',
                href: 'mailto:jorge.a.castilloreyes@gmail.com'
            }
        ]
    },

    footer: {
        left: '© 2026 Jorge Castillo. Portfolio personal.',
        right: 'Backend, automatización, APIs, despliegue e IA aplicada.'
    }
};

(function bootstrapPortfolioContent() {
    const STORAGE_KEY = 'portfolioContentOverride';

    const isObject = (value) => value && typeof value === 'object' && !Array.isArray(value);
    const clone = (value) => JSON.parse(JSON.stringify(value));

    const mergeDeep = (base, override) => {
        if (Array.isArray(base)) {
            return Array.isArray(override) ? override : base;
        }

        if (!isObject(base)) {
            return override === undefined ? base : override;
        }

        const result = { ...base };

        if (!isObject(override)) {
            return result;
        }

        Object.keys(override).forEach((key) => {
            result[key] = key in base ? mergeDeep(base[key], override[key]) : override[key];
        });

        return result;
    };

    let storedContent = null;

    try {
        storedContent = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    } catch (error) {
        storedContent = null;
    }

    window.portfolioStorageKey = STORAGE_KEY;
    window.portfolioContent = storedContent
        ? mergeDeep(clone(window.defaultPortfolioContent), storedContent)
        : clone(window.defaultPortfolioContent);
})();
