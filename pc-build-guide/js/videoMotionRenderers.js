(function () {
  const G = (window.PCBuildGuide = window.PCBuildGuide || {});

  function arrow(ctx, x1, y1, x2, y2, color) {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    const ang = Math.atan2(y2 - y1, x2 - x1);
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - 7 * Math.cos(ang - 0.45), y2 - 7 * Math.sin(ang - 0.45));
    ctx.lineTo(x2 - 7 * Math.cos(ang + 0.45), y2 - 7 * Math.sin(ang + 0.45));
    ctx.closePath(); ctx.fill();
  }

  function label(ctx, text, x, y, color, size) {
    ctx.fillStyle = color || '#94a3b8';
    ctx.font = `bold ${size || 9}px Consolas, monospace`;
    ctx.fillText(text, x, y);
  }

  G.drawStepStage = function (ctx, stepId, phase, t, pulse, timeSec) {
    // Stage area: x=48..338 (width 290), y=54..158 (height 104)
    ctx.strokeStyle = '#334155';
    ctx.fillStyle = '#0b1222';
    ctx.lineWidth = 1.5;
    ctx.fillRect(48, 54, 290, 104);
    ctx.strokeRect(48, 54, 290, 104);

    if (stepId === 'step-1-prep') {
      // Left: Mobo on cardboard box; Right: 4000D panels detaching
      ctx.fillStyle = '#452715'; ctx.strokeStyle = '#d97706';
      ctx.fillRect(62, 112, 108, 34); ctx.strokeRect(62, 112, 108, 34);
      label(ctx, 'CARDBOARD BOX', 75, 133, '#fcd34d', 8);
      const moboY = phase === 0 ? 74 + t * 28 : 102;
      ctx.fillStyle = '#1e293b'; ctx.strokeStyle = '#38bdf8';
      ctx.fillRect(70, moboY, 92, 10); ctx.strokeRect(70, moboY, 92, 10);
      label(ctx, 'B650 MOBO', 88, moboY - 4, '#38bdf8', 8);
      if (phase === 0) arrow(ctx, 116, 62, 116, moboY - 2, '#38bdf8');

      // Right: Corsair 4000D Case & detaching panels
      ctx.fillStyle = '#0f172a'; ctx.strokeStyle = '#64748b';
      ctx.fillRect(216, 68, 72, 74); ctx.strokeRect(216, 68, 72, 74);
      label(ctx, '4000D', 236, 108, '#cbd5e1', 9);
      const frontX = phase >= 1 ? 288 + (phase === 1 ? t * 22 : 22) : 288;
      ctx.strokeStyle = '#38bdf8'; ctx.strokeRect(frontX, 68, 7, 74);
      if (phase === 1) arrow(ctx, 292, 105, frontX + 16, 105, '#38bdf8');
      const filterX = phase === 2 ? 216 - t * 30 : 216;
      ctx.strokeStyle = '#10b981'; ctx.strokeRect(filterX, 144, 48, 5);
      if (phase === 2) arrow(ctx, 214, 146, filterX - 10, 146, '#10b981');
      return;
    }

    if (stepId === 'step-2-am5-cpu') {
      // AM5 LGA1718 Socket, Gold Pin 1 Triangle, Lever Pivot & Plastic Cover Pop
      ctx.fillStyle = '#1e293b'; ctx.strokeStyle = '#64748b';
      ctx.fillRect(118, 68, 86, 76); ctx.strokeRect(118, 68, 86, 76);
      const cpuY = phase === 0 ? 58 + t * 18 : 76;
      ctx.fillStyle = '#0f172a'; ctx.strokeStyle = phase === 2 ? '#10b981' : '#38bdf8';
      ctx.fillRect(128, cpuY, 66, 60); ctx.strokeRect(128, cpuY, 66, 60);
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath(); ctx.moveTo(131, cpuY + 3); ctx.lineTo(143, cpuY + 3); ctx.lineTo(131, cpuY + 15); ctx.closePath(); ctx.fill();
      label(ctx, 'PIN 1', 68, 82, '#fbbf24', 9);
      label(ctx, '7800X3D', 140, cpuY + 35, '#e2e8f0', 9);

      // Retention Lever on right of socket
      const leverEndY = phase === 0 ? 64 : phase === 1 ? 64 + t * 76 : 140;
      ctx.strokeStyle = phase >= 1 ? '#f59e0b' : '#94a3b8'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(212, 140); ctx.lineTo(212, leverEndY); ctx.stroke();
      label(ctx, 'LEVER', 222, 108, '#f59e0b', 8);

      // Black plastic cover popping off in Phase 2
      if (phase === 1) {
        const popX = 160 + t * 95, popY = 90 - Math.sin(t * Math.PI) * 28;
        ctx.fillStyle = '#111827'; ctx.strokeStyle = '#f87171';
        ctx.fillRect(popX, popY, 44, 34); ctx.strokeRect(popX, popY, 44, 34);
        label(ctx, 'POP!', popX + 10, popY + 20, '#f87171', 8);
      } else if (phase === 2) {
        label(ctx, 'FLUSH LOCKED ✓', 222, 132, '#10b981', 9);
      }
      return;
    }

    if (stepId === 'step-3-ram-nvme') {
      // 4 DDR5 DIMM slots (A2/B2 active) + M.2_1 Q-Latch
      const slots = [76, 98, 120, 142];
      slots.forEach((sx, i) => {
        const isPrimary = i === 1 || i === 3;
        ctx.strokeStyle = isPrimary ? '#38bdf8' : '#334155';
        ctx.strokeRect(sx, 66, 12, 74);
        label(ctx, i === 1 ? 'A2' : i === 3 ? 'B2' : '', sx, 62, '#38bdf8', 8);
        if (isPrimary) {
          const ramH = phase === 0 ? 22 : phase === 1 ? 22 + t * 50 : 72;
          ctx.fillStyle = phase >= 1 ? 'rgba(16, 185, 129, 0.35)' : 'rgba(56, 189, 248, 0.25)';
          ctx.fillRect(sx + 2, 138 - ramH, 8, ramH);
        }
      });
      if (phase === 1) label(ctx, 'CLICK! SNAP!', 76, 152, '#10b981', 8);

      // Right side: M.2 NVMe slot at 30 deg -> flat + Q-latch
      ctx.strokeStyle = '#64748b'; ctx.strokeRect(188, 108, 118, 22);
      const angle = phase < 2 ? -0.35 : -0.35 * (1 - t);
      ctx.save();
      ctx.translate(298, 119);
      ctx.rotate(angle);
      ctx.fillStyle = '#1e293b'; ctx.strokeStyle = phase === 2 ? '#10b981' : '#f59e0b';
      ctx.fillRect(-96, -8, 96, 16); ctx.strokeRect(-96, -8, 96, 16);
      label(ctx, 'SN850X 1TB', -78, 3, '#f8fafc', 8);
      ctx.restore();
      ctx.fillStyle = phase === 2 ? '#10b981' : '#fbbf24';
      ctx.beginPath(); ctx.arc(196, 119, 5 + pulse * 2, 0, Math.PI * 2); ctx.fill();
      label(ctx, 'Q-LATCH 90°', 208, 96, '#fbbf24', 8);
      return;
    }

    if (stepId === 'step-4-arctic-offset') {
      // AM5 Socket + Lower CCD Hotspot + Offset L/R Brackets + MX-6 Pea Dot
      ctx.fillStyle = '#1e293b'; ctx.strokeStyle = '#64748b';
      ctx.fillRect(142, 68, 96, 74); ctx.strokeRect(142, 68, 96, 74);
      // Lower 3D V-Cache CCD hotspot
      ctx.fillStyle = 'rgba(249, 115, 22, 0.32)'; ctx.strokeStyle = '#f97316';
      ctx.fillRect(158, 112, 64, 20); ctx.strokeRect(158, 112, 64, 20);
      label(ctx, 'LOWER CCD DIE', 162, 125, '#fed7aa', 7);

      if (phase === 0) {
        const lift = t * 16;
        ctx.strokeStyle = '#f87171';
        ctx.strokeRect(148, 60 - lift, 84, 7);
        ctx.strokeRect(148, 143 + lift, 84, 7);
        label(ctx, 'UNhook STOCK AM5', 60, 86, '#f87171', 8);
      } else {
        const shift = phase === 1 ? (1 - t) * -14 : 0;
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(126 + shift, 76, 12, 64);
        ctx.fillRect(242 - shift, 76, 12, 64);
        label(ctx, 'L/R -5mm OFFSET', 56, 108, '#38bdf8', 8);
      }
      if (phase === 2) {
        ctx.fillStyle = '#94a3b8'; ctx.strokeStyle = '#10b981';
        ctx.beginPath(); ctx.arc(190, 118, 4 + t * 4, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        label(ctx, 'MX-6 5mm DOT', 258, 122, '#10b981', 8);
      }
      return;
    }

    if (stepId === 'step-5-case-fans') {
      // 3x P12 PWM PST Exhaust Fans spinning + PST Daisy-chain line
      const fans = [{ x: 92, y: 96, lbl: 'REAR P12' }, { x: 176, y: 86, lbl: 'TOP 1' }, { x: 256, y: 86, lbl: 'TOP 2' }];
      fans.forEach((f, idx) => {
        ctx.strokeStyle = '#38bdf8';
        ctx.strokeRect(f.x - 26, f.y - 24, 52, 48);
        ctx.save(); ctx.translate(f.x, f.y); ctx.rotate(timeSec * 5 + idx);
        for (let b = 0; b < 4; b++) {
          ctx.rotate(Math.PI / 2);
          ctx.fillStyle = 'rgba(56, 189, 248, 0.45)';
          ctx.fillRect(0, -3, 18, 6);
        }
        ctx.restore();
        if (phase >= 1) arrow(ctx, f.x, f.y - 10, f.x, f.y - 34, '#f97316');
      });
      if (phase === 2) {
        ctx.strokeStyle = '#10b981'; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.moveTo(92, 126); ctx.lineTo(176, 118); ctx.lineTo(256, 118); ctx.lineTo(316, 140); ctx.stroke();
        label(ctx, 'PST DAISY-CHAIN -> CHA_FAN1', 110, 149, '#10b981', 8);
      } else {
        label(ctx, 'ORANGE = HOT EXHAUST OUT', 118, 149, '#f97316', 8);
      }
      return;
    }

    if (stepId === 'step-6-aio-front') {
      // Peel Cold Plate Film -> 38mm Front Radiator Intake -> Pump Leaf-Spring & VRM Cap
      if (phase === 0) {
        ctx.fillStyle = '#b45309'; ctx.strokeStyle = '#f59e0b';
        ctx.fillRect(92, 74, 78, 62); ctx.strokeRect(92, 74, 78, 62);
        label(ctx, 'COPPER BASE', 100, 108, '#fef3c7', 8);
        const peelX = 92 + t * 88;
        ctx.fillStyle = 'rgba(56, 189, 248, 0.3)'; ctx.strokeStyle = '#38bdf8';
        ctx.fillRect(peelX, 70 - t * 10, 70, 56); ctx.strokeRect(peelX, 70 - t * 10, 70, 56);
        label(ctx, 'PEEL FILM!', peelX + 8, 98, '#38bdf8', 8);
      } else {
        // Front 38mm Radiator + Blue Intake Arrows + Pump VRM Cap
        ctx.fillStyle = '#1e293b'; ctx.strokeStyle = '#38bdf8';
        ctx.fillRect(268, 62, 34, 88); ctx.strokeRect(268, 62, 34, 88);
        label(ctx, '280 RAD', 262, 155, '#38bdf8', 7);
        arrow(ctx, 326, 84, 250, 84, '#38bdf8');
        arrow(ctx, 326, 124, 250, 124, '#38bdf8');
        ctx.fillStyle = '#0f172a'; ctx.strokeStyle = phase === 2 ? '#10b981' : '#c084fc';
        ctx.beginPath(); ctx.arc(134, 106, 28, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        label(ctx, phase === 2 ? 'VRM CAP LOCK' : 'ARCTIC PUMP', 98, 148, '#a7f3d0', 8);
      }
      return;
    }

    if (stepId === 'step-7-psu-cables') {
      // RM750/RM850x Bottom PSU Shroud -> Top-Left 8-Pin EPS + Right 24-Pin ATX Routing
      ctx.fillStyle = '#1e293b'; ctx.strokeStyle = '#f59e0b';
      ctx.fillRect(62, 122, 86, 28); ctx.strokeRect(62, 122, 86, 28);
      label(ctx, 'CORSAIR PSU', 72, 140, '#fcd34d', 8);

      // Motherboard outline on right
      ctx.strokeStyle = '#475569'; ctx.strokeRect(184, 62, 124, 86);
      ctx.fillStyle = phase >= 1 ? '#10b981' : '#38bdf8';
      ctx.fillRect(190, 66, 28, 12); // 8-Pin EPS top-left
      ctx.fillRect(292, 86, 12, 36); // 24-Pin ATX right edge
      label(ctx, '8-PIN EPS', 188, 90, '#38bdf8', 7);
      label(ctx, '24-PIN', 252, 106, '#10b981', 7);

      // Animated power lines from PSU to EPS & 24-Pin
      ctx.strokeStyle = phase === 2 ? '#10b981' : '#38bdf8';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 4]);
      ctx.lineDashOffset = -timeSec * 18;
      ctx.beginPath();
      ctx.moveTo(148, 130); ctx.lineTo(168, 130); ctx.lineTo(168, 72); ctx.lineTo(190, 72);
      ctx.moveTo(148, 140); ctx.lineTo(318, 140); ctx.lineTo(318, 104); ctx.lineTo(304, 104);
      ctx.stroke();
      ctx.setLineDash([]);
      if (phase === 2) {
        ctx.fillStyle = '#c084fc'; ctx.fillRect(216, 138, 64, 8);
        label(ctx, 'USB-C & F_PANEL', 210, 133, '#d8b4fe', 7);
      }
      return;
    }

    if (stepId === 'step-8-gpu-install') {
      // PCIEX16(G4) Slot + Dual-Fan RTX 4070 SUPER Slotting Down + 12VHPWR 0mm Flush Click
      ctx.fillStyle = '#334155'; ctx.fillRect(88, 126, 180, 10);
      label(ctx, 'PCIEX16(G4) ARMORED SLOT', 112, 149, '#94a3b8', 8);

      const gpuY = phase === 0 ? 64 : phase === 1 ? 64 + t * 28 : 92;
      ctx.fillStyle = '#0f172a'; ctx.strokeStyle = phase === 2 ? '#10b981' : '#38bdf8';
      ctx.lineWidth = 2;
      ctx.fillRect(82, gpuY, 196, 36); ctx.strokeRect(82, gpuY, 196, 36);
      ctx.beginPath(); ctx.arc(134, gpuY + 18, 12, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(222, gpuY + 18, 12, 0, Math.PI * 2); ctx.stroke();
      label(ctx, 'RTX 4070 SUPER', 142, gpuY + 21, '#f8fafc', 8);

      if (phase === 2) {
        const plugY = 60 + t * 22;
        ctx.fillStyle = '#10b981'; ctx.fillRect(236, plugY, 24, 12);
        label(ctx, '0.0mm FLUSH ✓', 248, 72, '#10b981', 8);
      } else {
        arrow(ctx, 180, 58, 180, gpuY - 2, '#38bdf8');
      }
      return;
    }

    // step-9-peripherals-bios: DisplayPort into GPU (not Mobo) + UEFI EXPO I & ReBAR ON
    if (phase === 0) {
      ctx.strokeStyle = '#ef4444'; ctx.strokeRect(64, 64, 72, 34);
      label(ctx, 'MOBO I/O ✕', 72, 85, '#f87171', 8);
      ctx.strokeStyle = '#10b981'; ctx.strokeRect(64, 110, 72, 34);
      label(ctx, 'GPU DP 1.4 ✓', 68, 130, '#34d399', 8);
      const dpX = 210 - t * 66;
      ctx.fillStyle = '#38bdf8'; ctx.fillRect(dpX, 120, 46, 14);
      arrow(ctx, dpX, 127, 140, 127, '#10b981');
      label(ctx, '4K 144Hz DP', dpX + 4, 114, '#38bdf8', 8);
    } else {
      // ASUS UEFI BIOS Toggles: AMD EXPO I & Resizable BAR
      ctx.fillStyle = '#111827'; ctx.strokeStyle = '#38bdf8';
      ctx.fillRect(68, 64, 248, 82); ctx.strokeRect(68, 64, 248, 82);
      label(ctx, 'ASUS UEFI BIOS · EZ MODE', 80, 80, '#fbbf24', 9);
      const on = phase === 2 ? t : 0.3;
      ['AMD EXPO I (6000MT/s)', 'RESIZABLE BAR (ON)'].forEach((name, idx) => {
        const ry = 92 + idx * 24;
        label(ctx, name, 80, ry + 11, '#e2e8f0', 8);
        ctx.fillStyle = phase === 2 ? 'rgba(16, 185, 129, 0.35)' : '#1e293b';
        ctx.strokeStyle = phase === 2 ? '#10b981' : '#f59e0b';
        ctx.fillRect(236, ry, 62, 15); ctx.strokeRect(236, ry, 62, 15);
        ctx.fillStyle = phase === 2 ? '#10b981' : '#fbbf24';
        ctx.fillRect(238 + on * 38, ry + 2, 20, 11);
      });
    }
  };
})();
