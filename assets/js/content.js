// Edita este archivo o usa editor.html para cambiar el contenido del portfolio.
window.defaultPortfolioContent = {
    navigation: [
        { label: 'Proyectos', href: '#proyectos' },
        { label: 'Experiencia', href: '#experiencia' },
        { label: 'Skills', href: '#skills' },
        { label: 'Certificados', href: '#certificados' },
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
        description: 'Desarrollador de software con enfoque en backend, automatizacion y despliegue. Trabajo con Java, Spring Boot, Python, Django y SQL para construir APIs, herramientas utiles e integraciones reales. Tambien manejo n8n, Docker, Portainer, Coolify y VPS para llevar proyectos desde la idea hasta produccion.',
        photo: {
            src: 'assets/img/selfie.jpg',
            alt: 'Foto de Jorge Castillo'
        },
        actions: [
            { label: 'Ver proyectos ->', href: '#proyectos', variant: 'primary' },
            { label: 'Contactar', href: '#contacto', variant: 'secondary' }
        ],
        stats: [
            {
                title: 'Backend',
                text: 'Java, Spring Boot, Python y Django'
            },
            {
                title: 'Automatizacion',
                text: 'n8n, APIs, integraciones y flujos utiles'
            },
            {
                title: 'Deploy',
                text: 'Docker, Portainer, Coolify y VPS'
            }
        ]
    },

    features: [
        {
            icon: '01',
            title: 'Backend que resuelve',
            description: 'Construyo APIs, logica de negocio y acceso a datos con una base limpia para que el producto sea mantenible y pueda crecer.'
        },
        {
            icon: '02',
            title: 'Automatizacion util',
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
        title: 'Lo que puedo aportar',
        copy: 'Soluciones pensadas para empresa: backend, automatizacion y despliegue con foco en utilidad real.',
        items: [
            {
                label: 'Backend · Producto',
                title: 'Backends y APIs para producto',
                description: 'Desarrollo servicios con Java y Spring Boot o con Django para exponer APIs claras, conectar datos y soportar procesos reales de negocio.',
                tags: ['Spring Boot', 'Django', 'REST APIs']
            },
            {
                label: 'Automatizacion · Integracion',
                title: 'Automatizaciones con n8n',
                description: 'Diseno flujos para conectar APIs, formularios, bases de datos y tareas internas con el objetivo de ahorrar tiempo y reducir pasos manuales.',
                tags: ['n8n', 'APIs', 'Integraciones']
            },
            {
                label: 'Deploy · Infra',
                title: 'Deploy en VPS con Docker',
                description: 'Preparo entornos con Docker y gestiono servicios con Portainer o Coolify para publicar proyectos con mas control, rapidez y autonomia.',
                tags: ['Docker', 'Portainer', 'Coolify']
            }
        ]
    },

    skills: {
        eyebrow: 'Skills',
        title: 'Stack con el que trabajo',
        copy: 'Tecnologias orientadas a desarrollo backend, automatizacion de procesos y despliegue de proyectos reales.',
        items: [
            'Java',
            'Spring Boot',
            'JPA / Hibernate',
            'Python',
            'Django',
            'REST APIs',
            'n8n',
            'PostgreSQL',
            'MySQL',
            'SQLite',
            'Docker',
            'Portainer',
            'Coolify',
            'VPS',
            'Git',
            'GitHub',
            'Linux',
            'HTML',
            'CSS',
            'JavaScript',
            'Testing',
            'Maven / Gradle'
        ]
    },

    experience: {
        eyebrow: 'Experiencia',
        title: 'Experiencia profesional',
        copy: 'Mi recorrido mezcla desarrollo, operaciones y soporte. Eso me ayuda a entender mejor el producto, la entrega y el contexto real del negocio.',
        items: [
            {
                featured: true,
                period: 'Noviembre 2025 - Hoy',
                role: 'Programador Junior Python',
                company: 'Halltic Tech S.L.',
                location: 'Madrid',
                mode: 'Hibrido',
                pills: ['Contrato de practicas', 'Programador'],
                bullets: [
                    'Desarrollo y apoyo tecnico en soluciones basadas en Python para necesidades reales de empresa.',
                    'Trabajo con Git, JSON y tareas de programacion orientadas a necesidades reales de empresa.',
                    'Experiencia en entorno hibrido, aprendizaje rapido y colaboracion profesional con equipo y cliente.'
                ]
            },
            {
                period: '2025',
                role: 'Desarrollador de Software Full Stack',
                company: 'UTAI SOFTWARE',
                pills: ['Programador full stack'],
                bullets: [
                    'Creacion de interfaces web con HTML, CSS, JavaScript y Bootstrap.',
                    'Desarrollo de APIs REST con Java y Spring Boot.',
                    'Gestion de base de datos con JPA/Hibernate y PostgreSQL.',
                    'Desarrollo de APIs REST con Django y Django REST Framework.',
                    'Integracion de funcionalidades de IA mediante la API de OpenAI.'
                ]
            },
            {
                period: '2023',
                role: 'Tecnico Operaciones N1',
                company: 'WESTCON COMSTOR',
                bullets: [
                    'Resolucion de alertas y tickets.',
                    'Contacto con herramientas y entornos de seguridad como Fortigate y Palo Alto.',
                    'Experiencia practica en soporte, seguimiento y respuesta operativa.'
                ]
            }
        ]
    },

    about: {
        eyebrow: 'Sobre mi',
        title: 'Perfil tecnico con mentalidad de solucion',
        description: 'Soy desarrollador con base en software, sistemas y redes. Me adapto rapido, aprendo nuevas herramientas con facilidad y disfruto construyendo soluciones que funcionen bien tanto en desarrollo como en produccion.',
        cards: [
            {
                title: 'Mentalidad',
                text: 'Aprender rapido, aportar valor pronto y seguir mejorando con cada proyecto.'
            },
            {
                title: 'Fortaleza',
                text: 'Combino backend, automatizacion y despliegue para entregar soluciones mas completas.'
            },
            {
                title: 'Forma de trabajar',
                text: 'Me gusta trabajar con orden, comunicar claro y dejar una base limpia para que el proyecto pueda crecer.'
            },
            {
                title: 'Objetivo',
                text: 'Incorporarme a un equipo donde pueda crecer, aportar desde el primer dia y seguir ganando experiencia como developer.'
            }
        ]
    },

    education: {
        eyebrow: 'Formacion',
        title: 'Base tecnica',
        copy: 'Una base tecnica que une desarrollo, sistemas y redes, algo muy util para entender el producto completo.',
        items: [
            {
                period: '2023 - 2025',
                title: 'F.P. Grado Superior en Desarrollo de Aplicaciones Multiplataforma',
                place: 'IES Pio Baroja',
                text: 'Profundizacion en backend, bases de datos, interfaces graficas, programacion orientada a objetos y desarrollo de software multiplataforma.'
            },
            {
                period: '2021 - 2023',
                title: 'F.P. Grado Medio en Sistemas Microinformaticos y Redes',
                place: 'CFPE Fundacion Tomillo',
                text: 'Base tecnica en sistemas, mantenimiento, redes, servidores, hardware y administracion de entornos informaticos.'
            },
            {
                period: '2019 - 2021',
                title: 'F.P. Basica en Informatica y Comunicaciones',
                place: 'CFPE Fundacion Tomillo',
                text: 'Primeros cimientos solidos en informatica, soporte, entorno de oficina y conocimientos tecnicos esenciales.'
            }
        ]
    },

    certificates: {
        eyebrow: 'Certificados',
        title: 'Ventana para certificaciones',
        copy: 'He dejado esta seccion preparada para mostrar certificados, diplomas o acreditaciones tecnicas de forma clara y visual.',
        windowLabel: 'certificados.dev',
        items: [
            {
                status: 'Espacio destacado',
                title: 'Certificado principal',
                image: {
                    src: '',
                    alt: 'Vista previa del certificado principal'
                },
                text: 'Anade aqui tu certificacion mas potente con nombre del curso, entidad emisora y fecha.'
            },
            {
                status: 'Tecnico',
                title: 'Segundo certificado',
                image: {
                    src: '',
                    alt: 'Vista previa del segundo certificado'
                },
                text: 'Ideal para cursos de backend, Docker, despliegue, cloud, automatizacion o herramientas de desarrollo.'
            },
            {
                status: 'Complementario',
                title: 'Tercer certificado',
                image: {
                    src: '',
                    alt: 'Vista previa del tercer certificado'
                },
                text: 'Tambien puedes usar esta tarjeta para diplomas, cursos internos, practicas o formacion adicional relevante.'
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
            { short: 'GH', label: 'GitHub', href: '#' },
            { short: 'in', label: 'LinkedIn', href: '#' },
            { short: '@', label: 'Correo', href: 'mailto:jorge.a.castilloreyes@gmail.com' }
        ]
    },

    footer: {
        left: '© 2026 Jorge Castillo. Portfolio personal.',
        right: 'Backend, automatizacion, despliegue y ganas de seguir creciendo.'
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
