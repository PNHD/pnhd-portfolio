// ============================================================
// NOVA UI KIT â€” Part 0: Figma Variables (Color Tokens + Modes)
// Run FIRST â€” creates variable collections for Light/Dark mode
// Plugins > Development > New Plugin > paste code
// ============================================================

(async () => {
  const hex = (h) => ({
    r: parseInt(h.slice(1, 3), 16) / 255,
    g: parseInt(h.slice(3, 5), 16) / 255,
    b: parseInt(h.slice(5, 7), 16) / 255,
  });

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // COLOR VARIABLE COLLECTION (Light + Dark)
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  const colorCollection = figma.variables.createVariableCollection("Color Tokens");
  const lightMode = colorCollection.modes[0];
  colorCollection.renameMode(lightMode.modeId, "Light");
  const darkModeId = colorCollection.addMode("Dark");

  function createColorVar(name, lightHex, darkHex) {
    const v = figma.variables.createVariable(name, colorCollection, "COLOR");
    v.setValueForMode(lightMode.modeId, { ...hex(lightHex), a: 1 });
    v.setValueForMode(darkModeId, { ...hex(darkHex), a: 1 });
    return v;
  }

  // â”€â”€ Primary scale â”€â”€
  createColorVar("Primary/50",  "#EEF2FF", "#1E1B4B");
  createColorVar("Primary/100", "#E0E7FF", "#312E81");
  createColorVar("Primary/200", "#C7D2FE", "#3730A3");
  createColorVar("Primary/300", "#A5B4FC", "#4338CA");
  createColorVar("Primary/400", "#818CF8", "#6366F1");
  createColorVar("Primary/500", "#6366F1", "#818CF8");
  createColorVar("Primary/600", "#4F46E5", "#A5B4FC");
  createColorVar("Primary/700", "#4338CA", "#C7D2FE");
  createColorVar("Primary/800", "#3730A3", "#E0E7FF");
  createColorVar("Primary/900", "#312E81", "#EEF2FF");

  // â”€â”€ Neutral scale â”€â”€
  createColorVar("Neutral/25",  "#FCFCFD", "#0C0D0F");
  createColorVar("Neutral/50",  "#F9FAFB", "#111214");
  createColorVar("Neutral/100", "#F3F4F6", "#1A1B1E");
  createColorVar("Neutral/200", "#E5E7EB", "#27282C");
  createColorVar("Neutral/300", "#D1D5DB", "#3F4147");
  createColorVar("Neutral/400", "#9CA3AF", "#6B7280");
  createColorVar("Neutral/500", "#6B7280", "#9CA3AF");
  createColorVar("Neutral/600", "#4B5563", "#D1D5DB");
  createColorVar("Neutral/700", "#374151", "#E5E7EB");
  createColorVar("Neutral/800", "#1F2937", "#F3F4F6");
  createColorVar("Neutral/900", "#111827", "#F9FAFB");
  createColorVar("Neutral/950", "#030712", "#FFFFFF");

  // â”€â”€ Success â”€â”€
  createColorVar("Success/50",  "#ECFDF5", "#022C22");
  createColorVar("Success/100", "#D1FAE5", "#064E3B");
  createColorVar("Success/200", "#A7F3D0", "#065F46");
  createColorVar("Success/500", "#10B981", "#34D399");
  createColorVar("Success/600", "#059669", "#6EE7B7");
  createColorVar("Success/700", "#047857", "#A7F3D0");

  // â”€â”€ Warning â”€â”€
  createColorVar("Warning/50",  "#FFFBEB", "#451A03");
  createColorVar("Warning/100", "#FEF3C7", "#78350F");
  createColorVar("Warning/200", "#FDE68A", "#92400E");
  createColorVar("Warning/500", "#F59E0B", "#FBBF24");
  createColorVar("Warning/600", "#D97706", "#FCD34D");
  createColorVar("Warning/700", "#B45309", "#FDE68A");

  // â”€â”€ Error â”€â”€
  createColorVar("Error/50",  "#FEF2F2", "#450A0A");
  createColorVar("Error/100", "#FEE2E2", "#7F1D1D");
  createColorVar("Error/200", "#FECACA", "#991B1B");
  createColorVar("Error/500", "#EF4444", "#F87171");
  createColorVar("Error/600", "#DC2626", "#FCA5A5");
  createColorVar("Error/700", "#B91C1C", "#FECACA");

  // â”€â”€ Info â”€â”€
  createColorVar("Info/50",  "#EFF6FF", "#172554");
  createColorVar("Info/100", "#DBEAFE", "#1E3A5F");
  createColorVar("Info/500", "#3B82F6", "#60A5FA");
  createColorVar("Info/600", "#2563EB", "#93C5FD");
  createColorVar("Info/700", "#1D4ED8", "#BFDBFE");

  // â”€â”€ Semantic tokens â”€â”€
  createColorVar("Semantic/Background",       "#FFFFFF", "#0C0D0F");
  createColorVar("Semantic/Surface",          "#FFFFFF", "#141517");
  createColorVar("Semantic/Surface Raised",   "#F9FAFB", "#1A1B1E");
  createColorVar("Semantic/Border",           "#E5E7EB", "#27282C");
  createColorVar("Semantic/Border Subtle",    "#F3F4F6", "#1A1B1E");
  createColorVar("Semantic/Text Primary",     "#111827", "#F9FAFB");
  createColorVar("Semantic/Text Secondary",   "#374151", "#D1D5DB");
  createColorVar("Semantic/Text Tertiary",    "#6B7280", "#9CA3AF");
  createColorVar("Semantic/Text Disabled",    "#9CA3AF", "#4B5563");
  createColorVar("Semantic/Text On Color",    "#FFFFFF", "#FFFFFF");
  createColorVar("Semantic/Text Link",        "#4F46E5", "#818CF8");
  createColorVar("Semantic/Primary",          "#4F46E5", "#818CF8");
  createColorVar("Semantic/Primary Hover",    "#4338CA", "#6366F1");
  createColorVar("Semantic/Primary Subtle",   "#EEF2FF", "#1E1B4B");
  createColorVar("Semantic/Destructive",      "#DC2626", "#F87171");
  createColorVar("Semantic/Destructive Subtle","#FEF2F2","#450A0A");
  createColorVar("Semantic/Success BG",       "#ECFDF5", "#022C22");
  createColorVar("Semantic/Warning BG",       "#FFFBEB", "#451A03");
  createColorVar("Semantic/Error BG",         "#FEF2F2", "#450A0A");
  createColorVar("Semantic/Info BG",          "#EFF6FF", "#172554");
  createColorVar("Semantic/Overlay",          "#00000066", "#00000099");

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // SPACING VARIABLE COLLECTION
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  const spacingCollection = figma.variables.createVariableCollection("Spacing");
  const spacingMode = spacingCollection.modes[0];
  spacingCollection.renameMode(spacingMode.modeId, "Default");

  const spacingTokens = {
    "2xs": 2, "xs": 4, "sm": 6, "md": 8, "lg": 12,
    "xl": 16, "2xl": 20, "3xl": 24, "4xl": 32, "5xl": 40,
    "6xl": 48, "7xl": 64, "8xl": 80, "9xl": 96, "10xl": 128,
  };
  for (const [name, val] of Object.entries(spacingTokens)) {
    const v = figma.variables.createVariable(`Space/${name}`, spacingCollection, "FLOAT");
    v.setValueForMode(spacingMode.modeId, val);
  }

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // RADIUS VARIABLE COLLECTION
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  const radiusCollection = figma.variables.createVariableCollection("Radius");
  const radiusMode = radiusCollection.modes[0];
  radiusCollection.renameMode(radiusMode.modeId, "Default");

  const radiusTokens = {
    "none": 0, "xs": 2, "sm": 4, "md": 6, "lg": 8,
    "xl": 12, "2xl": 16, "3xl": 20, "4xl": 24, "full": 9999,
  };
  for (const [name, val] of Object.entries(radiusTokens)) {
    const v = figma.variables.createVariable(`Radius/${name}`, radiusCollection, "FLOAT");
    v.setValueForMode(radiusMode.modeId, val);
  }

  figma.closePlugin("âœ… Variables created: Color Tokens (Light/Dark), Spacing, Radius");
})();

