export const thienKimContinuitySteps = [
  {
    n: "01",
    title: "Original references",
    body: "A close-up and a full-body reference remain the identity and body anchors. They are not replaced by a chain of newly generated shots.",
    meta: "Face · body · proportions",
  },
  {
    n: "02",
    title: "Shot 1 = master look",
    body: "The first selected frame establishes the pack-specific outfit, hair, accessories, lighting, color mood and location atmosphere.",
    meta: "Pack continuity anchor",
  },
  {
    n: "03",
    title: "Shot 2+ vary safely",
    body: "Later shots reuse the original references plus selected Shot 1, while changing framing, pose and camera angle instead of cloning the same composition.",
    meta: "Same identity · new shot",
  },
] as const;

export const thienKimExecutionModes = [
  {
    mode: "mimic_first",
    label: "Mimic first",
    body: "Use the reference video as the motion driver when the source is a coherent single-subject performance and the workflow can preserve identity with one anchor image.",
  },
  {
    mode: "segmented_mimic",
    label: "Segmented mimic",
    body: "Split a source by real cuts or beats and handle a small number of segments separately when one continuous mimic would be too fragile.",
  },
  {
    mode: "vibe_recreation",
    label: "Vibe recreation",
    body: "Keep the reusable visual mechanic or mood but build a new Thiên Kim shot pack when exact motion transfer is not the right production choice.",
  },
  {
    mode: "slideshow_only",
    label: "Slideshow only",
    body: "Avoid motion generation when deformation risk is too high. A controlled image edit can be stronger than forcing an unstable I2V result.",
  },
] as const;

export const thienKimQcChecks = [
  ["Identity", "Face remains recognizably matched to the reference."],
  ["Anatomy", "Hands and feet are checked for obvious distortion."],
  ["Styling", "Outfit and accessories remain correct for the concept."],
  ["Environment", "Background logic stays stable and does not mutate unexpectedly."],
  ["Image quality", "Broken detail, excessive noise and visible generation defects are rejected."],
  ["Motion", "Video movement should be smooth without obvious looping or identity breakage."],
] as const;

export const thienKimSheetTabs = [
  "Packs",
  "Shots",
  "Trend_Analysis",
  "Trend_Shots",
  "Generated_Images",
  "Pack_Review",
  "Lookups",
] as const;

export const thienKimTrackedFields = [
  "Reference Strategy",
  "Continuity Notes",
  "Face Consistency Score",
  "Outfit Continuity Score",
  "Background Logic Score",
  "Shot Variety Score",
  "I2V Safety Score",
  "Recommended Video Workflow Type",
  "I2V Risk Level",
  "Mimic Input Plan",
  "Anchor Image Prompt EN",
  "Video URL",
] as const;
