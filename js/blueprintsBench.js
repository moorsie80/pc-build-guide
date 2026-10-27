(function () {
  const G = (window.PCBuildGuide = window.PCBuildGuide || {});

  function renderHotspotNode(x, y, idx, tone = 'cyan', active = false) {
    return `
      <g class="bp-hotspot ${tone} ${active ? 'is-active' : ''}" data-hs-idx="${idx}" tabindex="0" role="button" aria-label="Inspect Callout ${idx + 1}">
        <circle class="bp-hotspot-ring" cx="${x}" cy="${y}" r="12" />
        <circle class="bp-hotspot-core" cx="${x}" cy="${y}" r="7.5" />
        <text class="bp-hotspot-num" x="${x}" y="${y}">${idx + 1}</text>
      </g>`;
  }

  G.renderHotspotNode = renderHotspotNode;

  G.BLUEPRINTS_BENCH = {
    'step-1-prep': function (state) {
      const mobo = G.getPartDisplayName(state, 'motherboard');
      const pcCase = G.getPartDisplayName(state, 'case');
      const hotspots = [
        { label: '1. Cardboard Box Testbench', detail: `Place ${mobo} flat on its cardboard retail box—never on the conductive metallic anti-static bag.` },
        { label: '2. Front Perforated Mesh', detail: `Pull the ${pcCase} steel front airflow panel straight outward from the bottom snap clips to expose the 280mm fan mount.` },
        { label: '3. Tempered Glass & Rear Panels', detail: `Loosen the captive rear thumbscrews on ${pcCase} and slide both side panels backward to clear the chassis interior.` }
      ];
      const svg = `
        <svg class="blueprint-svg" viewBox="0 0 540 220" xmlns="http://www.w3.org/2000/svg">
          <!-- Left: Motherboard on Box Testbench -->
          <rect x="22" y="42" width="215" height="145" rx="6" fill="#161b26" stroke="#64748b" stroke-width="1.5" stroke-dasharray="5 3" />
          <text x="32" y="58" fill="#9ca3af" font-size="9" font-family="monospace">CARDBOARD BOX TESTBENCH</text>
          <rect x="40" y="66" width="178" height="108" rx="4" fill="#0f172a" stroke="#38bdf8" stroke-width="1.8" />
          <rect x="50" y="76" width="28" height="65" rx="2" fill="#1e293b" stroke="#475569" />
          <rect x="95" y="84" width="38" height="38" rx="3" fill="#1e293b" stroke="#fbbf24" stroke-width="1.4" />
          <text x="114" y="106" fill="#fbbf24" font-size="8" text-anchor="middle" font-family="monospace">AM5</text>
          <line x1="148" y1="78" x2="148" y2="128" stroke="#38bdf8" stroke-width="2" />
          <line x1="156" y1="78" x2="156" y2="128" stroke="#38bdf8" stroke-width="2" />
          <rect x="58" y="148" width="110" height="8" rx="2" fill="#334155" />
          <text x="129" y="199" fill="#38bdf8" font-size="9.5" text-anchor="middle" font-weight="bold">OUT-OF-BOX MOBO PREP</text>

          <!-- Right: Corsair 4000D 3 Removable Panels -->
          <rect x="315" y="45" width="145" height="135" rx="4" fill="#0f172a" stroke="#94a3b8" stroke-width="1.8" />
          <text x="387" y="62" fill="#9ca3af" font-size="9" text-anchor="middle" font-family="monospace">4000D CHASSIS FRAME</text>
          <!-- Front Mesh Panel Popping Off -->
          <rect x="278" y="48" width="16" height="128" rx="3" fill="rgba(56,189,248,0.15)" stroke="#38bdf8" stroke-width="1.6" />
          <path d="M310 110 L297 110" stroke="#38bdf8" stroke-width="1.8" marker-end="url(#arrowCyan)" />
          <!-- Side Glass & Rear Panel -->
          <rect x="474" y="52" width="18" height="122" rx="3" fill="rgba(251,191,36,0.14)" stroke="#fbbf24" stroke-width="1.6" />
          <text x="387" y="199" fill="#fbbf24" font-size="9.5" text-anchor="middle" font-weight="bold">3-PANEL REMOVAL</text>

          ${renderHotspotNode(129, 136, 0, 'cyan', true)}
          ${renderHotspotNode(286, 95, 1, 'cyan', false)}
          ${renderHotspotNode(483, 112, 2, 'amber', false)}
        </svg>`;
      return { svg, hotspots };
    },

    'step-2-am5-cpu': function (state) {
      const cpu = G.getPartDisplayName(state, 'cpu');
      const hotspots = [
        { label: '1. Gold Pin-1 Triangle', detail: `Align the top-left gold triangle on ${cpu} with the matching triangle stamped on the AM5 socket housing.` },
        { label: '2. AM5 Keying Notches', detail: `Verify the top and bottom PCB side notches on ${cpu} sit flush around the socket alignment pegs.` },
        { label: '3. LGA1718 Retention Arm', detail: `Press the metal load lever firmly down and hook it under the retention tab until the black plastic cover pops free.` }
      ];
      const svg = `
        <svg class="blueprint-svg" viewBox="0 0 540 220" xmlns="http://www.w3.org/2000/svg">
          <!-- Socket Base -->
          <rect x="155" y="20" width="190" height="180" rx="8" fill="#111827" stroke="#64748b" stroke-width="2" />
          <rect x="180" y="38" width="140" height="144" rx="5" fill="#0b1324" stroke="#38bdf8" stroke-width="1.8" />
          <!-- Gold Pin 1 Triangle -->
          <polygon points="186,44 206,44 186,64" fill="#fbbf24" />
          <text x="212" y="56" fill="#fbbf24" font-size="9" font-family="monospace" font-weight="bold">PIN 1 ▲</text>
          <!-- Ryzen 7800X3D Octopus IHS -->
          <rect x="202" y="60" width="96" height="100" rx="6" fill="#1e293b" stroke="#94a3b8" stroke-width="2" />
          <text x="250" y="106" fill="#f3f4f6" font-size="10" text-anchor="middle" font-weight="bold">RYZEN 7</text>
          <text x="250" y="120" fill="#38bdf8" font-size="9" text-anchor="middle" font-family="monospace">7800X3D AM5</text>
          <!-- Alignment Notches -->
          <circle cx="250" cy="38" r="5" fill="#fbbf24" />
          <circle cx="250" cy="182" r="5" fill="#fbbf24" />
          <!-- Retention Arm -->
          <line x1="365" y1="30" x2="365" y2="188" stroke="#38bdf8" stroke-width="5" stroke-linecap="round" />
          <path d="M365 188 L345 188" stroke="#38bdf8" stroke-width="4" />
          <text x="435" y="110" fill="#9ca3af" font-size="9.5" font-family="monospace">LGA1718 ZIF</text>
          <text x="435" y="124" fill="#38bdf8" font-size="9.5" font-family="monospace">RETENTION BAR</text>

          ${renderHotspotNode(192, 50, 0, 'amber', true)}
          ${renderHotspotNode(250, 38, 1, 'cyan', false)}
          ${renderHotspotNode(365, 165, 2, 'cyan', false)}
        </svg>`;
      return { svg, hotspots };
    },

    'step-3-ram-nvme': function (state) {
      const ram = G.getPartDisplayName(state, 'ram');
      const nvme = G.getPartDisplayName(state, 'nvme');
      const hotspots = [
        { label: '1. DIMM_A2 (2nd Slot)', detail: `Populate DIMM_A2 first with one stick of ${ram}. Leave DIMM_A1 empty.` },
        { label: '2. DIMM_B2 (4th Slot)', detail: `Populate DIMM_B2 with the second stick of ${ram} to enable Dual-Channel 6000MT/s operation.` },
        { label: '3. M.2_1 Slot (Above PCIe x16)', detail: `Install ${nvme} in the top CPU-direct M.2_1 slot and peel the blue protective film off the heatsink thermal pad.` }
      ];
      const svg = `
        <svg class="blueprint-svg" viewBox="0 0 540 220" xmlns="http://www.w3.org/2000/svg">
          <rect x="65" y="14" width="410" height="192" rx="6" fill="#0d1526" stroke="#475569" stroke-width="2" />
          <!-- CPU Socket Reference -->
          <rect x="115" y="34" width="76" height="76" rx="4" fill="#1e293b" stroke="#64748b" stroke-width="1.5" />
          <text x="153" y="75" fill="#9ca3af" font-size="9" text-anchor="middle" font-family="monospace">AM5 CPU</text>

          <!-- 4 DIMM Slots (A1, A2, B1, B2) -->
          <rect x="235" y="26" width="12" height="96" rx="2" fill="#1e293b" stroke="#475569" />
          <rect x="259" y="26" width="14" height="96" rx="2" fill="rgba(56,189,248,0.28)" stroke="#38bdf8" stroke-width="2" />
          <rect x="285" y="26" width="12" height="96" rx="2" fill="#1e293b" stroke="#475569" />
          <rect x="309" y="26" width="14" height="96" rx="2" fill="rgba(56,189,248,0.28)" stroke="#38bdf8" stroke-width="2" />
          <text x="241" y="134" fill="#6b7280" font-size="8" text-anchor="middle" font-family="monospace">A1</text>
          <text x="266" y="134" fill="#38bdf8" font-size="9" text-anchor="middle" font-family="monospace" font-weight="bold">A2★</text>
          <text x="291" y="134" fill="#6b7280" font-size="8" text-anchor="middle" font-family="monospace">B1</text>
          <text x="316" y="134" fill="#38bdf8" font-size="9" text-anchor="middle" font-family="monospace" font-weight="bold">B2★</text>
          <text x="398" y="65" fill="#38bdf8" font-size="9.5" font-family="monospace" font-weight="bold">DUAL-CHANNEL</text>
          <text x="398" y="79" fill="#9ca3af" font-size="8.5" font-family="monospace">SLOTS A2 &amp; B2</text>

          <!-- M.2_1 Slot above PCIe x16 -->
          <rect x="115" y="140" width="145" height="22" rx="3" fill="rgba(251,191,36,0.2)" stroke="#fbbf24" stroke-width="1.8" />
          <text x="187" y="154" fill="#fbbf24" font-size="9" text-anchor="middle" font-family="monospace" font-weight="bold">M.2_1 NVMe (PEEL FILM)</text>
          <!-- Primary PCIe x16 Slot below -->
          <rect x="115" y="174" width="215" height="12" rx="2" fill="#1e293b" stroke="#64748b" />
          <text x="222" y="183" fill="#9ca3af" font-size="7.5" text-anchor="middle" font-family="monospace">PRIMARY PCIe 4.0 x16 SLOT</text>

          ${renderHotspotNode(266, 62, 0, 'cyan', true)}
          ${renderHotspotNode(316, 62, 1, 'cyan', false)}
          ${renderHotspotNode(187, 151, 2, 'amber', false)}
        </svg>`;
      return { svg, hotspots };
    },

    'step-4-arctic-offset': function (state) {
      const aio = G.getPartDisplayName(state, 'aio');
      const cpu = G.getPartDisplayName(state, 'cpu');
      const hotspots = [
        { label: '1. Native AM5 L/R Offset Bars', detail: `Thread the 4 AM5 standoffs with insulating washers and screw down the L and R offset brackets for ${aio}.` },
        { label: '2. 5mm Southward Offset Shift', detail: `The offset mounting holes shift the ${aio} coldplate 5mm downward relative to the socket center.` },
        { label: '3. Lower CCD Hotspot Coverage', detail: `Positions the micro-skived copper coldplate directly above the ${cpu} 3D V-Cache CCD hotspot die.` }
      ];
      const svg = `
        <svg class="blueprint-svg" viewBox="0 0 540 220" xmlns="http://www.w3.org/2000/svg">
          <!-- CPU Package -->
          <rect x="190" y="32" width="160" height="156" rx="8" fill="#111827" stroke="#64748b" stroke-width="2" />
          <!-- IOD and Lower CCD Die -->
          <rect x="228" y="58" width="84" height="42" rx="3" fill="#1e293b" stroke="#475569" />
          <text x="270" y="83" fill="#9ca3af" font-size="8.5" text-anchor="middle" font-family="monospace">I/O DIE (IOD)</text>
          <rect x="234" y="114" width="72" height="34" rx="3" fill="rgba(248,113,113,0.28)" stroke="#f87171" stroke-width="1.8" />
          <text x="270" y="135" fill="#fca5a5" font-size="8.5" text-anchor="middle" font-family="monospace" font-weight="bold">3D V-CACHE CCD</text>

          <!-- Left & Right ARCTIC Offset Brackets -->
          <rect x="148" y="45" width="26" height="135" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1.8" />
          <text x="161" y="115" fill="#38bdf8" font-size="10" text-anchor="middle" font-weight="bold">L</text>
          <rect x="366" y="45" width="26" height="135" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1.8" />
          <text x="379" y="115" fill="#38bdf8" font-size="10" text-anchor="middle" font-weight="bold">R</text>

          <!-- Shifted Coldplate Circle -->
          <circle cx="270" cy="124" r="52" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="5 3" />
          <text x="462" y="95" fill="#fbbf24" font-size="9" text-anchor="middle" font-family="monospace" font-weight="bold">5mm SOUTH OFFSET</text>
          <text x="462" y="110" fill="#9ca3af" font-size="8" text-anchor="middle" font-family="monospace">OVER CCD HOTSPOT</text>

          ${renderHotspotNode(161, 75, 0, 'cyan', true)}
          ${renderHotspotNode(379, 130, 1, 'cyan', false)}
          ${renderHotspotNode(270, 131, 2, 'amber', false)}
        </svg>`;
      return { svg, hotspots };
    }
  };
})();
