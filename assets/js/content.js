// Edita este archivo o usa editor.html para cambiar el contenido del portfolio.
window.defaultPortfolioContent = {
    navigation: [
        { label: 'Proyectos', href: '#proyectos' },
        { label: 'Experiencia', href: '#experiencia' },
        { label: 'Skills', href: '#skills' },
        { label: 'Formación', href: '#formacion' },
        { label: 'Certificados', href: '#certificados' },
        { label: 'Contacto', href: '#contacto' }
    ],

    headerCta: {
        label: 'Descargar CV',
        href: 'assets/docs/cv-jorge-castillo.pdf'
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
        description: 'Junior Backend Developer enfocado en Python, Java/Spring Boot, APIs, automatización e IA aplicada. Construyo herramientas internas, integraciones y flujos con n8n, OpenAI API, SQL, Docker, Nginx y VPS, con mentalidad práctica: entender el problema, desarrollar una solución mantenible y llevarla a producción.',
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
                text: 'Python, Java, Spring Boot, Django, REST APIs y SQL'
            },
            {
                title: 'Automatización + IA',
                text: 'n8n, OpenAI API, webhooks, JSON e integraciones'
            },
            {
                title: 'Deploy',
                text: 'Docker, Linux, Nginx, HTTPS, Coolify y VPS'
            }
        ]
    },

    features: [
        {
            icon: '01',
            title: 'Backend mantenible',
            description: 'Desarrollo APIs, lógica de negocio, modelos de datos y servicios con una estructura clara para que el proyecto pueda crecer sin volverse caótico.'
        },
        {
            icon: '02',
            title: 'Automatización práctica',
            description: 'Conecto formularios, APIs, webhooks, email y herramientas internas para reducir tareas manuales y mejorar la velocidad de respuesta.'
        },
        {
            icon: '03',
            title: 'Deploy con criterio',
            description: 'Preparo entornos en Linux con Docker, Nginx, HTTPS y VPS para publicar proyectos reales y entender el ciclo completo de entrega.'
        }
    ],

    projects: {
        eyebrow: 'Proyectos',
        title: 'Proyectos destacados',
        copy: 'Casos prácticos orientados a backend, automatización, IA aplicada, APIs y despliegue. Cada proyecto está pensado para resolver un problema concreto y demostrar trabajo real.',
        items: [
            {
                label: 'IA · Automatización',
                title: 'Calculadora de afinidad CV-oferta',
                description: 'Herramienta para comparar una oferta de empleo con un CV y generar una puntuación de afinidad. El objetivo es aplicar IA a un problema real de selección: detectar encaje, brechas técnicas y mejoras del perfil.',
                tags: ['Python', 'IA aplicada', 'APIs', 'Automatización'],
                links: [
                    { label: 'Ver código', href: 'https://github.com/JorgeCastilloReyesGIT/calculadora_de_afinidad' }
                ]
            },
            {
                label: 'Portfolio · Marca personal',
                title: 'Portfolio personal para procesos de selección',
                description: 'Portfolio profesional con contenido editable, secciones dinámicas, CV descargable y estructura pensada para mostrar experiencia, proyectos y stack técnico de forma clara para recruiters y equipos técnicos.',
                tags: ['HTML', 'CSS', 'JavaScript', 'UX', 'GitHub'],
                links: [
                    { label: 'Ver código', href: 'https://github.com/JorgeCastilloReyesGIT/portfolio_personal' }
                ]
            },
            {
                label: 'Web · n8n · Leads',
                title: 'Captación automatizada de contactos',
                description: 'Web conectada a flujos de n8n mediante webhooks para recibir formularios, enviar avisos internos y preparar respuestas profesionales. Demuestra integración entre frontend, automatización y procesos comerciales.',
                tags: ['HTML', 'CSS', 'JavaScript', 'n8n', 'Webhooks'],
                links: [
                    { label: 'Ver portfolio', href: 'https://github.com/JorgeCastilloReyesGIT/portfolio_personal' }
                ]
            },
            {
                label: 'Deploy · Infraestructura',
                title: 'Despliegue de servicios en VPS',
                description: 'Configuración de servicios en servidor Linux con Docker, Nginx, dominios, HTTPS y herramientas de administración. Proyecto orientado a entender producción, logs, proxy inverso y mantenimiento básico.',
                tags: ['Linux', 'Docker', 'Nginx', 'VPS', 'HTTPS']
            },
            {
                label: 'Backend · APIs',
                title: 'APIs REST con Java y Django',
                description: 'Desarrollo de servicios backend con estructura por capas, persistencia con ORM, conexión a PostgreSQL y endpoints REST pensados para aplicaciones web o móviles.',
                tags: ['Java', 'Spring Boot', 'Django', 'REST APIs', 'PostgreSQL']
            },
            {
                label: 'Automatización · n8n',
                title: 'Flujos internos con webhooks y avisos',
                description: 'Automatizaciones para conectar formularios, avisos internos, email y herramientas externas mediante webhooks, JSON y APIs. Enfoque práctico: reducir pasos manuales y acelerar la respuesta.',
                tags: ['n8n', 'Webhooks', 'JSON', 'Email', 'APIs']
            },
            {
                label: 'IA aplicada · Herramientas',
                title: 'Integraciones con OpenAI API',
                description: 'Pruebas y herramientas internas usando OpenAI API para generar respuestas, analizar texto y apoyar flujos de automatización. Uso de IA con foco en utilidad real, no como efecto visual.',
                tags: ['OpenAI API', 'IA aplicada', 'Python', 'Automatización']
            }
        ]
    },

    skills: {
        eyebrow: 'Skills',
        title: 'Tecnologías y herramientas',
        copy: 'Stack centrado en backend, automatización, integración con APIs, IA aplicada y despliegue de proyectos reales.',
        items: [
            'Python',
            'Java',
            'Spring Boot',
            'Django',
            'Django REST Framework',
            'REST APIs',
            'JPA / Hibernate',
            'Maven / Gradle',
            'PostgreSQL',
            'MySQL',
            'SQLite',
            'SQL',
            'n8n',
            'Webhooks',
            'JSON',
            'API Integration',
            'OpenAI API',
            'AI Automation',
            'Docker',
            'Linux',
            'Nginx',
            'VPS',
            'HTTPS',
            'SSH',
            'Portainer',
            'Coolify',
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
        copy: 'Experiencia práctica en desarrollo, backend, automatización y soporte técnico. Mi valor está en combinar código, integración y contexto real de negocio.',
        items: [
            {
                featured: true,
                period: 'Noviembre 2025 - Hoy',
                role: 'Programador Junior Python',
                company: 'Halltic Tech S.L.',
                location: 'Madrid',
                mode: 'Híbrido',
                pills: ['Contrato de prácticas', 'Backend', 'Python'],
                bullets: [
                    'Desarrollo backend en Python para aplicaciones empresariales y herramientas internas.',
                    'Creación y adaptación de vistas, reportes e interfaces con XML, JavaScript, HTML y CSS.',
                    'Modelado y gestión de datos mediante ORM y PostgreSQL.',
                    'Configuración de roles, permisos, reglas de acceso y procesos automatizados.',
                    'Trabajo con Git, JSON y tareas de programación orientadas a necesidades reales de empresa.',
                    'Refactorización, migración de código y adaptación de módulos a nuevas versiones.'
                ]
            },
            {
                period: '2025',
                role: 'Desarrollador de Software Full Stack',
                company: 'UTAI SOFTWARE',
                pills: ['APIs', 'Backend', 'IA aplicada'],
                bullets: [
                    'Desarrollo de APIs REST con Java, Spring Boot, Django y Django REST Framework.',
                    'Gestión de persistencia con JPA/Hibernate y PostgreSQL.',
                    'Creación de interfaces web con HTML, CSS, JavaScript y Bootstrap.',
                    'Integración de funcionalidades de IA mediante la API de OpenAI.',
                    'Colaboración en soluciones orientadas a conectar backend, datos y experiencia de usuario.'
                ]
            },
            {
                period: '2023',
                role: 'Técnico Operaciones N1',
                company: 'WESTCON COMSTOR',
                pills: ['Soporte', 'Operaciones', 'Seguridad'],
                bullets: [
                    'Resolución de alertas y tickets técnicos en entorno operativo.',
                    'Contacto con herramientas y entornos de seguridad como Fortigate y Palo Alto.',
                    'Seguimiento de incidencias, respuesta operativa y comunicación con equipos técnicos.'
                ]
            }
        ]
    },

    about: {
        eyebrow: 'Sobre mí',
        title: 'Perfil técnico con mentalidad resolutiva',
        description: 'Soy desarrollador junior con base en software, sistemas y redes. Me interesa construir soluciones útiles: APIs, automatizaciones, herramientas internas, integraciones con IA y despliegues controlados. Aprendo rápido, trabajo con orden y busco aportar valor desde tareas reales.',
        cards: [
            {
                title: 'Mentalidad',
                text: 'Entender primero el problema, después construir una solución simple, mantenible y útil.'
            },
            {
                title: 'Fortaleza',
                text: 'Combino backend, automatización y despliegue para entender el ciclo completo de una solución.'
            },
            {
                title: 'Forma de trabajar',
                text: 'Me gusta documentar, usar Git con orden, comunicar claro y dejar una base limpia para seguir iterando.'
            },
            {
                title: 'Objetivo',
                text: 'Crecer como backend developer en un equipo donde pueda aportar, aprender buenas prácticas y construir producto real.'
            }
        ]
    },

    education: {
        eyebrow: 'Formación',
        title: 'Formación técnica',
        copy: 'Base técnica en desarrollo, sistemas y redes. Esta combinación me ayuda a entender tanto el código como el entorno donde se ejecuta.',
        items: [
            {
                period: '2023 - 2025',
                title: 'F.P. Grado Superior en Desarrollo de Aplicaciones Multiplataforma',
                place: 'IES Pío Baroja',
                text: 'Formación en programación, backend, bases de datos, interfaces gráficas, APIs, programación orientada a objetos y desarrollo multiplataforma.'
            },
            {
                period: '2021 - 2023',
                title: 'F.P. Grado Medio en Sistemas Microinformáticos y Redes',
                place: 'CFPE Fundación Tomillo',
                text: 'Base técnica en sistemas, redes, servidores, mantenimiento, soporte y administración de entornos informáticos.'
            },
            {
                period: '2019 - 2021',
                title: 'F.P. Básica en Informática y Comunicaciones',
                place: 'CFPE Fundación Tomillo',
                text: 'Primeros fundamentos en informática, soporte, herramientas de oficina, hardware y conocimientos técnicos esenciales.'
            }
        ]
    },

    certificates: {
        eyebrow: 'Certificados',
        title: 'Formación complementaria',
        copy: 'Certificados y formación complementaria relacionada con programación, automatización, backend e IA aplicada.',
        windowLabel: 'certificados.dev',
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

    contact: {
        eyebrow: 'Contacto',
        title: 'Busco mi siguiente oportunidad',
        copy: 'Si buscas un perfil junior con buena base técnica, aprendizaje rápido y ganas reales de aportar en backend, automatización, APIs o despliegue, estaré encantado de hablar contigo.',
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
            { label: 'Descargar CV', href: 'assets/docs/cv-jorge-castillo.pdf', variant: 'secondary' }
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
