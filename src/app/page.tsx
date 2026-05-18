"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  ArrowRight,
  Mail,
  Phone,
  ChevronDown,
  Menu,
  X,
  Linkedin,
  Instagram,
  Twitter,
  Palette,
  Layout,
  Smartphone,
  Figma,
  Globe,
  Star,
  Calendar,
  Briefcase,
  GraduationCap,
  Clock,
  ArrowUpRight,
  Sparkles,
  Monitor,
  PenTool,
  Layers,
  Dribbble,
  BarChart3,
  ShoppingCart,
  HeartPulse,
  Rocket,
  Megaphone,
  BadgeCheck,
  Download,
  SwatchBook,
  Share2,
} from "lucide-react";

/* ─── Accent Gradient ─── */
const ACCENT = "#C8FF00";
const ACCENT_GRADIENT = "linear-gradient(135deg, #C8FF00, #6B8E23)";
const ACCENT_GRADIENT_CSS = "linear-gradient(135deg, #C8FF00, #9ACD00, #6B8E23)";

/* ─── Navigation Items (shown in hamburger menu) ─── */
const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

/* ─── Skills from Resume ─── */
const SKILLS = [
  { name: "Visual Design", icon: Palette, level: 90 },
  { name: "UI/UX Design", icon: Layout, level: 60 },
  { name: "Brand Identity", icon: Layers, level: 95 },
  { name: "Web Design", icon: Globe, level: 45 },
  { name: "Mobile Design", icon: Smartphone, level: 45 },
  { name: "Design Systems", icon: Figma, level: 90 },
  { name: "Illustration", icon: PenTool, level: 95 },
];

/* ─── Portfolio ─── */
const PORTFOLIO_CATEGORIES = ["All", "UI/UX", "Social Media", "Branding"] as const;

const PORTFOLIO_CATEGORY_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  "UI/UX": Layout,
  "Social Media": Share2,
  "Branding": SwatchBook,
};

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "SaaS Analytics Dashboard",
    category: "UI/UX" as const,
    intro: "Data-driven dashboard for B2B SaaS with conversion-focused layouts",
    description:
      "A comprehensive analytics dashboard for a B2B SaaS platform. Designed with data clarity, minimal cognitive load, and conversion-focused layouts that increased user engagement by 40%.",
    icon: BarChart3,
    tags: ["Dashboard", "SaaS", "Data Viz"],
    year: "2025",
    image: "/portfolio/saas-dashboard.png",
  },
  {
    id: 2,
    title: "Social Media Campaign — Luxora",
    category: "Social Media" as const,
    intro: "Luxury fashion brand design system across all social touchpoints",
    description:
      "Complete social media design system for a luxury fashion brand. Instagram templates, story designs, and ad creatives that unified the brand across all touchpoints.",
    icon: Megaphone,
    tags: ["Instagram", "Templates", "Fashion"],
    year: "2025",
    image: "/portfolio/social-luxora.png",
  },
  {
    id: 3,
    title: "NovaTech Brand Identity",
    category: "Branding" as const,
    intro: "Full brand identity system for an AI startup from logo to guidelines",
    description:
      "Full brand identity system for an AI startup including logo, color palette, typography, business cards, and comprehensive brand guidelines document.",
    icon: BadgeCheck,
    tags: ["Logo", "Guidelines", "AI Startup"],
    year: "2024",
    image: "/portfolio/novatech-brand.png",
  },
  {
    id: 4,
    title: "E-Commerce Redesign — Velora",
    category: "UI/UX" as const,
    intro: "Mobile-first e-commerce redesign boosting conversions by 28%",
    description:
      "Complete e-commerce redesign focusing on checkout flow optimization, product page hierarchy, and mobile-first experience that boosted conversion rates by 28%.",
    icon: ShoppingCart,
    tags: ["E-Commerce", "Mobile", "Conversion"],
    year: "2024",
    image: "/portfolio/ecom-velora.png",
  },
  {
    id: 5,
    title: "HealthTrack App Design",
    category: "UI/UX" as const,
    intro: "Dark-mode fitness app with onboarding flow and data visualization",
    description:
      "Health and fitness tracking app with dark mode interface, onboarding flow, activity dashboard, and data visualization. Designed for clarity and motivation.",
    icon: HeartPulse,
    tags: ["Mobile App", "Health", "Dark Mode"],
    year: "2024",
    image: "/portfolio/healthtrack-app.png",
  },
  {
    id: 6,
    title: "AIVerse Landing Page",
    category: "Branding" as const,
    intro: "High-conversion AI startup landing page with 15% conversion rate",
    description:
      "High-conversion landing page for an AI startup featuring bold typography, structured feature cards, and strategic CTA placement that achieved 15% conversion rate.",
    icon: Rocket,
    tags: ["Landing Page", "AI", "SaaS"],
    year: "2024",
    image: "/portfolio/aiverse-landing.png",
  },
];

/* ─── Experience from actual resume PDF ─── */
const EXPERIENCE = [
  {
    period: "Mar 2025 — Present",
    role: "Lead Creative Designer",
    company: "Noundesign — Digital Agency (Remote)",
    highlights: [
      "Leading creative direction for digital agency projects",
      "Driving brand-aligned visual strategies and design systems",
      "Delivering premium UI/UX solutions for international clients",
    ],
    type: "freelance" as const,
  },
  {
    period: "Dec 2023 — Aug 2025",
    role: "Graphic & UI Designer",
    company: "Alchemy Software Limited, Chattogram",
    highlights: [
      "Designed interfaces and visual assets for software products",
      "Collaborated with cross-functional teams on pixel-perfect designs",
      "Translated business requirements into user-centered solutions",
    ],
    type: "agency" as const,
  },
  {
    period: "Nov 2023 — May 2024",
    role: "UI & Graphics Designer",
    company: "Articmaze — Shopify Agency (Remote)",
    highlights: [
      "Crafted e-commerce UI designs and Shopify storefront visuals",
      "Focused on conversion-optimized layouts for online stores",
      "Built cohesive visual systems across brand touchpoints",
    ],
    type: "freelance" as const,
  },
  {
    period: "Sep 2019 — Jan 2022",
    role: "Graphic & UI Designer",
    company: "ChangetechBD Limited, Chattogram",
    highlights: [
      "Delivered comprehensive UI, brand identity, and marketing design",
      "Built strong foundation in professional design workflows",
      "Managed client communication and project delivery",
    ],
    type: "agency" as const,
  },
  {
    period: "Feb 2022 — Jun 2022",
    role: "UI Designer",
    company: "SolveXmedia — Remote",
    highlights: [
      "Designed user interfaces for web and mobile applications",
      "Focused on clean visual hierarchy and intuitive navigation",
      "Maintained consistent design language across projects",
    ],
    type: "freelance" as const,
  },
  {
    period: "Jun 2022 — Dec 2023",
    role: "Digital Promotional Officer — Graphics",
    company: "Chattagram Metropolitan Hashpatal Limited",
    highlights: [
      "Created digital promotional materials for healthcare sector",
      "Developed information design with focus on accessibility",
      "Produced visual communication assets for public outreach",
    ],
    type: "hospital" as const,
  },
];

/* ─── Education from resume ─── */
const EDUCATION = [
  {
    degree: "B.Sc in Computer Science & Engineering",
    institution: "East Delta University, Chattogram",
    period: "2020 — Present (Final Semester)",
    detail: "CSE — Professional Program",
  },
  {
    degree: "Diploma in Computer Technology",
    institution: "National Institute of Technology (NIT), Chattogram",
    period: "2014 — 2018",
    detail: "GPA: 3.21 / 4.00 — BTEB",
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Wazedia High School, Chattogram",
    period: "2012 — 2014",
    detail: "Business Studies — GPA: 4.06 / 5.00",
  },
];

/* ─── Custom Brand Icon Components ─── */
function BehanceIcon({ size = 18, className = "", style }: { size?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size * 57 / 90} viewBox="0 0 90 57" fill="currentColor" className={className} style={style}>
      <path d="M26.179 0C28.7753 0 31.1767 0.203571 33.3708 0.806142C35.5689 1.20921 37.3689 2.01536 38.9658 3.021C40.5666 4.028 41.7653 5.43807 42.5617 7.25121C43.3621 9.063 43.7643 11.2819 43.7643 13.6963C43.7643 16.5178 43.163 18.9321 41.7653 20.7439C40.5666 22.5598 38.5676 24.168 36.1703 25.3772C39.5671 26.3869 42.1635 28.1987 43.7643 30.6131C45.3652 33.0274 46.3607 36.0525 46.3607 39.4766C46.3607 42.2981 45.7594 44.7124 44.7598 46.7278C43.7643 48.7431 42.1635 50.5549 40.3635 51.7641C38.4074 53.0588 36.2463 54.0114 33.9721 54.5815C31.5749 55.1882 29.1776 55.5913 26.7803 55.5913H0V0H26.179ZM24.5781 22.5557C26.7763 22.5557 28.5762 21.9531 29.974 20.9475C31.3717 19.9418 31.973 18.126 31.973 15.9111C31.973 14.7019 31.7699 13.4927 31.3717 12.6906C30.9735 11.8886 30.3722 11.2779 29.5758 10.6753C28.7615 10.217 27.8857 9.87835 26.9754 9.66964C25.9758 9.46607 24.9803 9.46607 23.7776 9.46607H12.1895V22.5598L24.5781 22.5557ZM25.1794 46.3247C26.3781 46.3247 27.5767 46.1211 28.5762 45.9216C29.5758 45.718 30.5753 45.3191 31.3717 44.7124C32.1827 44.1194 32.8632 43.3655 33.3708 42.4976C33.769 41.4919 34.1712 40.2827 34.1712 38.874C34.1712 36.0525 33.3708 34.0371 31.7739 32.6284C30.1731 31.4192 27.9749 30.8166 25.3785 30.8166H12.1895V46.3288L25.1794 46.3247ZM63.747 46.1211C65.3452 47.7334 67.7424 48.5395 70.9388 48.5395C73.137 48.5395 75.136 47.937 76.7329 46.9313C78.3338 45.7208 79.3333 44.5116 79.7315 43.3037H89.5237C87.9228 48.1365 85.5256 51.5606 82.3319 53.7754C79.1301 55.7908 75.3351 57 70.7397 57C67.7999 57.0044 64.8852 56.4575 62.1461 55.3877C59.6803 54.4662 57.4823 52.9438 55.7507 50.958C53.891 49.1069 52.5187 46.8225 51.7566 44.3093C50.7571 41.6914 50.3548 38.874 50.3548 35.6494C50.3548 32.6284 50.7571 29.811 51.7566 27.189C52.7154 24.6631 54.1391 22.3401 55.9538 20.3408C57.7498 18.5291 59.9479 16.9209 62.3452 15.9111C65.0138 14.8375 67.8641 14.2901 70.7397 14.2989C74.1365 14.2989 77.1351 14.9055 79.7315 16.3142C82.3319 17.7229 84.3269 19.3352 85.9237 21.7536C87.5246 23.9685 88.7273 26.5864 89.5237 29.4079C89.9219 32.2253 90.121 35.0468 89.9219 38.2673H60.9475C60.9475 41.4919 62.1461 44.5129 63.747 46.1252M76.3347 24.9782C74.9369 23.5695 72.7388 22.7633 70.1383 22.7633C68.6136 22.7404 67.1058 23.0854 65.742 23.769C64.5434 24.3756 63.747 25.1818 62.9466 25.9879C62.2064 26.7634 61.7189 27.7459 61.5488 28.8053C61.3457 29.8151 61.1466 30.6171 61.1466 31.4233H79.1301C78.7319 28.4023 77.7324 26.391 76.3347 24.9782ZM58.7493 3.82714H81.1292V9.26657H58.7534L58.7493 3.82714Z" />
    </svg>
  );
}

function FiverrIcon({ size = 18, className = "", style }: { size?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 81 81" fill="currentColor" className={className} style={style}>
      <path d="M40.5 0C62.8682 0 81 18.1319 81 40.5C81 62.8682 62.8682 81 40.5 81C18.1319 81 0 62.8682 0 40.5C0 18.1319 18.1319 0 40.5 0ZM39.6617 15.3252C32.1975 15.3252 27.1634 20.0111 27.1634 26.7786V29.3868H21.2625V38.0619H27.1634V61.3251H37.4018V38.0619H47.3V61.3251H57.5384V29.3868H37.4018V27.4752C37.4018 25.3935 38.9691 24.0044 41.225 24.0044H47.3V15.3252H39.6617Z" />
    </svg>
  );
}

function UpworkIcon({ size = 18, className = "", style }: { size?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size * 50 / 81} viewBox="0 0 81 50" fill="currentColor" className={className} style={style}>
      <path d="M62.4995 29.927C56.1344 29.927 51.9331 25.0315 50.7563 23.1437C52.2621 11.1503 56.6785 7.3622 62.4995 7.3622C68.2571 7.3622 72.7368 11.9431 72.7368 18.6509C72.7368 25.3587 68.2571 29.9396 62.4995 29.9396V29.927ZM62.4995 0C52.1356 0 46.3273 6.72036 44.6569 13.6421C42.7714 10.1183 41.3795 5.39894 40.2912 1.01938H25.9666V18.7642C25.9666 25.1951 23.0181 29.9648 17.2604 29.9648C11.5027 29.9648 8.19997 25.2077 8.19997 18.7642L8.26324 1.01938H0V18.7642C0 23.9366 1.68302 28.6308 4.75801 31.9909C7.92157 35.4518 12.2493 37.2514 17.2604 37.2514C27.232 37.2514 34.1918 29.6501 34.1918 18.7642V6.83363C35.2295 10.7601 37.7097 18.2985 42.4551 24.9056L38.0261 50H46.4285L49.3517 32.2175C50.3134 33.0103 51.3384 33.7277 52.414 34.3569C55.2232 36.1188 58.4501 37.113 61.7655 37.2263C61.7655 37.2263 62.2717 37.2514 62.5374 37.2514C72.8127 37.2514 81 29.3355 81 18.6509C81 7.96627 72.8 0.0125852 62.5248 0.0125852L62.4995 0Z" />
    </svg>
  );
}

function FlickrIcon({ size = 18, className = "", style }: { size?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <circle cx="7.5" cy="12" r="4.5" fill="currentColor" opacity="1" />
      <circle cx="16.5" cy="12" r="4.5" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

/* ─── Social links with real URLs ─── */
const SOCIAL_LINKS = [
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/shbappy/" },
  { name: "Behance", icon: BehanceIcon, href: "https://www.behance.net/shbappy" },
  { name: "Dribbble", icon: Dribbble, href: "https://dribbble.com/shbappy" },
  { name: "Upwork", icon: UpworkIcon, href: "#" },
  { name: "Fiverr", icon: FiverrIcon, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "X", icon: Twitter, href: "#" },
];

/* ─── Key Skills from resume ─── */
const KEY_TOOLS = [
  "Figma", "Adobe XD", "Balsamiq", "Adobe Illustrator", "Adobe Photoshop",
  "InDesign", "Canva", "HTML5", "CSS3", "Bootstrap 4",
];

/* ─── Portfolio Platform Links ─── */
const PORTFOLIO_PLATFORMS = [
  { name: "Figma", icon: Figma, href: "https://www.figma.com/design/PVJBstSUUY1V3BR70jbwAV/Portfolios---SH-Bappy?m=auto&t=WhG3kUdmS1yfPx7O-6" },
  { name: "Behance", icon: BehanceIcon, href: "https://www.behance.net/shbappy" },
  { name: "Dribbble", icon: Dribbble, href: "https://dribbble.com/shbappy" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/shbappy/" },
  { name: "Upwork", icon: UpworkIcon, href: "#" },
  { name: "Flickr", icon: FlickrIcon, href: "https://www.flickr.com/photos/shbappy/" },
];

/* ─── Skill Groups for Resume Modal ─── */
const SKILL_GROUPS = [
  { label: "UI/UX Design", tags: ["User Research", "Wireframing", "Prototyping", "Usability Testing"] },
  { label: "Visual Design", tags: ["Typography", "Color Theory", "Layout Systems", "Icon Design"] },
  { label: "Brand Identity", tags: ["Logo Design", "Brand Guidelines", "Visual Systems"] },
  { label: "Key Tools", tags: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "InDesign", "Canva"] },
];

/* ─── Design Notes ─── */
const DESIGN_NOTES = [
  {
    title: "The Psychology of Landing Page Conversion",
    excerpt:
      "Understanding cognitive load, visual hierarchy, and the strategic placement of CTAs can transform a good landing page into a conversion machine.",
    date: "May 2025",
    readTime: "6 min",
    topic: "Landing Page Psychology",
  },
  {
    title: "Building Design Systems That Scale",
    excerpt:
      "A design system is more than a component library. It is a shared language that enables teams to build consistent, maintainable interfaces at scale.",
    date: "Apr 2025",
    readTime: "8 min",
    topic: "Design Systems",
  },
  {
    title: "Visual Hierarchy in Startup Interfaces",
    excerpt:
      "Startups face a unique challenge: communicating complex value propositions in seconds. Visual hierarchy is the tool that makes this possible.",
    date: "Mar 2025",
    readTime: "5 min",
    topic: "Startup UX",
  },
];

/* ─── Hook: Intersection Observer (one-shot, prevents repeated triggers) ─── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const triggeredRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggeredRef.current) {
          triggeredRef.current = true;
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ─── CountUp Animation Hook ─── */
function useCountUp(target: number, inView: boolean, duration = 1500) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();
    const ease = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t); // easeOutExpo

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = ease(progress);
      setCount(Math.round(easedProgress * target));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, target, duration]);

  return count;
}

/* ─── Hook: Reduced Motion Preference ─── */
function useReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

/* ─── Rotating Hero Phrases ─── */
const ROTATING_PHRASES = [
  "digital products",
  "visual elements",
  "brand marketing",
  "social media design",
];

function RotatingWord() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <span
        style={{
          background: ACCENT_GRADIENT_CSS,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {ROTATING_PHRASES[0]}
      </span>
    );
  }

  const TOTAL_DURATION = 12; // seconds for full cycle
  const DELAY_PER_WORD = 3; // seconds

  return (
    <span className="relative inline-block whitespace-nowrap" aria-live="polite">
      {/* Invisible spacer reserves width for longest phrase */}
      <span className="invisible" aria-hidden="true">
        {ROTATING_PHRASES.reduce((a, b) => a.length > b.length ? a : b)}
      </span>
      {/* Animated words - absolutely positioned over the spacer */}
      {ROTATING_PHRASES.map((phrase, i) => (
        <span
          key={phrase}
          className="absolute inset-0 whitespace-nowrap"
          style={{
            background: ACCENT_GRADIENT_CSS,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            opacity: 0,
            visibility: 'hidden',
            animation: `heroWordCycle ${TOTAL_DURATION}s cubic-bezier(0.25, 0.1, 0.25, 1) ${i * DELAY_PER_WORD}s infinite backwards`,
            willChange: 'opacity, transform',
          }}
        >
          {phrase}
        </span>
      ))}
    </span>
  );
}

/* ═══════════════════════════════════════════
   STATS SECTION — Premium SaaS-style stats with count-up
   Luxury motion: thinner numbers, gradient dividers, extended easing
   ═══════════════════════════════════════════ */
function StatsSection() {
  const { ref, inView } = useInView(0.15);

  const stats = [
    { number: 5, suffix: "+", label: "Years Experience with Graphics" },
    { number: 2, suffix: "+", label: "Years Experience with UIUX" },
    { number: 6, suffix: "+", label: "Company Served" },
    { number: 500, suffix: "+", label: "Projects Completed" },
    { number: 100, suffix: "+", label: "Happy Clients" },
  ];

  return (
    <section
      ref={ref}
      className="relative py-16 sm:py-24 md:py-28 bg-background border-y border-border"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Mobile: 2-column grid for compact layout; Desktop: flex row */}
        <div className="grid grid-cols-2 md:flex md:flex-row items-stretch justify-center gap-0">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-stretch min-w-0">
              {/* Desktop gradient divider — vertical */}
              {i > 0 && (
                <div
                  className="hidden md:flex items-center px-6 lg:px-8"
                  aria-hidden="true"
                >
                  <div
                    className="w-px h-14 lg:h-16 stat-divider-v"
                    style={{
                      background: `linear-gradient(to bottom, transparent, ${ACCENT}20, transparent)`,
                    }}
                  />
                </div>
              )}
              <StatCard stat={stat} inView={inView} delay={i * 180} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  stat,
  inView,
  delay,
}: {
  stat: { number: number; suffix: string; label: string };
  inView: boolean;
  delay: number;
}) {
  const count = useCountUp(stat.number, inView, 2800);

  return (
    <div
      className="text-center flex-1"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 500ms cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}ms, transform 500ms cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      <div
        className="text-accent-ui text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-light mb-4 tracking-tight tabular-nums"
        style={{
          fontFamily: "var(--font-heading)",
        }}
      >
        {count}<span className="font-extralight">{stat.suffix}</span>
      </div>
      <div className="text-[11px] sm:text-[12px] md:text-[13px] tracking-[0.04em] font-semibold leading-snug text-foreground/60">
        {stat.label}
      </div>
    </div>
  );
}

/* ─── Section Wrapper with alternating backgrounds ─── */
function Section({
  id,
  children,
  className = "",
  dark = false,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  const { ref, inView } = useInView(0.08);
  return (
    <section
      id={id}
      ref={ref}
      className={`py-28 md:py-36 ${
        dark ? "bg-background" : "bg-card"
      } ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 500ms cubic-bezier(0.25, 0.1, 0.25, 1), transform 500ms cubic-bezier(0.25, 0.1, 0.25, 1)",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </section>
  );
}

/* ─── Section Heading ─── */
function SectionHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10 md:mb-16 lg:mb-20">
      <div className="flex items-center gap-2 mb-4">
        <span
          className="inline-block w-5 h-[3px] rounded-sm flex-shrink-0"
          style={{ backgroundColor: "var(--accent-ui)" }}
        />
        <span
          className="text-accent-ui text-[11px] font-semibold tracking-[0.25em] uppercase"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {label}
        </span>
      </div>
      <h2
        className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-[1.15]"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-muted-foreground max-w-lg text-[15px] leading-[1.75]">
          {description}
        </p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   SIDENAV — Fixed right-side vertical navigation (Desktop only)
   ═══════════════════════════════════════════ */
function SideNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const mountedRef = useRef(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    mountedRef.current = true;
    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  if (!visible) return null;

  return (
    <nav
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-5"
      aria-label="Section navigation"
    >
      {NAV_ITEMS.map((item, i) => {
        const sectionId = item.href.replace("#", "");
        const isActive = activeSection === sectionId;

        return (
          <a
            key={item.href}
            href={item.href}
            className="group flex items-center gap-2.5 transition-all duration-300"
            style={{
              animation: `slideIn 350ms cubic-bezier(0.25, 0.1, 0.25, 1) ${0.5 + i * 0.06}s both`,
              transform: "translateX(0)",
            }}
          >
            <span
              className="text-[12px] font-normal transition-all duration-300 translate-x-2 group-hover:translate-x-0 px-2.5 py-1 rounded-full sidenav-active-bg"
              style={{
                color: isActive ? "var(--accent-ui)" : "var(--muted-foreground)",
                fontWeight: isActive ? 600 : 400,
                fontSize: isActive ? "13px" : "12px",
                background: isActive ? "rgba(200,255,0,0.06)" : "transparent",
              }}
            >
              {item.label}
            </span>
            <span
              className="block rounded-full transition-all duration-300 sidenav-active-glow"
              style={{
                width: isActive ? "6px" : "4px",
                height: isActive ? "6px" : "4px",
                backgroundColor: isActive ? "var(--accent-ui)" : "var(--muted-foreground)",
                boxShadow: isActive ? "0 0 8px rgba(200,255,0,0.25)" : "none",
              }}
            />
          </a>
        );
      })}
    </nav>
  );
}

/* ─── Theme Toggle — Stroke-based minimal icon matching design system ─── */
function ThemeToggle() {
  const [dark, setDark] = useState(true); // Always start as dark (matches SSR)

  useEffect(() => {
    // After mount, apply the saved theme from localStorage
    const saved = localStorage.getItem("bappy360-theme");
    if (saved === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      // Use microtask to avoid synchronous setState in effect
      queueMicrotask(() => setDark(false));
    }
  }, []);

  const toggle = () => {
    setDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
        localStorage.setItem("bappy360-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
        localStorage.setItem("bappy360-theme", "light");
      }
      return next;
    });
  };

  return (
    <button
      onClick={toggle}
      className="relative w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 flex-shrink-0"
      style={{
        background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
        border: `1px solid var(--border)`,
      }}
      aria-label="Toggle theme"
    >
      {/* Moon icon — dark mode active */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--accent-ui)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-all duration-300"
        style={{
          opacity: dark ? 1 : 0,
          position: 'absolute',
          transform: dark ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0.5)',
        }}
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
      {/* Sun icon — light mode active */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--accent-ui)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-all duration-300"
        style={{
          opacity: dark ? 0 : 1,
          position: 'absolute',
          transform: dark ? 'rotate(90deg) scale(0.5)' : 'rotate(0deg) scale(1)',
        }}
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    </button>
  );
}

/* ═══════════════════════════════════════════
   NAVBAR — Bottom Floating Navigation
   Desktop: [Logo] ... [Nav Items Pill] ... [Let's Talk + Toggle]
   Mobile: Compact bottom bar + Hamburger overlay
   ═══════════════════════════════════════════ */
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  // Track active section
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  if (!visible) return null;

  const glassStyle: React.CSSProperties = {
    background: "rgba(16, 16, 16, 0.88)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    border: "1px solid rgba(255,255,255,0.10)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
  };

  return (
    <>
      {/* ═══ Desktop Bottom Floating Nav ═══ */}
      <div
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 hidden lg:flex items-center gap-3 navbar-fade-in"
        style={{ animationDelay: "0.4s" }}
      >
        {/* Left — Logo Container */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 px-5 py-3 rounded-full transition-all duration-300 hover:scale-[1.03]"
          style={glassStyle}
        >
          <svg viewBox="0 0 783 792" className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M371.78 10.1247C380.857 9.21221 403.507 9.787 412.781 10.3472C469.399 13.316 524.67 28.6973 574.687 55.4016C666.687 104.465 735.392 188.13 765.628 287.934C795.568 387.315 785.023 494.5 736.296 586.137C687.454 677.292 604.418 745.318 505.445 775.252C405.865 805.161 298.507 794.538 206.718 745.691C115.366 696.711 47.0846 613.579 16.77 514.437C-13.3549 414.796 -2.59914 307.254 46.6623 215.552C95.2568 125.039 177.578 57.3479 275.76 27.1683L276.56 293.401L276.52 364.092C276.502 379.444 275.768 400.606 278.579 415.245C282.745 437.148 293.215 457.357 308.704 473.393C329.838 495.183 358.748 507.697 389.094 508.19C456.237 509.189 505.053 458.021 505.755 391.646C505.47 334.267 458.816 284.244 401.921 279.633C389.018 278.588 379.251 279.409 366.536 281.646C365.61 258.742 366.37 229.341 366.332 206.129C374.613 205.376 382.677 204.678 391.003 204.668C441.393 204.537 489.729 224.644 525.169 260.48C560.906 296.41 580.75 345.168 580.263 395.845C579.763 445.678 559.509 493.273 523.955 528.178C488.041 563.778 439.314 583.405 388.759 582.633C338.588 582.153 290.697 561.602 255.765 525.579C228.175 497.472 210.166 461.36 204.308 422.409C201.725 404.489 201.839 386.752 201.83 368.718L201.823 318.66L202.1 191.322C196.143 196.313 188.605 204.079 183.292 209.834C132.48 265.24 105.82 338.606 109.205 413.714C112.519 488.12 145.165 558.175 199.999 608.559C313.966 713.025 493.807 707.227 598.318 592.422C649.916 536.708 676.846 462.517 673.015 386.67C669.311 312.139 636.223 242.114 581.009 191.931C532.395 147.656 469.816 121.797 404.133 118.837C391.49 118.245 379.131 118.801 366.501 119.45C365.777 96.1581 366.743 71.481 366.363 48.0439C366.276 42.5901 366.001 14.9544 366.772 11.3153C368.101 10.1911 369.936 10.3011 371.78 10.1247Z" fill="#C8FF00"/>
            <path d="M732.149 0.0833511C758.011 -1.44181 780.282 18.1444 782.078 43.9964C783.879 69.8483 764.535 92.3293 738.711 94.4015C721.756 95.7616 705.383 87.9088 695.83 73.8376C686.278 59.7665 685.014 41.646 692.53 26.3874C700.047 11.1288 715.175 1.08369 732.149 0.0833511Z" fill="#C8FF00"/>
          </svg>
          <span className="text-accent-ui text-[15px] font-semibold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
            bappy360
          </span>
        </a>

        {/* Center — Nav Items Pill */}
        <nav
          className="flex items-center gap-1 px-2 py-2 rounded-full"
          style={glassStyle}
        >
          {NAV_ITEMS.map((item, i) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <a
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 rounded-full text-[13px] font-medium tracking-wide transition-all duration-300"
                style={{
                  color: isActive ? "var(--accent-ui)" : "var(--muted-foreground)",
                  background: isActive ? "rgba(200,255,0,0.08)" : "transparent",
                  animation: `slideIn 350ms cubic-bezier(0.25, 0.1, 0.25, 1) ${0.4 + i * 0.05}s both`,
                }}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ backgroundColor: "var(--accent-ui)" }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right — Let's Talk + Theme Toggle Container */}
        <div
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full"
          style={glassStyle}
        >
          <a
            href="#contact"
            className="btn-premium-outline inline-flex items-center gap-2 text-[13px] px-5 py-2 rounded-full transition-all duration-300 tracking-wide font-medium backdrop-blur-sm bg-white/[0.03]"
            style={{
              border: `1px solid ${ACCENT}33`,
              color: ACCENT,
            }}
          >
            Let&apos;s Talk
            <ArrowRight size={12} strokeWidth={1} style={{ transform: "rotate(-30deg)" }} />
          </a>
          <ThemeToggle />
        </div>
      </div>

      {/* ═══ Mobile Bottom Floating Nav ═══ */}
      <div
        className="fixed bottom-4 left-4 right-4 z-50 flex lg:hidden items-center justify-between px-4 py-3 rounded-2xl navbar-fade-in"
        style={{
          ...glassStyle,
          animationDelay: "0.4s",
        }}
      >
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 z-[60]">
          <svg viewBox="0 0 783 792" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M371.78 10.1247C380.857 9.21221 403.507 9.787 412.781 10.3472C469.399 13.316 524.67 28.6973 574.687 55.4016C666.687 104.465 735.392 188.13 765.628 287.934C795.568 387.315 785.023 494.5 736.296 586.137C687.454 677.292 604.418 745.318 505.445 775.252C405.865 805.161 298.507 794.538 206.718 745.691C115.366 696.711 47.0846 613.579 16.77 514.437C-13.3549 414.796 -2.59914 307.254 46.6623 215.552C95.2568 125.039 177.578 57.3479 275.76 27.1683L276.56 293.401L276.52 364.092C276.502 379.444 275.768 400.606 278.579 415.245C282.745 437.148 293.215 457.357 308.704 473.393C329.838 495.183 358.748 507.697 389.094 508.19C456.237 509.189 505.053 458.021 505.755 391.646C505.47 334.267 458.816 284.244 401.921 279.633C389.018 278.588 379.251 279.409 366.536 281.646C365.61 258.742 366.37 229.341 366.332 206.129C374.613 205.376 382.677 204.678 391.003 204.668C441.393 204.537 489.729 224.644 525.169 260.48C560.906 296.41 580.75 345.168 580.263 395.845C579.763 445.678 559.509 493.273 523.955 528.178C488.041 563.778 439.314 583.405 388.759 582.633C338.588 582.153 290.697 561.602 255.765 525.579C228.175 497.472 210.166 461.36 204.308 422.409C201.725 404.489 201.839 386.752 201.83 368.718L201.823 318.66L202.1 191.322C196.143 196.313 188.605 204.079 183.292 209.834C132.48 265.24 105.82 338.606 109.205 413.714C112.519 488.12 145.165 558.175 199.999 608.559C313.966 713.025 493.807 707.227 598.318 592.422C649.916 536.708 676.846 462.517 673.015 386.67C669.311 312.139 636.223 242.114 581.009 191.931C532.395 147.656 469.816 121.797 404.133 118.837C391.49 118.245 379.131 118.801 366.501 119.45C365.777 96.1581 366.743 71.481 366.363 48.0439C366.276 42.5901 366.001 14.9544 366.772 11.3153C368.101 10.1911 369.936 10.3011 371.78 10.1247Z" fill="#C8FF00"/>
            <path d="M732.149 0.0833511C758.011 -1.44181 780.282 18.1444 782.078 43.9964C783.879 69.8483 764.535 92.3293 738.711 94.4015C721.756 95.7616 705.383 87.9088 695.83 73.8376C686.278 59.7665 685.014 41.646 692.53 26.3874C700.047 11.1288 715.175 1.08369 732.149 0.0833511Z" fill="#C8FF00"/>
          </svg>
          <span className="text-accent-ui text-[14px] font-semibold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
            bappy360
          </span>
        </a>

        {/* Right side: ThemeToggle + Hamburger */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            className="z-[60] w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X size={18} className="text-accent-ui" />
            ) : (
              <Menu size={18} className="text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Full-screen Menu Overlay — mobile only */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center lg:hidden"
          style={{ animation: "fadeIn 250ms ease-out" }}
        >
          <nav className="flex flex-col items-center gap-8">
            {NAV_ITEMS.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-3xl md:text-4xl font-semibold tracking-tight text-muted-foreground hover:text-foreground transition-colors"
                style={{
                  fontFamily: "var(--font-heading)",
                  animation: `slideIn 350ms cubic-bezier(0.25, 0.1, 0.25, 1) ${0.03 + i * 0.04}s both`,
                }}
              >
                {item.label}
              </a>
            ))}

            {/* Let's Talk in menu */}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="btn-premium-outline mt-6 text-[13px] px-8 py-3 rounded-full font-medium transition-all"
              style={{
                border: `1px solid ${ACCENT}33`,
                color: ACCENT,
                animation: "slideIn 350ms cubic-bezier(0.25, 0.1, 0.25, 1) 0.25s both",
              }}
            >
              Let&apos;s Talk
              <ArrowRight size={12} strokeWidth={1} style={{ transform: "rotate(-30deg)" }} />
            </a>
          </nav>

          {/* Social links at bottom */}
          <div className="absolute bottom-20 flex items-center gap-4 flex-wrap justify-center">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={social.name}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════
   HERO — Clean minimal hero: Logo rotation + Headshot + Typography
   ═══════════════════════════════════════════ */
function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center relative overflow-hidden bg-background"
    >
      {/* Subtle accent gradient orb */}
      <div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full opacity-[0.03] blur-[120px] pointer-events-none"
        style={{ background: ACCENT }}
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-6 pb-16 w-full relative z-[2]">
        <div className="grid lg:grid-cols-[1fr_440px] gap-16 lg:gap-20 items-center">
          {/* Mobile-only Headshot */}
          <div className="flex lg:hidden justify-center mb-8">
            <div className="mobile-headshot-container">
              <img
                src="/headshot.png"
                alt="Sahkil Hossen — UI/UX Designer"
                className="mobile-headshot-img"
              />
            </div>
          </div>

          {/* Left — Text content */}
          <div className="min-w-0">
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card mb-10">
              <span className="relative flex h-2 w-2">
                <span
                  className="pulse-dot accent-dot absolute inline-flex h-full w-full rounded-full opacity-75"
                />
                <span
                  className="accent-dot relative inline-flex rounded-full h-2 w-2"
                />
              </span>
              <span className="text-[11px] tracking-wide text-muted-foreground font-medium">
                Active on Service.
              </span>
            </div>

            {/* Main Heading — Two-layer structure with rotating word */}
            <h2
              className="text-[1.5rem] sm:text-[1.8rem] md:text-[2.5rem] lg:text-[3rem] font-light tracking-[-0.02em] leading-[1.15] mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Designing clarity for
            </h2>

            <h1
              className="text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-[5rem] xl:text-[5.5rem] font-semibold tracking-[-0.03em] leading-[1.05] mb-8"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <RotatingWord />
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-[17px] text-muted-foreground leading-[1.8] max-w-md mb-10">
              Experienced in Graphics Design, UI/UX, and brand identity across{" "}
              <strong className="font-semibold text-foreground/80">500+</strong>{" "}
              projects, working with{" "}
              <strong className="font-semibold text-foreground/80">startups, agencies, and global clients</strong>.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap max-w-full">
              <a
                href="https://www.figma.com/design/PVJBstSUUY1V3BR70jbwAV/Portfolios---SH-Bappy?m=auto&t=WhG3kUdmS1yfPx7O-6"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium inline-flex items-center justify-center gap-2.5 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full text-sm font-semibold transition-all duration-300 hover:opacity-90"
                style={{
                  background: ACCENT_GRADIENT,
                  color: "#101010",
                }}
              >
                View Figma_folio
                <ArrowRight size={13} strokeWidth={1} style={{ transform: "rotate(-30deg)" }} />
              </a>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-full text-sm font-medium transition-all duration-300 hover:opacity-80"
                style={{
                  color: ACCENT,
                }}
              >
                <Download size={15} strokeWidth={1.5} />
                Resume
              </a>
            </div>
          </div>

          {/* Right — Headshot with background logo rotation + floating platform buttons */}
          <div className="hidden lg:flex justify-center lg:justify-end" style={{ contain: 'layout style' }}>
            {/* Desktop headshot — only visible on lg+ */}
            <div className="relative w-[380px] h-[480px]" style={{ animation: "gentleFloat 4s ease-in-out infinite", willChange: 'transform', transform: 'translateZ(0)' }}>
              {/* Background brand logo — larger scale, 15% opacity, soft glow, slow rotation */}
              <div className="hero-bg-logo absolute inset-0 flex items-center justify-center pointer-events-none hero-bg-glow" style={{ zIndex: 0, opacity: 0.15, transform: 'translateZ(0)' }}>
                <svg
                  viewBox="0 0 783 792"
                  className="hero-logo-spin w-[2200px] h-[2200px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ willChange: 'transform', transform: 'translateZ(0)' }}
                >
                  <path d="M371.78 10.1247C380.857 9.21221 403.507 9.787 412.781 10.3472C469.399 13.316 524.67 28.6973 574.687 55.4016C666.687 104.465 735.392 188.13 765.628 287.934C795.568 387.315 785.023 494.5 736.296 586.137C687.454 677.292 604.418 745.318 505.445 775.252C405.865 805.161 298.507 794.538 206.718 745.691C115.366 696.711 47.0846 613.579 16.77 514.437C-13.3549 414.796 -2.59914 307.254 46.6623 215.552C95.2568 125.039 177.578 57.3479 275.76 27.1683L276.56 293.401L276.52 364.092C276.502 379.444 275.768 400.606 278.579 415.245C282.745 437.148 293.215 457.357 308.704 473.393C329.838 495.183 358.748 507.697 389.094 508.19C456.237 509.189 505.053 458.021 505.755 391.646C505.47 334.267 458.816 284.244 401.921 279.633C389.018 278.588 379.251 279.409 366.536 281.646C365.61 258.742 366.37 229.341 366.332 206.129C374.613 205.376 382.677 204.678 391.003 204.668C441.393 204.537 489.729 224.644 525.169 260.48C560.906 296.41 580.75 345.168 580.263 395.845C579.763 445.678 559.509 493.273 523.955 528.178C488.041 563.778 439.314 583.405 388.759 582.633C338.588 582.153 290.697 561.602 255.765 525.579C228.175 497.472 210.166 461.36 204.308 422.409C201.725 404.489 201.839 386.752 201.83 368.718L201.823 318.66L202.1 191.322C196.143 196.313 188.605 204.079 183.292 209.834C132.48 265.24 105.82 338.606 109.205 413.714C112.519 488.12 145.165 558.175 199.999 608.559C313.966 713.025 493.807 707.227 598.318 592.422C649.916 536.708 676.846 462.517 673.015 386.67C669.311 312.139 636.223 242.114 581.009 191.931C532.395 147.656 469.816 121.797 404.133 118.837C391.49 118.245 379.131 118.801 366.501 119.45C365.777 96.1581 366.743 71.481 366.363 48.0439C366.276 42.5901 366.001 14.9544 366.772 11.3153C368.101 10.1911 369.936 10.3011 371.78 10.1247Z" fill="none" stroke="var(--accent-ui)" strokeWidth="1.5"/>
                  <path d="M732.149 0.0833511C758.011 -1.44181 780.282 18.1444 782.078 43.9964C783.879 69.8483 764.535 92.3293 738.711 94.4015C721.756 95.7616 705.383 87.9088 695.83 73.8376C686.278 59.7665 685.014 41.646 692.53 26.3874C700.047 11.1288 715.175 1.08369 732.149 0.0833511Z" fill="none" stroke="var(--accent-ui)" strokeWidth="1.5"/>
                </svg>
              </div>

              {/* Headshot image — clean, no border, no overlay */}
              <div className="relative z-[1] w-[400px] h-[440px] flex items-start justify-center overflow-hidden">
                <img
                  src="/headshot.png"
                  alt="Sahkil Hossen — UI/UX Designer"
                  className="w-full h-full object-cover object-top"
                />

 {/* Bottom fade */}
<div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
              </div>

              {/* ── Floating Platform Buttons ── */}
              {/* Figma — top-left orbit */}
              <a
                href="https://www.figma.com/design/PVJBstSUUY1V3BR70jbwAV/Portfolios---SH-Bappy?m=auto&t=WhG3kUdmS1yfPx7O-6"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-platform-btn"
                style={{
                  top: '50px',
                  left: '-24px',
                  animation: 'heroOrbit1 6s ease-in-out infinite',
                }}
                aria-label="Figma Portfolio"
              >
                <Figma size={20} strokeWidth={1.5} />
                <span className="hero-platform-label" style={{ top: '50%', left: '110%', transform: 'translateY(-50%)' }}>
                  Figma
                </span>
              </a>

              {/* Behance — top-right orbit */}
              <a
                href="https://www.behance.net/shbappy"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-platform-btn"
                style={{
                  top: '30px',
                  right: '-20px',
                  animation: 'heroOrbit2 7s ease-in-out infinite',
                  animationDelay: '0.8s',
                }}
                aria-label="Behance Portfolio"
              >
                <BehanceIcon size={20} />
                <span className="hero-platform-label" style={{ top: '50%', right: '110%', transform: 'translateY(-50%)' }}>
                  Behance
                </span>
              </a>

              {/* Dribbble — bottom-right orbit */}
              <a
                href="https://dribbble.com/shbappy"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-platform-btn"
                style={{
                  bottom: '40px',
                  right: '-12px',
                  animation: 'heroOrbit3 5.5s ease-in-out infinite',
                  animationDelay: '1.6s',
                }}
                aria-label="Dribbble Portfolio"
              >
                <Dribbble size={20} strokeWidth={1.5} />
                <span className="hero-platform-label" style={{ bottom: '110%', right: '50%', transform: 'translateX(50%)' }}>
                  Dribbble
                </span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator — hidden on very small screens */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground font-medium">
          Scroll
        </span>
        <ChevronDown
          size={14}
          className="text-accent-ui"
          style={{ animation: "gentleFloat 2s ease-in-out infinite" }}
        />
      </div>
    </section>
  );
}

/* ─── Competency Bar — Animated progress bar with count-up ─── */
function CompetencyBar({ name, icon: Icon, level, inView, delay }: { name: string; icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>; level: number; inView: boolean; delay: number }) {
  const count = useCountUp(level, inView, 1500);

  return (
    <div
      className="group"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(10px)",
        transition: `opacity 400ms cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}ms, transform 400ms cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-3">
          <Icon
            size={15}
            className="text-muted-foreground group-hover:text-foreground transition-colors"
          />
          <span className="text-[14px] font-medium">{name}</span>
        </div>
        <span className="text-[11px] text-muted-foreground font-medium tabular-nums">
          {count}%
        </span>
      </div>
      <div className="h-1 rounded-full bg-white/[0.05] overflow-hidden">
        <div
          className="h-full rounded-full competency-bar-fill"
          style={{
            width: inView ? `${level}%` : "0%",
            background: `linear-gradient(to right, rgba(200,255,0,0.3), ${ACCENT})`,
            willChange: "width, transform",
            transform: "translate3d(0,0,0)",
            transition: `width 1500ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

function CompetencyBars() {
  const { ref, inView } = useInView(0.15);

  return (
    <div ref={ref} className="space-y-5">
      <h3
        className="text-lg font-semibold mb-8"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Core Competencies
      </h3>
      {SKILLS.map((skill, i) => (
        <CompetencyBar
          key={skill.name}
          name={skill.name}
          icon={skill.icon}
          level={skill.level}
          inView={inView}
          delay={i * 80}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   ABOUT — Skills + Philosophy
   ═══════════════════════════════════════════ */
function About() {
  return (
    <Section id="about" dark={false}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading
          label="About"
          title="Designing with Structure, Delivering with Purpose"
          description="I craft premium digital experiences that balance aesthetics with function. My approach is rooted in clarity, structure, and trust-first design."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-20">
          {/* Left — Info + Tools */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3
                className="text-xl font-semibold"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Sahkil Hossen
              </h3>
              <p className="text-muted-foreground text-[15px] leading-[1.8]">
                Known as{" "}
                <strong className="text-accent-ui font-semibold">bappy360</strong> — a premium
                UI/UX and Visual Design brand focused on structured digital
                experiences, startup-oriented interfaces, and conversion-oriented
                layouts. Every project begins with understanding the
                &ldquo;why&rdquo; before touching a single pixel.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {KEY_TOOLS.map((tool) => (
                <span
                  key={tool}
                  className="text-[11px] px-4 py-1.5 rounded-full text-muted-foreground font-medium tool-tag"
                  style={{
                    background: "rgba(200,255,0,0.06)",
                    border: "1px solid rgba(200,255,0,0.1)",
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>

            {/* Philosophy Card */}
            <div
              className="rounded-2xl p-5 sm:p-7 philosophy-card"
              style={{
                background: "rgba(200,255,0,0.03)",
                border: "1px solid rgba(200,255,0,0.08)",
              }}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <Sparkles size={14} className="text-accent-ui" />
                <span
                  className="text-accent-ui text-[11px] tracking-[0.15em] uppercase font-semibold"
                >
                  Design Philosophy
                </span>
              </div>
              <p className="text-[14px] text-muted-foreground leading-[1.8] italic">
                &ldquo;Minimal clarity with premium interaction rhythm. Every
                element exists for a reason. Reduce friction, increase trust,
                and make visitors feel — this designer understands
                structure.&rdquo;
              </p>
            </div>
          </div>

          {/* Right — Skills Grid with Animated Bars */}
          <CompetencyBars />
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════
   PORTFOLIO
   ═══════════════════════════════════════════ */
function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered =
    activeCategory === "All"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <Section id="portfolio" dark>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading
          label="Portfolio"
          title="Selected Work"
          description="A curated collection of projects across UI/UX design, brand identity, and social media — each crafted with intentional structure and conversion focus."
        />

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10 md:mb-14">
          {PORTFOLIO_CATEGORIES.map((cat) => {
            const CatIcon = PORTFOLIO_CATEGORY_ICONS[cat];
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="text-[11px] px-5 py-2 rounded-full transition-all duration-300 tracking-wide font-medium inline-flex items-center gap-1.5"
                style={
                  activeCategory === cat
                    ? { background: ACCENT_GRADIENT, color: "#101010" }
                    : {
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid var(--border)",
                        color: "var(--muted-foreground)",
                      }
                }
              >
                {CatIcon && <CatIcon size={12} strokeWidth={1.5} />}
                {cat}
              </button>
            );
          })}
        </div>

        {/* Portfolio Grid — Image-based cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group glass-card-hover rounded-2xl overflow-hidden flex flex-col"
            >
              {/* Project Image */}
              <div className="relative w-full h-40 sm:h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                {/* Category + Year overlay */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <span className="text-[10px] px-3 py-1 rounded-full font-semibold portfolio-tag backdrop-blur-sm" style={{ background: "rgba(200,255,0,0.1)", color: "#C8FF00" }}>
                    {item.category}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-medium">{item.year}</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 sm:p-7 flex flex-col flex-1">
                {/* Icon + Title */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 portfolio-icon-area flex-shrink-0"
                    style={{ background: "rgba(200,255,0,0.06)" }}
                  >
                    <item.icon size={20} className="text-accent-ui" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base font-semibold leading-snug" style={{ fontFamily: "var(--font-heading)" }}>
                    {item.title}
                  </h3>
                </div>

                {/* Short intro */}
                <p className="text-[13px] text-muted-foreground/80 leading-[1.6] mb-5 flex-1">{item.intro}</p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-3 py-1 rounded-full font-medium portfolio-tag" style={{ background: "rgba(200,255,0,0.05)", color: "var(--muted-foreground)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-accent-ui text-[11px] font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    View
                    <ArrowUpRight size={10} strokeWidth={1} style={{ transform: "rotate(-15deg)" }} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════
   RESUME — Tab-based layout with Modal Preview
   ═══════════════════════════════════════════ */
function Resume() {
  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience");
  const [showModal, setShowModal] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  return (
    <Section id="resume" dark={false}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading
          label="Resume"
          title="Experience & Education"
          description="A structured professional journey — from graphic design foundations to leading premium digital experiences for agencies and startups worldwide."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-20">
          {/* Left Side — Tabs + Content */}
          <div className="lg:col-span-3">
            {/* Tab Buttons */}
            <div className="flex gap-2 mb-10">
              <button
                onClick={() => setActiveTab("experience")}
                className="text-[11px] px-6 py-2.5 rounded-full transition-all duration-300 tracking-wide font-medium"
                style={
                  activeTab === "experience"
                    ? { background: ACCENT_GRADIENT, color: "#101010" }
                    : {
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid var(--border)",
                        color: "var(--muted-foreground)",
                      }
                }
              >
                Experience
              </button>
              <button
                onClick={() => setActiveTab("education")}
                className="text-[11px] px-6 py-2.5 rounded-full transition-all duration-300 tracking-wide font-medium"
                style={
                  activeTab === "education"
                    ? { background: ACCENT_GRADIENT, color: "#101010" }
                    : {
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid var(--border)",
                        color: "var(--muted-foreground)",
                      }
                }
              >
                Education
              </button>
            </div>

            {/* Tab Content — Experience */}
            {activeTab === "experience" && (
              <div style={{ animation: "tabFadeIn 250ms cubic-bezier(0.25, 0.1, 0.25, 1)" }}>
                <div className="relative pl-7 border-l timeline-border" style={{ borderColor: "rgba(200,255,0,0.08)" }}>
                  {EXPERIENCE.map((exp, i) => {
                    const TypeIcon = {
                      hospital: GraduationCap,
                      agency: Briefcase,
                      freelance: Star,
                    }[exp.type] || Briefcase;

                    return (
                      <div key={i} className="relative pb-4 last:pb-0">
                        {/* Timeline dot */}
                        <div className="absolute -left-[calc(1.75rem+5px)] top-5 w-2.5 h-2.5 rounded-full border-2 bg-card timeline-dot" style={{ borderColor: "rgba(200,255,0,0.25)" }}>
                          <div className="absolute inset-[3px] rounded-full timeline-dot-inner" style={{ backgroundColor: "rgba(200,255,0,0.5)" }} />
                        </div>
                        <div
                          className="glass-card-hover rounded-xl p-4 sm:p-6"
                          style={{ animation: `tabFadeIn 250ms cubic-bezier(0.25, 0.1, 0.25, 1) ${i * 50}ms both` }}
                        >
                        <div className="flex items-center gap-2.5 mb-3">
                          <TypeIcon size={13} className="text-accent-ui" />
                          <span className="text-accent-ui text-[10px] tracking-[0.15em] uppercase font-semibold">
                            {exp.period}
                          </span>
                        </div>
                        <h3 className="text-[15px] font-semibold mb-1.5" style={{ fontFamily: "var(--font-heading)" }}>
                          {exp.role}
                        </h3>
                        <p className="text-[13px] text-muted-foreground mb-3 font-medium">{exp.company}</p>
                        <ul className="space-y-1.5">
                          {exp.highlights.map((highlight, j) => (
                            <li key={j} className="text-[13px] text-muted-foreground leading-[1.7] flex items-start gap-2">
                              <span className="bg-accent-ui mt-2 w-1 h-1 rounded-full flex-shrink-0" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab Content — Education */}
            {activeTab === "education" && (
              <div style={{ animation: "tabFadeIn 250ms cubic-bezier(0.25, 0.1, 0.25, 1)" }}>
                <div className="relative pl-7 border-l timeline-border" style={{ borderColor: "rgba(200,255,0,0.08)" }}>
                  {EDUCATION.map((edu, i) => (
                    <div key={i} className="relative pb-4 last:pb-0">
                      {/* Timeline dot */}
                      <div className="absolute -left-[calc(1.75rem+5px)] top-5 w-2.5 h-2.5 rounded-full border-2 bg-card timeline-dot" style={{ borderColor: "rgba(200,255,0,0.25)" }}>
                        <div className="absolute inset-[3px] rounded-full timeline-dot-inner" style={{ backgroundColor: "rgba(200,255,0,0.5)" }} />
                      </div>
                      <div
                        className="glass-card-hover rounded-xl p-4 sm:p-6"
                        style={{ animation: `tabFadeIn 250ms cubic-bezier(0.25, 0.1, 0.25, 1) ${i * 50}ms both` }}
                      >
                        <span className="text-accent-ui text-[10px] tracking-[0.15em] uppercase font-semibold block mb-2">
                          {edu.period}
                        </span>
                        <h3 className="text-[15px] font-semibold mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                          {edu.degree}
                        </h3>
                        <p className="text-[13px] text-muted-foreground font-medium mb-1">{edu.institution}</p>
                        <p className="text-[12px] text-muted-foreground/70">{edu.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Side — Resume Card (Black Panel — Compact Avatar + Designation) */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-32">
              <div className="rounded-2xl overflow-hidden resume-card" style={{ background: "var(--popover)", border: "1px solid var(--border)" }}>
              {/* Top Section — Small left-aligned avatar + designation */}
              <div className="flex items-center gap-4 p-4 sm:p-6 pb-4 border-b border-border">
                {/* Avatar — compact, controlled */}
                <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border avatar-border" style={{ borderColor: `${ACCENT}20` }}>
                  <img
                    src="/headshot.png"
                    alt="Sahkil Hossen"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* Designation — clear hierarchy */}
                <div className="min-w-0">
                  <h3 className="text-[16px] font-semibold leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                    Sahkil Hossen
                  </h3>
                  <p className="text-accent-ui text-[12px] font-medium mt-1">
                    UI/UX &amp; Visual Designer
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    bappy360 — Lead Creative Designer
                  </p>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4 sm:p-6 pt-5">
                {/* Key qualifications */}
                <div className="space-y-2.5 mb-5">
                  <div className="flex items-center gap-2.5 text-[12px] text-muted-foreground">
                    <GraduationCap size={12} className="text-accent-ui" />
                    <span>B.Sc in CSE — East Delta University</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[12px] text-muted-foreground">
                    <Briefcase size={12} className="text-accent-ui" />
                    <span>Freelancer</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[12px] text-muted-foreground">
                    <Globe size={12} className="text-accent-ui" />
                    <span>Lead Designer at Noundesign</span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <a
                    href="/resume.pdf"
                    download
                    className="btn-premium w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full text-[14px] font-semibold transition-all duration-300 hover:opacity-90"
                    style={{ background: ACCENT_GRADIENT, color: "#101010" }}
                  >
                    Download PDF
                    <Download size={13} strokeWidth={1.5} />
                  </a>
                  <button
                    onClick={() => setShowModal(true)}
                    className="btn-premium-outline w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full text-[14px] font-medium transition-all duration-300 hover:bg-white/[0.05]"
                    style={{ border: `1px solid ${ACCENT}25`, color: ACCENT }}
                  >
                    Preview Resume
                    <ArrowRight size={13} strokeWidth={1} style={{ transform: "rotate(-30deg)" }} />
                  </button>
                </div>
              </div>
            </div>

            {/* Portfolio Platform Links — Individual Boxes */}
            <div className="mt-6 space-y-3">
              <h4 className="text-accent-ui text-[11px] tracking-[0.2em] uppercase font-semibold mb-3">
                Portfolio Links
              </h4>
              {PORTFOLIO_PLATFORMS.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-[14px] text-muted-foreground hover:text-foreground transition-all duration-300 group"
                  style={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <platform.icon size={16} className="text-accent-ui group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">{platform.name}</span>
                  <ArrowUpRight size={11} strokeWidth={1} className="text-accent-ui ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ transform: "rotate(-15deg)" }} />
                </a>
              ))}
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Resume Preview Modal — Portal to body to avoid transform issues ═══ */}
      {showModal && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
          style={{ animation: "modalOverlayIn 150ms ease-out" }}
          onClick={() => setShowModal(false)}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
          <div
            className="relative max-w-lg w-full rounded-2xl p-8 max-h-[85vh] overflow-y-auto z-10"
            style={{
              background: "color-mix(in srgb, var(--popover) 98%, transparent)",
              border: "1px solid var(--border)",
              backdropFilter: "blur(24px)",
              animation: "modalIn 250ms cubic-bezier(0.25, 0.1, 0.25, 1)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 80px rgba(200,255,0,0.03)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/[0.05] z-20"
              style={{ border: "1px solid var(--border)" }}
              aria-label="Close modal"
            >
              <X size={14} className="text-muted-foreground" />
            </button>

            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 flex-shrink-0" style={{ borderColor: `${ACCENT}33` }}>
                <img src="/headshot.png" alt="Sahkil Hossen" className="w-full h-full object-cover object-top" />
              </div>
              <div>
                <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-heading)" }}>Sahkil Hossen</h3>
                <p className="text-[12px] text-muted-foreground font-medium">UI/UX &amp; Visual Designer</p>
              </div>
            </div>

            {/* Experience snapshot */}
            <div className="rounded-xl p-4 mb-5" style={{ background: "rgba(200,255,0,0.03)", border: "1px solid rgba(200,255,0,0.06)" }}>
              <p className="text-[13px] text-muted-foreground leading-[1.7]">6+ years across agencies, startups, and healthcare</p>
            </div>

            {/* Skills Overview */}
            <div className="space-y-4 mb-6">
              {SKILL_GROUPS.map((group) => (
                <div key={group.label}>
                  <span className="text-accent-ui text-[10px] tracking-[0.15em] uppercase font-semibold block mb-2">{group.label}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {group.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-3 py-1 rounded-full text-muted-foreground font-medium" style={{ background: "rgba(200,255,0,0.06)", border: "1px solid rgba(200,255,0,0.1)" }}>{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3">
              <a href="/resume.pdf" download className="btn-premium flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:opacity-90" style={{ background: ACCENT_GRADIENT, color: "#101010" }}>
                Download Full Resume
                <Download size={13} strokeWidth={1.5} />
              </a>
              <button onClick={() => setShowModal(false)} className="btn-premium-outline flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:bg-white/[0.05]" style={{ border: "1px solid var(--border)", color: "var(--muted-foreground)" }}>
                Close
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </Section>
  );
}

/* ═══════════════════════════════════════════
   DESIGN NOTES
   ═══════════════════════════════════════════ */
function DesignNotes() {
  return (
    <Section id="design-notes" dark>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading
          label="Design Notes"
          title="Thoughts & Insights"
          description="Exploring startup UX, landing page psychology, design systems, and conversion-focused design through structured thinking."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {DESIGN_NOTES.map((note, i) => (
            <div key={i} className="glass-card-hover rounded-2xl p-5 sm:p-7 group cursor-pointer">
              <div className="flex items-center gap-2 mb-5">
                <span className="text-accent-ui text-[10px] px-3 py-1 rounded-full tracking-wide font-semibold" style={{ background: "rgba(200,255,0,0.08)" }}>
                  {note.topic}
                </span>
                <span className="text-[10px] text-muted-foreground ml-auto flex items-center gap-1 font-medium">
                  <Clock size={10} />
                  {note.readTime}
                </span>
              </div>
              <h3 className="text-[15px] font-semibold mb-3 group-hover:opacity-80 transition-opacity leading-snug" style={{ fontFamily: "var(--font-heading)" }}>
                {note.title}
              </h3>
              <p className="text-[13px] text-muted-foreground leading-[1.75] mb-5">{note.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground font-medium">{note.date}</span>
                <span className="text-accent-ui text-[11px] font-medium group-hover:text-foreground transition-colors flex items-center gap-1">
                  Read
                  <ArrowRight size={10} strokeWidth={1} style={{ transform: "rotate(-30deg)" }} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════
   CONTACT
   ═══════════════════════════════════════════ */
function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormState({ name: "", email: "", projectType: "", message: "" });
  };

  return (
    <Section id="contact" dark={false}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading
          label="Contact"
          title="Let's Build Something Great"
          description="Have a project in mind? I'd love to hear about it. Reach out and let's discuss how we can create something meaningful together."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
          {/* Form — Left Side */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-[11px] tracking-wide text-muted-foreground block mb-2.5 font-medium">Name</label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-[14px] focus:outline-none transition-colors placeholder:text-muted-foreground/30"
                  style={{ caretColor: ACCENT }}
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="text-[11px] tracking-wide text-muted-foreground block mb-2.5 font-medium">Email</label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-[14px] focus:outline-none transition-colors placeholder:text-muted-foreground/30"
                  style={{ caretColor: ACCENT }}
                  placeholder="you@company.com"
                  required
                />
              </div>
              <div>
                <label className="text-[11px] tracking-wide text-muted-foreground block mb-2.5 font-medium">Project Type</label>
                <select
                  value={formState.projectType}
                  onChange={(e) => setFormState((s) => ({ ...s, projectType: e.target.value }))}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-[14px] focus:outline-none transition-colors text-muted-foreground appearance-none"
                  required
                >
                  <option value="">Select project type</option>
                  <option value="ui-ux">UI/UX Design</option>
                  <option value="branding">Brand Identity</option>
                  <option value="web-design">Web Design</option>
                  <option value="mobile-app">Mobile App Design</option>
                  <option value="social-media">Social Media Design</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] tracking-wide text-muted-foreground block mb-2.5 font-medium">Tell Me More</label>
                <textarea
                  value={formState.message}
                  onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                  rows={5}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-[14px] focus:outline-none transition-colors resize-none placeholder:text-muted-foreground/30"
                  style={{ caretColor: ACCENT }}
                  placeholder="Describe your project, goals, and timeline..."
                  required
                />
              </div>
              <button
                type="submit"
                className="btn-premium w-full flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:opacity-90"
                style={{ background: ACCENT_GRADIENT, color: "#101010" }}
              >
                {submitted ? "Message Sent!" : <>Send Message <ArrowRight size={13} strokeWidth={1} style={{ transform: "rotate(-30deg)" }} /></>}
              </button>
            </form>
          </div>

          {/* Contact Info — Right Side */}
          <div className="space-y-7">
            <div className="glass-card rounded-2xl p-5 sm:p-7">
              <h3 className="text-[13px] font-semibold mb-5 tracking-wide" style={{ fontFamily: "var(--font-heading)" }}>Primary Contact</h3>
              <div className="space-y-4">
                <a href="mailto:shbappy.pro@gmail.com" className="flex items-center gap-3.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors group">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center group-hover:opacity-80 transition-opacity" style={{ background: "rgba(200,255,0,0.08)" }}>
                    <Mail size={14} className="text-accent-ui" />
                  </div>
                  shbappy.pro@gmail.com
                </a>
                <a href="tel:+8801749522332" className="flex items-center gap-3.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors group">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center group-hover:opacity-80 transition-opacity" style={{ background: "rgba(200,255,0,0.08)" }}>
                    <Phone size={14} className="text-accent-ui" />
                  </div>
                  +880 1749-522332
                </a>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5 sm:p-7">
              <h3 className="text-[13px] font-semibold mb-5 tracking-wide" style={{ fontFamily: "var(--font-heading)" }}>Book a Call</h3>
              <a href="https://calendly.com/shbappy-pro/30min" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors group">
                <div className="w-9 h-9 rounded-full flex items-center justify-center group-hover:opacity-80 transition-opacity" style={{ background: "rgba(200,255,0,0.08)" }}>
                  <Calendar size={14} className="text-accent-ui" />
                </div>
                Schedule on Calendly
              </a>
            </div>

            <div className="glass-card rounded-2xl p-5 sm:p-7">
              <h3 className="text-[13px] font-semibold mb-5 tracking-wide" style={{ fontFamily: "var(--font-heading)" }}>Connect</h3>
              <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 py-3 sm:py-3.5 rounded-xl transition-colors group"
                    style={{ background: "rgba(200,255,0,0.03)" }}
                    aria-label={social.name}
                  >
                    <social.icon size={16} className="text-accent-ui transition-colors" />
                    <span className="text-[10px] text-muted-foreground group-hover:text-foreground transition-colors font-medium">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      {/* Subtle gradient transition from content */}
      <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, rgba(200,255,0,0.15), transparent)" }} />
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 783 792" className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M371.78 10.1247C380.857 9.21221 403.507 9.787 412.781 10.3472C469.399 13.316 524.67 28.6973 574.687 55.4016C666.687 104.465 735.392 188.13 765.628 287.934C795.568 387.315 785.023 494.5 736.296 586.137C687.454 677.292 604.418 745.318 505.445 775.252C405.865 805.161 298.507 794.538 206.718 745.691C115.366 696.711 47.0846 613.579 16.77 514.437C-13.3549 414.796 -2.59914 307.254 46.6623 215.552C95.2568 125.039 177.578 57.3479 275.76 27.1683L276.56 293.401L276.52 364.092C276.502 379.444 275.768 400.606 278.579 415.245C282.745 437.148 293.215 457.357 308.704 473.393C329.838 495.183 358.748 507.697 389.094 508.19C456.237 509.189 505.053 458.021 505.755 391.646C505.47 334.267 458.816 284.244 401.921 279.633C389.018 278.588 379.251 279.409 366.536 281.646C365.61 258.742 366.37 229.341 366.332 206.129C374.613 205.376 382.677 204.678 391.003 204.668C441.393 204.537 489.729 224.644 525.169 260.48C560.906 296.41 580.75 345.168 580.263 395.845C579.763 445.678 559.509 493.273 523.955 528.178C488.041 563.778 439.314 583.405 388.759 582.633C338.588 582.153 290.697 561.602 255.765 525.579C228.175 497.472 210.166 461.36 204.308 422.409C201.725 404.489 201.839 386.752 201.83 368.718L201.823 318.66L202.1 191.322C196.143 196.313 188.605 204.079 183.292 209.834C132.48 265.24 105.82 338.606 109.205 413.714C112.519 488.12 145.165 558.175 199.999 608.559C313.966 713.025 493.807 707.227 598.318 592.422C649.916 536.708 676.846 462.517 673.015 386.67C669.311 312.139 636.223 242.114 581.009 191.931C532.395 147.656 469.816 121.797 404.133 118.837C391.49 118.245 379.131 118.801 366.501 119.45C365.777 96.1581 366.743 71.481 366.363 48.0439C366.276 42.5901 366.001 14.9544 366.772 11.3153C368.101 10.1911 369.936 10.3011 371.78 10.1247Z" fill="#C8FF00"/>
              <path d="M732.149 0.0833511C758.011 -1.44181 780.282 18.1444 782.078 43.9964C783.879 69.8483 764.535 92.3293 738.711 94.4015C721.756 95.7616 705.383 87.9088 695.83 73.8376C686.278 59.7665 685.014 41.646 692.53 26.3874C700.047 11.1288 715.175 1.08369 732.149 0.0833511Z" fill="#C8FF00"/>
            </svg>
            <span className="text-accent-ui text-[14px] font-semibold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
              bappy360
            </span>
          </div>
          <div className="flex items-center gap-3 sm:gap-5 flex-wrap justify-center sm:flex-nowrap">
            {SOCIAL_LINKS.map((social) => (
              <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label={social.name}>
                <social.icon size={18} />
              </a>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground tracking-wide font-medium">
            &copy; {new Date().getFullYear()} bappy360. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   CURSOR GLOW — Subtle desktop-only mouse effect
   Two elements: small dot + soft glow ring
   Uses requestAnimationFrame + GPU compositing
   Detects hover on interactive elements for visual feedback
   ═══════════════════════════════════════════ */
function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    // Desktop-only: check for fine pointer (mouse) and no primary touch
    const isDesktop =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(pointer: coarse)").matches;

    if (!isDesktop) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Show cursor elements
    dot.style.opacity = "1";
    ring.style.opacity = "1";

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseLeave = () => {
      if (dot) dot.style.opacity = "0";
      if (ring) ring.style.opacity = "0";
    };

    const onMouseEnter = () => {
      if (dot) dot.style.opacity = "1";
      if (ring) ring.style.opacity = "1";
    };

    // Detect hover on interactive elements (links, buttons, inputs, [role="button"])
    const onElementEnter = () => {
      isHoveringRef.current = true;
      ring.classList.add("cursor-hover");
      dot.classList.add("cursor-hover");
    };

    const onElementLeave = () => {
      isHoveringRef.current = false;
      ring.classList.remove("cursor-hover");
      dot.classList.remove("cursor-hover");
    };

    // Use event delegation for hover detection — zero performance cost
    const interactiveSelector = "a, button, input, textarea, select, [role='button'], [tabindex]";

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(interactiveSelector)) {
        onElementEnter();
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const related = e.relatedTarget as HTMLElement | null;
      // Only leave hover state if not moving to another interactive element
      if (target.closest(interactiveSelector) && !(related?.closest(interactiveSelector))) {
        onElementLeave();
      }
    };

    // Animation loop: dot follows instantly, ring lerps with delay
    const animate = () => {
      // Dot: immediate
      if (dot) {
        dot.style.transform = `translate(${posRef.current.x - 4}px, ${posRef.current.y - 4}px)`;
      }

      // Ring: smooth follow with lerp
      const lerp = 0.12;
      ringPosRef.current.x += (posRef.current.x - ringPosRef.current.x) * lerp;
      ringPosRef.current.y += (posRef.current.y - ringPosRef.current.y) * lerp;

      if (ring) {
        // Adjust center offset based on hover state
        const offset = isHoveringRef.current ? 28 : 20;
        ring.style.transform = `translate(${ringPosRef.current.x - offset}px, ${ringPosRef.current.y - offset}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseout", onMouseOut, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Small accent dot — follows cursor directly */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: 0 }}
      />
      {/* Soft glow ring — follows with delay */}
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ opacity: 0 }}
      />
    </>
  );
}

/* ═══════════════════════════════════════════
   GLOBAL GRID OVERLAY — Fixed full-viewport line/grid pattern
   Base layer 10% + hover layer 30% near cursor (desktop only)
   ═══════════════════════════════════════════ */
function GlobalGridOverlay() {
  const hoverRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Initialize with center of viewport (only available client-side)
    mousePos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    currentPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const isDesktop = window.matchMedia("(pointer: fine)").matches;
    if (!isDesktop) return;

    const hover = hoverRef.current;
    if (!hover) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const lerp = 0.08;
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * lerp;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * lerp;
      hover.style.setProperty("--mouse-x", `${currentPos.current.x}px`);
      hover.style.setProperty("--mouse-y", `${currentPos.current.y}px`);
      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div className="global-grid-base" />
      <div ref={hoverRef} className="global-grid-hover" />
    </>
  );
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <CursorGlow />
      <GlobalGridOverlay />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <StatsSection />
        <About />
        <Portfolio />
        <Resume />
        <DesignNotes />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
