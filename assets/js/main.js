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
    '#certificados': 'certificates',
    '#contacto': 'contact'
};
const escapeHtml = (value) => String(value)
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

const renderButtons = (items) => items.map((item) => {
    const variant = item.variant === 'secondary' ? 'secondary' : 'primary';
    return `<a class="btn btn-${variant}" href="${escapeHtml(item.href)}"${getLinkAttributes(item.href)}>${escapeHtml(item.label)}</a>`;
}).join('');

const renderHeroStats = (items) => items.map((item) => `
    <div class="stat">
        <strong>${escapeHtml(item.title)}</strong>
        <span>${escapeHtml(item.text)}</span>
    </div>
`).join('');

const renderFeatures = (items) => items.map((item, index) => `
    <article class="feature-card ${delayClass(index)}">
        <div class="icon">${escapeHtml(item.icon)}</div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.description)}</p>
    </article>
`).join('');

const renderProjects = (items) => items.map((item, index) => `
    <article class="project-card ${delayClass(index)}">
        <div class="project-cover"></div>
        <div class="project-body">
            <div class="project-top">
                <span class="label">${escapeHtml(item.label)}</span>
                <span class="project-link">-></span>
            </div>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.description)}</p>
            <div class="tag-row">
                ${item.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
            </div>
        </div>
    </article>
`).join('');

const renderSkills = (items) => items.map((item) => `<span class="skill-pill">${escapeHtml(item)}</span>`).join('');

const renderExperience = (items) => items.map((item, index) => {
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
                ${item.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('')}
            </ul>
        </article>
    `;
}).join('');

const renderAboutCards = (items) => items.map((item, index) => `
    <article class="about-card ${delayClass(index + 1)}">
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.text)}</p>
    </article>
`).join('');

const renderEducation = (items) => items.map((item, index) => `
    <article class="education-card ${delayClass(index)}">
        <div class="small-label">${escapeHtml(item.period)}</div>
        <h3>${escapeHtml(item.title)}</h3>
        <span class="education-meta">${escapeHtml(item.place)}</span>
        <p>${escapeHtml(item.text)}</p>
    </article>
`).join('');

const renderCertificates = (items) => items.map((item, index) => `
    <article class="certificate-card ${delayClass(index)}">
        <div class="certificate-status">${escapeHtml(item.status)}</div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.text)}</p>
    </article>
`).join('');

const renderDetails = (items) => items.map((item) => `
    <a class="contact-pill" href="${escapeHtml(item.href)}"${getLinkAttributes(item.href)}>${escapeHtml(item.text)}</a>
`).join('');

const renderSocials = (items) => items.map((item) => `
    <a class="social" href="${escapeHtml(item.href)}" aria-label="${escapeHtml(item.label)}"${getLinkAttributes(item.href)}>${escapeHtml(item.short || item.label)}</a>
`).join('');

const renderNavigation = (items) => {
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
    if (!button) {
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
    if (photo) {
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

renderPortfolioContent();
applySectionOrder(content.sectionOrder);

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
