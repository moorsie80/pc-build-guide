(function () {
  const G = (window.PCBuildGuide = window.PCBuildGuide || {});
  const hs = (x, y, idx, tone, active) => G.renderHotspotNode(x, y, idx, tone, active);
  const esc = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  G.BLUEPRINTS_SYSTEM = {
    'step-5-case-fans': function (state) {
      const fans = G.getPartDisplayName(state, 'fans');
      const mobo = G.getPartDisplayName(state, 'motherboard');
      const hotspots = [
        { label: '1. Fan 1 → Fan 2 PST Socket', detail: `Plug Fan 2's 4-pin PWM connector into the built-in PST Y-splitter socket on Fan 1 (${fans}).` },
        { label: '2. Fan 2 → Fan 3 PST Chain', detail: `Link Fan 3 into Fan 2's PST socket so all 3 exhaust fans share a synchronized PWM curve.` },
        { label: '3. Single CHA_FAN Header', detail: `Connect the primary 4-pin lead into a single 1A CHA_FAN header on ${mobo}.` }
      ];
      const svg = `
        <svg class="blueprint-svg" viewBox="0 0 540 220" xmlns="http://www.w3.org/2000/svg">
          <g fill="#0f172a" stroke="#38bdf8" stroke-width="1.8">
            <rect x="35" y="38" width="90" height="90" rx="8" /><circle cx="80" cy="83" r="34" />
            <rect x="175" y="38" width="90" height="90" rx="8" /><circle cx="220" cy="83" r="34" />
            <rect x="315" y="38" width="90" height="90" rx="8" /><circle cx="360" cy="83" r="34" />
          </g>
          <text x="80" y="86" fill="#38bdf8" font-size="9" text-anchor="middle" font-family="monospace">P12 #1</text>
          <text x="220" y="86" fill="#38bdf8" font-size="9" text-anchor="middle" font-family="monospace">P12 #2</text>
          <text x="360" y="86" fill="#38bdf8" font-size="9" text-anchor="middle" font-family="monospace">P12 #3</text>
          <!-- PST Daisy-Chain Line -->
          <path d="M80 128 L80 165 L220 165 L220 128 M220 165 L360 165 L360 128 M360 165 L455 165" fill="none" stroke="#fbbf24" stroke-width="2.5" />
          <rect x="445" y="142" width="72" height="44" rx="4" fill="#1e293b" stroke="#34d399" stroke-width="2" />
          <text x="481" y="162" fill="#34d399" font-size="9" text-anchor="middle" font-family="monospace" font-weight="bold">CHA_FAN</text>
          <text x="481" y="175" fill="#9ca3af" font-size="8" text-anchor="middle" font-family="monospace">4-PIN PWM</text>
          <text x="220" y="198" fill="#fbbf24" font-size="9.5" text-anchor="middle" font-family="monospace" font-weight="bold">ARCTIC PWM PST DAISY-CHAIN HARNESS</text>
          ${hs(150, 165, 0, 'amber', true)}${hs(290, 165, 1, 'amber', false)}${hs(481, 142, 2, 'cyan', false)}
        </svg>`;
      return { svg, hotspots };
    },

    'step-6-aio-front': function (state) {
      const aio = G.getPartDisplayName(state, 'aio');
      const pcCase = G.getPartDisplayName(state, 'case');
      const fans = G.getPartDisplayName(state, 'fans');
      const hotspots = [
        { label: '1. 38mm Thick 280mm Front Intake', detail: `Mount ${aio} at the FRONT intake of ${pcCase}—animated blue arrows show cool outside air pulled into the case.` },
        { label: '2. Top VRM/RAM Clearance Zone', detail: `Top-mounting a 38mm thick 280mm radiator collides with tall VRM heatsinks & DDR5 RAM; front-mounting leaves ample room.` },
        { label: '3. Top & Rear P12 Exhaust Flow', detail: `Mount ${fans} at the top and rear with animated orange arrows expelling warm air out of ${pcCase}.` }
      ];
      const svg = `
        <svg class="blueprint-svg" viewBox="0 0 540 220" xmlns="http://www.w3.org/2000/svg">
          <!-- Corsair 4000D Side Profile -->
          <rect x="95" y="18" width="335" height="184" rx="6" fill="#0d1526" stroke="#64748b" stroke-width="2" />
          <rect x="95" y="162" width="195" height="40" fill="#111827" stroke="#475569" />
          <text x="192" y="185" fill="#9ca3af" font-size="8.5" text-anchor="middle" font-family="monospace">PSU SHROUD</text>
          <!-- Front 38mm 280mm Radiator -->
          <rect x="388" y="30" width="26" height="155" rx="3" fill="rgba(56,189,248,0.25)" stroke="#38bdf8" stroke-width="2" />
          <text x="376" y="112" fill="#38bdf8" font-size="8.5" text-anchor="end" font-family="monospace" font-weight="bold">280x38mm AIO</text>
          <!-- Pump & AIO Tubes -->
          <rect x="200" y="64" width="38" height="38" rx="5" fill="#1e293b" stroke="#38bdf8" stroke-width="1.8" />
          <path d="M238 82 Q325 92 388 45" fill="none" stroke="#94a3b8" stroke-width="3" />
          <!-- Animated Blue Intake Arrows (Right -> Left) -->
          <line class="bp-flow-intake" x1="495" y1="68" x2="310" y2="68" />
          <line class="bp-flow-intake" x1="495" y1="115" x2="310" y2="115" />
          <line class="bp-flow-intake" x1="495" y1="152" x2="310" y2="152" />
          <text x="485" y="52" fill="#38bdf8" font-size="8.5" text-anchor="middle" font-family="monospace" font-weight="bold">COOL INTAKE</text>
          <!-- Animated Orange Exhaust Arrows (Top & Rear) -->
          <line class="bp-flow-exhaust" x1="175" y1="65" x2="52" y2="65" />
          <line class="bp-flow-exhaust" x1="215" y1="55" x2="215" y2="6" />
          <line class="bp-flow-exhaust" x1="285" y1="55" x2="285" y2="6" />
          <text x="54" y="48" fill="#f97316" font-size="8.5" text-anchor="middle" font-family="monospace" font-weight="bold">EXHAUST</text>
          ${hs(401, 95, 0, 'cyan', true)}${hs(250, 32, 1, 'amber', false)}${hs(112, 65, 2, 'amber', false)}
        </svg>`;
      return { svg, hotspots };
    },

    'step-7-psu-cables': function (state) {
      const psu = G.getPartDisplayName(state, 'psu');
      const hotspots = [
        { label: '1. 8-Pin (4+4) EPS CPU Power', detail: `Route the 8-pin EPS cable from ${psu} to the top-left motherboard CPU power header.` },
        { label: '2. 24-Pin ATX Mainboard Power', detail: `Snap the wide 24-pin ATX connector into the right-edge motherboard socket until the latch clicks.` },
        { label: '3. PCIe 8-Pin (6+2) GPU Rails', detail: `Connect dedicated modular PCIe power cables from ${psu} ready for the RTX 4070 SUPER.` }
      ];
      const svg = `
        <svg class="blueprint-svg" viewBox="0 0 540 220" xmlns="http://www.w3.org/2000/svg">
          <!-- 8-Pin EPS Block -->
          <rect x="35" y="42" width="125" height="125" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1.8" />
          <text x="97" y="62" fill="#38bdf8" font-size="9.5" text-anchor="middle" font-family="monospace" font-weight="bold">8-PIN EPS (CPU)</text>
          <text x="97" y="105" fill="#f3f4f6" font-size="14" text-anchor="middle" font-family="monospace">■ ■ ■ ■</text>
          <text x="97" y="125" fill="#f3f4f6" font-size="14" text-anchor="middle" font-family="monospace">■ ■ ■ ■</text>
          <text x="97" y="152" fill="#9ca3af" font-size="8" text-anchor="middle" font-family="monospace">TOP-LEFT HEADER</text>
          <!-- 24-Pin ATX Block -->
          <rect x="190" y="42" width="160" height="125" rx="6" fill="#0f172a" stroke="#34d399" stroke-width="1.8" />
          <text x="270" y="62" fill="#34d399" font-size="9.5" text-anchor="middle" font-family="monospace" font-weight="bold">24-PIN ATX (MOBO)</text>
          <text x="270" y="105" fill="#f3f4f6" font-size="11" text-anchor="middle" font-family="monospace">■■■■■■■■■■■■</text>
          <text x="270" y="123" fill="#f3f4f6" font-size="11" text-anchor="middle" font-family="monospace">■■■■■■■■■■■■</text>
          <text x="270" y="152" fill="#9ca3af" font-size="8" text-anchor="middle" font-family="monospace">RIGHT-EDGE HEADER</text>
          <!-- PCIe GPU Block -->
          <rect x="380" y="42" width="125" height="125" rx="6" fill="#0f172a" stroke="#fbbf24" stroke-width="1.8" />
          <text x="442" y="62" fill="#fbbf24" font-size="9.5" text-anchor="middle" font-family="monospace" font-weight="bold">PCIe / 12VHPWR</text>
          <text x="442" y="108" fill="#f3f4f6" font-size="13" text-anchor="middle" font-family="monospace">■■■ + ■</text>
          <text x="442" y="126" fill="#f3f4f6" font-size="13" text-anchor="middle" font-family="monospace">■■■ + ■</text>
          <text x="442" y="152" fill="#9ca3af" font-size="8" text-anchor="middle" font-family="monospace">DEDICATED GPU RAIL</text>
          ${hs(97, 82, 0, 'cyan', true)}${hs(270, 82, 1, 'cyan', false)}${hs(442, 82, 2, 'amber', false)}
        </svg>`;
      return { svg, hotspots };
    },

    'step-8-gpu-install': function (state) {
      const gpu = G.getPartDisplayName(state, 'gpu');
      const hotspots = [
        { label: '1. Rear 2-Slot PCIe Bracket', detail: `Remove 2 rear slot covers and screw the ${gpu} metal I/O bracket firmly to the chassis.` },
        { label: '2. Primary PCIe 4.0 x16 Latch', detail: `Push ${gpu} straight down until the right-side PCIe retention tab snaps upward and locks.` },
        { label: '3. Flush 12VHPWR Power Lock', detail: `Verify zero gap between the power plug and ${gpu} header—do not bend the cable within 35mm.` }
      ];
      const svg = `
        <svg class="blueprint-svg" viewBox="0 0 540 220" xmlns="http://www.w3.org/2000/svg">
          <!-- GPU Shroud -->
          <rect x="115" y="48" width="295" height="98" rx="8" fill="#111827" stroke="#38bdf8" stroke-width="2" />
          <circle cx="195" cy="97" r="36" fill="#0b1324" stroke="#475569" stroke-width="2" />
          <circle cx="325" cy="97" r="36" fill="#0b1324" stroke="#475569" stroke-width="2" />
          <text x="260" y="36" fill="#38bdf8" font-size="9.5" text-anchor="middle" font-family="monospace" font-weight="bold">RTX 4070 SUPER (227.2mm DUAL)</text>
          <!-- Rear Bracket -->
          <rect x="92" y="38" width="23" height="132" rx="2" fill="#334155" stroke="#94a3b8" />
          <!-- PCIe Gold Fingers & Slot -->
          <rect x="145" y="146" width="195" height="16" rx="2" fill="#1e293b" stroke="#fbbf24" stroke-width="1.8" />
          <polygon points="342,144 358,144 350,164" fill="#34d399" />
          <!-- Top Power Header -->
          <rect x="335" y="32" width="44" height="16" rx="2" fill="#fbbf24" />
          <text x="455" y="55" fill="#fbbf24" font-size="8.5" font-family="monospace" font-weight="bold">ZERO-GAP LOCK</text>
          ${hs(103, 72, 0, 'cyan', true)}${hs(350, 154, 1, 'cyan', false)}${hs(357, 40, 2, 'amber', false)}
        </svg>`;
      return { svg, hotspots };
    },

    'step-9-peripherals-bios': function (state) {
      const ram = G.getPartDisplayName(state, 'ram');
      const gpu = G.getPartDisplayName(state, 'gpu');
      const monitor = G.getPartDisplayName(state, 'monitor');
      const hotspots = [
        { label: '1. AMD EXPO → ENABLED', detail: `Switch AMD EXPO to Profile I so ${ram} runs at its rated 6000MT/s speed instead of 4800MT/s.` },
        { label: '2. Resizable BAR → ON', detail: `Enable Above 4G Decoding & Resizable BAR in the ASUS UEFI BIOS to unlock full VRAM access for ${gpu}.` },
        { label: '3. GPU DisplayPort 1.4 Output', detail: `Plug ${monitor} directly into ${gpu}'s horizontal DisplayPort/HDMI output (never the vertical motherboard port).` }
      ];
      const svg = `
        <svg class="blueprint-svg" viewBox="0 0 540 220" xmlns="http://www.w3.org/2000/svg">
          <rect x="30" y="18" width="480" height="184" rx="6" fill="#0b111e" stroke="#38bdf8" stroke-width="1.8" />
          <rect x="30" y="18" width="480" height="28" rx="6" fill="#172033" />
          <text x="46" y="36" fill="#fbbf24" font-size="10" font-family="monospace" font-weight="bold">ASUS UEFI BIOS UTILITY · EZ MODE</text>
          <!-- AMD EXPO Toggle Card -->
          <rect x="52" y="62" width="205" height="62" rx="6" fill="#111827" stroke="#34d399" stroke-width="1.8" />
          <text x="66" y="84" fill="#9ca3af" font-size="9" font-family="monospace">MEMORY OVERCLOCK</text>
          <text x="66" y="104" fill="#34d399" font-size="11" font-family="monospace" font-weight="bold">AMD EXPO: ENABLED</text>
          <text x="66" y="117" fill="#f3f4f6" font-size="8.5" font-family="monospace">DDR5-6000MHz CL36</text>
          <!-- Resizable BAR Toggle Card -->
          <rect x="282" y="62" width="205" height="62" rx="6" fill="#111827" stroke="#38bdf8" stroke-width="1.8" />
          <text x="296" y="84" fill="#9ca3af" font-size="9" font-family="monospace">PCIe SMART ACCESS</text>
          <text x="296" y="104" fill="#38bdf8" font-size="11" font-family="monospace" font-weight="bold">RESIZABLE BAR: ON</text>
          <text x="296" y="117" fill="#f3f4f6" font-size="8.5" font-family="monospace">FULL 12GB VRAM ACCESS</text>
          <!-- GPU DisplayPort Bar -->
          <rect x="52" y="140" width="435" height="44" rx="5" fill="#111827" stroke="#fbbf24" stroke-width="1.5" />
          <text x="270" y="166" fill="#fbbf24" font-size="9.5" text-anchor="middle" font-family="monospace" font-weight="bold">4K MONITOR CABLE → PLUG INTO GPU DISPLAYPORT (NOT MOBO)</text>
          ${hs(235, 92, 0, 'cyan', true)}${hs(465, 92, 1, 'cyan', false)}${hs(270, 162, 2, 'amber', false)}
        </svg>`;
      return { svg, hotspots };
    }
  };

  G.renderBlueprintSlot = function (step, state) {
    const fn = G.BLUEPRINTS_BENCH?.[step.id] || G.BLUEPRINTS_SYSTEM?.[step.id];
    if (!fn) return '';
    const { svg, hotspots } = fn(state);
    const first = hotspots[0];
    return `
      <div class="blueprint-card" data-bp-card="${step.id}">
        <div class="blueprint-toolbar">
          <div class="blueprint-meta">
            <span class="blueprint-code">${esc(step.svgBlueprint.code)}</span>
            <span class="blueprint-title-text">${esc(step.svgBlueprint.title)}</span>
          </div>
          <button type="button" class="blueprint-zoom-btn" data-bp-zoom="${step.id}">🔍 Zoom / Expand Blueprint</button>
        </div>
        <div class="blueprint-canvas-wrap">${svg}</div>
        <div class="blueprint-inspector">
          <div class="hotspot-pills-row">
            ${hotspots.map((h, i) => `<button type="button" class="hotspot-chip ${i === 0 ? 'is-active' : ''}" data-hs-chip="${i}" data-hs-title="${esc(h.label)}" data-hs-detail="${esc(h.detail)}">${esc(h.label)}</button>`).join('')}
          </div>
          <p class="inspector-detail-text" data-bp-readout><strong>${esc(first.label)}:</strong> ${esc(first.detail)}</p>
        </div>
      </div>`;
  };

  G.activateBlueprintHotspot = function (cardEl, idx) {
    if (!cardEl) return;
    const chip = cardEl.querySelector(`.hotspot-chip[data-hs-chip="${idx}"]`);
    if (!chip) return;
    cardEl.querySelectorAll('.bp-hotspot').forEach((n) => n.classList.toggle('is-active', n.dataset.hsIdx === String(idx)));
    cardEl.querySelectorAll('.hotspot-chip').forEach((c) => c.classList.toggle('is-active', c.dataset.hsChip === String(idx)));
    const readout = cardEl.querySelector('[data-bp-readout]');
    if (readout) {
      readout.innerHTML = `<strong>${esc(chip.dataset.hsTitle)}:</strong> ${esc(chip.dataset.hsDetail)}`;
    }
  };

  G.bindBlueprintEvents = function (containerEl) {
    if (!containerEl) return;
    const handleHotspotEvent = (e) => {
      const hsNode = e.target.closest('.bp-hotspot');
      const chipNode = e.target.closest('.hotspot-chip');
      if (hsNode) {
        G.activateBlueprintHotspot(hsNode.closest('.blueprint-card'), hsNode.dataset.hsIdx);
      } else if (chipNode) {
        G.activateBlueprintHotspot(chipNode.closest('.blueprint-card'), chipNode.dataset.hsChip);
      }
    };
    containerEl.addEventListener('mouseover', handleHotspotEvent);
    containerEl.addEventListener('click', (e) => {
      const zoomBtn = e.target.closest('[data-bp-zoom]');
      if (zoomBtn) {
        const card = zoomBtn.closest('.blueprint-card');
        const expanded = card.classList.toggle('is-expanded');
        zoomBtn.textContent = expanded ? '🗕 Collapse Blueprint' : '🔍 Zoom / Expand Blueprint';
        return;
      }
      handleHotspotEvent(e);
    });
  };
})();
