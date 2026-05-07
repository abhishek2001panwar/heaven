
  /* ── CURSOR ── */
  const cur = document.getElementById('cursor');
  let cx = 0, cy = 0, tx = 0, ty = 0;
  document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
  (function loop() {
    cx += (tx - cx) * .14; cy += (ty - cy) * .14;
    cur.style.left = cx + 'px'; cur.style.top = cy + 'px';
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('.piece-a,.piece-b,.piece-c,.pd-panel,.piece-e').forEach(el => {
    el.addEventListener('mouseenter', () => cur.classList.add('big'));
    el.addEventListener('mouseleave', () => cur.classList.remove('big'));
  });

  /* ── HEAD ENTRANCE ── */
  const headTl = gsap.timeline({ delay: .15 });
  headTl
    .to('#shLabel',  { opacity:1, y:0, duration:1,   ease:'expo.out' })
    .to('#shTitle',  { opacity:1, y:0, duration:1.2, ease:'expo.out' }, .15)
    .to('#shCount',  { opacity:1,      duration:.9,  ease:'expo.out' }, .4)
    .to('#marqueeWrap', { opacity:1,   duration:.8,  ease:'expo.out' }, .55);

  /* ── PIECE A — clip-wipe + parallax ── */
  gsap.to('#paClip', {
    clipPath: 'inset(0% 0 0 0)',
    duration: 1.6, ease: 'expo.inOut', delay: .5
  });
  gsap.to('#paText', { opacity:1, y:0, duration:1.1, ease:'expo.out', delay:1.2 });
  gsap.to('#paYear', { opacity:1,      duration:.9,  ease:'expo.out', delay:1.4 });

  // parallax scroll on piece A image
  gsap.to('#paImg', {
    yPercent: 22,
    ease: 'none',
    scrollTrigger: {
      trigger: '#pieceA',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.4
    }
  });

  /* ── PIECE B ── */
  ScrollTrigger.create({
    trigger: '.piece-b',
    start: 'top 80%',
    onEnter: () => {
      gsap.to('#pbLeft',  { clipPath:'inset(0 0% 0 0)', duration:1.4, ease:'expo.inOut' });
      gsap.to('#pbRTop',  { clipPath:'inset(0 0 0% 0)', duration:1.4, ease:'expo.inOut', delay:.18 });
      gsap.to('#pbMeta',  { opacity:1, y:0, duration:1, ease:'expo.out', delay:.6 });
    }
  });

  /* ── PIECE C — parallax + overlay ── */
  gsap.to('#pCImg', {
    yPercent: 16,
    ease: 'none',
    scrollTrigger: {
      trigger: '#pieceC',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.6
    }
  });
  ScrollTrigger.create({
    trigger: '#pieceC',
    start: 'top 72%',
    onEnter: () => {
      gsap.to('#pcOver', { opacity:1, duration:1, ease:'expo.out' });
      gsap.to('#pcLine', { width:56, duration:1.2, ease:'expo.out', delay:.3 });
    }
  });

  /* ── PIECE D — three panels stagger ── */
  ScrollTrigger.create({
    trigger: '.piece-d',
    start: 'top 78%',
    onEnter: () => {
      ['#pdP1','#pdP2','#pdP3'].forEach((id, i) => {
        gsap.to(id, {
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.4, ease: 'expo.inOut', delay: i * .14
        });
      });
    }
  });

  /* ── PIECE E — fullscreen closing ── */
  gsap.to('#peImg', {
    scale: 1,
    yPercent: -8,
    ease: 'none',
    scrollTrigger: {
      trigger: '#pieceE',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 2
    }
  });
  ScrollTrigger.create({
    trigger: '#pieceE',
    start: 'top 70%',
    onEnter: () => {
      gsap.to('#peCenter', { opacity:1, duration:1.3, ease:'expo.out' });
      gsap.to('#peRule',   { height:60, duration:1.6, ease:'expo.out', delay:.4 });
    }
  });

 