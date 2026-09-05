(() => {
  const EN = '/resume/Nguyen-Ngoc-Khai-Resume-English.pdf';
  const VI = '/resume/Nguyen-Ngoc-Khai-Resume.pdf';

  const makeLink = (href, label, meta) => {
    const a = document.createElement('a');
    a.className = 'resume resume-lang';
    a.href = href;
    a.download = '';
    a.dataset.resumeLang = label;
    a.innerHTML = `<b>↓</b><span>DOWNLOAD RESUME<small>${label} / ${meta}</small></span>`;
    return a;
  };

  const patch = () => {
    document.querySelectorAll('a.resume[href*="/resume/"]:not([data-resume-lang])').forEach((original) => {
      const wrap = document.createElement('div');
      wrap.className = 'resume-pair';
      wrap.append(makeLink(EN, 'ENGLISH', 'PDF'), makeLink(VI, 'TIẾNG VIỆT', 'PDF'));
      original.replaceWith(wrap);
    });
  };

  const start = () => {
    patch();
    const observer = new MutationObserver(patch);
    observer.observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
