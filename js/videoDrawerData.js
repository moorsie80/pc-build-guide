(function () {
  const G = (window.PCBuildGuide = window.PCBuildGuide || {});

  G.VIDEO_TIPS = {
    'step-1-prep': {
      durationSec: 90,
      motionSubject: 'Motherboard Box Test-Bench & Corsair 4000D Panel Strip',
      defaultVideoUrl: 'https://www.youtube.com/watch?v=BL4DCEp7blY',
      coachingNote:
        'Building the core CPU, RAM, and M.2 SSD on the cardboard motherboard box first prevents cramped knuckles inside the chassis.',
      commonMistake:
        'Never place the ASUS TUF GAMING B650-PLUS WIFI on top of its shiny anti-static plastic bag—the exterior of ESD bags can conduct static charges. Always rest the board directly on the bare cardboard box.',
      keyframes: [
        {
          sec: 15,
          timeLabel: '00:15',
          title: 'Cardboard Box Bench Setup',
          detail: 'Lay the ASUS TUF B650-PLUS cardboard box flat and place the motherboard on top with the AM5 socket facing you.'
        },
        {
          sec: 45,
          timeLabel: '00:45',
          title: 'Pop Off Front & Side Panels',
          detail: 'Loosen captive rear thumbscrews on the Corsair 4000D AIRFLOW, slide glass off, and pull the front steel mesh bezel forward.'
        },
        {
          sec: 75,
          timeLabel: '01:15',
          title: 'Slide Out Bottom PSU Dust Filter',
          detail: 'Pull the magnetic top mesh and slide out the bottom PSU dust tray so all radiator and fan mounting rails are exposed.'
        }
      ]
    },
    'step-2-am5-cpu': {
      durationSec: 90,
      motionSubject: 'AM5 LGA1718 Gold Triangle Alignment & Retention Latch Pop',
      defaultVideoUrl: 'https://www.youtube.com/watch?v=H2f762fe090',
      coachingNote:
        'AM5 LGA1718 requires firm downward force on the retention arm. The plastic protection cover is designed to pop off automatically as you latch the arm.',
      commonMistake:
        'Do NOT manually pry off the black plastic AM5 socket cover before installing the Ryzen 7 7800X3D—doing so risks dropping tools onto the 1,718 delicate gold socket pins.',
      keyframes: [
        {
          sec: 15,
          timeLabel: '00:15',
          title: 'Aligning the AM5 Gold Triangle',
          detail: 'Match the gold Pin 1 triangle on the top-left corner of the Ryzen 7 7800X3D with the embossed triangle on the socket frame.'
        },
        {
          sec: 45,
          timeLabel: '00:45',
          title: 'Pressing the LGA1718 Retention Lever',
          detail: 'Lower the metal load plate and press the retention lever down firmly until the black plastic cover pops off by itself.'
        },
        {
          sec: 75,
          timeLabel: '01:15',
          title: 'Verifying Flush Seating',
          detail: 'Inspect all four edges of the CPU heatspreader under the load plate and store the plastic socket cover in the motherboard box.'
        }
      ]
    },
    'step-3-ram-nvme': {
      durationSec: 90,
      motionSubject: 'DIMM_A2 / B2 Dual-Channel Click & M.2_1 Q-Latch Lock',
      defaultVideoUrl: 'https://www.youtube.com/watch?v=BL4DCEp7blY',
      coachingNote:
        'ASUS TUF B650 slots use single-sided top latches. Align the DDR5 center key notch before pressing straight down.',
      commonMistake:
        'Failing to seat DDR5 sticks until the top latch audibly clicks shut, or placing sticks in slots A1/B1 instead of the mandatory primary DIMM_A2 & DIMM_B2 (2nd and 4th from CPU).',
      keyframes: [
        {
          sec: 15,
          timeLabel: '00:15',
          title: 'Unlock DIMM_A2 & DIMM_B2 Latches',
          detail: 'Flip open the top retention clips on the 2nd and 4th grey DDR5 slots (DIMM_A2 and DIMM_B2) away from the CPU socket.'
        },
        {
          sec: 45,
          timeLabel: '00:45',
          title: 'Press DDR5 Until Both Ends Click',
          detail: 'Seat both Crucial Pro 16GB DDR5 modules with firm two-thumb pressure until the latch snaps into the side notch.'
        },
        {
          sec: 75,
          timeLabel: '01:15',
          title: 'Peel Pad Film & Rotate M.2 Q-Latch',
          detail: 'Insert WD_BLACK SN850X into M.2_1 at 30°, press flat, turn the plastic Q-Latch 90°, and reinstall the peeled thermal heatsink.'
        }
      ]
    },
    'step-4-arctic-offset': {
      durationSec: 90,
      motionSubject: 'ARCTIC Native AM5 Offset Brackets Over Lower CCD Hotspot',
      defaultVideoUrl: 'https://www.youtube.com/watch?v=FtJ4P2Uo5no',
      coachingNote:
        'Ryzen 7000 X3D processors place the 3D V-Cache compute die (CCD) on the lower half of the package. ARCTIC’s offset brackets shift the cold plate center 5mm downward.',
      commonMistake:
        'Removing or losing the stock AM5 rear metal backplate, or installing the L and R ARCTIC brackets upside-down so the cold plate shifts away from the lower CCD hotspot.',
      keyframes: [
        {
          sec: 15,
          timeLabel: '00:15',
          title: 'Remove Stock Plastic AM5 Hooks',
          detail: 'Unscrew the 4 black plastic hook brackets around the socket while keeping the factory steel AM5 backplate in place.'
        },
        {
          sec: 45,
          timeLabel: '00:45',
          title: 'Fasten ARCTIC L & R Offset Brackets',
          detail: 'Place the 4 plastic spacers over the standoffs and secure the L and R metal offset brackets shifted toward the bottom CCD.'
        },
        {
          sec: 75,
          timeLabel: '01:15',
          title: 'Apply MX-6 Pea Dot Over Lower CCD',
          detail: 'Squeeze a 4–5mm dot of ARCTIC MX-6 thermal paste slightly below center where the 3D V-Cache compute die sits.'
        }
      ]
    },
    'step-5-case-fans': {
      durationSec: 90,
      motionSubject: 'ARCTIC P12 PWM PST Exhaust Orientation & PST Daisy-Chain',
      defaultVideoUrl: 'https://www.youtube.com/watch?v=Hc93U7_7Fdf',
      coachingNote:
        'Remember: "Faces suck, backs blow." With exhaust fans at the top and rear, you should see the clean front rotor hub from inside the case.',
      commonMistake:
        'Mounting top/rear fans with their plastic rear stator struts facing inside the case (which makes them fight the front radiator intake) or plugging each fan into random headers instead of using PST daisy-chaining.',
      keyframes: [
        {
          sec: 15,
          timeLabel: '00:15',
          title: 'Seat Motherboard on 9 ATX Standoffs',
          detail: 'Lower the ASUS TUF B650-PLUS into the Corsair 4000D, align the rear I/O shield, and fasten the 9 mounting screws.'
        },
        {
          sec: 45,
          timeLabel: '00:45',
          title: 'Mount 3x P12 PWM PST as Exhaust',
          detail: 'Install 1x 120mm fan at the rear and 2x 120mm fans on the top roof with airflow arrows pointing OUT of the chassis.'
        },
        {
          sec: 75,
          timeLabel: '01:15',
          title: 'Link PST Piggyback Sockets in Series',
          detail: 'Plug Fan 1 into Fan 2’s PST socket, Fan 2 into Fan 3’s socket, and connect the final 4-pin plug to CHA_FAN1.'
        }
      ]
    },
    'step-6-aio-front': {
      durationSec: 90,
      motionSubject: 'ARCTIC Liquid Freezer III 280 Front Intake & Pump Leaf-Springs',
      defaultVideoUrl: 'https://www.youtube.com/watch?v=FtJ4P2Uo5no',
      coachingNote:
        'ARCTIC Two Cable Options: (1) All-in-One Single PWM Cable plugs into CPU_FAN to control Pump, VRM fan, and P14 radiator fans together; OR (2) 3-Way Individual Splitter Cable (PUMP / VRM / FAN) lets you lock the pump at 80–100% on AIO_PUMP while tuning quiet curves for the VRM & radiator fans.',
      commonMistake:
        'Forgetting to peel the clear protective plastic warning film off the copper AIO cold plate before mounting, or trying to top-mount the 38mm-thick 280mm radiator where it hits the tall B650 VRM heatsinks.',
      keyframes: [
        {
          sec: 15,
          timeLabel: '00:15',
          title: 'Peel Cold Plate Film & Select PWM Cable',
          detail: 'Peel the protective film off the copper base and plug either the All-in-One PWM cable or 3-way splitter into the pump block.'
        },
        {
          sec: 45,
          timeLabel: '00:45',
          title: 'Mount 38mm 280mm Radiator at Front Intake',
          detail: 'Secure the 280mm radiator to the Corsair 4000D front bracket so the dual P14 fans pull cool outside air into the case.'
        },
        {
          sec: 75,
          timeLabel: '01:15',
          title: 'Alternate Pump Screws & Snap VRM Cap',
          detail: 'Tighten the 2 spring-loaded pump screws a few turns at a time onto the AM5 offset brackets, then snap on the magnetic VRM fan cap.'
        }
      ]
    },
    'step-7-psu-cables': {
      durationSec: 90,
      motionSubject: 'Corsair RM850x Type-4 Modular Locking & 24-Pin / EPS Routing',
      defaultVideoUrl: 'https://www.youtube.com/watch?v=BL4DCEp7blY',
      coachingNote:
        'Pre-plugging modular cables into the RM850x before sliding it into the bottom shroud is much easier than reaching into a dark tunnel afterward.',
      commonMistake:
        'Forcing an 8-pin PCIe GPU cable into the top-left 8-pin EPS CPU header (or mixing modular cables from a different PSU brand), and leaving the 24-pin ATX latch half-unclipped.',
      keyframes: [
        {
          sec: 15,
          timeLabel: '00:15',
          title: 'Pre-Connect Type-4 Modular Cables',
          detail: 'Snap 24-pin ATX, 8+4-pin CPU EPS, and PCIe GPU power cables into the Corsair RM850x before sliding it into the shroud.'
        },
        {
          sec: 45,
          timeLabel: '00:45',
          title: 'Lock 24-Pin ATX & Top-Left EPS Headers',
          detail: 'Route cables behind the tray and press the 24-pin ATX and 8-pin CPU power plugs until their plastic hooks click flush.'
        },
        {
          sec: 75,
          timeLabel: '01:15',
          title: 'Connect Front I/O & USB-C Headers',
          detail: 'Attach the Corsair 4000D USB 3.2 Gen2 Type-C plug, USB 3.0 header, HD_AUDIO, and F_PANEL power switch pins.'
        }
      ]
    },
    'step-8-gpu-install': {
      durationSec: 90,
      motionSubject: 'RTX 4070 SUPER PCIe 4.0 x16 Seating & Flush Power Latch',
      defaultVideoUrl: 'https://www.youtube.com/watch?v=BL4DCEp7blY',
      coachingNote:
        'At 227.2mm long, the ASUS Dual RTX 4070 SUPER EVO OC leaves over 90mm of open breathing room in front of the 65mm-deep ARCTIC radiator.',
      commonMistake:
        'Not pushing the 12VHPWR / PCIe power connector 100% flush until zero gold contact pins are visible, or forgetting to screw down the rear PCIe metal bracket thumbscrews.',
      keyframes: [
        {
          sec: 15,
          timeLabel: '00:15',
          title: 'Remove Slot Covers #2 & #3 & Open Latch',
          detail: 'Unscrew the two rear expansion slot covers aligned with the top silver-armored PCIEX16(G4) slot and open the slot clip.'
        },
        {
          sec: 45,
          timeLabel: '00:45',
          title: 'Press RTX 4070 SUPER Straight Down',
          detail: 'Align the gold PCIe x16 edge connector and press straight down until the ASUS Q-Release latch snaps shut.'
        },
        {
          sec: 75,
          timeLabel: '01:15',
          title: 'Fasten Bracket Screws & Click Power Plug',
          detail: 'Install both rear chassis bracket screws and press the PCIe / 12VHPWR power cable in until the locking tab clicks.'
        }
      ]
    },
    'step-9-peripherals-bios': {
      durationSec: 90,
      motionSubject: 'GPU DisplayPort Connection & ASUS UEFI EXPO + ReBAR Activation',
      defaultVideoUrl: 'https://www.youtube.com/watch?v=BL4DCEp7blY',
      coachingNote:
        'First AM5 DDR5 boot ("Memory Training") takes 45–90 seconds with an amber DRAM LED before the ASUS TUF logo appears—do not panic or power off!',
      commonMistake:
        'Plugging the Samsung 28" 4K monitor DisplayPort cable into the top vertical motherboard I/O instead of the horizontal RTX 4070 SUPER GPU ports (which bypasses your dedicated graphics card), or forgetting to enable AMD EXPO and Windows 144Hz refresh rate.',
      keyframes: [
        {
          sec: 15,
          timeLabel: '00:15',
          title: 'Plug DisplayPort Directly Into RTX 4070 SUPER',
          detail: 'Connect the Samsung Odyssey G70B DisplayPort 1.4 cable to the horizontal GPU port and plug in the G915 TKL & G502 X receivers.'
        },
        {
          sec: 45,
          timeLabel: '00:45',
          title: 'Wait for AM5 Memory Training & Tap DEL',
          detail: 'Flip the RM850x switch to ON (I), press the case power button, wait 60s for AM5 DDR5 training, and tap DEL for UEFI BIOS.'
        },
        {
          sec: 75,
          timeLabel: '01:15',
          title: 'Enable AMD EXPO I (6000MT/s) & Resizable BAR',
          detail: 'Set AI Overclock Tuner to EXPO I, set Re-Size BAR Support to ON, and press F10 to Save & Reset.'
        }
      ]
    }
  };
})();
