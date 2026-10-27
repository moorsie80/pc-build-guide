(function () {
  const G = (window.PCBuildGuide = window.PCBuildGuide || {});
  const esc = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const players = new Map();

  const fmtTime = (sec) => {
    const s = Math.max(0, Math.floor(sec));
    return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  };
  const extractYouTubeId = (url) => (String(url || '').match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,15})/) || [])[1] || null;

  function renderMediaEmbedMarkup(rawUrl) {
    const url = String(rawUrl || '').trim();
    if (!url) return `<div class="coaching-note-box">Paste a YouTube link or local <code>.mp4</code> path above and click <strong>Save Video Link</strong>.</div>`;
    if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(url)) return `<video class="video-embed-frame" src="${esc(url)}" controls preload="metadata"></video>`;
    const ytId = extractYouTubeId(url);
    return ytId
      ? `<iframe class="video-embed-frame" src="https://www.youtube-nocookie.com/embed/${esc(ytId)}?rel=0" title="Hardware Video Tutorial" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
      : `<div class="coaching-note-box">Saved custom link: <a href="${esc(url)}" target="_blank" rel="noopener noreferrer" style="color:#38bdf8;">${esc(url)} ↗</a></div>`;
  }

  function drawMotionCanvas(canvas, stepId, stepNum, timeSec) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const tip = G.VIDEO_TIPS[stepId] || G.VIDEO_TIPS['step-1-prep'];
    const w = canvas.width, h = canvas.height, phaseIdx = timeSec < 30 ? 0 : timeSec < 60 ? 1 : 2;
    const kf = tip.keyframes[phaseIdx] || tip.keyframes[0];
    const localPct = (timeSec % 30) / 30, pulse = 0.5 + 0.5 * Math.sin(timeSec * 4.2);

    ctx.fillStyle = '#070b14'; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)'; ctx.lineWidth = 1;
    for (let x = 24; x < w; x += 32) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 24; y < h; y += 32) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

    ctx.fillStyle = 'rgba(15, 23, 42, 0.92)'; ctx.fillRect(10, 10, w - 20, 30);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)'; ctx.strokeRect(10, 10, w - 20, 30);
    ctx.fillStyle = '#38bdf8'; ctx.font = 'bold 11px Consolas, monospace';
    ctx.fillText(`STEP 0${stepNum} MOTION SIM · KEYFRAME ${kf.timeLabel}`, 20, 29);
    ctx.fillStyle = '#a7f3d0'; ctx.fillText(`PHASE ${phaseIdx + 1}/3 (${Math.round((timeSec / 90) * 100)}%)`, w - 155, 29);

    ctx.strokeStyle = '#334155'; ctx.fillStyle = '#0f172a'; ctx.lineWidth = 2;
    ctx.fillRect(48, 54, 290, 104); ctx.strokeRect(48, 54, 290, 104);

    const targetX = 162, targetY = 82;
    ctx.strokeStyle = phaseIdx === 2 ? '#10b981' : '#f59e0b';
    ctx.setLineDash([4, 3]); ctx.strokeRect(targetX, targetY, 68, 48); ctx.setLineDash([]);

    const modX = targetX + (phaseIdx === 0 ? (1 - localPct) * -65 : 0);
    const modY = targetY + (phaseIdx === 0 ? -18 * (1 - localPct) : phaseIdx === 1 ? (1 - localPct) * -14 : 0);
    ctx.fillStyle = phaseIdx === 2 ? 'rgba(16, 185, 129, 0.24)' : 'rgba(56, 189, 248, 0.22)';
    ctx.strokeStyle = phaseIdx === 2 ? '#10b981' : '#38bdf8';
    ctx.fillRect(modX, modY, 68, 48); ctx.strokeRect(modX, modY, 68, 48);

    ctx.fillStyle = '#fbbf24';
    ctx.beginPath(); ctx.moveTo(modX + 5, modY + 5); ctx.lineTo(modX + 16, modY + 5); ctx.lineTo(modX + 5, modY + 16); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.arc(targetX + 34, targetY + 24, 5 + pulse * 4, 0, Math.PI * 2);
    ctx.strokeStyle = phaseIdx === 2 ? 'rgba(16, 185, 129, 0.7)' : 'rgba(56, 189, 248, 0.7)'; ctx.stroke();

    ctx.fillStyle = 'rgba(15, 23, 42, 0.94)'; ctx.fillRect(354, 54, w - 366, 104);
    ctx.strokeStyle = phaseIdx === 2 ? '#10b981' : '#c084fc'; ctx.strokeRect(354, 54, w - 366, 104);
    ctx.fillStyle = '#c084fc'; ctx.font = 'bold 11px Segoe UI, sans-serif'; ctx.fillText(`ACTIVE CALLOUT @ ${kf.timeLabel}`, 366, 74);
    ctx.fillStyle = '#f8fafc'; ctx.font = 'bold 12px Segoe UI, sans-serif'; ctx.fillText(kf.title.slice(0, 34), 366, 94);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px Segoe UI, sans-serif';
    let line = '', y = 114;
    for (const word of kf.detail.split(' ')) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > w - 388) {
        ctx.fillText(line, 366, y); line = word; y += 15;
        if (y > 148) break;
      } else line = test;
    }
    if (line && y <= 148) ctx.fillText(line, 366, y);

    ctx.fillStyle = '#1e293b'; ctx.fillRect(10, h - 14, w - 20, 6);
    ctx.fillStyle = '#38bdf8'; ctx.fillRect(10, h - 14, ((w - 20) * Math.min(90, timeSec)) / 90, 6);
  }

  G.renderVideoDrawer = function (step, state) {
    const tip = G.VIDEO_TIPS[step.id] || G.VIDEO_TIPS['step-1-prep'];
    const savedUrl = (state.customVideos && state.customVideos[step.id]) || tip.defaultVideoUrl || '';
    return `
      <details class="video-tip-drawer" data-phase="3" data-step="${step.id}" data-step-num="${step.stepNum}">
        <summary class="video-tip-summary">
          <span class="video-summary-left">
            <span class="slot-pill phase-3-pill">Phase 3 · Motion &amp; Video Drawer</span>
            <span>🎬 Watch Video Tip: ${esc(step.videoTip.title)}</span>
          </span>
          <span class="video-summary-right"><span>▶ 01:30 Motion Clip + Video Link</span><span aria-hidden="true">▾</span></span>
        </summary>
        <div class="video-tip-body">
          <div class="video-drawer-tabs">
            <div class="video-tab-group" role="tablist">
              <button type="button" class="video-tab-btn is-active" data-video-tab="motion" data-step="${step.id}">🎬 Interactive Motion Clip (Offline)</button>
              <button type="button" class="video-tab-btn" data-video-tab="embed" data-step="${step.id}">📺 YouTube / Custom Video Link</button>
            </div>
            <span style="font-size:0.74rem; color:var(--text-secondary);">${esc(tip.motionSubject)}</span>
          </div>
          <div class="video-tab-pane" data-pane="motion" data-step="${step.id}">
            <div class="motion-player-box">
              <div class="motion-canvas-wrap"><canvas class="motion-canvas" width="660" height="178" data-motion-canvas="${step.id}"></canvas></div>
              <div class="motion-controls-bar">
                <button type="button" class="motion-btn" data-motion-play="${step.id}">▶ Play</button>
                <input type="range" class="motion-scrubber" min="0" max="90" step="0.5" value="15" data-motion-scrub="${step.id}" aria-label="Scrub motion timeline" />
                <span class="motion-timecode" data-motion-time="${step.id}">00:15 / 01:30</span>
                <button type="button" class="motion-btn is-active" data-motion-loop="${step.id}">🔁 Loop: ON</button>
              </div>
              <div class="keyframe-grid">
                ${tip.keyframes.map((kf, idx) => `
                  <button type="button" class="keyframe-card ${idx === 0 ? 'is-active' : ''}" data-keyframe-seek="${kf.sec}" data-step="${step.id}">
                    <span class="keyframe-time">⏱ ${esc(kf.timeLabel)}</span>
                    <strong class="keyframe-label" style="color:var(--text-primary); font-weight:700;">${esc(kf.title)}</strong>
                    <span class="keyframe-label">${esc(kf.detail)}</span>
                  </button>`).join('')}
              </div>
            </div>
          </div>
          <div class="video-tab-pane is-hidden" data-pane="embed" data-step="${step.id}">
            <div class="coaching-note-box"><strong>Hardware Video Coaching Note:</strong> ${esc(tip.coachingNote)}</div>
            <div class="custom-video-controls" style="margin: 0.55rem 0;">
              <input type="url" class="field-input custom-video-input" data-custom-video-input="${step.id}" placeholder="Paste YouTube URL or local .mp4 file path..." value="${esc(savedUrl)}" />
              <button type="button" class="btn btn-primary" data-save-video-url="${step.id}" style="padding:0.42rem 0.8rem; font-size:0.78rem;">💾 Save Video Link</button>
              <a class="btn btn-secondary" data-open-external-video="${step.id}" href="${esc(savedUrl || '#')}" target="_blank" rel="noopener noreferrer" style="padding:0.42rem 0.8rem; font-size:0.78rem; text-decoration:none;">↗ Open Video</a>
            </div>
            <div data-video-embed-slot="${step.id}">${renderMediaEmbedMarkup(savedUrl)}</div>
          </div>
          <div class="mistake-badge-box" role="alert">
            <span aria-hidden="true" style="font-size:1.05rem;">🛑</span>
            <div><strong>Common Builder Mistake to Avoid:</strong> ${esc(tip.commonMistake)}</div>
          </div>
        </div>
      </details>`;
  };

  function syncDrawerUI(drawer, pState) {
    const stepId = pState.stepId;
    const canvas = drawer.querySelector(`[data-motion-canvas="${stepId}"]`);
    const scrub = drawer.querySelector(`[data-motion-scrub="${stepId}"]`);
    const timeEl = drawer.querySelector(`[data-motion-time="${stepId}"]`);
    const playBtn = drawer.querySelector(`[data-motion-play="${stepId}"]`);
    if (canvas) drawMotionCanvas(canvas, stepId, pState.stepNum, pState.timeSec);
    if (scrub) scrub.value = String(pState.timeSec);
    if (timeEl) timeEl.textContent = `${fmtTime(pState.timeSec)} / 01:30`;
    if (playBtn) playBtn.textContent = pState.playing ? '⏸ Pause' : '▶ Play';
    const activeIdx = pState.timeSec < 30 ? 0 : pState.timeSec < 60 ? 1 : 2;
    drawer.querySelectorAll(`[data-keyframe-seek][data-step="${stepId}"]`).forEach((btn, idx) => btn.classList.toggle('is-active', idx === activeIdx));
  }

  G.initMotionCanvases = function (container) {
    players.forEach((p) => cancelAnimationFrame(p.rafId));
    players.clear();
    container.querySelectorAll('.video-tip-drawer').forEach((drawer) => {
      const stepId = drawer.getAttribute('data-step');
      const stepNum = Number(drawer.getAttribute('data-step-num') || 1);
      const pState = { stepId, stepNum, timeSec: 15, playing: false, loop: true, lastTs: 0, rafId: 0 };
      players.set(stepId, pState);
      syncDrawerUI(drawer, pState);
    });
  };

  G.bindVideoDrawerEvents = function (container, getState, onSaveState, showToast) {
    if (!container || container._videoDrawerBound) return;
    container._videoDrawerBound = true;
    container.addEventListener('click', (e) => {
      const tabBtn = e.target.closest('[data-video-tab]');
      if (tabBtn) {
        const mode = tabBtn.getAttribute('data-video-tab'), drawer = tabBtn.closest('.video-tip-drawer');
        drawer.querySelectorAll('[data-video-tab]').forEach((b) => b.classList.toggle('is-active', b === tabBtn));
        drawer.querySelectorAll('.video-tab-pane').forEach((p) => p.classList.toggle('is-hidden', p.getAttribute('data-pane') !== mode));
        return;
      }
      const playBtn = e.target.closest('[data-motion-play]');
      if (playBtn) {
        const p = players.get(playBtn.getAttribute('data-motion-play')), drawer = playBtn.closest('.video-tip-drawer');
        if (!p) return;
        p.playing = !p.playing; p.lastTs = performance.now();
        const tick = (now) => {
          if (!p.playing) return;
          p.timeSec += ((now - p.lastTs) / 1000) * 9; p.lastTs = now;
          if (p.timeSec >= 90) { if (p.loop) p.timeSec = 0; else { p.timeSec = 90; p.playing = false; } }
          syncDrawerUI(drawer, p);
          if (p.playing) p.rafId = requestAnimationFrame(tick);
        };
        if (p.playing) p.rafId = requestAnimationFrame(tick);
        syncDrawerUI(drawer, p);
        return;
      }
      const loopBtn = e.target.closest('[data-motion-loop]');
      if (loopBtn) {
        const p = players.get(loopBtn.getAttribute('data-motion-loop'));
        if (!p) return;
        p.loop = !p.loop; loopBtn.classList.toggle('is-active', p.loop);
        loopBtn.textContent = p.loop ? '🔁 Loop: ON' : '🔁 Loop: OFF';
        return;
      }
      const kfBtn = e.target.closest('[data-keyframe-seek]');
      if (kfBtn) {
        const p = players.get(kfBtn.getAttribute('data-step')), drawer = kfBtn.closest('.video-tip-drawer');
        if (!p) return;
        p.timeSec = Number(kfBtn.getAttribute('data-keyframe-seek') || 15);
        syncDrawerUI(drawer, p);
        return;
      }
      const saveBtn = e.target.closest('[data-save-video-url]');
      if (saveBtn) {
        const stepId = saveBtn.getAttribute('data-save-video-url'), drawer = saveBtn.closest('.video-tip-drawer');
        const input = drawer.querySelector(`[data-custom-video-input="${stepId}"]`);
        const slot = drawer.querySelector(`[data-video-embed-slot="${stepId}"]`);
        const extLink = drawer.querySelector(`[data-open-external-video="${stepId}"]`);
        const state = getState(); state.customVideos = state.customVideos || {};
        const val = (input ? input.value.trim() : '') || (G.VIDEO_TIPS[stepId]?.defaultVideoUrl || '');
        state.customVideos[stepId] = val;
        if (input) input.value = val;
        if (slot) slot.innerHTML = renderMediaEmbedMarkup(val);
        if (extLink) extLink.href = val || '#';
        onSaveState();
        if (showToast) showToast('Saved video URL for this assembly step to localStorage!');
      }
    });
    container.addEventListener('input', (e) => {
      const scrub = e.target.closest('[data-motion-scrub]');
      if (!scrub) return;
      const p = players.get(scrub.getAttribute('data-motion-scrub')), drawer = scrub.closest('.video-tip-drawer');
      if (p) { p.timeSec = Number(scrub.value); syncDrawerUI(drawer, p); }
    });
  };
})();
