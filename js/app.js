(function () {
  const G = window.PCBuildGuide;
  let appState = G.loadState();

  const coreGridEl = document.getElementById('core-parts-grid');
  const peripheralsGridEl = document.getElementById('peripherals-parts-grid');
  const totalPriceEl = document.getElementById('total-price');
  const partsCountEl = document.getElementById('parts-count');
  const guideSectionEl = document.getElementById('guide-section');
  const guideStepsEl = document.getElementById('guide-steps');
  const guideProgressBarEl = document.getElementById('guide-progress-bar');
  const guideProgressTextEl = document.getElementById('guide-progress-text');
  const toastEl = document.getElementById('toast-banner');
  const jsonModalEl = document.getElementById('json-modal');
  const jsonTextareaEl = document.getElementById('json-textarea');
  const jsonStatusEl = document.getElementById('json-status');

  const escapeHtml = (str) => String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('visible');
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => toastEl.classList.remove('visible'), 3400);
  }
  function updateSummaryMetrics() {
    const total = G.calculateTotalCost(appState);
    totalPriceEl.textContent = `£${total.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    partsCountEl.textContent = `${G.countPopulatedParts(appState)} / ${G.CATEGORIES.length} Parts Configured`;
  }
  function updateCardStatusAndLink(catId) {
    const linkEl = document.getElementById(`retail-link-${catId}`);
    const cardEl = document.getElementById(`card-${catId}`);
    const part = appState.parts[catId];
    if (!linkEl || !part) return;
    cardEl?.classList.toggle('is-populated', Boolean(part.make.trim() || part.model.trim()));
    const rawUrl = part.url.trim();
    const isValid = /^https?:\/\//i.test(rawUrl);
    if (isValid) {
      linkEl.href = rawUrl;
      linkEl.classList.remove('is-disabled');
    } else {
      linkEl.removeAttribute('href');
      linkEl.classList.add('is-disabled');
    }
    linkEl.setAttribute('aria-disabled', String(!isValid));
    linkEl.title = isValid ? `Open Amazon.co.uk (${part.asin || 'Link'}): ${rawUrl}` : 'Enter a valid https:// Amazon.co.uk URL to enable';
  }

  function renderCardMarkup(cat) {
    const part = appState.parts[cat.id] || { make: '', model: '', specs: '', priceGBP: '', url: '', asin: '' };
    const isPopulated = Boolean(part.make.trim() || part.model.trim());
    const validUrl = /^https?:\/\//i.test(part.url.trim());
    const safeUrl = escapeHtml(part.url.trim());

    return `
      <article class="part-card ${isPopulated ? 'is-populated' : ''}" id="card-${cat.id}" data-category="${cat.id}">
        <div class="part-card-header">
          <div class="part-title-group">
            <span class="part-icon" aria-hidden="true">${cat.icon}</span>
            <div><span class="part-badge">${cat.badge}</span><h3 class="part-label">${cat.label}</h3></div>
          </div>
          <a id="retail-link-${cat.id}" class="retail-link-btn ${validUrl ? '' : 'is-disabled'}"
             ${validUrl ? `href="${safeUrl}"` : ''} target="_blank" rel="noopener noreferrer"
             aria-disabled="${!validUrl}" title="${validUrl ? safeUrl : 'Enter a valid https:// Amazon.co.uk URL'}">
            <span>Amazon.co.uk</span><span aria-hidden="true">↗</span>
          </a>
        </div>
        <div class="part-form-grid">
          <label class="field-group"><span class="field-label">Make</span>
            <input type="text" class="field-input" data-cat="${cat.id}" data-field="make" placeholder="${escapeHtml(cat.makePlaceholder)}" value="${escapeHtml(part.make)}" />
          </label>
          <label class="field-group"><span class="field-label">Model</span>
            <input type="text" class="field-input" data-cat="${cat.id}" data-field="model" placeholder="${escapeHtml(cat.modelPlaceholder)}" value="${escapeHtml(part.model)}" />
          </label>
          <label class="field-group full-span"><span class="field-label">Key Specs</span>
            <input type="text" class="field-input" data-cat="${cat.id}" data-field="specs" placeholder="${escapeHtml(cat.specsPlaceholder)}" value="${escapeHtml(part.specs)}" />
          </label>
          <label class="field-group"><span class="field-label">Price (£ GBP)</span>
            <div class="price-input-wrap"><span class="currency-prefix">£</span>
              <input type="number" step="0.01" min="0" class="field-input price-input" data-cat="${cat.id}" data-field="priceGBP" placeholder="0.00" value="${escapeHtml(part.priceGBP)}" />
            </div>
          </label>
          <label class="field-group"><span class="field-label">Amazon.co.uk URL</span>
            <input type="url" class="field-input" data-cat="${cat.id}" data-field="url" placeholder="https://www.amazon.co.uk/dp/..." value="${escapeHtml(part.url)}" />
          </label>
        </div>
      </article>`;
  }

  function renderPartsLocker() {
    const coreCats = G.CATEGORIES.filter((c) => c.group === 'core');
    const peripheralCats = G.CATEGORIES.filter((c) => c.group === 'peripherals');
    coreGridEl.innerHTML = coreCats.map(renderCardMarkup).join('');
    peripheralsGridEl.innerHTML = peripheralCats.map(renderCardMarkup).join('');
    updateSummaryMetrics();
  }
  function updateGuideProgress(steps) {
    const total = steps.length;
    const doneCount = steps.filter((s) => appState.completedSteps[s.id]).length;
    const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0;
    guideProgressBarEl.style.width = `${pct}%`;
    guideProgressTextEl.textContent = `${doneCount} of ${total} Assembly Steps Completed (${pct}%)`;
  }
  function renderBuildGuide() {
    const steps = G.buildGuideSteps(appState);
    guideSectionEl.classList.remove('is-hidden');

    guideStepsEl.innerHTML = steps.map((step) => {
      const isDone = Boolean(appState.completedSteps[step.id]);
      return `
        <article class="guide-step-card ${isDone ? 'is-completed' : ''}" data-step-id="${step.id}">
          <div class="guide-step-top">
            <label class="step-check-label">
              <input type="checkbox" class="step-checkbox" data-step-check="${step.id}" ${isDone ? 'checked' : ''} />
              <span class="step-number-badge">Step ${step.stepNum}</span>
            </label>
            <div class="step-heading-wrap">
              <span class="step-phase-tag">${escapeHtml(step.phaseLabel)}</span>
              <h3 class="step-title">${escapeHtml(step.title)}</h3>
            </div>
            <div class="step-parts-pills">
              ${step.partsInvolved.map((p) => `<span class="step-part-pill">${escapeHtml(p)}</span>`).join('')}
            </div>
          </div>
          <ul class="step-instructions">
            ${step.instructions.map((inst) => `<li>${inst}</li>`).join('')}
          </ul>
          <div class="hardware-warning-box" role="note">
            <span class="warning-icon" aria-hidden="true">⚠️</span>
            <div><strong>Hardware-Specific Warning:</strong> ${escapeHtml(step.warning)}</div>
          </div>
          <div class="phase-placeholders-grid">
            ${G.renderBlueprintSlot(step, appState)}
            <details class="video-tip-drawer" data-phase="3" data-step="${step.id}">
              <summary class="video-tip-summary">
                <span><span class="slot-pill phase-3-pill" style="margin-right:0.45rem;">Phase 3</span>🎬 Watch Video Tip: ${escapeHtml(step.videoTip.title)}</span>
                <span class="slot-duration">▶ ${escapeHtml(step.videoTip.duration)} ▾</span>
              </summary>
              <div class="video-tip-body">
                <p><strong>Video Tip Drawer Slot (Phase 3):</strong> ${escapeHtml(step.videoTip.summary)}</p>
              </div>
            </details>
          </div>
        </article>`;
    }).join('');
    updateGuideProgress(steps);
  }

  function bindEvents() {
    document.getElementById('locker-container').addEventListener('input', (e) => {
      const target = e.target;
      if (!(target instanceof HTMLInputElement)) return;
      const { cat, field } = target.dataset;
      if (!cat || !field || !appState.parts[cat]) return;
      appState.parts[cat][field] = target.value;
      G.saveState(appState);
      updateSummaryMetrics();
      updateCardStatusAndLink(cat);
      if (appState.guideGenerated) renderBuildGuide();
    });

    document.getElementById('btn-load-default-rig').addEventListener('click', () => {
      const keepGuideOpen = appState.guideGenerated;
      appState = G.createDefaultRigState();
      appState.guideGenerated = keepGuideOpen;
      G.saveState(appState);
      renderPartsLocker();
      if (appState.guideGenerated) renderBuildGuide();
      showToast('Loaded AM5 & RTX 4070 SUPER 4K Turnkey Build (£2,154.35)!');
    });

    document.getElementById('btn-generate-guide').addEventListener('click', () => {
      appState.guideGenerated = true;
      G.saveState(appState);
      renderBuildGuide();
      guideSectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      showToast('Tailored 9-step assembly & BIOS guide generated!');
    });

    guideStepsEl.addEventListener('change', (e) => {
      const target = e.target;
      if (!(target instanceof HTMLInputElement) || !target.dataset.stepCheck) return;
      appState.completedSteps[target.dataset.stepCheck] = target.checked;
      G.saveState(appState);
      target.closest('.guide-step-card')?.classList.toggle('is-completed', target.checked);
      updateGuideProgress(G.buildGuideSteps(appState));
    });
    G.bindBlueprintEvents(guideStepsEl);

    document.getElementById('btn-open-json').addEventListener('click', () => {
      jsonTextareaEl.value = JSON.stringify(G.exportRigJsonObject(appState), null, 2);
      jsonStatusEl.textContent = 'Showing active 12-part rig JSON (with priceGBP & ASINs)';
      jsonModalEl.classList.remove('is-hidden');
      jsonTextareaEl.focus();
    });

    document.getElementById('btn-close-json').addEventListener('click', () => jsonModalEl.classList.add('is-hidden'));
    document.getElementById('btn-fill-default-json').addEventListener('click', () => {
      jsonTextareaEl.value = JSON.stringify(G.DEFAULT_RIG_JSON, null, 2);
      jsonStatusEl.textContent = 'Loaded default £2,154.35 AM5 & RTX 4070 SUPER JSON dataset';
    });

    document.getElementById('btn-apply-json').addEventListener('click', () => {
      try {
        const { updates, matchedCount, meta } = G.parseRigJson(jsonTextareaEl.value);
        if (matchedCount === 0) {
          jsonStatusEl.textContent = '⚠️ No matching part categories found in JSON.';
          return;
        }
        if (meta && meta.buildName) appState.buildName = String(meta.buildName);
        for (const [catId, item] of Object.entries(updates)) {
          const t = appState.parts[catId];
          if (!t) continue;
          ['make', 'model', 'specs', 'asin', 'url'].forEach((k) => { if (item[k] !== undefined) t[k] = String(item[k]); });
          const rawP = item.priceGBP ?? item.price;
          if (rawP !== undefined) {
            const num = parseFloat(String(rawP).replace(/[^0-9.]/g, ''));
            t.priceGBP = Number.isNaN(num) ? '' : num.toFixed(2);
          }
        }
        G.saveState(appState);
        renderPartsLocker();
        if (appState.guideGenerated) renderBuildGuide();
        jsonModalEl.classList.add('is-hidden');
        showToast(`Imported ${matchedCount} parts (Total: £${G.calculateTotalCost(appState).toFixed(2)})!`);
      } catch (err) {
        jsonStatusEl.textContent = `❌ Invalid JSON syntax: ${err.message}`;
      }
    });
    document.getElementById('btn-clear-all').addEventListener('click', () => {
      appState = G.createEmptyState();
      G.saveState(appState);
      renderPartsLocker();
      guideSectionEl.classList.add('is-hidden');
      showToast('All 12 locker cards cleared.');
    });
  }
  renderPartsLocker();
  if (appState.guideGenerated) renderBuildGuide();
  bindEvents();
})();
