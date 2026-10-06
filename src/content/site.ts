/**
 * Single source of truth for all website copy.
 *
 * Copy is taken from the supplied "Web Content" document. Pages must read from
 * here rather than hard-coding text, so a future headless CMS can replace this
 * module without touching page components.
 *
 * CLAIMS NOTICE: every figure in `claims` is an UNVERIFIED placeholder from the
 * draft content. See LAUNCH_CHECKLIST.md — they must be approved and
 * substantiated by a named business owner before production launch.
 */

export const site = {
  name: "Mediaworks 365",
  legalName: "Mediaworks 365",
  tagline: "Amplifying Brands",
  description:
    "Mediaworks 365 blends creativity, technology, and data to deliver high-impact marketing — SEO, store branding, on-ground activations, event integration, digital branding and out-of-home campaigns.",
  // Set NEXT_PUBLIC_SITE_URL per environment (preview / production).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /**
   * Official contact details are not yet confirmed (see readiness plan, Priority B).
   * Values come from environment variables so nothing unapproved is published.
   * Components must render each item only when it is set.
   */
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "",
    address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS ?? "",
    hours: process.env.NEXT_PUBLIC_BUSINESS_HOURS ?? "",
  },
  social: [] as { label: string; href: string }[],
} as const;

export type NavItem = { label: string; href: string; children?: NavItem[] };

export const services = [
  {
    slug: "seo",
    name: "Search Engine Optimization",
    shortName: "SEO",
    icon: "search",
    summary: "Improve your search engine rankings and drive qualified organic traffic.",
    tagline: "Increase visibility, improve rankings, and attract qualified traffic.",
    powerTitle: "The Power of SEO",
    power:
      "Long-term SEO and content strategies build authority, trust, and sustainable visibility — so the customers already searching for what you offer find you first.",
    includesTitle: "Services Include",
    includes: [
      "SEO Audit",
      "Keyword Research",
      "On-Page SEO",
      "Technical SEO",
      "Local SEO",
      "Link Building",
      "SEO Reporting",
    ],
    processTitle: "How We Approach SEO",
    process: [
      { title: "Audit & Research", body: "Run a full SEO audit and keyword research to understand where you rank today and where your qualified traffic is." },
      { title: "On-Page & Technical", body: "Fix technical foundations, optimize on-page content, and strengthen local SEO signals." },
      { title: "Authority & Reporting", body: "Build quality links, track rankings and traffic, and report transparently on progress." },
    ],
  },
  {
    slug: "store-branding",
    name: "Store Branding",
    shortName: "Store Branding",
    icon: "store",
    summary:
      "Store window branding turns storefront glass into high-impact ad space — communicating your brand identity to stop foot traffic and turn passersby into paying visitors.",
    tagline:
      "Turn storefront glass into high-impact visual real estate — stopping foot traffic in its tracks and converting everyday passersby into loyal customers.",
    powerTitle: "The Power of Store Branding",
    power:
      "Store branding is about owning the exact spot where purchase decisions are made. For ethnic brands in foreign markets, strong visibility builds trust, sparks impulse buying, and deepens cultural ties. Don't just sit on the shelf — make your brand come alive.",
    processTitle: "Our Proven 3-Step Process",
    process: [
      { title: "Audit, Strategy & Site Selection", body: "Analyze target demographics, assess store footprint, study aisle competitors, and lock in high-foot-traffic retail locations." },
      { title: "Design, Material & Production", body: "Create high-visibility 2D/3D mockups (window vinyls, endcaps, illuminated signage) and produce them using durable, retail-grade substrates and LEDs." },
      { title: "Installation, Tracking & Optimization", body: "Coordinate seamless on-ground setup with store managers without disrupting operations, then track post-branding sales lift, foot-traffic conversion, and turnover rates." },
    ],
  },
  {
    slug: "on-ground-activations",
    name: "On-Ground Activations",
    shortName: "On-Ground Activations",
    icon: "users",
    summary:
      "Tactile, real-world branding designed to connect with consumers directly where they live, work, and shop.",
    tagline: "Immersive, real-world experiences designed to connect with consumers directly where they live, work, and play.",
    powerTitle: "The Power of On-Ground Activations",
    power:
      "On-ground activations drive immediate product trials by letting consumers test your product risk-free, eliminating purchase hesitation right at the point of sale. Positioned near retail environments, these live experiences accelerate impulse buying while humanizing your brand through direct representative engagement. Ultimately, face-to-face activations build deep trust, capture high-value customer data on the spot, and inspire organic social media sharing.",
    processTitle: "Step-by-Step Process of On-Ground Activation",
    process: [
      { title: "Strategy, Venue & Asset Planning", body: "Set KPIs and target demographics, secure venue permits at high-traffic locations, and design branded physical assets (booths, banners, promo gear)." },
      { title: "Staffing, Logistics & Live Execution", body: "Recruit and train brand ambassadors, manage inventory and supply logistics, deploy field teams on-ground, and run live product sampling or demonstrations." },
      { title: "Data Collection, Audit & ROI Analysis", body: "Capture customer feedback and leads on-site, document execution via photos and videos, and evaluate ROI against sampling volume, stock depletion, and direct sales lift." },
    ],
  },
  {
    slug: "event-integration",
    name: "Event Integration",
    shortName: "Event Integration",
    icon: "ticket",
    summary: "Seamlessly embed your brand into live events through interactive value rather than passive sponsorship.",
    tagline: "Elevate your presence beyond passive sponsorship by seamlessly embedding your brand into live events through interactive, memorable value.",
    powerTitle: "The Power of Event Integration",
    power:
      "Event integration turns passive sponsorship into an active brand experience by embedding your product directly into the event. By engaging a targeted audience through interactive touchpoints, it builds instant credibility, drives strong brand recall, and creates shareable moments that extend far beyond the venue.",
    processTitle: "Step-by-Step Process of Event Integration",
    process: [
      { title: "Alignment, Strategy & Partnership", body: "Identify high-value events matching your demographic, design an interactive brand concept (VIP lounges, sampling stations), and secure rights and exclusivity with organizers." },
      { title: "Production & On-Site Execution", body: "Fabricate high-impact physical and digital assets, deploy trained brand ambassadors on-ground, manage live engagements, and capture lead contact details." },
      { title: "Amplification & Lead Conversion", body: "Amplify real-time event content across social media channels and follow up with captured leads post-event to convert high-touch engagement into long-term sales." },
    ],
  },
  {
    slug: "digital-branding",
    name: "Digital Branding Solutions",
    shortName: "Digital Branding",
    icon: "monitor",
    summary: "A complete digital strategy and creative toolkit designed to maintain brand consistency across every digital screen.",
    tagline: "A unified creative strategy and digital toolkit engineered to maintain flawless brand consistency across every screen.",
    powerTitle: "The Power of Digital Branding Solutions",
    power:
      "Digital branding creates a unified, high-converting presence across web, search, and social platforms. By aligning visual identity and messaging across all digital touchpoints, it converts cold traffic into loyal customers and builds long-term brand authority.",
    processTitle: "Step-by-Step Process of Digital Branding",
    process: [
      { title: "Audit, Strategy & Brand Identity", body: "Analyze online presence, map buyer personas, set KPIs, and create digital-first brand guidelines (logos, UI systems, typography, tone of voice)." },
      { title: "Asset Creation & Platform Build", body: "Develop conversion-focused websites and landing pages, alongside targeted social media content, videos, and editorial assets for high audience engagement." },
      { title: "Traffic Drive & Performance Optimization", body: "Execute SEO and targeted paid campaigns (Google, Meta) while tracking analytics and running A/B tests to continuously optimize return on ad spend (ROAS)." },
    ],
  },
  {
    slug: "out-of-home",
    name: "Out-of-Home (OOH) Solutions",
    shortName: "Out-of-Home",
    icon: "billboard",
    summary: "Unskippable real-world advertising designed to connect with consumers wherever they go.",
    tagline: "Unskippable, high-visibility real-world advertising engineered to capture attention everywhere your audience goes.",
    powerTitle: "The Power of Out-of-Home Solutions",
    power:
      "Out-of-Home (OOH) advertising delivers unskippable, high-impact visibility in the physical world through billboards, transit wraps, and digital screens. By reaching consumers during their daily routines, OOH builds mass awareness, drives high brand recall, and boosts mobile search and store visits.",
    processTitle: "Step-by-Step Process of OOH",
    process: [
      { title: "Targeting & Creative Strategy", body: "Select high-density traffic sites and transit hubs, and design bold visual concepts tailored for billboards, digital screens, or transit." },
      { title: "Production, Permits & Launch", body: "Secure local permits, print large-scale graphics or program digital assets, and mount physical media or deploy dynamic digital ads." },
      { title: "Tracking & Performance Analysis", body: "Measure total foot and vehicle impressions, track QR code interactions, and analyze post-launch regional sales impact." },
    ],
  },
] as const;

export type Service = (typeof services)[number];
export type ServiceSlug = Service["slug"];
export type IconName =
  | Service["icon"]
  | "target"
  | "chart"
  | "sparkles"
  | "layers"
  | "brain"
  | "rocket"
  | "check";

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: services.map((s) => ({ label: s.shortName, href: `/services/${s.slug}` })),
  },
  { label: "Industries", href: "/industries" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact Us", href: "/contact" },
];

/** Conversion journeys. Each CTA maps to a distinct `type` on the contact form. */
export const ctas = {
  audit: { label: "Get Free Marketing Audit", href: "/contact?type=audit" },
  consultation: { label: "Book a Free Consultation", href: "/contact?type=consultation" },
  scheduleConsultation: { label: "Schedule Your Free Consultation", href: "/contact?type=consultation" },
  quote: { label: "Get a Free Quote", href: "/contact?type=quote" },
  contact: { label: "Contact Us", href: "/contact?type=contact" },
} as const;

export const inquiryTypes = [
  { value: "consultation", label: "Free Consultation" },
  { value: "audit", label: "Free Marketing Audit" },
  { value: "quote", label: "Free Quote" },
  { value: "contact", label: "General Inquiry" },
] as const;
export type InquiryType = (typeof inquiryTypes)[number]["value"];

/** UNVERIFIED — see file header. */
export const claims = {
  highlights: [
    { value: 500, suffix: "+", label: "Successful Campaigns" },
    { value: 200, suffix: "+", label: "Happy Clients" },
    { value: 10, suffix: "+", label: "Years of Industry Experience" },
  ],
  successStories: [
    { value: "350%", label: "Increase in website traffic" },
    { value: "5X", label: "Return on advertising investment" },
    { value: "Thousands", label: "Of qualified leads generated" },
    { value: "Higher", label: "Conversion rates across multiple industries" },
  ],
  portfolioImpact: [
    { metric: "Retail Activations Executed", value: 250, prefix: "", suffix: "+", detail: "Store outlets across the US" },
    { metric: "Live Product Samples Served", value: 120000, prefix: "", suffix: "+", detail: "Direct consumer interactions" },
    { metric: "OOH Campaign Impressions", value: 15, prefix: "", suffix: "M+", detail: "Total audience exposure" },
    { metric: "Average Client ROI", value: 4.2, prefix: "", suffix: "x", detail: "Return on campaign spend" },
  ],
} as const;

export const home = {
  // Alternate headlines from the brief, kept for stakeholder selection:
  //  - "Transforming Brands, Accelerating Impact"
  //  - "Fast-track your growth with high-performance, budget-optimized campaigns"
  hero: {
    eyebrow: "Marketing that never clocks out",
    title: "Accelerate Your Business.",
    titleAccent: "Anytime, Anywhere, 365 Days a Year.",
    subtitle: "At Mediaworks 365, we build high-velocity campaigns that scale your business efficiently.",
  },
  whoWeAre: {
    title: "Who We Are",
    body: "Mediaworks 365 blends creativity, technology, and data to deliver high-impact digital marketing strategies that grow your business — every single day.",
  },
  trustedBy: {
    title: "Trusted By",
    body: "We partner with startups, small businesses, and established enterprises to create impactful marketing strategies that deliver real business results.",
  },
  highlightBadges: ["Certified Marketing Professionals", "ROI-Focused Strategies"],
  servicesIntro: {
    title: "Our Services",
    body: "From search rankings to storefront glass, we put your brand where decisions are made — online and in the real world.",
  },
  whyChooseUs: {
    title: "Why Choose Us",
    items: [
      "Customized Marketing Strategies",
      "Experienced Digital Marketing Experts",
      "Transparent Reporting",
      "Dedicated Account Managers",
      "Data-Driven Decisions",
      "Affordable Pricing",
      "Proven Results",
      "Long-Term Partnerships",
    ],
  },
  process: {
    title: "Our Process",
    steps: [
      { title: "Discover", body: "We learn about your business, industry, and goals." },
      { title: "Strategize", body: "Our team creates a personalized marketing roadmap." },
      { title: "Execute", body: "We implement high-performing marketing campaigns." },
      { title: "Optimize", body: "We monitor, analyze, and improve campaign performance." },
      { title: "Grow", body: "Scale your business with measurable, sustainable growth." },
    ],
  },
  successStories: { title: "Success Stories" },
  finalCta: {
    title: "Ready to Grow Your Business?",
    body: "Let's create a marketing strategy tailored to your goals.",
  },
} as const;

/**
 * Client logos require written permission before display (readiness plan).
 * Add entries here as { name, src } once rights are cleared; the Trusted By
 * section renders a neutral audience strip while this is empty.
 */
export const clientLogos: { name: string; src: string }[] = [];

export const about = {
  hero: {
    eyebrow: "Who We Are",
    title: "Strategy First, Results Always…",
    body: [
      "Every successful brand has a strategy behind its growth.",
      "At Mediaworks 365, we combine business intelligence, customer insights, technology, and creative execution to help organizations outperform competitors and achieve sustainable growth.",
      "We don't simply execute marketing campaigns — we solve business challenges, uncover growth opportunities, and create systems that deliver measurable results.",
    ],
  },
  mission: {
    title: "Our Mission",
    body: "To empower businesses with effective digital marketing strategies that drive sustainable growth and long-term success.",
  },
  vision: {
    title: "Our Vision",
    body: "To become a trusted marketing partner recognized for innovation, transparency, and exceptional client results.",
  },
  deliver: {
    title: "What We Deliver",
    intro: "Our work is built around business outcomes — not marketing activities.",
    lead: "We help organizations:",
    items: [
      "Increase qualified pipeline",
      "Improve customer acquisition",
      "Maximize marketing ROI",
      "Strengthen brand authority",
      "Increase conversion rates",
      "Scale revenue predictably",
      "Build long-term competitive advantage",
    ],
  },
  experts: {
    title: "Meet Our Experts",
    body: "A cross-functional team that plans, builds, and measures every campaign under one roof.",
    // Named profiles + photos pending (names, titles, bios, photo consent).
    roles: [
      "SEO Specialists",
      "PPC Managers",
      "Social Media Experts",
      "Content Strategists",
      "Web Developers",
      "Graphic Designers",
      "Brand Consultants",
      "Marketing Analysts",
    ],
  },
  expertise: {
    title: "Our Expertise",
    items: [
      { icon: "target", title: "Growth Strategy", body: "Every engagement begins with a comprehensive understanding of your business, market, customers, and opportunities." },
      { icon: "rocket", title: "Performance Marketing", body: "Integrated paid media strategies designed to generate measurable business outcomes — not just impressions and clicks." },
      { icon: "sparkles", title: "Organic Growth", body: "Long-term SEO and content strategies that build authority, trust, and sustainable visibility." },
      { icon: "monitor", title: "Digital Experiences", body: "Conversion-focused websites designed to create exceptional user experiences while driving measurable business performance." },
      { icon: "layers", title: "Brand Strategy", body: "Creating memorable brands that connect emotionally, communicate clearly, and differentiate in competitive markets." },
      { icon: "chart", title: "Marketing Intelligence", body: "Real-time analytics and business insights that transform marketing data into strategic decisions." },
    ],
  },
} as const;

export const industries = {
  title: "Industries We Serve",
  intro: "We proudly serve businesses in:",
  items: [
    "Healthcare",
    "Real Estate",
    "Legal",
    "Construction",
    "Home Services",
    "Restaurants",
    "Retail",
    "E-commerce",
    "Automotive",
    "Education",
    "Financial Services",
    "Technology",
    "Manufacturing",
    "Hospitality",
  ],
} as const;

export const portfolio = {
  title: "Our Work",
  intro:
    "Explore how Mediaworks 365 solves tough industry challenges with culturally relevant design and targeted marketing — building authentic connections between brands and diverse communities worldwide.",
  categories: ["Store Activations", "Events", "On Ground Activities"] as const,
  /**
   * Capability showcases. These describe the type of work delivered and carry
   * no client names or results. Replace with rights-cleared case studies
   * (client permission, photography, dates, results) before launch.
   */
  items: [
    { title: "Storefront Window Takeover", category: "Store Activations", service: "store-branding", body: "Full-glass window vinyls and illuminated signage that turn a storefront into a high-traffic billboard." },
    { title: "In-Aisle Endcap Branding", category: "Store Activations", service: "store-branding", body: "Retail-grade endcaps and shelf branding that own the moment of purchase decision." },
    { title: "Grocery Chain Rollout", category: "Store Activations", service: "store-branding", body: "Coordinated multi-outlet installation scheduled around store operations, with post-install tracking." },
    { title: "Festival Sampling Lounge", category: "Events", service: "event-integration", body: "An interactive VIP lounge and sampling station embedded into a live event audience." },
    { title: "Cultural Event Partnership", category: "Events", service: "event-integration", body: "Brand integration with community events, amplified in real time across social channels." },
    { title: "Trade Show Experience", category: "Events", service: "event-integration", body: "Lead-capturing booth experience with trained brand ambassadors and post-event follow-up." },
    { title: "Street-Level Product Trial", category: "On Ground Activities", service: "on-ground-activations", body: "Branded booths near retail locations driving risk-free product trial and impulse purchase." },
    { title: "Mall Activation Tour", category: "On Ground Activities", service: "on-ground-activations", body: "Multi-week field team deployment with live demonstrations and on-site data capture." },
    { title: "Campus Ambassador Program", category: "On Ground Activities", service: "on-ground-activations", body: "Trained ambassadors running sampling and engagement where the audience lives and learns." },
  ],
  // Shown under the gallery until rights-cleared case studies replace the showcases.
  showcaseNote: "Showcases illustrate the types of work we deliver. Detailed client case studies are coming soon.",
  impactTitle: "Portfolio Impact Summary",
} as const;

export const results = {
  title: "Results",
  intro: "We measure success through meaningful business outcomes.",
  outcomes: [
    "Higher revenue.",
    "Better customer acquisition.",
    "Stronger market positioning.",
    "Greater customer lifetime value.",
    "Sustainable competitive advantage.",
  ],
  closing: "Because marketing should be an investment — not an expense.",
} as const;

export const contactPage = {
  eyebrow: "Contact",
  title: "Ready to Build What's Next?",
  body: [
    "Whether you're launching a new brand, entering new markets, or accelerating growth, we're ready to help you move forward with confidence.",
    "Let's create the strategy that drives your next stage of growth.",
  ],
  submitLabel: "Send Message",
  successTitle: "Thanks — your message is on its way.",
  successBody: "A member of our team will get back to you shortly.",
} as const;
