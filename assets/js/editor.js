const STORAGE_KEY = window.portfolioStorageKey || 'portfolioContentOverride';
const defaultContent = JSON.parse(JSON.stringify(window.defaultPortfolioContent || {}));
let state = JSON.parse(JSON.stringify(window.portfolioContent || defaultContent));

const sectionConfig = [
    { key: 'navigation', label: 'Menu', description: 'Enlaces que aparecen en la barra superior.' },
    { key: 'headerCta', label: 'Boton superior', description: 'CTA del header para llevar al usuario al siguiente paso.' },
    { key: 'hero', label: 'Hero', description: 'Titulo principal, texto, foto, botones y stats.' },
    { key: 'features', label: 'Bloques de valor', description: 'Mensajes rapidos para explicar lo que aportas.' },
    { key: 'projects', label: 'Proyectos', description: 'Tarjetas con lo que puedes construir o aportar.' },
    { key: 'skills', label: 'Skills', description: 'Tecnologias y herramientas que dominas.' },
    { key: 'experience', label: 'Experiencia', description: 'Puestos, contexto y logros principales.' },
    { key: 'about', label: 'Sobre mi', description: 'Perfil, fortalezas y forma de trabajar.' },
    { key: 'education', label: 'Formacion', description: 'Estudios y base tecnica.' },
    { key: 'certificates', label: 'Certificados', description: 'Ventana pensada para cursos y acreditaciones.' },
    { key: 'contact', label: 'Contacto', description: 'Mensaje final, medios de contacto y CTA.' },
    { key: 'footer', label: 'Footer', description: 'Texto inferior de cierre.' }
];

const fieldLabels = {
    navigation: 'Navegacion',
    headerCta: 'Boton superior',
    hero: 'Hero',
    features: 'Bloques de valor',
    projects: 'Proyectos',
    skills: 'Skills',
    experience: 'Experiencia',
    about: 'Sobre mi',
    education: 'Formacion',
    certificates: 'Certificados',
    contact: 'Contacto',
    footer: 'Footer',
    titleFirst: 'Nombre',
    titleLast: 'Apellido',
    description: 'Descripcion',
    photo: 'Foto',
    src: 'Ruta de la imagen',
    alt: 'Texto alternativo',
    actions: 'Botones',
    stats: 'Estadisticas',
    label: 'Texto',
    href: 'Enlace',
    variant: 'Estilo',
    title: 'Titulo',
    text: 'Texto',
    icon: 'Icono',
    items: 'Items',
    eyebrow: 'Etiqueta',
    copy: 'Texto secundario',
    role: 'Cargo',
    company: 'Empresa',
    location: 'Ubicacion',
    mode: 'Modalidad',
    pills: 'Etiquetas',
    bullets: 'Puntos',
    featured: 'Destacado',
    period: 'Periodo',
    place: 'Centro o lugar',
    cards: 'Tarjetas',
    details: 'Medios de contacto',
    socials: 'Redes',
    short: 'Sigla',
    status: 'Estado',
    windowLabel: 'Nombre de la ventana',
    left: 'Texto izquierdo',
    right: 'Texto derecho'
};

const statusNode = document.getElementById('editorStatus');
const panelsNode = document.getElementById('editorPanels');
const navNode = document.getElementById('sectionNav');
const summaryNode = document.getElementById('summaryCards');
const sectionMetaMap = Object.fromEntries(sectionConfig.map((section) => [section.key, section]));

let draggedSectionKey = null;

const isObject = (value) => value && typeof value === 'object' && !Array.isArray(value);
const deepClone = (value) => JSON.parse(JSON.stringify(value));
const safeArray = (value) => Array.isArray(value) ? value : [];

const escapeHtml = (value) => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const pathToString = (path) => path.map(String).join('.');
const stringToPath = (value) => value.split('.').map((part) => (String(Number(part)) === part ? Number(part) : part));

const labelFor = (key) => {
    if (fieldLabels[key]) {
        return fieldLabels[key];
    }

    return key
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/_/g, ' ')
        .replace(/^./, (char) => char.toUpperCase());
};

const singularize = (label) => label.endsWith('s') ? label.slice(0, -1) : label;

const getValueByPath = (source, path) => path.reduce((accumulator, key) => {
    if (accumulator === undefined || accumulator === null) {
        return undefined;
    }

    return accumulator[key];
}, source);

const setValueByPath = (source, path, value) => {
    let current = source;

    for (let index = 0; index < path.length - 1; index += 1) {
        current = current[path[index]];
    }

    current[path[path.length - 1]] = value;
};

const removeAtPath = (source, path) => {
    const parentPath = path.slice(0, -1);
    const index = path[path.length - 1];
    const parent = getValueByPath(source, parentPath);

    if (Array.isArray(parent)) {
        parent.splice(index, 1);
    }
};

const blankFromTemplate = (template, key = '') => {
    if (Array.isArray(template)) {
        return [];
    }

    if (isObject(template)) {
        const result = {};
        Object.entries(template).forEach(([childKey, childValue]) => {
            result[childKey] = blankFromTemplate(childValue, childKey);
        });
        return result;
    }

    if (typeof template === 'boolean') {
        return false;
    }

    if (typeof template === 'number') {
        return 0;
    }

    if (key === 'variant') {
        return template || 'primary';
    }

    return '';
};

const getArrayTemplate = (path) => {
    const defaultArray = getValueByPath(defaultContent, path);
    if (Array.isArray(defaultArray) && defaultArray.length > 0) {
        return blankFromTemplate(defaultArray[0]);
    }

    const currentArray = getValueByPath(state, path);
    if (Array.isArray(currentArray) && currentArray.length > 0) {
        return blankFromTemplate(currentArray[0]);
    }

    return '';
};

const sectionCount = (key, value) => {
    if (Array.isArray(value)) {
        return `${value.length} items`;
    }

    switch (key) {
    case 'hero':
        return `${safeArray(value && value.stats).length} stats`;
    case 'projects':
    case 'experience':
    case 'education':
    case 'certificates':
        return `${safeArray(value && value.items).length} items`;
    case 'skills':
        return `${safeArray(value && value.items).length} skills`;
    case 'about':
        return `${safeArray(value && value.cards).length} tarjetas`;
    case 'contact':
        return `${safeArray(value && value.details).length} contactos`;
    case 'footer':
        return '2 textos';
    default:
        return '1 bloque';
    }
};

const setStatus = (message, type = 'idle') => {
    statusNode.textContent = message;
    statusNode.dataset.status = type;
};

const getOrderedPanelConfig = () => {
    const staticStart = ['navigation', 'headerCta'];
    const staticEnd = ['footer'];
    const used = new Set();
    const orderedKeys = [];

    [...staticStart, ...safeArray(state.sectionOrder), ...staticEnd].forEach((key) => {
        if (sectionMetaMap[key] && !used.has(key)) {
            orderedKeys.push(key);
            used.add(key);
        }
    });

    sectionConfig.forEach((section) => {
        if (!used.has(section.key)) {
            orderedKeys.push(section.key);
            used.add(section.key);
        }
    });

    return orderedKeys.map((key) => sectionMetaMap[key]);
};

const renderSectionNav = () => {
    navNode.innerHTML = safeArray(state.sectionOrder).map((sectionKey, index) => {
        const section = sectionMetaMap[sectionKey];
        if (!section) {
            return '';
        }

        return `
            <div class="sortable-section" draggable="true" data-section-key="${escapeHtml(section.key)}" data-scroll-target="panel-${escapeHtml(section.key)}">
                <span class="drag-handle">::</span>
                <span class="sortable-section-label">${escapeHtml(section.label)}</span>
                <span class="sortable-section-order">${escapeHtml(index + 1)}</span>
            </div>
        `;
    }).join('');
};

const clearDropMarkers = () => {
    navNode.querySelectorAll('.sortable-section').forEach((item) => {
        item.classList.remove('drop-before', 'drop-after', 'is-dragging');
        delete item.dataset.dropPosition;
    });
};

const reorderSections = (draggedKey, targetKey, position) => {
    const order = [...safeArray(state.sectionOrder)];
    const draggedIndex = order.indexOf(draggedKey);
    const targetIndex = order.indexOf(targetKey);

    if (draggedIndex === -1 || targetIndex === -1 || draggedKey === targetKey) {
        return;
    }

    order.splice(draggedIndex, 1);

    const adjustedTargetIndex = order.indexOf(targetKey);
    const insertionIndex = position === 'after' ? adjustedTargetIndex + 1 : adjustedTargetIndex;

    order.splice(insertionIndex, 0, draggedKey);
    state.sectionOrder = order;
};

const handleSectionDropPosition = (item, clientY) => {
    const rect = item.getBoundingClientRect();
    const position = clientY < rect.top + rect.height / 2 ? 'before' : 'after';

    clearDropMarkers();
    item.classList.add(position === 'before' ? 'drop-before' : 'drop-after');

    const draggingItem = navNode.querySelector(`[data-section-key="${draggedSectionKey}"]`);
    if (draggingItem) {
        draggingItem.classList.add('is-dragging');
    }

    item.dataset.dropPosition = position;
    return position;
};

const setupSectionDragAndDrop = () => {
    navNode.addEventListener('click', (event) => {
        const target = event.target.closest('[data-scroll-target]');
        if (!target) {
            return;
        }

        const panel = document.getElementById(target.dataset.scrollTarget);
        if (panel) {
            panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    navNode.addEventListener('dragstart', (event) => {
        const item = event.target.closest('.sortable-section');
        if (!item) {
            return;
        }

        draggedSectionKey = item.dataset.sectionKey;
        item.classList.add('is-dragging');
        event.dataTransfer.effectAllowed = 'move';
    });

    navNode.addEventListener('dragover', (event) => {
        event.preventDefault();
        const item = event.target.closest('.sortable-section');
        if (!item || item.dataset.sectionKey === draggedSectionKey) {
            return;
        }

        handleSectionDropPosition(item, event.clientY);
    });

    navNode.addEventListener('drop', (event) => {
        event.preventDefault();
        const item = event.target.closest('.sortable-section');
        if (!item || !draggedSectionKey) {
            clearDropMarkers();
            return;
        }

        const position = item.dataset.dropPosition || handleSectionDropPosition(item, event.clientY);
        reorderSections(draggedSectionKey, item.dataset.sectionKey, position);
        draggedSectionKey = null;
        clearDropMarkers();
        renderAll();
        setStatus('Orden de secciones actualizado.', 'success');
    });

    navNode.addEventListener('dragend', () => {
        draggedSectionKey = null;
        clearDropMarkers();
    });
};

const renderSummary = () => {
    const summaryItems = [
        { title: safeArray(state.projects && state.projects.items).length, text: 'bloques de proyecto' },
        { title: safeArray(state.experience && state.experience.items).length, text: 'experiencias cargadas' },
        { title: safeArray(state.skills && state.skills.items).length, text: 'skills visibles' },
        { title: safeArray(state.certificates && state.certificates.items).length, text: 'espacios para certificados' }
    ];

    summaryNode.innerHTML = summaryItems.map((item) => `
        <article class="summary-card">
            <strong>${escapeHtml(item.title)}</strong>
            <span>${escapeHtml(item.text)}</span>
        </article>
    `).join('');
};

const buildPreview = (key, value) => {
    switch (key) {
    case 'navigation':
        return `
            <div class="preview-tags">
                ${safeArray(value).map((item) => `<span class="preview-tag">${escapeHtml(item.label)}</span>`).join('')}
            </div>
        `;
    case 'headerCta':
        return `
            <div class="preview-item">
                <strong>${escapeHtml(value.label)}</strong>
                <span>${escapeHtml(value.href)}</span>
            </div>
        `;
    case 'hero':
        return `
            <div class="preview-title">${escapeHtml(value.titleFirst)} ${escapeHtml(value.titleLast)}</div>
            <p class="preview-copy">${escapeHtml(value.description)}</p>
            <div class="preview-tags">
                ${safeArray(value.stats).map((item) => `<span class="preview-tag">${escapeHtml(item.title)}</span>`).join('')}
            </div>
        `;
    case 'features':
        return `
            <div class="preview-list">
                ${safeArray(value).map((item) => `
                    <div class="preview-item">
                        <strong>${escapeHtml(item.title)}</strong>
                        <span>${escapeHtml(item.description)}</span>
                    </div>
                `).join('')}
            </div>
        `;
    case 'projects':
    case 'experience':
    case 'education':
    case 'certificates': {
        const list = safeArray(value.items).map((item) => {
            const title = item.title || item.role || item.status || item.period;
            const subtitle = item.description || item.text || item.company || item.place || '';

            return `
                <div class="preview-item">
                    <strong>${escapeHtml(title)}</strong>
                    <span>${escapeHtml(subtitle)}</span>
                </div>
            `;
        }).join('');

        return `<div class="preview-list">${list}</div>`;
    }
    case 'skills':
        return `
            <div class="preview-tags">
                ${safeArray(value.items).map((item) => `<span class="preview-tag">${escapeHtml(item)}</span>`).join('')}
            </div>
        `;
    case 'about':
        return `
            <div class="preview-title">${escapeHtml(value.title)}</div>
            <p class="preview-copy">${escapeHtml(value.description)}</p>
            <div class="preview-list">
                ${safeArray(value.cards).map((item) => `
                    <div class="preview-item">
                        <strong>${escapeHtml(item.title)}</strong>
                        <span>${escapeHtml(item.text)}</span>
                    </div>
                `).join('')}
            </div>
        `;
    case 'contact':
        return `
            <div class="preview-title">${escapeHtml(value.title)}</div>
            <p class="preview-copy">${escapeHtml(value.copy)}</p>
            <div class="preview-tags">
                ${safeArray(value.details).map((item) => `<span class="preview-tag">${escapeHtml(item.text)}</span>`).join('')}
            </div>
        `;
    case 'footer':
        return `
            <div class="preview-item">
                <strong>${escapeHtml(value.left)}</strong>
                <span>${escapeHtml(value.right)}</span>
            </div>
        `;
    default:
        return `<div class="preview-item"><span>Vista previa no disponible.</span></div>`;
    }
};

const shouldUseTextarea = (key, value) => {
    if (typeof value !== 'string') {
        return false;
    }

    return ['description', 'copy', 'text'].includes(key) || value.length > 80;
};

const renderPrimitiveField = (path, key, value, label) => {
    const pathString = pathToString(path);

    if (typeof value === 'boolean') {
        return `
            <label class="toggle-field">
                <span class="field-title">${escapeHtml(label)}</span>
                <span class="toggle-control">
                    <input class="editor-checkbox" data-path="${escapeHtml(pathString)}" type="checkbox" ${value ? 'checked' : ''} />
                    <span>${value ? 'Si' : 'No'}</span>
                </span>
            </label>
        `;
    }

    if (key === 'variant') {
        return `
            <label class="form-field">
                <span class="field-title">${escapeHtml(label)}</span>
                <select class="editor-select" data-path="${escapeHtml(pathString)}">
                    <option value="primary" ${value === 'primary' ? 'selected' : ''}>primary</option>
                    <option value="secondary" ${value === 'secondary' ? 'selected' : ''}>secondary</option>
                </select>
            </label>
        `;
    }

    if (shouldUseTextarea(key, value)) {
        return `
            <label class="form-field">
                <span class="field-title">${escapeHtml(label)}</span>
                <textarea class="editor-input editor-input-area" data-path="${escapeHtml(pathString)}">${escapeHtml(value)}</textarea>
            </label>
        `;
    }

    return `
        <label class="form-field">
            <span class="field-title">${escapeHtml(label)}</span>
            <input class="editor-input" data-path="${escapeHtml(pathString)}" type="text" value="${escapeHtml(value)}" />
        </label>
    `;
};

const getArrayItemTitle = (item, index, label) => {
    if (isObject(item)) {
        return item.label || item.title || item.role || item.status || item.period || `${singularize(label)} ${index + 1}`;
    }

    return `${singularize(label)} ${index + 1}`;
};

const renderFieldGroup = (path, key, value, isNested = false) => {
    const label = labelFor(key);

    if (Array.isArray(value)) {
        const pathString = pathToString(path);
        return `
            <div class="form-card">
                <div class="form-array-head">
                    <div>
                        <span class="field-title">${escapeHtml(label)}</span>
                        <span class="field-subtitle">${escapeHtml(`${value.length} elementos`)}</span>
                    </div>
                    <button class="mini-btn" type="button" data-action="add-item" data-path="${escapeHtml(pathString)}">Añadir</button>
                </div>

                <div class="form-array-list">
                    ${value.length ? value.map((item, index) => {
                        const itemPath = [...path, index];
                        const itemPathString = pathToString(itemPath);
                        const itemTitle = getArrayItemTitle(item, index, label);

                        if (isObject(item)) {
                            return `
                                <article class="array-item-card">
                                    <div class="array-item-head">
                                        <strong>${escapeHtml(itemTitle)}</strong>
                                        <button class="mini-btn mini-btn-danger" type="button" data-action="remove-item" data-path="${escapeHtml(itemPathString)}">Eliminar</button>
                                    </div>
                                    <div class="field-stack">
                                        ${Object.entries(item).map(([childKey, childValue]) => renderFieldGroup([...itemPath, childKey], childKey, childValue, true)).join('')}
                                    </div>
                                </article>
                            `;
                        }

                        return `
                            <article class="array-item-card">
                                <div class="array-item-head">
                                    <strong>${escapeHtml(itemTitle)}</strong>
                                    <button class="mini-btn mini-btn-danger" type="button" data-action="remove-item" data-path="${escapeHtml(itemPathString)}">Eliminar</button>
                                </div>
                                ${renderPrimitiveField(itemPath, key, item, labelFor(key))}
                            </article>
                        `;
                    }).join('') : '<div class="empty-state">Todavia no hay elementos. Usa "Añadir".</div>'}
                </div>
            </div>
        `;
    }

    if (isObject(value)) {
        const innerFields = Object.entries(value).map(([childKey, childValue]) => renderFieldGroup([...path, childKey], childKey, childValue, true)).join('');

        if (!isNested) {
            return `<div class="field-stack">${innerFields}</div>`;
        }

        return `
            <div class="form-card">
                <div class="form-card-title">${escapeHtml(label)}</div>
                <div class="field-stack">
                    ${innerFields}
                </div>
            </div>
        `;
    }

    return renderPrimitiveField(path, key, value, label);
};

const renderPanels = () => {
    panelsNode.innerHTML = getOrderedPanelConfig().map((section) => `
        <section class="editor-panel" id="panel-${section.key}">
            <div class="panel-head">
                <div>
                    <span class="panel-kicker">${escapeHtml(section.label)}</span>
                    <h2>${escapeHtml(section.label)}</h2>
                    <p class="panel-description">${escapeHtml(section.description)}</p>
                </div>
                <div class="panel-meta" id="meta-${section.key}">${escapeHtml(sectionCount(section.key, state[section.key]))}</div>
            </div>

            <div class="panel-grid">
                <div class="editor-field">
                    ${renderFieldGroup([section.key], section.key, state[section.key])}
                </div>

                <div class="preview-box">
                    <span class="field-label">Vista previa</span>
                    <div class="preview-content" id="preview-${section.key}">
                        ${buildPreview(section.key, state[section.key])}
                    </div>
                </div>
            </div>
        </section>
    `).join('');
};

const updateSectionPreview = (sectionKey) => {
    const previewNode = document.getElementById(`preview-${sectionKey}`);
    const metaNode = document.getElementById(`meta-${sectionKey}`);

    if (previewNode) {
        previewNode.innerHTML = buildPreview(sectionKey, state[sectionKey]);
    }

    if (metaNode) {
        metaNode.textContent = sectionCount(sectionKey, state[sectionKey]);
    }

    renderSectionNav();
    renderSummary();
};

const renderAll = () => {
    renderSectionNav();
    renderSummary();
    renderPanels();
};

const serializeContentFile = (data) => {
    const dataJson = JSON.stringify(data, null, 4);

    return `// Edita este archivo o usa editor.html para cambiar el contenido del portfolio.\nwindow.defaultPortfolioContent = ${dataJson};\n\n(function bootstrapPortfolioContent() {\n    const STORAGE_KEY = 'portfolioContentOverride';\n\n    const isObject = (value) => value && typeof value === 'object' && !Array.isArray(value);\n    const clone = (value) => JSON.parse(JSON.stringify(value));\n\n    const mergeDeep = (base, override) => {\n        if (Array.isArray(base)) {\n            return Array.isArray(override) ? override : base;\n        }\n\n        if (!isObject(base)) {\n            return override === undefined ? base : override;\n        }\n\n        const result = { ...base };\n\n        if (!isObject(override)) {\n            return result;\n        }\n\n        Object.keys(override).forEach((key) => {\n            result[key] = key in base ? mergeDeep(base[key], override[key]) : override[key];\n        });\n\n        return result;\n    };\n\n    let storedContent = null;\n\n    try {\n        storedContent = JSON.parse(window.localStorage.getItem(STORAGE_KEY));\n    } catch (error) {\n        storedContent = null;\n    }\n\n    window.portfolioStorageKey = STORAGE_KEY;\n    window.portfolioContent = storedContent\n        ? mergeDeep(clone(window.defaultPortfolioContent), storedContent)\n        : clone(window.defaultPortfolioContent);\n})();\n`;
};

const saveToLocal = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    setStatus('Cambios guardados. Recarga index.html para verlos en el portfolio.', 'success');
};

const resetToDefault = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    state = deepClone(defaultContent);
    renderAll();
    setStatus('Se restauro el contenido base del portfolio.', 'success');
};

const copyJson = async () => {
    try {
        await navigator.clipboard.writeText(JSON.stringify(state, null, 2));
        setStatus('JSON copiado al portapapeles.', 'success');
    } catch (error) {
        setStatus('No se pudo copiar automaticamente.', 'error');
    }
};

const downloadContentFile = () => {
    const blob = new Blob([serializeContentFile(state)], { type: 'text/javascript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'content.js';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    setStatus('Se descargo un content.js actualizado.', 'success');
};

panelsNode.addEventListener('input', (event) => {
    const target = event.target;

    if (!target.matches('.editor-input')) {
        return;
    }

    const path = stringToPath(target.dataset.path);
    const value = target.value;
    const sectionKey = path[0];

    setValueByPath(state, path, value);
    updateSectionPreview(sectionKey);
});

panelsNode.addEventListener('change', (event) => {
    const target = event.target;

    if (target.matches('.editor-select')) {
        const path = stringToPath(target.dataset.path);
        setValueByPath(state, path, target.value);
        updateSectionPreview(path[0]);
        return;
    }

    if (target.matches('.editor-checkbox')) {
        const path = stringToPath(target.dataset.path);
        setValueByPath(state, path, target.checked);
        updateSectionPreview(path[0]);

        const label = target.closest('.toggle-field')?.querySelector('.toggle-control span');
        if (label) {
            label.textContent = target.checked ? 'Si' : 'No';
        }
    }
});

panelsNode.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) {
        return;
    }

    const action = button.dataset.action;
    const path = stringToPath(button.dataset.path);

    if (action === 'add-item') {
        const array = getValueByPath(state, path);
        if (Array.isArray(array)) {
            array.push(getArrayTemplate(path));
            renderAll();
            setStatus('Elemento añadido.', 'success');
        }
        return;
    }

    if (action === 'remove-item') {
        removeAtPath(state, path);
        renderAll();
        setStatus('Elemento eliminado.', 'success');
    }
});

renderAll();
setupSectionDragAndDrop();

document.getElementById('saveContent').addEventListener('click', saveToLocal);
document.getElementById('resetContent').addEventListener('click', resetToDefault);
document.getElementById('copyJson').addEventListener('click', copyJson);
document.getElementById('downloadContent').addEventListener('click', downloadContentFile);
