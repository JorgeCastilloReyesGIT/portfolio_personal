const content = window.portfolioContent;

const sectionSelectorMap = {
    hero: '#hero',
    features: '#features',
    projects: '#proyectos',
    skills: '#skills',
    experience: '#experiencia',
    about: '#sobre-mi',
    education: '#formacion',
    certificates: '#certificados',
    contact: '#contacto'
};

const navigationSectionKeyMap = {
    '#proyectos': 'projects',
    '#skills': 'skills',
    '#experiencia': 'experience',
    '#formacion': 'education',
    '#sobre-mi': 'about',
    '#certificados': 'certificates',
    '#contacto': 'contact'
};

const escapeHtml = (value) => String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const isExternalHttpLink = (href) => /^https?:\/\//i.test(String(href));
const getLinkAttributes = (href) => isExternalHttpLink(href) ? ' target="_blank" rel="noreferrer"' : '';

const setText = (selector, value) => {
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = value;
    }
};

const setHTML = (selector, html) => {
    const element = document.querySelector(selector);
    if (element) {
        element.innerHTML = html;
    }
};

const delayClass = (index) => {
    const delays = ['', ' delay-1', ' delay-2', ' delay-3', ' delay-4'];
    return `reveal${delays[index % delays.length]}`;
};

const renderButtons = (items = []) => items.map((item) => {
    const variant = item.variant === 'secondary' ? 'secondary' : 'primary';
    return `<a class="btn btn-${variant}" href="${escapeHtml(item.href)}"${getLinkAttributes(item.href)}>${escapeHtml(item.label)}</a>`;
}).join('');

const renderHeroStats = (items = []) => items.map((item) => `
    <div class="stat">
        <strong>${escapeHtml(item.title)}</strong>
        <span>${escapeHtml(item.text)}</span>
    </div>
`).join('');

const renderFeatures = (items = []) => items.map((item, index) => `
    <article class="feature-card ${delayClass(index)}">
        <div class="icon">${escapeHtml(item.icon)}</div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.description)}</p>
    </article>
`).join('');

const getPrimaryProjectLink = (item) => {
    if (Array.isArray(item.links) && item.links.length && item.links[0].href) {
        return item.links[0];
    }

    if (item.href) {
        return { label: item.title || 'Ver proyecto', href: item.href };
    }

    return null;
};

const renderProjectArrow = (item) => {
    const link = getPrimaryProjectLink(item);

    if (!link) {
        return '<span class="project-link project-link-disabled" aria-hidden="true">-&gt;</span>';
    }

    return `
        <a class="project-link" href="${escapeHtml(link.href)}"${getLinkAttributes(link.href)} aria-label="${escapeHtml(link.label || `Ver ${item.title}`)}">
            -&gt;
        </a>
    `;
};

const renderProjectCard = (item, index, duplicated = false) => `
    <article class="project-card ${delayClass(index)}"${duplicated ? ' aria-hidden="true"' : ''}>
        <div class="project-cover"></div>
        <div class="project-body">
            <div class="project-top">
                <span class="label">${escapeHtml(item.label)}</span>
                ${renderProjectArrow(item)}
            </div>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.description)}</p>
            <div class="tag-row">
                ${(item.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
            </div>
        </div>
    </article>
`;

const renderProjects = (items = []) => {
    const shouldLoop = items.length > 3;
    const primaryCards = items.map((item, index) => renderProjectCard(item, index)).join('');
    const duplicateCards = shouldLoop
        ? items.map((item, index) => renderProjectCard(item, index, true)).join('')
        : '';

    return `
        <div class="projects-track${shouldLoop ? ' projects-track-loop' : ''}">
            ${primaryCards}
            ${duplicateCards}
        </div>
    `;
};

const renderSkills = (items = []) => items.map((item) => `<span class="skill-pill">${escapeHtml(item)}</span>`).join('');

const renderExperience = (items = []) => items.map((item, index) => {
    const featuredClass = item.featured ? ' timeline-item-featured' : '';
    const place = [item.company, item.location, item.mode].filter(Boolean).join(' - ');
    const pills = item.pills && item.pills.length
        ? `<div class="timeline-meta">${item.pills.map((pill) => `<span class="timeline-pill">${escapeHtml(pill)}</span>`).join('')}</div>`
        : '';

    return `
        <article class="timeline-item${featuredClass} ${delayClass(index)}">
            <span class="timeline-year">${escapeHtml(item.period)}</span>
            <h3>${escapeHtml(item.role)}</h3>
            <div class="timeline-place">${escapeHtml(place)}</div>
            ${pills}
            <ul>
                ${(item.bullets || []).map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('')}
            </ul>
        </article>
    `;
}).join('');

const renderAboutCards = (items = []) => items.map((item, index) => `
    <article class="about-card ${delayClass(index + 1)}">
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.text)}</p>
    </article>
`).join('');

const renderEducation = (items = []) => items.map((item, index) => `
    <article class="education-card ${delayClass(index)}">
        <div class="small-label">${escapeHtml(item.period)}</div>
        <h3>${escapeHtml(item.title)}</h3>
        <span class="education-meta">${escapeHtml(item.place)}</span>
        <p>${escapeHtml(item.text)}</p>
    </article>
`).join('');

const renderCertificateMedia = (item) => {
    if (!item.image || !item.image.src) {
        return '';
    }

    const alt = item.image.alt || `Vista previa de ${item.title}`;

    return `
        <div class="certificate-media">
            <img src="${escapeHtml(item.image.src)}" alt="${escapeHtml(alt)}" loading="lazy" />
        </div>
    `;
};

const renderCertificates = (items = []) => items.map((item, index) => {
    const isClickable = Boolean(item.image && item.image.src);
    const alt = item.image && item.image.alt ? item.image.alt : item.title;

    return `
        <article class="certificate-card ${isClickable ? 'certificate-card-clickable ' : ''}${delayClass(index)}"
            ${isClickable ? `data-certificate-src="${escapeHtml(item.image.src)}" data-certificate-alt="${escapeHtml(alt)}" data-certificate-title="${escapeHtml(item.title)}" data-certificate-status="${escapeHtml(item.status)}" data-certificate-text="${escapeHtml(item.text)}" tabindex="0" role="button" aria-label="Abrir ${escapeHtml(item.title)}"` : ''}>
            ${renderCertificateMedia(item)}
            <div class="certificate-copy">
                <div class="certificate-status">${escapeHtml(item.status)}</div>
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.text)}</p>
                ${isClickable ? '<span class="certificate-hint">Pulsa para ampliar</span>' : ''}
            </div>
        </article>
    `;
}).join('');

const renderDetails = (items = []) => items.map((item) => `
    <a class="contact-pill" href="${escapeHtml(item.href)}"${getLinkAttributes(item.href)}>${escapeHtml(item.text)}</a>
`).join('');

const renderSocials = (items = []) => items.map((item) => `
    <a class="social" href="${escapeHtml(item.href)}" aria-label="${escapeHtml(item.label)}"${getLinkAttributes(item.href)}>${escapeHtml(item.short || item.label)}</a>
`).join('');

const ensureProjectCarouselStyles = () => {
    if (document.getElementById('projectCarouselStyles')) {
        return;
    }

    const style = document.createElement('style');
    style.id = 'projectCarouselStyles';
    style.textContent = `
        .projects-grid {
            display: block !important;
            overflow: hidden;
            position: relative;
            margin-inline: -8px;
            padding: 8px;
            -webkit-mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
            mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
        }

        .projects-track {
            display: flex;
            align-items: stretch;
            gap: 18px;
            width: max-content;
        }

        .projects-track-loop {
            animation: projectMarquee 54s linear infinite;
        }

        .projects-grid:hover .projects-track-loop {
            animation-play-state: paused;
        }

        .projects-track .project-card {
            flex: 0 0 clamp(285px, 31vw, 390px);
            min-width: 0;
        }

        .project-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 38px;
            min-height: 38px;
            border-radius: 999px;
            border: 1px solid var(--line);
            background: rgba(255, 255, 255, 0.07);
            color: rgba(255, 255, 255, 0.86);
            font-weight: 800;
            transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease, color 0.25s ease;
        }

        .project-link:hover {
            transform: translateX(4px);
            background: rgba(255, 255, 255, 0.13);
            border-color: rgba(255, 255, 255, 0.22);
            color: #fff;
        }

        .project-link-disabled {
            opacity: 0.38;
        }

        .project-link-disabled:hover {
            transform: none;
            background: rgba(255, 255, 255, 0.07);
            border-color: var(--line);
        }

        @keyframes projectMarquee {
            from { transform: translateX(0); }
            to { transform: translateX(calc(-50% - 9px)); }
        }

        @media (max-width: 760px) {
            .projects-grid {
                overflow-x: auto;
                -webkit-mask-image: none;
                mask-image: none;
                scroll-snap-type: x mandatory;
            }

            .projects-track,
            .projects-track-loop {
                animation: none;
            }

            .projects-track .project-card {
                flex-basis: min(86vw, 360px);
                scroll-snap-align: start;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            .projects-track-loop {
                animation: none;
            }
        }
    `;

    document.head.appendChild(style);
};

const renderNavigation = (items = []) => {
    const sectionOrder = Array.isArray(content.sectionOrder) ? content.sectionOrder : [];
    const orderedItems = [...items].sort((left, right) => {
        const leftKey = navigationSectionKeyMap[left.href];
        const rightKey = navigationSectionKeyMap[right.href];
        const rawLeftIndex = leftKey ? sectionOrder.indexOf(leftKey) : -1;
        const rawRightIndex = rightKey ? sectionOrder.indexOf(rightKey) : -1;
        const leftIndex = rawLeftIndex === -1 ? Number.MAX_SAFE_INTEGER : rawLeftIndex;
        const rightIndex = rawRightIndex === -1 ? Number.MAX_SAFE_INTEGER : rawRightIndex;

        return leftIndex - rightIndex;
    });

    setHTML('#siteNav', orderedItems.map((item) => `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`).join(''));
};

const renderHeader = (headerCta) => {
    const button = document.getElementById('headerCta');
    if (!button || !headerCta) {
        return;
    }

    button.textContent = headerCta.label;
    button.href = headerCta.href;
};

const renderHero = (hero) => {
    const title = document.querySelector('.hero-title-name');
    if (title) {
        title.innerHTML = `${escapeHtml(hero.titleFirst)}<span class="gradient">${escapeHtml(hero.titleLast)}</span>`;
    }

    setText('.hero-text', hero.description);
    setHTML('.hero .btn-row', renderButtons(hero.actions));
    setHTML('.stats', renderHeroStats(hero.stats));

    const photo = document.querySelector('.profile-photo');
    if (photo && hero.photo) {
        photo.src = hero.photo.src;
        photo.alt = hero.photo.alt;
    }
};

const renderSectionHead = (sectionSelector, sectionContent) => {
    setText(`${sectionSelector} .eyebrow`, sectionContent.eyebrow);
    setText(`${sectionSelector} .section-title`, sectionContent.title);
    setText(`${sectionSelector} .section-copy`, sectionContent.copy);
};

const renderPortfolioContent = () => {
    if (!content) {
        return;
    }

    ensureProjectCarouselStyles();
    renderNavigation(content.navigation);
    renderHeader(content.headerCta);
    renderHero(content.hero);

    setHTML('.features-grid', renderFeatures(content.features));

    renderSectionHead('#proyectos', content.projects);
    setHTML('.projects-grid', renderProjects(content.projects.items));

    renderSectionHead('#skills', content.skills);
    setHTML('.skills-cloud', renderSkills(content.skills.items));

    renderSectionHead('#experiencia', content.experience);
    setHTML('.timeline-grid', renderExperience(content.experience.items));

    setText('#sobre-mi .eyebrow', content.about.eyebrow);
    setText('#sobre-mi .section-title', content.about.title);
    setText('#sobre-mi .about-main p', content.about.description);
    setHTML('#sobre-mi .about-side', renderAboutCards(content.about.cards));

    renderSectionHead('#formacion', content.education);
    setHTML('.education-grid', renderEducation(content.education.items));

    renderSectionHead('#certificados', content.certificates);
    setText('#certificados .window-url', content.certificates.windowLabel);
    setHTML('.certificate-grid', renderCertificates(content.certificates.items));

    setText('#contacto .eyebrow', content.contact.eyebrow);
    setText('#contacto .section-title', content.contact.title);
    setText('#contacto .contact-copy', content.contact.copy);
    setHTML('#contacto .contact-details', renderDetails(content.contact.details));
    setHTML('#contacto .btn-row', renderButtons(content.contact.actions));
    setHTML('#contacto .socials', renderSocials(content.contact.socials));

    setText('footer .footer-inner p:first-child', content.footer.left);
    setText('footer .footer-inner p:last-child', content.footer.right);
};

const applySectionOrder = (order) => {
    if (!Array.isArray(order)) {
        return;
    }

    const main = document.querySelector('main#inicio');
    if (!main) {
        return;
    }

    order.forEach((sectionKey) => {
        const selector = sectionSelectorMap[sectionKey];
        const section = selector ? document.querySelector(selector) : null;

        if (section) {
            main.appendChild(section);
        }
    });
};

const createCertificateModal = () => {
    const modal = document.createElement('div');
    modal.className = 'certificate-modal';
    modal.id = 'certificateModal';
    modal.setAttribute('aria-hidden', 'true');

    modal.innerHTML = `
        <div class="certificate-modal-backdrop" data-close-modal="true"></div>
        <div class="certificate-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="certificateModalTitle">
            <button class="certificate-modal-close" type="button" aria-label="Cerrar certificado" data-close-modal="true">×</button>
            <div class="certificate-modal-meta">
                <span class="certificate-modal-status" id="certificateModalStatus"></span>
                <h3 class="certificate-modal-title" id="certificateModalTitle"></h3>
                <p class="certificate-modal-text" id="certificateModalText"></p>
            </div>
            <div class="certificate-modal-media">
                <img id="certificateModalImage" src="" alt="" />
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    return modal;
};

const certificateModal = createCertificateModal();
const certificateModalImage = document.getElementById('certificateModalImage');
const certificateModalStatus = document.getElementById('certificateModalStatus');
const certificateModalTitle = document.getElementById('certificateModalTitle');
const certificateModalText = document.getElementById('certificateModalText');

const openCertificateModal = (card) => {
    if (!card || !card.dataset.certificateSrc) {
        return;
    }

    certificateModalImage.src = card.dataset.certificateSrc;
    certificateModalImage.alt = card.dataset.certificateAlt || card.dataset.certificateTitle || 'Certificado';
    certificateModalStatus.textContent = card.dataset.certificateStatus || '';
    certificateModalTitle.textContent = card.dataset.certificateTitle || 'Certificado';
    certificateModalText.textContent = card.dataset.certificateText || '';

    certificateModal.classList.add('is-open');
    certificateModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
};

const closeCertificateModal = () => {
    certificateModal.classList.remove('is-open');
    certificateModal.setAttribute('aria-hidden', 'true');
    certificateModalImage.src = '';
    document.body.classList.remove('modal-open');
};

renderPortfolioContent();
applySectionOrder(content.sectionOrder);

document.addEventListener('click', (event) => {
    const certificateCard = event.target.closest('.certificate-card-clickable');
    if (certificateCard) {
        openCertificateModal(certificateCard);
        return;
    }

    if (event.target.closest('[data-close-modal="true"]')) {
        closeCertificateModal();
    }
});

document.addEventListener('keydown', (event) => {
    const certificateCard = event.target.closest('.certificate-card-clickable');

    if ((event.key === 'Enter' || event.key === ' ') && certificateCard) {
        event.preventDefault();
        openCertificateModal(certificateCard);
        return;
    }

    if (event.key === 'Escape' && certificateModal.classList.contains('is-open')) {
        closeCertificateModal();
    }
});

const cursorGlow = document.getElementById('cursorGlow');
const tiltCard = document.getElementById('tiltCard');
const allowMotion = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (cursorGlow && allowMotion && hasFinePointer) {
    let glowX = window.innerWidth / 2;
    let glowY = window.innerHeight / 2;
    let targetX = glowX;
    let targetY = glowY;
    let glowFrame = 0;

    const animateGlow = () => {
        glowX += (targetX - glowX) * 0.16;
        glowY += (targetY - glowY) * 0.16;

        cursorGlow.style.left = `${glowX}px`;
        cursorGlow.style.top = `${glowY}px`;

        const isSettled = Math.abs(targetX - glowX) < 0.2 && Math.abs(targetY - glowY) < 0.2;
        glowFrame = isSettled ? 0 : requestAnimationFrame(animateGlow);
    };

    window.addEventListener('pointermove', (event) => {
        targetX = event.clientX;
        targetY = event.clientY;

        if (!glowFrame) {
            glowFrame = requestAnimationFrame(animateGlow);
        }
    }, { passive: true });
} else if (cursorGlow) {
    cursorGlow.style.display = 'none';
}

if (tiltCard && allowMotion && hasFinePointer && window.innerWidth > 760) {
    let cardFrame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let rect = null;

    const applyTilt = () => {
        if (!rect) {
            rect = tiltCard.getBoundingClientRect();
        }

        const x = pointerX - rect.left;
        const y = pointerY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateY = ((x - centerX) / centerX) * 4;
        const rotateX = ((centerY - y) / centerY) * 4;

        tiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
        cardFrame = 0;
    };

    tiltCard.addEventListener('pointerenter', () => {
        rect = tiltCard.getBoundingClientRect();
    }, { passive: true });

    tiltCard.addEventListener('pointermove', (event) => {
        pointerX = event.clientX;
        pointerY = event.clientY;

        if (!cardFrame) {
            cardFrame = requestAnimationFrame(applyTilt);
        }
    }, { passive: true });

    tiltCard.addEventListener('pointerleave', () => {
        if (cardFrame) {
            cancelAnimationFrame(cardFrame);
            cardFrame = 0;
        }

        tiltCard.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0)';
    });

    window.addEventListener('resize', () => {
        rect = null;
    }, { passive: true });
}
