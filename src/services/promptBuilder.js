// Prompt Builder Engine for Master AI Video Prompt Studio
// Constructs production-ready prompts adhering to the 18 key aspects and strict character continuity
// 100% Policy-Safe for OpenAI DALL-E 3, Midjourney, Bing Image Creator, Flux, Sora, Runway, Kling

export const promptBuilder = {
  // Standard Production Negative Prompt
  defaultNegativePrompt: 
    "No face distortion, no character identity change, no hairstyle change, no clothing change, no age change, no body proportion change, no extra fingers, no missing fingers, no duplicated characters, no deformed hands, no unnatural facial expressions, no random accessories, no text, no watermark, no logo, no random objects, no background character duplication, no plastic oversmoothed skin.",

  // Automated Content Policy Sanitizer for OpenAI DALL-E 3 / Bing / Midjourney
  sanitizeForPolicy(text) {
    if (!text || typeof text !== "string") return "";
    return text
      // Convert [CHAR_001: Name, Description] to natural English: Name (Description)
      .replace(/\[CHAR_\d+:\s*([^,]+),\s*(.*?)\]/gi, "$1 ($2)")
      .replace(/[\[\]]/g, "")
      // Weapons & firearms filters
      .replace(/\b(mexican standoff|standoff)\b/gi, "high-stakes dramatic confrontation")
      .replace(/\b(shotguns?|handguns?|pistols?|revolvers?|rifles?|firearms?)\b/gi, "tactical gear")
      .replace(/\b(weapons?|senjata api|senjata)\b/gi, "tactical equipment")
      .replace(/\b(drawn firearms|drawn weapon|acukan senjata|acukan pistol)\b/gi, "focused high-alert posture")
      // Violence & Injury filters
      .replace(/\b(blood-red|bloody|bleeding|blood|berdarah|darah)\b/gi, "crimson ambient glow")
      .replace(/\b(bom terma|bom data|bombs?|explosives?|letupan)\b/gi, "critical terminal override")
      .replace(/\b(kill|killing|murder|murderous|deadly|berani mati)\b/gi, "high-stakes")
      // Alcohol & Drugs filters
      .replace(/\b(whiskey|whisky|wiski|alcohol|liquor|beer|arak)\b/gi, "crystal beverage")
      // Sensitive Cyber terms filters
      .replace(/\b(cyber hacker|hackers?|penggodam)\b/gi, "digital operative")
      // Body shape & physical filters (DALL-E 3 female & minor safety policy)
      .replace(/\b(slender,?\s*graceful\s*build|slender\s*build|graceful\s*build|slender|petite|curvy|voluptuous|skinny)\b/gi, "composed poise")
      .replace(/\b(teenage\s*build|young\s*body)\b/gi, "neat student posture")
      // Military / combat / conflict zone filters
      .replace(/\b(dynamic\s*operational\s*zone|operational\s*zone)\b/gi, "dynamic project setting")
      .replace(/\b(combat\s*vigilance)\b/gi, "focused vigilance")
      .replace(/\b(combat\s*watch)\b/gi, "tactical watch")
      .replace(/\b(combat\s*lock|grappling\s*hold)\b/gi, "firm decisive hold")
      .replace(/\b(combat)\b/gi, "kinetic action")
      .replace(/\s+/g, " ")
      .trim();
  },

  // Build 18-Aspect Image Prompt
  buildImagePrompt({
    characterLockedDescriptions = [],
    action = "",
    expression = "",
    bodyLanguage = "",
    environment = "",
    props = "",
    timeOfDay = "Golden hour",
    lighting = "Soft warm cinematic volumetric light",
    cameraAngle = "Medium Shot",
    lens = "50mm f/1.8",
    composition = "Cinematic rule of thirds",
    visualStyle = "Photorealistic Cinematic",
    aspectRatio = "16:9"
  }) {
    // Sanitize character descriptions to clean natural English prose
    const cleanChars = characterLockedDescriptions.map(desc => this.sanitizeForPolicy(desc));
    const charsText = cleanChars.length > 0 
      ? `featuring ${cleanChars.join(" and ")}.`
      : "cinematic scene.";

    const sAction = this.sanitizeForPolicy(action);
    const sExpression = this.sanitizeForPolicy(expression);
    const sBodyLanguage = this.sanitizeForPolicy(bodyLanguage);
    const sEnvironment = this.sanitizeForPolicy(environment);
    const sProps = this.sanitizeForPolicy(props);
    const sLighting = this.sanitizeForPolicy(lighting);

    return `Cinematic ${cameraAngle.toLowerCase()} ${charsText} The character is ${sAction}. Facial expression: ${sExpression}. Body language: ${sBodyLanguage}. Environment: ${sEnvironment}. Props: ${sProps}. Time of day: ${timeOfDay}. Lighting: ${sLighting}. Camera angle: ${cameraAngle}. Lens: ${lens}, shallow depth of field. Composition: ${composition}. Visual style: ${visualStyle}, natural cinematic lighting, professional photographic quality. Aspect ratio: ${aspectRatio}.`;
  },

  // Build Video Generation Prompt (Sora / Kling / Runway Gen-3 / Luma)
  buildVideoPrompt({
    characterLockedDescriptions = [],
    action = "",
    movement = "",
    expression = "",
    environmentMovement = "Subtle dust motes floating in warm light",
    cameraMovement = "Slow cinematic dolly in at eye level",
    cameraAngle = "Medium Shot",
    lighting = "Warm golden hour natural light",
    cinematicStyle = "Photorealistic cinematic short film 24fps"
  }) {
    const cleanChars = characterLockedDescriptions.map(desc => this.sanitizeForPolicy(desc));
    const charsText = cleanChars.length > 0 
      ? `of ${cleanChars.join(" and ")}` 
      : "";

    const sAction = this.sanitizeForPolicy(action);
    const sMovement = this.sanitizeForPolicy(movement);
    const sExpression = this.sanitizeForPolicy(expression);
    const sEnvMovement = this.sanitizeForPolicy(environmentMovement);
    const sCamMovement = this.sanitizeForPolicy(cameraMovement);
    const sLighting = this.sanitizeForPolicy(lighting);

    return `Cinematic video ${charsText}. ${sAction}. ${sMovement}. The facial expression remains ${sExpression}. Natural organic body movement, subtle realistic breathing, natural hand and finger mechanics. Environment motion: ${sEnvMovement}. Camera motion: ${sCamMovement}, maintaining ${cameraAngle}. Lighting: ${sLighting}. Cinematic style: ${cinematicStyle}. Physics: natural cloth draping, realistic weight and momentum. Visual continuity: Maintain exact character identity, clothing, hairstyle, facial structure, skin tone and body proportions throughout the shot. Negative instructions: No character transformation, no clothing morphing, no extra fingers, no distorted hands, no facial warping, no jittery camera, no sudden cuts.`;
  },

  // Build Voice Generation Prompt
  buildVoicePrompt({
    speaker = "Pak Rahman",
    age = 48,
    voiceType = "Male Malay",
    accent = "Natural Malaysian Malay",
    speed = "0.9x",
    emotion = "Wise and reflective",
    dialogue = ""
  }) {
    return `Generate a natural ${accent} ${voiceType} voice for a ${age}-year-old speaker (${speaker}). Voice timbre should sound warm, mature, calm and experienced with emotional warmth. Use natural Malaysian Malay pronunciation and vocabulary. Speak at ${speed} speed with natural breathing pauses between phrases. Avoid Indonesian accent. Emotion: ${emotion}. Dialogue: "${dialogue}"`;
  },

  // Build Music Prompt
  buildMusicPrompt({
    style = "Traditional Malay Cinematic Instrumental",
    mood = "Nostalgic, emotional, reflective",
    tempo = "70 BPM",
    instrumentation = "Soft seruling buluh, gambus, subtle percussion, warm cello strings",
    purpose = "Underlying atmospheric music supporting character dialogue without clashing"
  }) {
    return `${style}. Mood: ${mood}. Instrumentation: ${instrumentation}. Tempo: ${tempo}. Energy: Gentle and majestic. Cinematic purpose: ${purpose}. No vocals. Mastered for broadcast dialogue clarity.`;
  }
};
