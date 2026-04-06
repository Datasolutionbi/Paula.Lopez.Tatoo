// =============================================
// i18n Client-Side Engine
// Aplica el idioma guardado en localStorage
// a todos los elementos [data-i18n] en el DOM
// =============================================

type Lang = 'ES' | 'EN' | 'NL' | 'FR';

const translations: Record<Lang, Record<string, string>> = {
  ES: {
    'nav.home': 'HOME', 'nav.about': 'SOBRE MÍ', 'nav.media': 'MEDIA',
    'nav.portfolio': 'PORTAFOLIO', 'nav.contact': 'CONTACTA', 'nav.faq': 'FAQ',
    'nav.seminarios': 'SEMINARIOS', 'nav.blog': 'BLOG', 'nav.cta': 'Consulta',
    'hero.label': 'Anime · Realismo · Tinta de Autor',
    'hero.quote': '"Una convergencia entre la obsesión técnica por el color vibrante de la estética geek y el absoluto silencio del ritual del tatuaje."',
    'hero.cta.primary': 'Ver el Portafolio', 'hero.cta.secondary': 'Reservar Sesión',
    'hero.scroll': 'DESPLAZA PARA EXPLORAR',
    // Liturgia section
    'home.pillars.title': 'Los Tres Pilares',
    'home.pillars.sub': 'Saturación suprema y contrastes absolutos en piel.',
    'home.pillars.link': 'Ver Obra Completa',
    'home.p1.title': 'Biorealismo', 'home.p1.sub': 'Texturas precisas y retratos hiper-detallados.',
    'home.p2.title': 'Anime & Full Color', 'home.p2.sub': 'Saturación cromática extrema y fidelidad a la línea.',
    'home.p3.title': 'Blackwork de Autor', 'home.p3.sub': 'Altos contrastes, línea sólida y sombras profundas.',
    // Quote
    'home.quote.text': '"La piel humana no es un papel en blanco, es una catedral que exige devoción. Traemos el neón a la oscuridad."',
    'home.quote.author': 'Paula Angels',
    // Process
    'home.process.title': 'Protocolo de Estudio',
    'home.step1.title': 'Atmósfera & Diseño', 'home.step1.sub': 'Música selecta, estética visual de autor y privacidad. El nacimiento de la pieza única.',
    'home.step2.title': 'Curación', 'home.step2.sub': 'Diseños personalizados enfocados en longevidad visual en la piel y fluidez orgánica.',
    'home.step3.title': 'La Sesión', 'home.step3.sub': 'Técnica impecable y esterilización clínica. Equipamiento de élite para traumatismo minimizado.',
    // Portfolio
    'portfolio.title': 'La Obra',
    'portfolio.subtitle': 'Piel, aguja y el testamento visual de quienes han pasado por La Catedral Sintética.',
    'portfolio.filter.all': 'Todas las Obras', 'portfolio.empty': 'Aún no hay obras en este rito.',
    // Contact
    'contact.title': 'Reserva tu Sesión', 'contact.headline1': 'Creemos Algo', 'contact.headline2': 'Juntos',
    'contact.body': 'Cada tatuaje es una colaboración. Cuéntame sobre tu proyecto y creemos algo que llevarás con orgullo toda la vida.',
    'contact.name': 'Nombre Completo *', 'contact.email': 'Correo Electrónico *',
    'contact.instagram': 'Instagram (Ej: @tu_usuario)', 'contact.phone': 'Teléfono / WhatsApp *',
    'contact.city': 'Ciudad de Residencia', 'contact.age': 'Edad (Mín. 18 años) *',
    'contact.source': '¿Dónde nos encontraste? *', 'contact.placement': 'Ubicación del Tatuaje *',
    'contact.concept': 'Describe tu idea, elementos, blackwork/color... *',
    'contact.refs': 'Fotos de Referencia (Máx 2) *', 'contact.zone': 'Foto zona a tatuar (Máx 1) *',
    'contact.consent': '«Permito que el proceso del tatuaje y el tatuaje en sí sean fotografiados y mostrados en el portafolio del estudio.»',
    'contact.submit': 'Enviar Solicitud de Reserva',
    // About
    'about.label': 'Sobre la Artista',
    'about.headline1': 'Creando', 'about.headline2': 'Eternidad',
    'about.p1': '"Mi visión del tatuaje trasciende la simple inyección de tinta en la dermis. Lo considero un rito de paso, un proceso de arquitectura corporal donde la luz, las sombras y la anatomía dictan la estructura."',
    'about.p2': 'Especializada en Biorealismo, Cultura Anime y Blackwork de autor, cada diseño es una colaboración nacida de la escucha técnica y la obsesión por llevar referencias visuales de la cultura pop a la máxima saturación.',
    'about.p3': 'El estudio no es una tienda de paso, es The Synthetic Cathedral: Un espacio seguro de silencio, donde el arte se respeta y la creatividad se materializa.',
    'about.cta': 'Agendar Consulta',
    'about.v1.title': 'Curaduría de Color', 'about.v1.sub': 'Saturación cromática extrema, fidelidad absoluta a la estética fuente y contrastes vivos que garantizan longevidad.',
    'about.v2.title': 'El Ritual', 'about.v2.sub': 'Cada sesión se diseña para ser inmersiva. Un entorno curado y privado enfocado totalmente en el desarrollo de la obra.',
    'about.v3.title': 'Presencia', 'about.v3.sub': 'Basada en Madrid, España. Aceptando propuestas internacionales para curadurías de cuerpo completo («body suits»).',
    'general.location': 'Madrid, España', 'general.booknow': 'Reservar Ahora',
    'general.viewwork': 'Ver Trabajo', 'general.close': 'Cerrar',
  },
  EN: {
    'nav.home': 'HOME', 'nav.about': 'ABOUT ME', 'nav.media': 'MEDIA',
    'nav.portfolio': 'PORTFOLIO', 'nav.contact': 'CONTACT', 'nav.faq': 'FAQ',
    'nav.seminarios': 'WORKSHOPS', 'nav.blog': 'BLOG', 'nav.cta': 'Consultation',
    'hero.label': 'Anime · Realism · Signature Ink',
    'hero.quote': '"A convergence between the technical obsession for vibrant geek-aesthetic colour and the absolute silence of the tattoo ritual."',
    'hero.cta.primary': 'View Portfolio', 'hero.cta.secondary': 'Book a Session',
    'hero.scroll': 'SCROLL TO EXPLORE',
    'home.pillars.title': 'The Three Pillars',
    'home.pillars.sub': 'Supreme saturation and absolute contrasts on skin.',
    'home.pillars.link': 'View Full Work',
    'home.p1.title': 'Biorealism', 'home.p1.sub': 'Precise textures and hyper-detailed portraits.',
    'home.p2.title': 'Anime & Full Colour', 'home.p2.sub': 'Extreme chromatic saturation and line fidelity.',
    'home.p3.title': 'Signature Blackwork', 'home.p3.sub': 'High contrast, solid line and deep shadows.',
    'home.quote.text': '"Human skin is not a blank page, it is a cathedral that demands devotion. We bring the neon into the dark."',
    'home.quote.author': 'Paula Angels',
    'home.process.title': 'Studio Protocol',
    'home.step1.title': 'Atmosphere & Design', 'home.step1.sub': 'Curated music, original visual aesthetics and privacy. The birth of the unique piece.',
    'home.step2.title': 'Curation', 'home.step2.sub': 'Custom designs focused on visual longevity and organic fluidity on skin.',
    'home.step3.title': 'The Session', 'home.step3.sub': 'Impeccable technique and clinical sterilisation. Elite equipment for minimised trauma.',
    'portfolio.title': 'The Work',
    'portfolio.subtitle': 'Skin, needle, and the visual testament of those who have passed through The Synthetic Cathedral.',
    'portfolio.filter.all': 'All Works', 'portfolio.empty': 'No works yet in this ritual.',
    'contact.title': 'Book Your Session', 'contact.headline1': "Let's Create", 'contact.headline2': 'Something',
    'contact.body': "Every tattoo is a collaboration. Tell me about your project and let's create something you'll carry with pride for life.",
    'contact.name': 'Full Name *', 'contact.email': 'Email Address *',
    'contact.instagram': 'Instagram (e.g. @your_user)', 'contact.phone': 'Phone / WhatsApp *',
    'contact.city': 'City of Residence', 'contact.age': 'Age (Min. 18 years) *',
    'contact.source': 'Where did you find us? *', 'contact.placement': 'Tattoo Placement *',
    'contact.concept': 'Describe your idea, elements, blackwork/colour... *',
    'contact.refs': 'Reference Photos (Max 2) *', 'contact.zone': 'Photo of body area (Max 1) *',
    'contact.consent': '«I allow the tattoo process and the final tattoo to be photographed and shown in the studio portfolio.»',
    'contact.submit': 'Send Booking Request',
    'about.label': 'About the Artist',
    'about.headline1': 'Creating', 'about.headline2': 'Eternity',
    'about.p1': '"My vision of tattooing transcends mere ink injection into the dermis. I see it as a rite of passage — a process of bodily architecture where light, shadow and anatomy dictate the structure."',
    'about.p2': 'Specialising in Biorealism, Anime Culture and Signature Blackwork, each design is a collaboration born from technical listening and an obsession for bringing pop culture references to maximum saturation.',
    'about.p3': 'The studio is not a walk-in shop — it is The Synthetic Cathedral: A safe space of silence where art is respected and creativity materialises on skin as living canvases.',
    'about.cta': 'Book a Consultation',
    'about.v1.title': 'Colour Curation', 'about.v1.sub': 'Extreme chromatic saturation, absolute fidelity to source aesthetics and vivid contrasts that guarantee longevity.',
    'about.v2.title': 'The Ritual', 'about.v2.sub': 'Each session is designed to be immersive. A curated private environment focused entirely on monumental work.',
    'about.v3.title': 'Presence', 'about.v3.sub': 'Based in Madrid, Spain. Accepting international proposals for full body curation (body suits).',
    'general.location': 'Madrid, Spain', 'general.booknow': 'Book Now',
    'general.viewwork': 'View Work', 'general.close': 'Close',
  },
  NL: {
    'nav.home': 'HOME', 'nav.about': 'OVER MIJ', 'nav.media': 'MEDIA',
    'nav.portfolio': 'PORTFOLIO', 'nav.contact': 'CONTACT', 'nav.faq': 'FAQ',
    'nav.seminarios': 'WORKSHOPS', 'nav.blog': 'BLOG', 'nav.cta': 'Consultatie',
    'hero.label': 'Anime · Biorealisme · Signatuurinkt',
    'hero.quote': '"Een convergentie tussen de technische obsessie voor levendige geek-esthetische kleuren en de absolute stilte van het tatoeageritueel."',
    'hero.cta.primary': 'Bekijk Portfolio', 'hero.cta.secondary': 'Sessie Boeken',
    'hero.scroll': 'SCROLL OM TE VERKENNEN',
    'home.pillars.title': 'De Drie Pijlers',
    'home.pillars.sub': 'Ultieme verzadiging en absolute contrasten op de huid.',
    'home.pillars.link': 'Volledig Werk Bekijken',
    'home.p1.title': 'Biorealisme', 'home.p1.sub': 'Precieze texturen en hyperdgedetailleerde portretten.',
    'home.p2.title': 'Anime & Vol Kleur', 'home.p2.sub': 'Extreme chromatische verzadiging en lijngetrouwheid.',
    'home.p3.title': 'Signatuur Blackwork', 'home.p3.sub': 'Hoog contrast, stevige lijn en diepe schaduwen.',
    'home.quote.text': '"Menselijke huid is geen blanco vel, het is een kathedraal die toewijding vereist. Wij brengen het neon in het donker."',
    'home.quote.author': 'Paula Angels',
    'home.process.title': 'Studioprotocol',
    'home.step1.title': 'Sfeer & Ontwerp', 'home.step1.sub': 'Uitgelezen muziek, originele visuele esthetiek en privacy. De geboorte van het unieke stuk.',
    'home.step2.title': 'Curatie', 'home.step2.sub': 'Aangepaste ontwerpen gericht op visuele levensduur en organische vloeibaarheid op de huid.',
    'home.step3.title': 'De Sessie', 'home.step3.sub': 'Onberispelijke techniek en klinische sterilisatie. Elite-apparatuur voor minimaal trauma.',
    'portfolio.title': 'Het Werk',
    'portfolio.subtitle': 'Huid, naald en het visuele testament van hen die door de Synthetische Kathedraal zijn gegaan.',
    'portfolio.filter.all': 'Alle Werken', 'portfolio.empty': 'Nog geen werken in dit ritueel.',
    'contact.title': 'Boek Je Sessie', 'contact.headline1': 'Laten We Iets', 'contact.headline2': 'Maken',
    'contact.body': 'Elke tatoeage is een samenwerking. Vertel me over je project en laten we iets maken dat je met trots voor het leven zult dragen.',
    'contact.name': 'Volledige Naam *', 'contact.email': 'E-mailadres *',
    'contact.instagram': 'Instagram (bijv. @jouw_gebruiker)', 'contact.phone': 'Telefoon / WhatsApp *',
    'contact.city': 'Woonplaats', 'contact.age': 'Leeftijd (Min. 18 jaar) *',
    'contact.source': 'Hoe vond je ons? *', 'contact.placement': 'Locatie Tatoeage *',
    'contact.concept': 'Beschrijf je idee, elementen, blackwork/kleur... *',
    'contact.refs': "Referentiefoto's (Max 2) *", 'contact.zone': 'Foto van lichaamszone (Max 1) *',
    'contact.consent': '«Ik geef toestemming dat het tatoeageproces en de tatoeage zelf worden gefotografeerd en getoond in het studioportfolio.»',
    'contact.submit': 'Boekingsverzoek Sturen',
    'about.label': 'Over de Artiest',
    'about.headline1': 'Het Scheppen', 'about.headline2': 'van Eeuwigheid',
    'about.p1': '"Mijn visie op tatoeëren overstijgt het simpele injecteren van inkt in de huid. Ik beschouw het als een overgangsritueel — een proces van lichamelijke architectuur."',
    'about.p2': 'Gespecialiseerd in Biorealisme, Anime-cultuur en Handtekening-blackwork, elk ontwerp is een samenwerking geboren uit technisch luisteren.',
    'about.p3': 'De studio is geen doorloopwinkel — het is The Synthetic Cathedral: Een veilige ruimte van stilte waar kunst wordt gerespecteerd.',
    'about.cta': 'Consultatie Boeken',
    'about.v1.title': 'Kleurcuratie', 'about.v1.sub': 'Extreme chromatische verzadiging, absolute trouw aan bronesthetiek en levendige contrasten die levensduur garanderen.',
    'about.v2.title': 'Het Ritueel', 'about.v2.sub': 'Elke sessie is ontworpen om meeslepend te zijn. Een gecureerde privéomgeving gericht op monumentaal werk.',
    'about.v3.title': 'Aanwezigheid', 'about.v3.sub': 'Gevestigd in Madrid, Spanje. Internationale voorstellen voor volledige lichaamscuratie (body suits) welkom.',
    'general.location': 'Madrid, Spanje', 'general.booknow': 'Nu Boeken',
    'general.viewwork': 'Werk Bekijken', 'general.close': 'Sluiten',
  },
  FR: {
    'nav.home': 'ACCUEIL', 'nav.about': 'À PROPOS', 'nav.media': 'MÉDIAS',
    'nav.portfolio': 'PORTFOLIO', 'nav.contact': 'CONTACT', 'nav.faq': 'FAQ',
    'nav.seminarios': 'ATELIERS', 'nav.blog': 'BLOG', 'nav.cta': 'Consultation',
    'hero.label': 'Anime · Réalisme · Encre Signature',
    'hero.quote': '"Une convergence entre l\'obsession technique pour la couleur vibrante de l\'esthétique geek et le silence absolu du rituel du tatouage."',
    'hero.cta.primary': 'Voir le Portfolio', 'hero.cta.secondary': 'Réserver une Séance',
    'hero.scroll': 'DÉFILER POUR EXPLORER',
    'home.pillars.title': 'Les Trois Piliers',
    'home.pillars.sub': 'Saturation suprême et contrastes absolus sur la peau.',
    'home.pillars.link': 'Voir le Travail Complet',
    'home.p1.title': 'Biorealisme', 'home.p1.sub': 'Textures précises et portraits hyper-détaillés.',
    'home.p2.title': 'Anime & Couleur Totale', 'home.p2.sub': 'Saturation chromatique extrême et fidélité à la ligne.',
    'home.p3.title': 'Blackwork Signature', 'home.p3.sub': 'Hauts contrastes, lignes solides et ombres profondes.',
    'home.quote.text': '"La peau humaine n\'est pas une page blanche, c\'est une cathédrale qui exige la dévotion. Nous apportons le néon dans l\'obscurité."',
    'home.quote.author': 'Paula Angels',
    'home.process.title': 'Protocole de Studio',
    'home.step1.title': 'Atmosphère & Design', 'home.step1.sub': 'Musique sélectionnée, esthétique visuelle personnelle et confidentialité. La naissance de la pièce unique.',
    'home.step2.title': 'Curation', 'home.step2.sub': 'Designs personnalisés axés sur la longévité visuelle et la fluidité organique sur la peau.',
    'home.step3.title': 'La Séance', 'home.step3.sub': 'Technique irréprochable et stérilisation clinique. Équipement d\'élite pour un traumatisme minimisé.',
    'portfolio.title': "L'Œuvre",
    'portfolio.subtitle': "Peau, aiguille et le testament visuel de ceux qui ont traversé La Cathédrale Synthétique.",
    'portfolio.filter.all': 'Toutes les Œuvres', 'portfolio.empty': "Pas encore d'œuvres dans ce rituel.",
    'contact.title': 'Réserver une Séance', 'contact.headline1': 'Créons Quelque', 'contact.headline2': 'Chose Ensemble',
    'contact.body': "Chaque tatouage est une collaboration. Parle-moi de ton projet et créons quelque chose que tu porteras avec fierté toute ta vie.",
    'contact.name': 'Nom Complet *', 'contact.email': 'Adresse E-mail *',
    'contact.instagram': 'Instagram (ex: @ton_utilisateur)', 'contact.phone': 'Téléphone / WhatsApp *',
    'contact.city': 'Ville de Résidence', 'contact.age': 'Âge (Min. 18 ans) *',
    'contact.source': 'Où nous avez-vous trouvés? *', 'contact.placement': 'Emplacement du Tatouage *',
    'contact.concept': 'Décris ton idée, éléments, blackwork/couleur... *',
    'contact.refs': 'Photos de Référence (Max 2) *', 'contact.zone': 'Photo de la zone à tatouer (Max 1) *',
    'contact.consent': "«J'autorise que le processus du tatouage et le tatouage lui-même soient photographiés et montrés dans le portfolio du studio.»",
    'contact.submit': 'Envoyer la Demande de Réservation',
    'about.label': "Sur l'Artiste",
    'about.headline1': 'Créer', 'about.headline2': "l'Éternité",
    'about.p1': '"Ma vision du tatouage transcende la simple injection d\'encre dans le derme. Je le considère comme un rite de passage — un processus d\'architecture corporelle."',
    'about.p2': 'Spécialisée en Biorealisme, Culture Anime et Blackwork Signature, chaque design est une collaboration née d\'une écoute technique et d\'une obsession pour la saturation maximale.',
    'about.p3': "Le studio n'est pas une boutique de passage — c'est The Synthetic Cathedral: Un espace sûr de silence où l'art est respecté et la créativité se matérialise.",
    'about.cta': 'Réserver une Consultation',
    'about.v1.title': 'Curation Couleur', 'about.v1.sub': 'Saturation chromatique extrême, fidélité absolue à l\'esthétique source et contrastes vifs garantissant la longévité.',
    'about.v2.title': 'Le Rituel', 'about.v2.sub': 'Chaque séance est conçue pour être immersive. Un environnement privé curé entièrement dédié à la création de l\'œuvre.',
    'about.v3.title': 'Présence', 'about.v3.sub': 'Basée à Madrid, Espagne. Acceptant des propositions internationales pour la curation de corps complets (body suits).',
    'general.location': 'Madrid, Espagne', 'general.booknow': 'Réserver Maintenant',
    'general.viewwork': 'Voir le Travail', 'general.close': 'Fermer',
  }
};

function applyLang(lang: Lang) {
  // 1. Translate text nodes (data-i18n)
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n!;
    const val = translations[lang]?.[key];
    if (val) el.textContent = val;
  });

  // 2. Translate placeholders (data-i18n-placeholder)
  document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[data-i18n-placeholder]').forEach(el => {
    const key = (el as HTMLElement).dataset.i18nPlaceholder!;
    const val = translations[lang]?.[key];
    if (val) el.placeholder = val;
  });

  // 3. Set lang attribute on <html>
  const langMap: Record<Lang, string> = { ES: 'es', EN: 'en', NL: 'nl', FR: 'fr' };
  document.documentElement.lang = langMap[lang];

  // 4. Update active state on ALL lang-btn elements
  document.querySelectorAll<HTMLElement>('.lang-btn').forEach(btn => {
    const isActive = btn.dataset.lang === lang;
    btn.classList.toggle('text-[#ffabf1]', isActive);
    btn.classList.toggle('border-white', isActive);
    btn.classList.toggle('bg-white/5', isActive);
    btn.classList.toggle('pointer-events-none', isActive);
    btn.classList.toggle('text-white/40', !isActive);
    btn.classList.toggle('border-transparent', !isActive);
  });

  // 5. Dispatch custom event so other components can react
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

function initI18n() {
  const saved = (localStorage.getItem('site_lang') as Lang) || 'ES';
  applyLang(saved);

  document.querySelectorAll<HTMLElement>('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang as Lang;
      if (!lang || !translations[lang]) return;
      localStorage.setItem('site_lang', lang);
      applyLang(lang);
    });
  });
}

// Run on initial load and after Astro page transitions
document.addEventListener('astro:page-load', initI18n);
initI18n();
