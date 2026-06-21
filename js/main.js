// ============================================================
// main.js — i18n (ES default / EN) + progressive contact form.
// ES lives in the HTML (works without JS, good for SEO); only the
// EN strings live here. ponytail: no framework, no router, plain DOM.
// ============================================================
(function () {
  'use strict';

  // --- EN dictionary (ES counterpart is the HTML's own text) ---------------
  var EN = {
    skip: 'Skip to content',
    lang_group: 'Language selector',
    nav_projects: 'Projects', nav_about: 'About', nav_skills: 'Skills',
    nav_contact: 'Contact', nav_cta: 'Get in touch',
    hero_role: 'Full-stack web developer & lab technician',
    hero_lead: 'A scientific mindset applied to code. Specialised in Angular, Flask and Spring Boot, with a focus on precision, traceability and serious testing. Junior with projects deployed to real production.',
    hero_signature: 'A technical builder who backs up claims with public, deployed projects.',
    hero_cta_projects: 'View projects',
    sec_projects: 'Projects', sec_about: 'About', sec_skills: 'Skills', sec_contact: 'Contact',
    proj_ss_desc: 'Multi-tenant full-stack PropTech platform in real production. A satellite layer over vacation-rental PMS that automates operational tasks: apartments master data, operational heatmap, late check-in alerts, contact sync and an AI-assisted communications vault.',
    proj_dr_desc: 'Full-stack app to manage music collections, rate albums and write reviews, integrated with the Deezer API. JWT auth, role system and Swagger/OpenAPI docs.',
    proj_tk_desc: 'Interactive map built as a team during the DAW course. Docker containerisation, Vite-optimised build and a professional workflow with issues, milestones and pull requests.',
    metric_backend: '92 backend tests', metric_frontend: '297 frontend tests',
    metric_coverage: '90% coverage', status_team: 'Team', tag_teamwork: 'Teamwork',
    about_p1: 'I started in the clinical lab: analysing samples in haematology, biochemistry and the blood bank, where precision, traceability and strict protocols are not optional. That discipline is now how I write code.',
    about_p2: 'After two years and five months as a vacation-rental receptionist —where Stay Sidekick was born— I pivoted to full-stack web development. Today I build real products, in production, with tests, coverage and technical documentation.',
    about_panel_title: 'From lab to code',
    about_trait1: 'Analytical precision', about_trait2: 'Traceability & protocols',
    about_trait3: 'Serious testing (92+297)', about_trait4: 'Technical documentation',
    skills_languages: 'Languages', skills_frameworks: 'Frameworks & libraries',
    skills_databases: 'Databases', skills_devops: 'DevOps & infrastructure',
    skills_quality: 'Quality & testing', skills_apis: 'APIs & integrations',
    skills_ssg: 'Static site generators', skills_lab: 'Clinical lab',
    lab_hematology: 'Haematology', lab_biochem: 'Clinical biochemistry',
    lab_micro: 'Microbiology', lab_immuno: 'Immunology',
    lab_bloodbank: 'Blood bank', lab_biosafety: 'Biosafety',
    contact_intro: 'A job offer, a collaboration or a technical question? Drop me a line and I’ll reply as soon as possible.',
    form_name: 'Name', form_email: 'Email', form_type: 'Inquiry type',
    form_type_job: 'Job offer', form_type_collab: 'Collaboration', form_type_other: 'Other',
    form_message: 'Message', form_submit: 'Send message',
    form_name_ph: 'Your name', form_email_ph: 'you@email.com', form_message_ph: 'Tell me how I can help…',
    channel_email: 'Direct email', channel_location: 'Location', channel_location_value: 'Cádiz, Spain',
    footer_copy: '© 2026 Sergio Durán Utrera · Cádiz, Spain'
  };

  // status messages need both locales (not present in the DOM)
  var MSG = {
    es: { sending: 'Enviando…', ok: '¡Mensaje enviado! Gracias.',
          error: 'No se pudo enviar. Escríbeme a duran.utrerasergio2612@gmail.com' },
    en: { sending: 'Sending…', ok: 'Message sent! Thanks.',
          error: 'Couldn’t send. Email me at duran.utrerasergio2612@gmail.com' }
  };

  // attr dataset-key -> DOM property/attribute
  var ATTRS = [
    ['i18n', 'textContent'],
    ['i18nPlaceholder', 'placeholder'],
    ['i18nAriaLabel', 'aria-label']
  ];

  var lang = localStorage.getItem('lang') === 'en' ? 'en' : 'es';

  function applyEl(el) {
    for (var i = 0; i < ATTRS.length; i++) {
      var dsKey = ATTRS[i][0], prop = ATTRS[i][1], key = el.dataset[dsKey];
      if (!key) continue;
      var cache = '_es_' + dsKey;
      if (el[cache] === undefined) {
        el[cache] = prop === 'textContent' ? el.textContent : (el.getAttribute(prop) || '');
      }
      var val = lang === 'es' ? el[cache] : (EN[key] != null ? EN[key] : el[cache]);
      if (prop === 'textContent') el.textContent = val;
      else el.setAttribute(prop, val);
    }
  }

  function setLang(next) {
    lang = next;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n], [data-i18n-placeholder], [data-i18n-aria-label]').forEach(applyEl);
    document.querySelectorAll('.c-lang__btn').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });
  }

  document.querySelectorAll('.c-lang__btn').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.lang); });
  });

  setLang(lang); // caches ES originals + applies stored preference

  // --- Contact form: progressive enhancement --------------------------------
  var form = document.querySelector('.c-form');
  if (form) {
    var status = form.querySelector('.c-form__status');
    var setStatus = function (text, state) {
      status.textContent = text;
      status.setAttribute('data-state', state || '');
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var endpoint = form.dataset.endpoint;
      if (!endpoint) { setStatus(MSG[lang].error, 'error'); return; }
      setStatus(MSG[lang].sending, '');
      var data = Object.fromEntries(new FormData(form).entries());
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(function (r) {
        if (!r.ok) throw new Error();
        form.reset();
        setStatus(MSG[lang].ok, 'ok');
      }).catch(function () { setStatus(MSG[lang].error, 'error'); });
    });
  }
})();
