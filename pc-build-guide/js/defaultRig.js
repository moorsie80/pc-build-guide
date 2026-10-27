(function () {
  const G = (window.PCBuildGuide = window.PCBuildGuide || {});

  G.CATEGORIES = [
    { id: 'cpu', partNumber: '01', group: 'core', label: 'CPU', categoryName: 'CPU', badge: 'Part 01 · Processor', icon: '🧠', makePlaceholder: 'e.g. AMD', modelPlaceholder: 'e.g. Ryzen 7 7800X3D', specsPlaceholder: 'e.g. 8 Cores / 16 Threads, 96MB 3D V-Cache, Socket AM5', defaultName: 'your CPU' },
    { id: 'gpu', partNumber: '02', group: 'core', label: 'Graphics Card (GPU)', categoryName: 'Graphics Card', badge: 'Part 02 · Graphics', icon: '🎮', makePlaceholder: 'e.g. ASUS', modelPlaceholder: 'e.g. Dual GeForce RTX 4070 SUPER EVO OC 12GB', specsPlaceholder: 'e.g. 12GB GDDR6X, PCIe 4.0, DLSS 3 Frame Gen', defaultName: 'your Graphics Card' },
    { id: 'ram', partNumber: '03', group: 'core', label: 'Memory (RAM)', categoryName: 'RAM', badge: 'Part 03 · System Memory', icon: '⚡', makePlaceholder: 'e.g. Crucial', modelPlaceholder: 'e.g. Pro DDR5 32GB Kit (2x16GB) 6000MHz', specsPlaceholder: 'e.g. 6000MT/s CL36 Dual-Channel, AMD EXPO & Intel XMP 3.0', defaultName: 'your Memory Kit' },
    { id: 'motherboard', partNumber: '04', group: 'core', label: 'Motherboard', categoryName: 'Motherboard', badge: 'Part 04 · Mainboard', icon: '🎛️', makePlaceholder: 'e.g. ASUS', modelPlaceholder: 'e.g. TUF GAMING B650-PLUS WIFI ATX', specsPlaceholder: 'e.g. Socket AM5, DDR5, PCIe 5.0 M.2, Wi-Fi 6', defaultName: 'your Motherboard' },
    { id: 'nvme', partNumber: '05', group: 'core', label: 'NVMe Storage', categoryName: 'NVMe Storage', badge: 'Part 05 · M.2 SSD', icon: '💾', makePlaceholder: 'e.g. WD_BLACK', modelPlaceholder: 'e.g. SN850X 1TB M.2 2280 PCIe Gen4 NVMe SSD', specsPlaceholder: 'e.g. PCIe Gen4 x4, Up to 7,300 MB/s Read', defaultName: 'your NVMe SSD' },
    { id: 'aio', partNumber: '06', group: 'core', label: 'AIO Cooler', categoryName: 'AIO Water Cooler', badge: 'Part 06 · Liquid Cooler', icon: '❄️', makePlaceholder: 'e.g. ARCTIC', modelPlaceholder: 'e.g. Liquid Freezer III 280', specsPlaceholder: 'e.g. 38mm Thick 280mm Radiator, Native AM5 Offset Mount', defaultName: 'your AIO Cooler' },
    { id: 'case', partNumber: '07', group: 'core', label: 'PC Case', categoryName: 'PC Case', badge: 'Part 07 · Chassis', icon: '🖥️', makePlaceholder: 'e.g. Corsair', modelPlaceholder: 'e.g. 4000D AIRFLOW Tempered Glass ATX', specsPlaceholder: 'e.g. High-Airflow Perforated Front Panel, RapidRoute', defaultName: 'your PC Case' },
    { id: 'fans', partNumber: '08', group: 'core', label: 'Case Fans', categoryName: 'Case Fans', badge: 'Part 08 · Airflow Pack', icon: '🌀', makePlaceholder: 'e.g. ARCTIC', modelPlaceholder: 'e.g. P12 PWM PST (5-Pack) 120mm', specsPlaceholder: 'e.g. 5x 120mm Pressure-Optimised Fans, PWM Sharing Technology', defaultName: 'your Case Fans' },
    { id: 'psu', partNumber: '12', group: 'core', label: 'Power Supply (PSU)', categoryName: 'PSU', badge: 'Part 12 · Modular Power', icon: '🔌', makePlaceholder: 'e.g. Corsair', modelPlaceholder: 'e.g. RM750 750W 80 PLUS Gold Modular ATX', specsPlaceholder: 'e.g. 750W 80+ Gold Certified, Fully Modular Cabling', defaultName: 'your Power Supply' },
    { id: 'keyboard', partNumber: '09', group: 'peripherals', label: 'Keyboard', categoryName: 'Keyboard', badge: 'Part 09 · Peripheral', icon: '⌨️', makePlaceholder: 'e.g. SteelSeries', modelPlaceholder: 'e.g. Apex 3 RGB (UK Layout)', specsPlaceholder: 'e.g. Whisper-Quiet Gaming Switches, 10-Zone RGB, IP32', defaultName: 'your Keyboard' },
    { id: 'mouse', partNumber: '10', group: 'peripherals', label: 'Mouse', categoryName: 'Mouse', badge: 'Part 10 · Peripheral', icon: '🖱️', makePlaceholder: 'e.g. Logitech', modelPlaceholder: 'e.g. G502 HERO', specsPlaceholder: 'e.g. HERO 25K Sensor (25,600 DPI), 11 Programmable Buttons', defaultName: 'your Mouse' },
    { id: 'monitor', partNumber: '11', group: 'peripherals', label: 'Monitor', categoryName: 'Monitor', badge: 'Part 11 · Display', icon: '🖵', makePlaceholder: 'e.g. LG', modelPlaceholder: 'e.g. UltraGear G8 27G810A-B 27" 4K UHD IPS', specsPlaceholder: 'e.g. 3840x2160 4K UHD IPS Panel, HDR10, G-SYNC Compatible', defaultName: 'your Monitor' }
  ];

  // Exact 12-part AM5 + RTX 4070 Super JSON dataset (£2,154.35)
  G.DEFAULT_RIG_JSON = {
    buildName: 'AM5 & GeForce RTX 4070 SUPER 4K Turnkey Build',
    targetBudgetGBP: 2000.00,
    flexBudgetGBP: 2200.00,
    totalPriceGBP: 2154.35,
    parts: [
      {
        id: '01',
        category: 'CPU',
        make: 'AMD',
        model: 'Ryzen 7 7800X3D',
        specs: '8 Cores / 16 Threads, 96MB 3D V-Cache, up to 5.0 GHz Boost, Socket AM5, 120W TDP',
        asin: 'B0BTZB7F88',
        url: 'https://www.amazon.co.uk/dp/B0BTZB7F88',
        priceGBP: 283.52
      },
      {
        id: '02',
        category: 'Graphics Card',
        make: 'ASUS',
        model: 'Dual GeForce RTX 4070 SUPER EVO OC 12GB',
        specs: '12GB GDDR6X, PCIe 4.0, DLSS 3 Frame Gen, 2550 MHz Boost, 227.2mm Length',
        asin: 'B086ZS934X',
        url: 'https://www.amazon.co.uk/dp/B086ZS934X',
        priceGBP: 582.08
      },
      {
        id: '03',
        category: 'RAM',
        make: 'Crucial',
        model: 'Pro DDR5 32GB Kit (2x16GB) 6000MHz',
        specs: '6000MT/s CL36 Dual-Channel, AMD EXPO & Intel XMP 3.0, Low-Profile Matte Black Heatspreaders',
        asin: 'B0CTHXMYL8',
        url: 'https://www.amazon.co.uk/dp/B0CTHXMYL8',
        priceGBP: 307.84
      },
      {
        id: '04',
        category: 'Motherboard',
        make: 'ASUS',
        model: 'TUF GAMING B650-PLUS WIFI ATX',
        specs: 'Socket AM5, DDR5, 1x PCIe 5.0 M.2 + 2x PCIe 4.0 M.2 Slots, 14 Power Stages, Wi-Fi 6, 2.5G LAN',
        asin: 'B0BHJKR3BV',
        url: 'https://www.amazon.co.uk/dp/B0BHJKR3BV',
        priceGBP: 127.99
      },
      {
        id: '05',
        category: 'NVMe Storage',
        make: 'WD_BLACK',
        model: 'SN850X 1TB M.2 2280 PCIe Gen4 NVMe SSD',
        specs: 'PCIe Gen4 x4, Up to 7,300 MB/s Read & 6,300 MB/s Write, TLC 3D NAND, DRAM Cache',
        asin: 'B0B7CKVCCV',
        url: 'https://www.amazon.co.uk/dp/B0B7CKVCCV',
        priceGBP: 178.99
      },
      {
        id: '06',
        category: 'AIO Water Cooler',
        make: 'ARCTIC',
        model: 'Liquid Freezer III 280',
        specs: '38mm Thick 280mm Radiator, 2x P14 PWM Pressure Fans, Integrated 60mm VRM Fan, Native AM5 Offset Mount',
        asin: 'B09VGXMTK4',
        url: 'https://www.amazon.co.uk/dp/B09VGXMTK4',
        priceGBP: 67.49
      },
      {
        id: '07',
        category: 'PC Case',
        make: 'Corsair',
        model: '4000D AIRFLOW Tempered Glass ATX',
        specs: 'High-Airflow Perforated Front Panel, RapidRoute Cable Channels, 2x 120mm Included Fans, 360mm Max GPU',
        asin: 'B08C7BGV3D',
        url: 'https://www.amazon.co.uk/dp/B08C7BGV3D',
        priceGBP: 84.79
      },
      {
        id: '08',
        category: 'Case Fans',
        make: 'ARCTIC',
        model: 'P12 PWM PST (5-Pack) 120mm',
        specs: '5x 120mm Pressure-Optimised Fans, 200-1,800 RPM, PWM Sharing Technology (Daisy-Chain)',
        asin: 'B07GJGF56L',
        url: 'https://www.amazon.co.uk/dp/B07GJGF56L',
        priceGBP: 25.69
      },
      {
        id: '09',
        category: 'Keyboard',
        make: 'SteelSeries',
        model: 'Apex 3 RGB (UK Layout)',
        specs: 'Whisper-Quiet Gaming Switches, 10-Zone RGB Illumination, IP32 Water & Dust Resistant, Magnetic Wrist Rest',
        asin: 'B0831T7JNK',
        url: 'https://www.amazon.co.uk/dp/B0831T7JNK',
        priceGBP: 66.99
      },
      {
        id: '10',
        category: 'Mouse',
        make: 'Logitech',
        model: 'G502 HERO',
        specs: 'HERO 25K Optical Sensor (25,600 DPI), 11 Programmable Buttons, 5x 3.6g Tunable Weights',
        asin: 'B07GS6ZB7T',
        url: 'https://www.amazon.co.uk/dp/B07GS6ZB7T',
        priceGBP: 29.99
      },
      {
        id: '11',
        category: 'Monitor',
        make: 'LG',
        model: 'UltraGear G8 27G810A-B 27" 4K UHD IPS',
        specs: '3840x2160 4K UHD IPS Panel (163 PPI), High-Refresh Support, HDR10, FreeSync & G-SYNC Compatible',
        asin: 'B0FWQ3JLT1',
        url: 'https://www.amazon.co.uk/dp/B0FWQ3JLT1',
        priceGBP: 314.99
      },
      {
        id: '12',
        category: 'PSU',
        make: 'Corsair',
        model: 'RM750 750W 80 PLUS Gold Modular ATX',
        specs: '750W 80+ Gold Certified, Fully Modular Cabling, Zero-RPM Fan Mode, 160mm Length',
        asin: 'B097F1NGLY',
        url: 'https://www.amazon.co.uk/dp/B097F1NGLY',
        priceGBP: 83.99
      }
    ]
  };
})();
