(function () {
  const G = (window.PCBuildGuide = window.PCBuildGuide || {});
  const esc = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  G.getSanityCheckItems = function (state) {
    const cpu = G.getPartDisplayName(state, 'cpu');
    const gpu = G.getPartDisplayName(state, 'gpu');
    const ram = G.getPartDisplayName(state, 'ram');
    const mobo = G.getPartDisplayName(state, 'motherboard');
    const aio = G.getPartDisplayName(state, 'cooler');
    const fans = G.getPartDisplayName(state, 'fans');
    const psu = G.getPartDisplayName(state, 'psu');
    const monitor = G.getPartDisplayName(state, 'monitor');

    return [
      {
        id: 'chk-1-film',
        title: '1) Cold Plate Film Check',
        desc: `Confirmed protective film peeled off the ${aio} copper cold plate base before mounting.`
      },
      {
        id: 'chk-2-eps',
        title: '2) Top-Left CPU Power',
        desc: `8-pin EPS CPU power cable firmly latched into the top-left header of the ${mobo}.`
      },
      {
        id: 'chk-3-ddr5',
        title: '3) DDR5 Dual-Channel Lock',
        desc: `${ram} modules seated in DIMM_A2 & DIMM_B2 (2nd & 4th slots) with top latches clicked flush.`
      },
      {
        id: 'chk-4-gpu',
        title: '4) GPU PCIe & Power Latch',
        desc: `${gpu} fully clicked into the primary PCIe x16 slot with zero gap on the power connector.`
      },
      {
        id: 'chk-5-dp',
        title: '5) Display Cable Port Check',
        desc: `Monitor cable from the ${monitor} (or LG UltraGear G8 27" 4K) plugged directly into the ${gpu} graphics card (NOT the motherboard I/O).`
      },
      {
        id: 'chk-6-fans',
        title: '6) Pump, VRM & PST Fan Headers',
        desc: `${aio} PWM cable and daisy-chained ${fans} connected to CPU_FAN / AIO_PUMP / CHA_FAN headers.`
      },
      {
        id: 'chk-7-psu',
        title: '7) Clear Case Interior & PSU Switch',
        desc: `No loose screws on the motherboard tray, and the ${psu} (or Corsair RM750) rear switch flipped from 'O' to 'I'.`
      },
      {
        id: 'chk-8-expo',
        title: '8) AM5 DDR5 Memory Training Note',
        desc: `Acknowledge that first boot on the ${cpu} can take 60–90 seconds with an amber DRAM Q-LED while training 6000MT/s memory—do not force power off early.`
      }
    ];
  };

  G.countSanityChecked = function (state) {
    const items = G.getSanityCheckItems(state);
    const map = state.sanityChecks || {};
    return items.filter((i) => Boolean(map[i.id])).length;
  };

  G.renderStep9SanityPrompt = function (state) {
    const done = G.countSanityChecked(state);
    const allClear = done === 8;
    return `
      <div class="sanity-gate-prompt">
        <div class="sanity-gate-text">
          <strong>${allClear ? '✅ Cleared for First Boot & UEFI BIOS Setup (8/8 Verified)!' : `🛡️ Final First-Boot Readiness Gate (${done}/8 Checks Verified)`}</strong>
          <span>Before pressing the case power button, run the interactive 8-point hardware &amp; cable sanity verification.</span>
        </div>
        <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
          <button type="button" class="btn btn-primary" data-open-sanity-modal="true">🛡️ Run Pre-Power-On Sanity Check (${done}/8)</button>
          <button type="button" class="btn btn-secondary" data-trigger-print-dossier="true">🖨️ Print / Save PDF Guide</button>
        </div>
      </div>`;
  };

  G.renderSanityModalContents = function (state) {
    const items = G.getSanityCheckItems(state);
    const checks = state.sanityChecks || {};
    const done = items.filter((i) => Boolean(checks[i.id])).length;
    const pct = Math.round((done / items.length) * 100);
    const headerBtn = document.getElementById('btn-open-sanity');
    if (headerBtn) headerBtn.innerHTML = `<span>🛡️ Run Pre-Power-On Sanity Check (${done}/8)</span>`;

    const listEl = document.getElementById('sanity-checklist-container');
    const meterTextEl = document.getElementById('sanity-meter-text');
    const meterBarEl = document.getElementById('sanity-meter-bar');
    const bannerEl = document.getElementById('sanity-cleared-banner');
    if (!listEl) return;

    if (meterTextEl) meterTextEl.textContent = `${done} / ${items.length} Pre-Boot Checks Verified (${pct}%)`;
    if (meterBarEl) meterBarEl.style.width = `${pct}%`;
    if (bannerEl) bannerEl.classList.toggle('is-hidden', done < items.length);

    listEl.innerHTML = items.map((item) => {
      const checked = Boolean(checks[item.id]);
      return `
        <label class="sanity-item-card ${checked ? 'is-checked' : ''}">
          <input type="checkbox" data-sanity-check="${item.id}" ${checked ? 'checked' : ''} />
          <div>
            <span class="sanity-item-title">${esc(item.title)}</span>
            <span class="sanity-item-desc">${esc(item.desc)}</span>
          </div>
        </label>`;
    }).join('');
  };

  G.renderPrintDossier = function (state) {
    const sheetEl = document.getElementById('print-dossier-sheet');
    if (!sheetEl) return;
    const orderedCats = [...G.CATEGORIES].sort((a, b) => Number(a.partNumber) - Number(b.partNumber));
    const total = G.calculateTotalCost(state);
    const items = G.getSanityCheckItems(state);
    const checks = state.sanityChecks || {};

    sheetEl.innerHTML = `
      <div class="print-dossier-header">
        <div>
          <h1 style="margin:0; font-size:15pt;">Custom PC Build Dossier &amp; Workbench Manual</h1>
          <p style="margin:2px 0 0; font-size:9pt; color:#334155;">Build: ${esc(state.buildName || G.DEFAULT_RIG_JSON.buildName)} · 12-Part Hardware Manifest &amp; 9-Step Assembly Checklist</p>
        </div>
        <div style="text-align:right;">
          <strong style="font-size:13pt;">Total: £${total.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
          <div style="font-size:8pt; color:#475569;">Pre-Boot Sanity: ${G.countSanityChecked(state)}/8 Verified</div>
        </div>
      </div>

      <h2 style="font-size:10.5pt; margin:0 0 4px;">1. 12-Part Hardware Manifest (£ GBP)</h2>
      <table class="print-manifest-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Make &amp; Model</th>
            <th>Key Technical Specs</th>
            <th>ASIN / Retail Link</th>
            <th style="text-align:right;">Price (£)</th>
          </tr>
        </thead>
        <tbody>
          ${orderedCats.map((cat) => {
            const p = state.parts[cat.id] || {};
            const priceNum = parseFloat(String(p.priceGBP || '0').replace(/[^0-9.]/g, '')) || 0;
            return `
              <tr>
                <td>${esc(cat.partNumber)}</td>
                <td><strong>${esc(cat.categoryName)}</strong></td>
                <td>${esc(`${p.make || ''} ${p.model || ''}`.trim() || cat.defaultName)}</td>
                <td>${esc(p.specs || '')}</td>
                <td style="font-family:Consolas,monospace; font-size:7.5pt;">${esc(p.asin || p.url || '—')}</td>
                <td style="text-align:right; font-weight:700;">£${priceNum.toFixed(2)}</td>
              </tr>`;
          }).join('')}
        </tbody>
        <tfoot>
          <tr>
            <th colspan="5" style="text-align:right;">Total Configured Build Cost (£ GBP):</th>
            <th style="text-align:right;">£${total.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</th>
          </tr>
        </tfoot>
      </table>

      <div class="print-sanity-box">
        <h2 style="font-size:10pt; margin:0 0 6px;">2. 8-Point Pre-Power-On Sanity Checklist (First-Boot Readiness Gate)</h2>
        <div class="print-sanity-grid">
          ${items.map((item) => `
            <div>
              <strong>${checks[item.id] ? '☑' : '☐'} ${esc(item.title)}:</strong>
              <span>${esc(item.desc)}</span>
            </div>`).join('')}
        </div>
      </div>`;
  };

  G.initSanityAndPrint = function (getState, onSaveState, ensureGuideRendered, showToast) {
    const sanityModalEl = document.getElementById('sanity-modal');
    const openModal = () => {
      const state = getState();
      G.renderSanityModalContents(state);
      sanityModalEl?.classList.remove('is-hidden');
    };

    document.getElementById('btn-open-sanity')?.addEventListener('click', openModal);
    document.getElementById('btn-close-sanity')?.addEventListener('click', () => sanityModalEl?.classList.add('is-hidden'));

    document.getElementById('btn-check-all-sanity')?.addEventListener('click', () => {
      const state = getState();
      state.sanityChecks = state.sanityChecks || {};
      const items = G.getSanityCheckItems(state);
      const allDone = G.countSanityChecked(state) === items.length;
      items.forEach((i) => { state.sanityChecks[i.id] = !allDone; });
      onSaveState();
      G.renderSanityModalContents(state);
      if (state.guideGenerated) ensureGuideRendered();
      showToast(allDone ? 'Reset 8-point sanity checklist.' : 'All 8 Pre-Power-On Sanity Checks verified!');
    });

    sanityModalEl?.addEventListener('change', (e) => {
      const cb = e.target.closest('[data-sanity-check]');
      if (!cb) return;
      const state = getState();
      state.sanityChecks = state.sanityChecks || {};
      state.sanityChecks[cb.getAttribute('data-sanity-check')] = cb.checked;
      onSaveState();
      G.renderSanityModalContents(state);
      if (state.guideGenerated) ensureGuideRendered();
    });

    const triggerPrint = () => {
      const state = getState();
      state.guideGenerated = true;
      onSaveState();
      ensureGuideRendered();
      G.renderPrintDossier(state);
      document.querySelectorAll('.video-tip-drawer').forEach((d) => d.setAttribute('open', 'open'));
      window.print();
    };

    document.getElementById('btn-print-dossier')?.addEventListener('click', triggerPrint);
    document.getElementById('btn-modal-print-dossier')?.addEventListener('click', triggerPrint);

    document.getElementById('guide-steps')?.addEventListener('click', (e) => {
      if (e.target.closest('[data-open-sanity-modal]')) openModal();
      if (e.target.closest('[data-trigger-print-dossier]')) triggerPrint();
    });

    G.renderSanityModalContents(getState());
  };
})();
