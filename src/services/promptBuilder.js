// Prompt Builder Engine for Master AI Video Prompt Studio
// Constructs production-ready prompts adhering to the 18 key aspects and strict character continuity

export const promptBuilder = {
  // Standard Production Negative Prompt
  defaultNegativePrompt: 
    "No face distortion, no character identity change, no hairstyle change, no clothing change, no age change, no body proportion change, no extra fingers, no missing fingers, no duplicated characters, no deformed hands, no unnatural facial expressions, no random accessories, no text, no watermark, no logo, no random objects, no background character duplication, no plastic oversmoothed skin.",

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
    const charsText = characterLockedDescriptions.length > 0 
      ? `featuring ${characterLockedDescriptions.join(" AND ")}.`
      : "cinematic scene.";

    return `Cinematic ${cameraAngle.toLowerCase()} ${charsText} The character is ${action}. Facial expression: ${expression}. Body language: ${bodyLanguage}. Environment: ${environment}. Props: ${props}. Time of day: ${timeOfDay}. Lighting: ${lighting}. Camera angle: ${cameraAngle}. Lens: ${lens}, shallow depth of field. Composition: ${composition}. Visual style: ${visualStyle}, 8k resolution, photorealistic render, masterwork cinematic quality. Aspect ratio: ${aspectRatio}.`;
  },

  // Build Video Generation Prompt (Sora / Kling / Runway Gen-3 / Luma)
  buildVideoPrompt({
    characterLockedDescriptions = [],
    action = "",
    movement = "",
    expression = "",
    environmentMovement = "Subtle wood dust particles floating in warm sunlight",
    cameraMovement = "Slow cinematic dolly in at eye level",
    cameraAngle = "Medium Shot",
    lighting = "Warm golden hour natural light",
    cinematicStyle = "Photorealistic cinematic short film 24fps"
  }) {
    const charsText = characterLockedDescriptions.length > 0 
      ? `of ${characterLockedDescriptions.join(" and ")}` 
      : "";

    return `Cinematic video ${charsText}. ${action}. ${movement}. The facial expression remains ${expression}. Natural organic body movement, subtle realistic breathing, natural hand and finger mechanics. Environment motion: ${environmentMovement}. Camera motion: ${cameraMovement}, maintaining ${cameraAngle}. Lighting: ${lighting}. Cinematic style: ${cinematicStyle}. Physics: natural cloth draping, realistic weight and momentum. Visual continuity: Maintain exact character identity, clothing, hairstyle, facial structure, skin tone and body proportions throughout the shot. Negative instructions: No character transformation, no clothing morphing, no extra fingers, no distorted hands, no facial warping, no jittery camera, no sudden cuts.`;
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
