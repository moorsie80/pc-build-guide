(function () {
  const G = (window.PCBuildGuide = window.PCBuildGuide || {});

  G.buildGuideSteps = function (state) {
    const cpu = G.getPartDisplayName(state, 'cpu');
    const gpu = G.getPartDisplayName(state, 'gpu');
    const ram = G.getPartDisplayName(state, 'ram');
    const mobo = G.getPartDisplayName(state, 'motherboard');
    const nvme = G.getPartDisplayName(state, 'nvme');
    const aio = G.getPartDisplayName(state, 'aio');
    const pcCase = G.getPartDisplayName(state, 'case');
    const fans = G.getPartDisplayName(state, 'fans');
    const psu = G.getPartDisplayName(state, 'psu');
    const kb = G.getPartDisplayName(state, 'keyboard');
    const mouse = G.getPartDisplayName(state, 'mouse');
    const monitor = G.getPartDisplayName(state, 'monitor');

    const ramSpecs = G.getPartSpecs(state, 'ram') || 'Dual-Channel DDR5';
    const aioSpecs = G.getPartSpecs(state, 'aio') || '280mm x 38mm Thick Radiator';
    const moboSpecs = G.getPartSpecs(state, 'motherboard') || 'AM5 UEFI BIOS';

    return [
      {
        id: 'step-1-prep',
        stepNum: 1,
        phaseLabel: 'Stage 1 · Out-of-Box Motherboard Testbench',
        title: `Prepare ${mobo} Testbench & Unbox ${pcCase}`,
        partsInvolved: [`Part 04: ${mobo}`, `Part 07: ${pcCase}`],
        instructions: [
          `Place your <strong>${mobo}</strong> cardboard box flat on a non-static table to serve as an elevated build surface.`,
          `Pop off the tempered glass side panel, steel rear panel, and high-airflow front mesh panel on your <strong>${pcCase}</strong> and store the screws safely.`,
          `Verify the motherboard specs (<em>${moboSpecs}</em>) and keep the M.2 screws and case standoffs within reach.`
        ],
        warning: `Never place your ${mobo} directly on top of the shiny metallic anti-static bag—use the cardboard motherboard box itself as your non-conductive workbench.`,
        svgBlueprint: { code: 'BP-01 · WORKBENCH-PREP', title: `Interactive SVG Blueprint: ${mobo} Layout & ${pcCase} Panel Removal` },
        videoTip: { title: `Prepping ${pcCase} Panels & Anti-Static Grounding`, duration: '01:15', summary: `Walkthrough showing how to unclip the front airflow panel and remove tempered glass panels cleanly on ${pcCase} before motherboard prep.` }
      },
      {
        id: 'step-2-am5-cpu',
        stepNum: 2,
        phaseLabel: 'Stage 1 · Out-of-Box Motherboard Testbench',
        title: `Install ${cpu} into ${mobo} Socket`,
        partsInvolved: [`Part 01: ${cpu}`, `Part 04: ${mobo}`],
        instructions: [
          `Push down and slide out the LGA retention arm on your <strong>${mobo}</strong>, then lift the load plate upward (leave the black plastic socket cover attached).`,
          `Hold your <strong>${cpu}</strong> strictly by its substrate edges and align the gold triangle at the top-left corner with the triangle embossed on the socket.`,
          `Lower <strong>${cpu}</strong> straight down onto the socket pads, close the load plate, and press the retention lever firmly under its latch until the plastic cover pops off automatically.`
        ],
        warning: `AM5 Socket Latch Warning: The LGA1718 socket on ${mobo} houses delicate gold contact pins—never touch the socket pins or slide ${cpu}. Pressing down the retention arm requires firm force; this is completely normal on AM5.`,
        svgBlueprint: { code: 'BP-02 · AM5-LGA1718-PIN1', title: `Interactive SVG Blueprint: ${cpu} Pin-1 Triangle & AM5 Retention Latch` },
        videoTip: { title: `Seating ${cpu} & Automatic Socket Cover Pop-Off`, duration: '01:40', summary: `Close-up camera angle demonstrating zero-insertion-force alignment and the exact tension required to lock the AM5 retention bar.` }
      },
      {
        id: 'step-3-ram-nvme',
        stepNum: 3,
        phaseLabel: 'Stage 1 · Out-of-Box Motherboard Testbench',
        title: `Seat ${ram} & Mount ${nvme}`,
        partsInvolved: [`Part 03: ${ram}`, `Part 05: ${nvme}`, `Part 04: ${mobo}`],
        instructions: [
          `Open the latches on DIMM slots <strong>A2</strong> (2nd slot from CPU) and <strong>B2</strong> (4th slot from CPU) on your <strong>${mobo}</strong>.`,
          `Align the notch on your <strong>${ram}</strong> (${ramSpecs}) and press both ends firmly until the latches click shut.`,
          `Unscrew the top M.2_1 heatsink on <strong>${mobo}</strong>, insert your <strong>${nvme}</strong> at a 30° angle, secure the M.2 Q-Latch, and reinstall the heatsink.`
        ],
        warning: `Dual-Channel & Thermal Film Warning: You MUST use slots A2 & B2 first on ${mobo} so your ${ram} boots reliably at rated speeds, and peel the protective plastic film off the M.2 heatsink thermal pad before covering ${nvme}.`,
        svgBlueprint: { code: 'BP-03 · DIMM-A2B2-M2-GEN4', title: `Interactive SVG Blueprint: ${mobo} Slots A2/B2 & Primary M.2_1 Heatsink` },
        videoTip: { title: `DDR5 Dual-Channel Seating & Q-Latch M.2 Installation`, duration: '01:28', summary: `Step-by-step demonstration of DDR5 single-sided latch engagement and M.2 2280 thermal pad alignment.` }
      },
      {
        id: 'step-4-arctic-offset',
        stepNum: 4,
        phaseLabel: 'Stage 1 · Out-of-Box Motherboard Testbench',
        title: `Install ${aio} Native AM5 Offset Brackets on ${mobo}`,
        partsInvolved: [`Part 06: ${aio}`, `Part 01: ${cpu}`, `Part 04: ${mobo}`],
        instructions: [
          `Unscrew the two stock plastic AMD retention clips above and below the CPU socket on your <strong>${mobo}</strong> (keep the factory metal AM5 backplate in place).`,
          `Thread the four AM5 standoffs and attach the <strong>L</strong> and <strong>R</strong> mounting brackets included with your <strong>${aio}</strong> (${aioSpecs}).`,
          `Verify the brackets are oriented in the downward AM5 offset position before lifting the motherboard into the case.`
        ],
        warning: `ARCTIC Native AM5 Offset Bracket Warning: ${aio} uses dedicated native AM5 offset brackets that shift the coldplate 5mm southward directly over the ${cpu} CCD hotspot. Do not install the brackets upside down or omit the plastic insulating washers.`,
        svgBlueprint: { code: 'BP-04 · ARCTIC-AM5-OFFSET', title: `Interactive SVG Blueprint: ${aio} L/R Native AM5 Offset Bracket Geometry` },
        videoTip: { title: `Fitting ${aio} Native AM5 Offset Brackets for 7800X3D`, duration: '02:05', summary: `Detailed look at removing stock AM5 plastic hooks and orienting the L/R offset bars over the Ryzen CCD die.` }
      },
      {
        id: 'step-5-case-fans',
        stepNum: 5,
        phaseLabel: 'Stage 2 · Chassis Mounting & PWM PST Airflow',
        title: `Mount ${mobo} in ${pcCase} & Daisy-Chain ${fans}`,
        partsInvolved: [`Part 04: ${mobo}`, `Part 07: ${pcCase}`, `Part 08: ${fans}`],
        instructions: [
          `Lower your pre-assembled <strong>${mobo}</strong> into <strong>${pcCase}</strong>, align the integrated rear I/O shield, and fasten all 9 ATX standoff screws.`,
          `Mount your <strong>${fans}</strong> as top and rear exhaust inside <strong>${pcCase}</strong> (frame struts facing the direction of exhaust airflow).`,
          `Connect the 4-pin PWM male/female plugs together in a chain and plug the final lead into a <code>CHA_FAN</code> header on <strong>${mobo}</strong>.`
        ],
        warning: `PWM PST Daisy-Chain Warning: Your ${fans} feature ARCTIC PWM Sharing Technology (PST)—plug each fan's 4-pin tail into the built-in PST socket of the next fan so up to 3–4 fans run synchronized off a single ${mobo} CHA_FAN header without overloading the 1A header limit.`,
        svgBlueprint: { code: 'BP-05 · PWM-PST-CHAIN', title: `Interactive SVG Blueprint: ${fans} PST Daisy-Chain & ${pcCase} Exhaust Map` },
        videoTip: { title: `How to Daisy-Chain ${fans} & Route Cables Cleanly`, duration: '01:52', summary: `Shows how to link the male/female PST connectors behind the motherboard tray and hide excess slack.` }
      },
      {
        id: 'step-6-aio-front',
        stepNum: 6,
        phaseLabel: 'Stage 2 · Chassis Mounting & PWM PST Airflow',
        title: `Front-Mount ${aio} Radiator in ${pcCase} & Seat Coldplate`,
        partsInvolved: [`Part 06: ${aio}`, `Part 07: ${pcCase}`, `Part 01: ${cpu}`],
        instructions: [
          `Mount the 280mm radiator of your <strong>${aio}</strong> to the <strong>front intake bracket</strong> of your <strong>${pcCase}</strong> so fresh ambient air is pulled through the radiator into the chassis.`,
          `Peel the protective film off the <strong>${aio}</strong> copper coldplate, apply thermal paste to <strong>${cpu}</strong>, and alternate tightening the two spring-loaded coldplate screws onto the AM5 offset brackets.`,
          `Snap the magnetic VRM fan module onto the pump cap and connect the all-in-one or split PWM cables to <code>CPU_FAN</code> / <code>AIO_PUMP</code> on <strong>${mobo}</strong>.`
        ],
        warning: `38mm Thick 280mm Radiator Clearance Warning: Because ${aio} uses an extra-thick 38mm radiator (65mm total with fans), top-mounting a 280mm unit in ${pcCase} collides with tall VRM heatsinks and ${ram}. Mount the 280mm radiator at the FRONT intake of ${pcCase} with the top of the radiator tanks higher than the CPU pump block.`,
        svgBlueprint: { code: 'BP-06 · 4000D-FRONT-280MM', title: `Interactive SVG Blueprint: 38mm Thick ${aio} Front Intake Clearance in ${pcCase}` },
        videoTip: { title: `Front-Mounting a 38mm Thick 280mm AIO in ${pcCase}`, duration: '02:30', summary: `Demonstrates radiator screw placement, tube orientation, and evenly torquing the Leaf-Spring coldplate onto AM5.` }
      },
      {
        id: 'step-7-psu-cables',
        stepNum: 7,
        phaseLabel: 'Stage 3 · ATX 3.0 Power & Graphics Integration',
        title: `Install ${psu} & Route Modular Power Harness`,
        partsInvolved: [`Part 12: ${psu}`, `Part 04: ${mobo}`, `Part 07: ${pcCase}`],
        instructions: [
          `Click the required modular cables into your <strong>${psu}</strong> before sliding it in: 24-pin ATX mainboard cable, 8-pin EPS CPU cable, and native 12VHPWR PCIe 5.0 GPU cable.`,
          `Slide <strong>${psu}</strong> into the bottom shroud of <strong>${pcCase}</strong> with its intake fan facing the bottom dust filter, and secure it with 4 rear thumbscrews.`,
          `Route the 8-pin EPS cable to the top-left of <strong>${mobo}</strong> and the 24-pin cable through the side rubber grommet.`
        ],
        warning: `Ensure every modular connector clicks flush on both the ${psu} side and the ${mobo} headers before installing the graphics card.`,
        svgBlueprint: { code: 'BP-07 · ATX3-POWER-ROUTING', title: `Interactive SVG Blueprint: ${psu} Shroud Orientation & Grommet Routing` },
        videoTip: { title: `Routing 24-Pin ATX, 8-Pin EPS & 12VHPWR Cables in ${pcCase}`, duration: '01:45', summary: `Using the built-in RapidRoute channels on the back of ${pcCase} for a clean rear panel closure.` }
      },
      {
        id: 'step-8-gpu-install',
        stepNum: 8,
        phaseLabel: 'Stage 3 · ATX 3.0 Power & Graphics Integration',
        title: `Install ${gpu} & Connect Native 12VHPWR Cable`,
        partsInvolved: [`Part 02: ${gpu}`, `Part 04: ${mobo}`, `Part 12: ${psu}`],
        instructions: [
          `Unscrew 2 rear PCIe slot covers on <strong>${pcCase}</strong> and press open the top PCIe x16 slot latch on your <strong>${mobo}</strong>.`,
          `Align your <strong>${gpu}</strong> with the primary PCIe x16 slot and press firmly until the retention clip snaps locked, then fasten the rear bracket screws.`,
          `Plug the native 12VHPWR (12V-2x6) cable from your <strong>${psu}</strong> straight into <strong>${gpu}</strong>.`
        ],
        warning: `12VHPWR Seating Warning: Push the 12VHPWR connector from ${psu} all the way into ${gpu} until the retention clip clicks and zero gap is visible between the plastic housings. Avoid sharp bends within 35mm of the GPU socket.`,
        svgBlueprint: { code: 'BP-08 · GPU-12VHPWR-LOCK', title: `Interactive SVG Blueprint: ${gpu} PCIe x16 Seating & 12VHPWR Flush Check` },
        videoTip: { title: `Seating ${gpu} & Verifying a Flush 12VHPWR Connection`, duration: '01:35', summary: `Visual inspection checklist for the 12+4 pin sense pins and avoiding side-panel cable pinch.` }
      },
      {
        id: 'step-9-peripherals-bios',
        stepNum: 9,
        phaseLabel: 'Stage 4 · Peripherals Setup & UEFI BIOS Optimization',
        title: `Connect ${monitor}, ${kb}, ${mouse} & Tune ${mobo} BIOS`,
        partsInvolved: [`Part 11: ${monitor}`, `Part 09: ${kb}`, `Part 10: ${mouse}`, `Part 04: ${mobo}`],
        instructions: [
          `Connect your <strong>${monitor}</strong> via DisplayPort 1.4 / HDMI 2.1 directly into your <strong>${gpu}</strong> (not the motherboard I/O), and plug your <strong>${kb}</strong> and <strong>${mouse}</strong> into the rear USB ports.`,
          `Power on the rig and tap <kbd>DEL</kbd> or <kbd>F2</kbd> on your <strong>${kb}</strong> to enter the <strong>${mobo}</strong> UEFI BIOS Utility.`,
          `Enable your <strong>${ram}</strong> profile and PCIe Resizable BAR, then press <kbd>F10</kbd> to Save & Reboot.`
        ],
        warning: `ASUS UEFI BIOS Warning: Inside the ${mobo} UEFI BIOS (EZ Mode or Ai Tweaker), you MUST enable "AMD EXPO" so your ${ram} runs at its full DDR5-6000MT/s speed instead of 4800MHz JEDEC defaults, and confirm "Resizable BAR" is set to ON for maximum ${gpu} 4K gaming performance.`,
        svgBlueprint: { code: 'BP-09 · UEFI-EXPO-REBAR', title: `Interactive SVG Blueprint: ${mobo} UEFI BIOS AMD EXPO & Resizable BAR Toggles` },
        videoTip: { title: `Enabling AMD EXPO, Resizable BAR & 4K UHD Display Output`, duration: '02:18', summary: `Complete post-build checklist covering ASUS UEFI BIOS settings, PWM fan curves, and Windows 4K refresh rate setup for ${monitor}.` }
      }
    ];
  };
})();
