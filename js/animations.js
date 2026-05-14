(() => {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const layer = document.createElement('div');
  layer.style.position = 'absolute';
  layer.style.inset = '0';
  layer.style.pointerEvents = 'none';
  layer.style.zIndex = '1';
  hero.appendChild(layer);

  for (let i = 0; i < 24; i += 1) {
    const dot = document.createElement('span');
    dot.style.position = 'absolute';
    dot.style.width = `${2 + Math.random() * 4}px`;
    dot.style.height = dot.style.width;
    dot.style.borderRadius = '50%';
    dot.style.background = i % 3 === 0 ? 'rgba(215,15,47,.65)' : 'rgba(255,255,255,.55)';
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${Math.random() * 100}%`;
    dot.style.filter = 'blur(.2px)';
    dot.style.animation = `float${i} ${8 + Math.random() * 10}s linear infinite`;

    const key = `@keyframes float${i}{0%{transform:translateY(0)}50%{transform:translateY(-22px)}100%{transform:translateY(0)}}`;
    const style = document.createElement('style');
    style.textContent = key;
    document.head.appendChild(style);
    layer.appendChild(dot);
  }
})();
