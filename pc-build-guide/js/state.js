(function () {
  const G = (window.PCBuildGuide = window.PCBuildGuide || {});
  const STORAGE_KEY = 'pc_build_locker_v4';

  function formatPriceString(val) {
    if (val === undefined || val === null || val === '') return '';
    const num = parseFloat(String(val).replace(/[^0-9.]/g, ''));
    return Number.isNaN(num) ? '' : num.toFixed(2);
  }

  function matchCategory(token) {
    const norm = String(token || '').toLowerCase().trim();
    if (!norm) return null;
    const padded = norm.replace(/^0+/, '').padStart(2, '0');
    for (const cat of G.CATEGORIES) {
      if (
        cat.id === norm ||
        cat.partNumber === padded ||
        cat.categoryName.toLowerCase() === norm ||
        cat.label.toLowerCase() === norm ||
        cat.label.toLowerCase().includes(norm) ||
        norm.includes(cat.categoryName.toLowerCase())
      ) {
        return cat.id;
      }
    }
    return null;
  }

  G.createEmptyState = function () {
    const parts = {};
    for (const cat of G.CATEGORIES) {
      parts[cat.id] = {
        id: cat.partNumber,
        category: cat.categoryName,
        make: '',
        model: '',
        specs: '',
        asin: '',
        url: '',
        priceGBP: ''
      };
    }
    return {
      buildName: G.DEFAULT_RIG_JSON.buildName,
      targetBudgetGBP: G.DEFAULT_RIG_JSON.targetBudgetGBP,
      flexBudgetGBP: G.DEFAULT_RIG_JSON.flexBudgetGBP,
      parts,
      completedSteps: {},
      sanityChecks: {},
      customVideos: {
        'step-1-prep': 'https://www.youtube.com/watch?v=rj0zYt8YwzE',
        'step-2-am5-cpu': 'https://www.youtube.com/watch?v=I_jjtYEVXXU',
        'step-3-ram-nvme': 'https://www.youtube.com/watch?v=cbkyrHaLD0g',
        'step-4-arctic-offset': 'https://www.youtube.com/watch?v=mi9fJ7c4b1U',
        'step-5-case-fans': 'https://www.youtube.com/watch?v=6V3If3NpBHM',
        'step-6-aio-front': 'https://www.youtube.com/watch?v=FtJ4P2Uo5no',
        'step-7-psu-cables': 'https://www.youtube.com/watch?v=0VD6kjU5Sf0',
        'step-8-gpu-install': 'https://www.youtube.com/watch?v=nbZO7qcvCB0',
        'step-9-peripherals-bios': 'https://www.youtube.com/watch?v=qR6r99NdUOo'
      },
      guideGenerated: false,
      lastUpdated: null
    };
  };

  G.createDefaultRigState = function () {
    const state = G.createEmptyState();
    for (const item of G.DEFAULT_RIG_JSON.parts) {
      const catId = matchCategory(item.id) || matchCategory(item.category);
      if (catId && state.parts[catId]) {
        state.parts[catId] = {
          id: item.id,
          category: item.category,
          make: String(item.make || ''),
          model: String(item.model || ''),
          specs: String(item.specs || ''),
          asin: String(item.asin || ''),
          url: String(item.url || ''),
          priceGBP: formatPriceString(item.priceGBP)
        };
      }
    }
    return state;
  };

  G.countPopulatedParts = function (state) {
    let count = 0;
    for (const cat of G.CATEGORIES) {
      const p = state.parts[cat.id];
      if (p && (p.make.trim() || p.model.trim())) count++;
    }
    return count;
  };

  G.loadState = function () {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return G.createDefaultRigState();
      const parsed = JSON.parse(raw);
      const base = G.createEmptyState();
      for (const cat of G.CATEGORIES) {
        const incoming = parsed.parts?.[cat.id];
        if (incoming) {
          base.parts[cat.id] = {
            id: cat.partNumber,
            category: cat.categoryName,
            make: String(incoming.make || ''),
            model: String(incoming.model || ''),
            specs: String(incoming.specs || ''),
            asin: String(incoming.asin || ''),
            url: String(incoming.url || ''),
            priceGBP: String(incoming.priceGBP ?? incoming.price ?? '')
          };
        }
      }
      base.completedSteps = parsed.completedSteps || {};
      base.sanityChecks = parsed.sanityChecks || {};
      base.customVideos = {
        ...base.customVideos,
        ...(parsed.customVideos || {})
      };
      base.guideGenerated = Boolean(parsed.guideGenerated);
      base.lastUpdated = parsed.lastUpdated || null;
      if (G.countPopulatedParts(base) === 0) {
        return G.createDefaultRigState();
      }
      return base;
    } catch {
      return G.createDefaultRigState();
    }
  };

  G.saveState = function (state) {
    state.lastUpdated = new Date().toISOString();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota or private-mode errors
    }
  };

  G.getPartDisplayName = function (state, categoryId) {
    const part = state.parts[categoryId];
    const cat = G.CATEGORIES.find((c) => c.id === categoryId);
    if (!part) return cat ? cat.defaultName : categoryId;
    const full = `${part.make.trim()} ${part.model.trim()}`.trim();
    return full.length > 0 ? full : (cat ? cat.defaultName : categoryId);
  };

  G.getPartSpecs = function (state, categoryId) {
    return state.parts[categoryId]?.specs?.trim() || '';
  };

  G.calculateTotalCost = function (state) {
    let totalPence = 0;
    for (const cat of G.CATEGORIES) {
      const rawPrice = state.parts[cat.id]?.priceGBP ?? state.parts[cat.id]?.price ?? '';
      const num = parseFloat(String(rawPrice).replace(/[^0-9.]/g, ''));
      if (!Number.isNaN(num) && num > 0) {
        totalPence += Math.round(num * 100);
      }
    }
    return totalPence / 100;
  };

  G.exportRigJsonObject = function (state) {
    const orderedCats = [...G.CATEGORIES].sort((a, b) => Number(a.partNumber) - Number(b.partNumber));
    return {
      buildName: state.buildName || G.DEFAULT_RIG_JSON.buildName,
      targetBudgetGBP: state.targetBudgetGBP || 2000.00,
      flexBudgetGBP: state.flexBudgetGBP || 2200.00,
      totalPriceGBP: G.calculateTotalCost(state),
      parts: orderedCats.map((cat) => {
        const p = state.parts[cat.id] || {};
        const numPrice = parseFloat(String(p.priceGBP || '0').replace(/[^0-9.]/g, ''));
        return {
          id: cat.partNumber,
          category: cat.categoryName,
          make: p.make || '',
          model: p.model || '',
          specs: p.specs || '',
          asin: p.asin || '',
          url: p.url || '',
          priceGBP: Number.isNaN(numPrice) ? 0 : Math.round(numPrice * 100) / 100
        };
      })
    };
  };

  G.parseRigJson = function (jsonText) {
    const data = JSON.parse(jsonText);
    const source = data.parts !== undefined ? data.parts : data;
    const updates = {};
    let matchedCount = 0;

    if (Array.isArray(source)) {
      for (const item of source) {
        if (!item || typeof item !== 'object') continue;
        const catId = matchCategory(item.id) || matchCategory(item.category) || matchCategory(item.partNumber);
        if (catId) {
          updates[catId] = item;
          matchedCount++;
        }
      }
    } else if (source && typeof source === 'object') {
      for (const [key, item] of Object.entries(source)) {
        if (!item || typeof item !== 'object') continue;
        const catId = matchCategory(key) || matchCategory(item.id) || matchCategory(item.category);
        if (catId) {
          updates[catId] = item;
          matchedCount++;
        }
      }
    }
    return { updates, matchedCount, meta: data };
  };
})();
