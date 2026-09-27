(() => {
  const sidebar = document.querySelector('#sidebar');
  const main = document.querySelector('#main-wrap');
  const backdrop = document.querySelector('#sidebar-backdrop');
  const toggles = [...document.querySelectorAll('[data-sidebar-toggle]')];
  const mobile = matchMedia('(max-width: 767px)');
  function setOpen(open, focus = false) {
    sidebar.classList.toggle('open', open);
    sidebar.inert = !open;
    sidebar.setAttribute('aria-hidden', String(!open));
    main.classList.toggle('expanded', !open);
    main.inert = mobile.matches && open;
    backdrop.hidden = !(mobile.matches && open);
    document.body.style.overflow = mobile.matches && open ? 'hidden' : '';
    toggles.forEach(button => button.setAttribute('aria-expanded', String(open)));
    const toggle = document.querySelector('.topbar-toggle');
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    if (focus) (open ? sidebar.querySelector('.sidebar-close') : toggle).focus();
  }
  toggles.forEach(button => button.addEventListener('click', () => setOpen(!sidebar.classList.contains('open'), true)));
  backdrop.addEventListener('click', () => setOpen(false, true));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && sidebar.classList.contains('open')) setOpen(false, true);
    if (event.key === 'Tab' && mobile.matches && sidebar.classList.contains('open')) {
      const items = [...sidebar.querySelectorAll('a[href],button')];
      if (event.shiftKey && document.activeElement === items[0]) {event.preventDefault(); items.at(-1).focus();}
      else if (!event.shiftKey && document.activeElement === items.at(-1)) {event.preventDefault(); items[0].focus();}
    }
  });
  sidebar.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {if (mobile.matches) setOpen(false);}));
  mobile.addEventListener('change', () => setOpen(!mobile.matches));
  setOpen(!mobile.matches);
  document.querySelectorAll('[data-disclosure]').forEach(button => {
    const target = document.getElementById(button.getAttribute('aria-controls'));
    if (!target) return;
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(open));
      target.hidden = !open;
      const arrow = button.querySelector('.disclosure-arrow');
      if (arrow) arrow.textContent = open ? '▼' : '▶';
      const action = button.querySelector('[data-toggle-action]');
      if (action) action.textContent = open ? 'Hide' : 'Show';
      if (open && window.MathJax?.typesetPromise) window.MathJax.typesetPromise([target]);
    });
  });
  const reading = document.querySelector('.reading-progress');
  if (reading) {
    const updateReading = () => {
      const distance = document.documentElement.scrollHeight - innerHeight;
      const percent = distance > 0 ? Math.max(0, Math.min(100, scrollY / distance * 100)) : 100;
      reading.setAttribute('aria-valuenow', String(Math.round(percent)));
      reading.firstElementChild.style.width = `${percent}%`;
    };
    addEventListener('scroll', updateReading, {passive:true});
    addEventListener('resize', updateReading);
    new ResizeObserver(updateReading).observe(document.body);
    updateReading();
  }
  const sections = [...document.querySelectorAll('[data-chapter-section][id]')];
  const progress = document.querySelector('#chapter-progress');
  if (sections.length && progress) {
    progress.hidden = false;
    const buttons = sections.map((section, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.title = section.querySelector('h2,h3')?.textContent || `Section ${index + 1}`;
      button.setAttribute('aria-label', button.title);
      button.addEventListener('click', () => section.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'}));
      progress.append(button);
      return button;
    });
    function update() {
      let current = 0;
      sections.forEach((section, index) => {if(section.getBoundingClientRect().top <= 150) current = index;});
      buttons.forEach((button, index) => button.setAttribute('aria-current', String(index === current)));
    }
    let scheduled = false;
    addEventListener('scroll', () => {if (!scheduled) {scheduled = true; requestAnimationFrame(() => {update(); scheduled = false;});}}, {passive:true});
    update();
  }
  if (document.body.hasAttribute('data-math')) {
    window.MathJax = {tex:{inlineMath:[['$','$'],['\\(','\\)']]},svg:{fontCache:'global'}};
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-svg.js';
    script.async = true;
    document.head.append(script);
  }
})();
