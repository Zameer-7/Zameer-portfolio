"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AppWindow, BrainCircuit, ChartColumnIncreasing, Code2, Database, Flame, Microscope, Rocket, Target, Wrench } from "lucide-react";

const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

function Glitter() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const isMobile = window.matchMedia("(max-width: 860px)").matches;
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    window.addEventListener("resize", resize);

    const particleCount = isMobile ? 72 : 118;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      size: Math.random() * 2.6 + 0.5,
      opacity: Math.random() * 0.9 + 0.1,
      speed: Math.random() * 0.35 + 0.08,
      sway: Math.random() * 0.8 + 0.1,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.03,
      shape: Math.random() > 0.7 ? "diamond" : "dot",
      twinkleSpeed: Math.random() * 0.014 + 0.006,
      twinkleDir: Math.random() > 0.5 ? 1 : -1,
      tone: Math.random() > 0.5 ? "accent" : "dim",
    }));

    let raf = 0;
    let frame = 0;
    const draw = () => {
      frame += 1;
      if (frame % 2 !== 0) {
        raf = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.opacity += p.twinkleSpeed * p.twinkleDir;
        if (p.opacity > 1 || p.opacity < 0) p.twinkleDir *= -1;
        p.y -= p.speed;
        p.x += Math.sin(p.angle) * p.sway * 0.15;
        p.angle += p.spin;
        if (p.y < -4) p.y = H + 4;
        if (p.x < -8) p.x = W + 8;
        if (p.x > W + 8) p.x = -8;

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, p.opacity)) * 0.85;
        ctx.fillStyle = p.tone === "accent" ? `rgba(0,173,181,${p.opacity})` : `rgba(57,62,70,${p.opacity})`;
        ctx.shadowBlur = p.tone === "accent" ? 5 : 3;
        ctx.shadowColor = p.tone === "accent" ? "#00ADB5" : "#393E46";
        if (p.shape === "diamond") {
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.fillRect(-p.size * 0.5, -p.size * 0.5, p.size, p.size);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });
      const lineSample = isMobile ? 24 : 42;
      for (let i = 0; i < lineSample; i++) {
        const a = particles[i];
        for (let j = i + 1; j < Math.min(particles.length, lineSample + 18); j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.strokeStyle = `rgba(0,173,181,${(1 - d / 90) * 0.09})`;
            ctx.lineWidth = 0.55;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }} />;
}

const skills = [
  { icon: Code2, cat: "Languages", tags: ["Python", "SQL", "HTML"] },
  { icon: ChartColumnIncreasing, cat: "Data & Visualization", tags: ["Power BI", "Pandas", "NumPy", "EDA"] },
  { icon: BrainCircuit, cat: "ML Libraries", tags: ["Scikit-learn", "TF-IDF", "XGBoost", "SHAP"] },
  { icon: Microscope, cat: "Deep Learning", tags: ["DenseNet121", "Grad-CAM", "Augmentation"] },
  { icon: Database, cat: "Databases & Infra", tags: ["PostgreSQL", "MySQL", "ClickHouse", "Docker"] },
  { icon: Wrench, cat: "Tools & Platforms", tags: ["Jupyter", "Google Colab", "VS Code", "GitHub"] },
  { icon: AppWindow, cat: "Frameworks", tags: ["Flask", "Streamlit", "FastAPI"] },
];

const projects = [
  {
    num: "01",
    badge: "NLP · ML",
    title: "AI Resume Screener",
    desc: "Built an NLP-based screening system using TF-IDF and cosine similarity to identify skill gaps, with XGBoost classification and SHAP-based explainability.",
    tech: ["Python", "TF-IDF", "XGBoost", "SHAP", "NLP"],
  },
  {
    num: "02",
    badge: "Regression · EDA",
    title: "BigMart Sales Prediction",
    desc: "Developed an end-to-end regression pipeline on historical BigMart data, covering EDA, preprocessing, model training, and evaluation for inventory planning.",
    tech: ["Python", "Scikit-learn", "Pandas", "NumPy", "EDA"],
  },
  {
    num: "03",
    badge: "Deep Learning · CV",
    title: "Chest X-Ray Pneumonia Detection",
    desc: "Implemented a DenseNet121-based binary classifier for chest X-ray analysis, integrated Grad-CAM for explainability, and deployed the solution with Streamlit.",
    tech: ["DenseNet121", "Grad-CAM", "Streamlit", "Deep Learning"],
  },
  {
    num: "04",
    badge: "Fraud Detection · FinTech",
    title: "FRMS - Fraud Risk Management System",
    desc: "Designed and implemented an FRMS pipeline during internship to detect suspicious transaction patterns with scalable, analytics-ready data architecture.",
    tech: ["Python", "Docker", "PostgreSQL", "MySQL", "ClickHouse", "Fraud Detection"],
  },
];

const certs = [
  { name: "Exploratory Data Analysis for ML", detail: "30hr · Certisured, SVIT" },
  { name: "Intuition Building for Machine Learning", detail: "40hr · Analogica, SVIT" },
  { name: "Deep Learning", detail: "12-week · NPTEL, IIT Ropar" },
  { name: "Artificial Intelligence Fundamentals", detail: "IBM SkillBuild" },
];

const roadmap = [
  {
    year: "1st Year",
    period: "2022 - 2023",
    phase: "Foundation Phase",
    icon: Rocket,
    summary: "Established strong engineering fundamentals and core AI/ML readiness.",
    highlights: [
      "Started B.E. in AI & ML at SVIT",
      "Built strong proficiency in Python, C, Data Structures & Engineering Mathematics",
      "Discovered passion for Machine Learning & Problem Solving",
      "Maintained strong academic performance",
    ],
    turning: "Defined AI/ML as the long-term specialization and aligned learning priorities accordingly.",
    tags: ["Python", "C Programming", "Data Structures", "Engineering Maths"],
  },
  {
    year: "2nd Year",
    period: "2023 - 2024",
    phase: "Exploration Phase",
    icon: BrainCircuit,
    summary: "Transitioned from academic learning to structured ML implementation practice.",
    highlights: [
      "Learned ML fundamentals, Pandas, NumPy, Scikit-learn",
      "Completed EDA for ML - Certisured (30hr)",
      "Completed Intuition Building for ML - Analogica (40hr)",
      "Built mini project: Predictive Analysis of Mobile Phone Usage",
      "Completed Theory of Computation basics",
      "Joined CSI (Computer Society of India) at SVIT",
      "Active Infosys Springboard learner",
      "Sharpened presentation & technical confidence",
    ],
    turning: "Moved from concept-level understanding to outcome-driven problem-solving in ML workflows.",
    tags: ["Scikit-learn", "Pandas", "NumPy", "EDA", "CSI Member"],
  },
  {
    year: "3rd Year",
    period: "2024 - 2025",
    phase: "Project Building Phase",
    icon: Flame,
    summary: "Executed multiple end-to-end projects across NLP, forecasting, and medical AI.",
    highlights: [
      "Fake News Detection - TF-IDF, Logistic Regression, Random Forest, F1-score",
      "Explored BERT training on Google Colab",
      "AI Resume Screener - concept-based NLP matching, SHAP explainability, XGBoost",
      "BigMart Sales Prediction - end-to-end regression pipeline",
      "Chest X-Ray Pneumonia Detection - DenseNet121 + Grad-CAM + Streamlit",
      "Completed Deep Learning (NPTEL, IIT Ropar - 12 weeks)",
      "Completed AI Fundamentals - IBM SkillBuild",
    ],
    turning: "Prioritized production-relevant architecture, measurable results, and explainability.",
    tags: ["NLP", "HuggingFace", "TF-IDF", "XGBoost", "SHAP", "DenseNet121", "Grad-CAM", "Streamlit", "Flask", "NLTK", "Power BI"],
  },
  {
    year: "4th Year",
    period: "2025 - 2026",
    phase: "Growth & Career Focus",
    icon: Target,
    summary: "Currently working as an intern at Innovitegra Solutions while targeting high-impact AI/ML roles.",
    highlights: [
      "Currently working as AI/ML Intern at Innovitegra Solutions",
      "Built FRMS (Fraud Risk Management System) project for fraud pattern detection",
      "FRMS stack: Docker, PostgreSQL, MySQL, ClickHouse",
      "CGPA improved consistently to 8.7",
      "Exploring fraud detection systems",
      "Preparing for product engineer placements (DeltaX & top firms)",
      "Started Forex & index trading - Angel One, scalping",
      "Designing ML-based trading bot with risk management",
    ],
    turning: "Focused on production-grade system design, scalability, and deployment-oriented execution.",
    tags: ["Innovitegra", "FRMS", "Docker", "PostgreSQL", "MySQL", "ClickHouse", "Trading Bot", "Fraud Detection", "Stock Prediction", "Bangalore"],
  },
];

export default function Portfolio() {
  const [hov, setHov] = useState(false);
  const [activeRoadmap, setActiveRoadmap] = useState(0);
  const [heroImgMissing, setHeroImgMissing] = useState(false);
  const ballRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const animateCursor = () => {
      if (ballRef.current) {
        const { x, y } = mouseRef.current;
        ballRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(animateCursor);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    rafRef.current = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".fu");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fv");
          }
        });
      },
      { threshold: 0.08 },
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const H = { onMouseEnter: () => setHov(true), onMouseLeave: () => setHov(false) };

  const css = `
    @import url('https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --red:    #222831;
      --red2:   #393E46;
      --redbg:  #222831;
      --redbg2: #393E46;
      --light:  #EEEEEE;
      --cream:  #EEEEEE;
      --muted:  rgba(238,238,238,0.62);
      --card:   rgba(34,40,49,0.55);
      --border: rgba(0,173,181,0.28);
      --gold:   #00ADB5;
    }

    html { scroll-behavior: smooth; }
    body {
      background: linear-gradient(90deg, #081126 0%, #0d1a33 50%, #081126 100%);
      color: var(--light);
      font-family: 'Inter', sans-serif;
      cursor: none;
      overflow-x: hidden;
      min-height: 100vh;
    }
    body::before {
      content: "";
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      background:
        radial-gradient(40% 55% at 0% 50%, rgba(0,173,181,.08), transparent 75%),
        radial-gradient(40% 55% at 100% 50%, rgba(0,173,181,.08), transparent 75%);
      animation: none;
    }
    body::after {
      content: "";
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      opacity: .12;
      background-image:
        linear-gradient(rgba(0,173,181,.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,173,181,.08) 1px, transparent 1px);
      background-size: 44px 44px;
      mask-image: linear-gradient(180deg, rgba(0,0,0,.15), rgba(0,0,0,.7));
    }

    .ball {
      width: 10px; height: 10px;
      background: var(--gold);
      border-radius: 50%;
      position: fixed; pointer-events: none; z-index: 9999;
      transform: translate(-50%,-50%);
      box-shadow: 0 0 10px var(--gold), 0 0 20px rgba(0,173,181,.45);
      transition: width .15s, height .15s;
    }
    .ball.h { width: 15px; height: 15px; }

    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      padding: 18px 52px; display: flex; justify-content: space-between; align-items: center;
      background: rgba(34,40,49,0.68);
      backdrop-filter: blur(18px);
      border-bottom: 1px solid var(--border);
    }
    .logo {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: var(--gold);
      color: #081126;
      padding: 6px 11px;
      font-family: 'Inter', sans-serif;
      font-size: 18px;
      font-weight: 900;
      letter-spacing: .2px;
      line-height: 1;
      box-shadow: 0 4px 16px rgba(0,173,181,.4);
    }
    .nl { display: flex; gap: 36px; }
    .nl a { color: rgba(238,238,238,.78); font-size: 12px; text-decoration: none; letter-spacing: 2.8px; text-transform: uppercase; transition: color .2s; font-weight: 600; }
    .nl a:hover { color: var(--gold); }

    .hero {
      min-height: 100vh; display: flex; align-items: center;
      padding: 120px 52px 80px; position: relative; overflow: hidden;
    }
    .hero-inner {
      width: 100%;
      display: grid;
      grid-template-columns: 1.05fr 0.95fr;
      gap: 34px;
      align-items: center;
      position: relative;
      z-index: 1;
    }
    .hero::before {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(180deg, rgba(0,0,0,.08), transparent 45%);
      pointer-events: none;
    }
    .hero::after {
      content: "";
      position: absolute;
      right: -140px;
      top: 10%;
      width: 380px;
      height: 380px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0,173,181,.06) 0%, rgba(0,173,181,0) 75%);
      filter: blur(20px);
      animation: floatOrb 7s ease-in-out infinite alternate;
      pointer-events: none;
    }
    @keyframes floatOrb {
      from { transform: translateY(-8px); }
      to { transform: translateY(18px); }
    }
    .hc { position: relative; z-index: 1; max-width: 760px; }
    .hero-photo-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      transform: translateX(0);
    }
    .hero-photo-card {
      width: min(430px, 92%);
      max-width: 100%;
      border: 1px solid rgba(0,173,181,.34);
      background: linear-gradient(165deg, rgba(0,173,181,.12), rgba(34,40,49,.72));
      padding: 12px;
      backdrop-filter: blur(8px);
      box-shadow: 0 14px 46px rgba(0,0,0,.45), 0 0 32px rgba(0,173,181,.28);
      position: relative;
      overflow: hidden;
    }
    .hero-photo-card::before {
      content: "";
      position: absolute;
      inset: 0;
      border: 1px solid rgba(0,173,181,.22);
      pointer-events: none;
    }
    .hero-photo-card::after {
      content: "";
      position: absolute;
      inset: auto 0 0 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, rgba(0,173,181,.7), transparent);
      pointer-events: none;
    }
    .hero-photo-card > span::before {
      content: "";
      position: absolute;
      inset: -14px;
      border-radius: 2px;
      border: 1px solid rgba(0,173,181,.24);
      box-shadow: 0 0 28px rgba(0,173,181,.35);
      pointer-events: none;
    }
    .hero-photo-card img {
      width: 100%;
      height: auto;
      max-height: 560px;
      object-fit: cover;
      display: block;
      border: 1px solid rgba(0,173,181,.2);
    }
    .hero-photo-fallback {
      width: 100%;
      min-height: 420px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 20px;
      color: rgba(238,238,238,.72);
      border: 1px dashed rgba(0,173,181,.35);
      background: rgba(34,40,49,.5);
      font-size: 12px;
      line-height: 1.7;
    }

    .hbadge {
      display: inline-flex; align-items: center; gap: 10px;
      border: 1px solid rgba(0,173,181,.45);
      background: rgba(0,173,181,.14);
      padding: 7px 18px; margin-bottom: 28px;
      font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; color: var(--gold);
      max-width: 100%;
    }
    .hbdot { width: 6px; height: 6px; border-radius: 50%; background: var(--gold); animation: bk 2s infinite; }
    @keyframes bk { 0%,100%{opacity:1;} 50%{opacity:.2;} }

    h1 {
      font-family: 'Satoshi', sans-serif;
      font-size: clamp(38px, 5.5vw, 64px);
      font-weight: 800; line-height: .96; letter-spacing: -1.8px;
      text-transform: none;
      margin-bottom: 14px;
      color: #fff;
      text-shadow: 0 2px 40px rgba(34,40,49,.3);
      white-space: nowrap;
      max-width: 100%;
    }
    .aw {
      color: var(--gold);
      text-shadow: 0 0 30px rgba(0,173,181,.6), 0 2px 40px rgba(34,40,49,.3);
    }
    .hrole {
      font-family: 'Satoshi', sans-serif; font-size: clamp(18px,3vw,30px);
      font-weight: 600; color: rgba(238,238,238,.82); margin-bottom: 18px; letter-spacing: -.3px;
    }
    .hrole em { color: #fff; font-style: normal; }
    .hdesc { font-size: 14px; color: rgba(238,238,238,.76); line-height: 1.75; max-width: 520px; margin-bottom: 32px; font-weight: 400; }

    .hcta { display: flex; gap: 12px; margin-bottom: 40px; }
    .bp {
      background: var(--gold); color: #222831;
      padding: 13px 28px; font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 700;
      letter-spacing: 1.5px; text-transform: uppercase; border: none; cursor: none;
      display: inline-flex; align-items: center; gap: 9px; transition: all .2s;
      text-decoration: none;
      box-shadow: 0 4px 20px rgba(0,173,181,.4);
    }
    .bp:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,173,181,.55); }
    .bo {
      background: rgba(255,255,255,.08); color: #fff;
      padding: 13px 28px; border: 1px solid rgba(255,255,255,.25); font-family: 'Inter', sans-serif;
      font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; cursor: none;
      display: inline-flex; align-items: center; gap: 9px; transition: all .2s; text-decoration: none;
    }
    .bo:hover { background: rgba(255,255,255,.15); border-color: var(--gold); color: var(--gold); }

    .stat-row { display: flex; gap: 40px; }
    .stat { border-left: 2px solid rgba(0,173,181,.45); padding-left: 18px; }
    .sn { font-family: 'Satoshi', sans-serif; font-size: 40px; font-weight: 900; color: #fff; line-height: 1; }
    .sl { font-size: 9px; color: rgba(238,238,238,.58); letter-spacing: 3px; text-transform: uppercase; margin-top: 3px; }

    .hside {
      position: absolute; right: 52px; top: 50%; transform: translateY(-50%);
      display: flex; flex-direction: column; gap: 32px; z-index: 1;
    }
    .hstat { text-align: right; padding-right: 18px; border-right: 2px solid rgba(0,173,181,.4); }

    section { padding: 68px 52px; position: relative; z-index: 1; }
    .sec-divider { display: none; }

    .sh { display: flex; align-items: center; gap: 14px; margin-bottom: 24px; }
    .stag { font-size: 13px; letter-spacing: 4px; text-transform: uppercase; color: var(--gold); white-space: nowrap; }
    .sline { display: none; }
    .stitle { font-family: 'Satoshi', sans-serif; font-size: clamp(26px,4vw,44px); font-weight: 900; letter-spacing: -1.5px; color: #fff; margin-bottom: 18px; }

    .gcard {
      background: rgba(34,40,49,.45);
      border: 1px solid rgba(0,173,181,.22);
      backdrop-filter: blur(10px);
      position: relative;
      overflow: hidden;
      transition: all .3s;
    }
    .gcard::after {
      content: "";
      position: absolute;
      inset: -40% auto auto -30%;
      width: 65%;
      height: 180%;
      background: linear-gradient(120deg, transparent, rgba(0,173,181,.22), transparent);
      transform: translateX(-130%) rotate(12deg);
      transition: transform .55s ease;
      pointer-events: none;
    }
    .gcard:hover { background: rgba(34,40,49,.62); border-color: rgba(0,173,181,.35); }
    .gcard:hover::after { transform: translateX(260%) rotate(12deg); }

    .vtabs { display: flex; gap: 1px; margin-bottom: 32px; }
    .vt {
      padding: 8px 20px; font-family: 'Inter', sans-serif; font-size: 10px;
      letter-spacing: 2px; text-transform: uppercase;
      background: rgba(34,40,49,.45); border: 1px solid rgba(0,173,181,.22);
      color: rgba(238,238,238,.56); cursor: none; transition: all .2s;
    }
    .vt.on { background: rgba(0,173,181,.18); border-color: rgba(0,173,181,.5); color: var(--gold); }

    .sg { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; }
    .sc { padding: 26px 22px; position: relative; overflow: hidden; transition: all .3s; }
    .sc::before { content:''; position:absolute; left:0; top:0; bottom:0; width:3px; background: var(--gold); transform:scaleY(0); transition:transform .3s; transform-origin:bottom; }
    .sc:hover::before { transform:scaleY(1); }
    .sci { margin-bottom: 12px; color: var(--gold); }
    .skill-lucide { width: 22px; height: 22px; stroke-width: 2.1; }
    .scat { font-family: 'Satoshi', sans-serif; font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 12px; }
    .stgs { display: flex; flex-wrap: wrap; gap: 5px; }
    .stg {
      font-size: 10.5px;
      font-weight: 600;
      padding: 4px 9px;
      border: 1px solid rgba(0,173,181,.55);
      color: var(--light);
      background: rgba(57,62,70,.9);
      letter-spacing: .35px;
    }

    .sbars { display: flex; flex-direction: column; gap: 16px; }
    .brrow { display: flex; align-items: center; gap: 22px; margin-bottom: 6px; }
    .brl { font-family: 'Satoshi', sans-serif; font-size: 13px; font-weight: 700; width: 190px; flex-shrink: 0; color: #fff; }
    .brt { flex: 1; height: 5px; background: rgba(0,173,181,.22); overflow: hidden; }
    .brf { height: 100%; background: linear-gradient(90deg, var(--gold), rgba(57,62,70,.45)); animation: gr 1.1s cubic-bezier(.22,1,.36,1) forwards; transform-origin: left; }
    @keyframes gr { from{transform:scaleX(0)} to{transform:scaleX(1)} }
    .brtgs { display: flex; gap: 8px; flex-wrap: wrap; padding-left: 212px; margin-bottom: 10px; }
    .brtg { font-size: 9px; color: rgba(238,238,238,.56); letter-spacing: 1px; text-transform: uppercase; }

    .smin { display: grid; grid-template-columns: 1fr 1fr; }
    .smi { padding: 20px 22px; border-bottom: 1px solid rgba(0,173,181,.16); display: flex; gap: 14px; align-items: flex-start; transition: background .2s; }
    .smi:hover { background: rgba(0,173,181,.1); }
    .smn { font-family: 'Satoshi', sans-serif; font-size: 11px; color: rgba(238,238,238,.46); margin-top: 2px; width: 22px; flex-shrink: 0; }
    .smcat { font-family: 'Satoshi', sans-serif; font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 7px; }
    .smtg { font-size: 10px; color: rgba(238,238,238,.58); }
    .smtg:not(:last-child)::after { content: ' ·\\00a0'; }

    .pg { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; }
    .pc { padding: 38px 34px; position: relative; overflow: hidden; transition: all .3s; }
    .pc:last-child { grid-column: 1/-1; }
    .pc:hover { transform: translateY(-3px); }
    .pnum { font-family: 'Satoshi', sans-serif; font-size: 54px; font-weight: 900; color: rgba(0,173,181,.16); position: absolute; top: 18px; right: 24px; line-height: 1; }
    .pbadge { display: inline-block; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--gold); border: 1px solid rgba(0,173,181,.4); padding: 3px 10px; margin-bottom: 16px; background: rgba(0,173,181,.14); }
    .ptitle { font-family: 'Satoshi', sans-serif; font-size: 21px; font-weight: 900; margin-bottom: 14px; letter-spacing: -.5px; color: #fff; }
    .pdesc { font-size: 12.5px; color: rgba(238,238,238,.68); line-height: 1.85; margin-bottom: 22px; font-weight: 300; }
    .ptechs { display: flex; flex-wrap: wrap; gap: 5px; }
    .ptag {
      font-size: 9.5px;
      padding: 3px 9px;
      border: 1px solid rgba(0,173,181,.4);
      color: rgba(238,238,238,.95);
      background: rgba(57,62,70,.82);
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    .eg { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; }
    .ec { padding: 34px; transition: all .3s; }
    .eyr { font-size: 12px; letter-spacing: 3px; color: var(--gold); margin-bottom: 12px; text-transform: uppercase; }
    .edeg { font-family: 'Satoshi', sans-serif; font-size: 18px; font-weight: 800; margin-bottom: 8px; letter-spacing: -.5px; line-height: 1.2; color: #fff; }
    .eschool { font-size: 12px; color: rgba(238,238,238,.6); margin-bottom: 18px; }
    .ecgpa { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; color: var(--gold); border: 1px solid rgba(0,173,181,.35); padding: 5px 12px; background: rgba(0,173,181,.14); }
    .certs { display: flex; flex-direction: column; }
    .crow { display: flex; align-items: center; gap: 14px; padding: 16px 22px; border-bottom: 1px solid rgba(0,173,181,.16); transition: all .2s; border-left: 2px solid transparent; }
    .crow:hover { padding-left: 30px; border-left-color: var(--gold); background: rgba(0,173,181,.1); }
    .cdot { width: 5px; height: 5px; border-radius: 50%; background: var(--gold); flex-shrink: 0; }
    .cn { font-size: 12.5px; color: rgba(255,240,230,.85); flex: 1; }
    .cd { font-size: 10px; color: rgba(238,238,238,.5); text-align: right; white-space: nowrap; }

    .edu-head {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1px;
      margin-bottom: 10px;
    }
    .edu-col-title {
      font-size: 13px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: var(--gold);
      padding: 0 4px;
    }
    .edu-col-title:last-child { text-align: left; }

    .journey-wrap {
      position: relative;
      border: 1px solid rgba(0,173,181,.22);
      background: linear-gradient(180deg, rgba(16,24,39,.58), rgba(10,15,26,.72));
      backdrop-filter: blur(10px);
      padding: 22px 18px 18px;
      overflow: hidden;
    }
    .journey-wrap::before {
      content: "";
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at center, rgba(0,173,181,.08), transparent 68%);
      pointer-events: none;
    }
    .roadmap-h { position: relative; z-index: 2; }
    .rm-scroll {
      overflow-x: auto;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      padding-bottom: 8px;
      scrollbar-width: thin;
      scrollbar-color: rgba(0,173,181,.55) rgba(0,0,0,.2);
    }
    .rm-scroll::-webkit-scrollbar { height: 6px; }
    .rm-scroll::-webkit-scrollbar-track { background: rgba(0,0,0,.2); }
    .rm-scroll::-webkit-scrollbar-thumb {
      background: rgba(0,173,181,.55);
      border-radius: 20px;
    }
    .rm-track { min-width: 680px; }
    .rm-line {
      height: 2px;
      margin: 18px 22px 0;
      background: linear-gradient(90deg, rgba(57,62,70,.2), rgba(0,173,181,.75), rgba(57,62,70,.2));
      box-shadow: 0 0 14px rgba(0,173,181,.35);
    }
    .rm-points {
      margin-top: -18px;
      display: grid;
      grid-template-columns: repeat(4, minmax(120px, 1fr));
      gap: 8px;
    }
    .rm-point { text-align: center; }
    .rm-dot {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      margin: 0 auto 10px;
      border: 2px solid rgba(0,173,181,.35);
      background: rgba(34,40,49,.95);
      color: var(--light);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      transition: all .25s;
      box-shadow: 0 0 0 rgba(0,173,181,0);
      cursor: none;
    }
    .rm-dot svg {
      width: 17px;
      height: 17px;
      stroke-width: 2.2;
    }
    .rm-dot:hover,
    .rm-dot.active {
      border-color: var(--gold);
      transform: translateY(-2px) scale(1.08);
      box-shadow: 0 0 20px rgba(0,173,181,.5);
    }
    .rm-point-year {
      font-size: 12px;
      color: rgba(238,238,238,.82);
      letter-spacing: 1px;
      margin-bottom: 3px;
    }
    .rm-point-period {
      font-size: 9px;
      color: rgba(238,238,238,.5);
      letter-spacing: .8px;
    }
    .rm-popup {
      margin-top: 22px;
      background: rgba(34,40,49,.66);
      border: 1px solid rgba(0,173,181,.25);
      padding: 18px 18px 16px;
      position: relative;
    }
    .rm-popup::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 3px;
      height: 100%;
      background: linear-gradient(180deg, var(--gold), transparent 85%);
    }
    .rm-popup-top {
      display: flex;
      flex-wrap: wrap;
      gap: 10px 14px;
      align-items: baseline;
      margin-bottom: 10px;
    }
    .rm-popup-phase {
      font-size: 11px;
      letter-spacing: 2.4px;
      text-transform: uppercase;
      color: var(--gold);
    }
    .rm-popup-year {
      font-size: 22px;
      font-weight: 900;
      color: #fff;
      letter-spacing: -.6px;
    }
    .rm-popup-period {
      font-size: 10px;
      color: rgba(238,238,238,.5);
      letter-spacing: 1px;
    }
    .rm-popup-summary {
      font-size: 12.5px;
      color: rgba(238,238,238,.82);
      line-height: 1.65;
      margin-bottom: 12px;
      font-style: italic;
    }
    .rm-popup-list {
      list-style: none;
      margin-bottom: 12px;
      columns: 2;
      column-gap: 20px;
    }
    .rm-popup-list li {
      break-inside: avoid;
      font-size: 11px;
      color: rgba(238,238,238,.76);
      line-height: 1.5;
      margin-bottom: 8px;
      display: flex;
      gap: 7px;
      align-items: flex-start;
    }
    .rm-dot-mini {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: var(--gold);
      margin-top: 6px;
      flex-shrink: 0;
    }
    .rm-popup-turning {
      font-size: 11px;
      color: var(--gold);
      padding: 9px 12px;
      border: 1px solid rgba(0,173,181,.25);
      background: rgba(0,173,181,.08);
      margin-bottom: 10px;
      line-height: 1.55;
    }
    .rm-popup-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .rm-popup-tag {
      font-size: 9px;
      padding: 3px 9px;
      border: 1px solid rgba(0,173,181,.28);
      color: rgba(238,238,238,.8);
      background: rgba(0,173,181,.1);
      letter-spacing: .5px;
    }

    .ct-head { display: flex; align-items: center; gap: 20px; margin-bottom: 26px; }
    .ct-line { flex: 1; height: 1px; background: rgba(0,173,181,.28); }
    .ct-tag { font-size: 13px; letter-spacing: 4px; text-transform: uppercase; color: var(--gold); white-space: nowrap; }
    .ct-center { text-align: center; max-width: 520px; margin: 0 auto; }
    .ct-title { font-family: 'Satoshi', sans-serif; font-size: clamp(28px,5vw,50px); font-weight: 900; letter-spacing: -2px; margin-bottom: 10px; color: #fff; }
    .ct-desc { font-size: 13.5px; color: rgba(238,238,238,.68); line-height: 1.85; font-weight: 300; margin-bottom: 24px; }
    .clinks { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; }
    .cl { display: flex; align-items: center; gap: 9px; padding: 13px 22px; color: rgba(255,240,230,.85); text-decoration: none; font-size: 12px; transition: all .2s; cursor: none; }
    .cl:hover { color: var(--gold); transform: translateY(-2px); }

    footer { padding: 24px 52px; border-top: 1px solid rgba(0,173,181,.24); display: flex; justify-content: space-between; font-size: 10px; color: rgba(238,238,238,.5); letter-spacing: 1px; position: relative; z-index:1; }

    .fu { opacity: 0; transform: translateY(22px); transition: opacity .65s cubic-bezier(.22,1,.36,1), transform .65s cubic-bezier(.22,1,.36,1); }
    .fv { opacity: 1; transform: none; }

    @media (max-width: 860px) {
      nav { padding: 12px 14px; } .nl { display: none; }
      .logo { font-size: 15px; padding: 5px 9px; }
      .hero { padding: 88px 16px 48px; } .hside { display: none; }
      .hero-inner { grid-template-columns: 1fr; }
      .hero-photo-wrap { justify-content: center; transform: none; }
      .hero-photo-card { width: min(420px, 100%); margin-top: 8px; }
      .hbadge {
        width: 100%;
        justify-content: center;
        padding: 8px 10px;
        font-size: 8.5px;
        letter-spacing: 1.8px;
        text-align: center;
        line-height: 1.5;
        white-space: normal;
      }
      h1 {
        font-size: clamp(32px, 11.2vw, 52px);
        letter-spacing: -0.8px;
        line-height: 1.03;
        white-space: normal;
      }
      .hrole {
        font-size: clamp(17px, 6.2vw, 28px);
        margin-bottom: 14px;
      }
      .hdesc {
        font-size: 13px;
        line-height: 1.65;
        margin-bottom: 24px;
      }
      .hcta { margin-bottom: 28px; }
      .stat-row {
        gap: 16px;
        flex-wrap: wrap;
      }
      section { padding: 44px 16px; }
      .sg, .pg, .eg, .smin { grid-template-columns: 1fr; }
      .pc:last-child { grid-column: auto; }
      .brtgs { padding-left: 0; }
      .edu-head { grid-template-columns: 1fr; gap: 10px; }
      .rm-track { min-width: 520px; }
      .rm-points { grid-template-columns: repeat(4, minmax(110px, 1fr)); }
      .rm-popup-list { columns: 1; }
      footer { padding: 18px 20px; flex-direction: column; gap: 6px; }
    }

    @media (hover: none), (pointer: coarse) {
      body { cursor: auto; }
      .ball { display: none; }
      .bp, .bo, .rm-dot, .cl { cursor: pointer; }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <Glitter />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div ref={ballRef} className={`ball${hov ? " h" : ""}`} />

        <nav>
          <div className="logo">MZ</div>
          <div className="nl">
            {["About", "Skills", "Projects", "Education", "Journey", "Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} {...H}>
                {l}
              </a>
            ))}
          </div>
        </nav>

        <section className="hero" id="about">
          <div className="hero-inner">
            <div className="hc">
              <div className="hbadge">
              <span className="hbdot" />AI/ML Intern at Innovitegra Solutions · Open to Full-Time Roles (2026)
              </div>
            <h1>
              Mohamed <span className="aw">Zameer</span> Z
            </h1>
              <div className="hrole">
                AI & Machine Learning <em>Engineer</em>
              </div>
              <p className="hdesc">
                Final-year B.E. student in AI & ML at SVIT, building intelligent systems across NLP, predictive
                modeling, and deep-learning-based medical imaging. Currently working as an AI/ML intern at
                Innovitegra Solutions. CGPA 8.7 · CSI Member.
              </p>
              <div className="hcta">
                <a
                  href="https://www.linkedin.com/in/mohamed-zameer-z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bp"
                  {...H}
                >
                  <LinkedInIcon /> LinkedIn
                </a>
                <a href="http://github.com/Zameer-7" target="_blank" rel="noopener noreferrer" className="bo" {...H}>
                  <GitHubIcon /> GitHub
                </a>
              </div>
              <div className="stat-row">
                {[
                  ["4", "Projects"],
                  ["8.7", "CGPA"],
                  ["4", "Certifications"],
                ].map(([n, l]) => (
                  <div key={l} className="stat">
                    <div className="sn">{n}</div>
                    <div className="sl">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-photo-wrap fu">
              <figure className="hero-photo-card">
                {heroImgMissing ? (
                  <div className="hero-photo-fallback">
                    Place your image at
                    <br />
                    <code>public/profile-ieee.jpeg</code>
                  </div>
                ) : (
                  <Image
                    src="/profile-ieee.jpeg"
                    alt="Mohamed Zameer at IEEE Bangalore Section event"
                    width={900}
                    height={1400}
                    onError={() => setHeroImgMissing(true)}
                  />
                )}
              </figure>
            </div>
          </div>
        </section>

        <section id="skills">
          <div className="sh fu">
            <span className="stag">Technical Skills</span>
            <div className="sline" />
          </div>
          <div className="stitle fu">Core Technical Stack</div>
          <div className="sg">
            {skills.map((s, i) => (
              <div key={i} className="sc gcard fu" {...H}>
                <div className="sci">
                  <s.icon className="skill-lucide" />
                </div>
                <div className="scat">{s.cat}</div>
                <div className="stgs">
                  {s.tags.map((t) => (
                    <span key={t} className="stg">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="sec-divider" />

        <section id="projects">
          <div className="sh fu">
            <span className="stag">Projects</span>
            <div className="sline" />
          </div>
          <div className="stitle fu">Project Portfolio</div>
          <div className="pg">
            {projects.map((p, i) => (
              <div key={i} className="pc gcard fu" {...H}>
                <div className="pnum">{p.num}</div>
                <div className="pbadge">{p.badge}</div>
                <div className="ptitle">{p.title}</div>
                <p className="pdesc">{p.desc}</p>
                <div className="ptechs">
                  {p.tech.map((t) => (
                    <span key={t} className="ptag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="sec-divider" />

        <section id="education">
          <div className="sh fu">
            <span className="stag">Education & Certifications</span>
            <div className="sline" />
          </div>
          <div className="edu-head fu">
            <div className="edu-col-title">Education</div>
            <div className="edu-col-title">Certifications</div>
          </div>
          <div className="eg">
            <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
              {[
                {
                  yr: "2022 - 2026",
                  deg: "B.E. in Artificial Intelligence & Machine Learning",
                  school: "Sai Vidya Institute of Technology",
                  cgpa: "8.7",
                },
                { yr: "2020 - 2022", deg: "2nd PUC (Pre-University)", school: "Chethana PU College", cgpa: null },
              ].map((e, i) => (
                <div key={i} className="ec gcard fu" {...H}>
                  <div className="eyr">{e.yr}</div>
                  <div className="edeg">{e.deg}</div>
                  <div className="eschool">{e.school}</div>
                  {e.cgpa && <div className="ecgpa">{"\u2726"} CGPA {e.cgpa}</div>}
                </div>
              ))}
            </div>
            <div className="certs gcard">
              {certs.map((c, i) => (
                <div key={i} className="crow fu" {...H}>
                  <div className="cdot" />
                  <div className="cn">{c.name}</div>
                  <div className="cd">{c.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="sec-divider" />

        <section id="journey">
          <div className="sh fu">
            <span className="stag">My Journey</span>
            <div className="sline" />
          </div>
          <div className="stitle fu">Professional Journey</div>
          <div className="journey-wrap fu">
            <div className="roadmap-h">
              <div className="rm-scroll">
                <div className="rm-track">
                  <div className="rm-line" />
                  <div className="rm-points">
                    {roadmap.map((r, i) => (
                      <div className="rm-point" key={r.year}>
                        <button
                          className={`rm-dot ${activeRoadmap === i ? "active" : ""}`}
                          onMouseEnter={() => {
                            setActiveRoadmap(i);
                            setHov(true);
                          }}
                          onMouseLeave={() => setHov(false)}
                          onClick={() => setActiveRoadmap(i)}
                          aria-label={`${r.year} details`}
                        >
                          <r.icon />
                        </button>
                        <div className="rm-point-year">{r.year}</div>
                        <div className="rm-point-period">{r.period}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rm-popup">
                <div className="rm-popup-top">
                  <div className="rm-popup-phase">{roadmap[activeRoadmap].phase}</div>
                  <div className="rm-popup-year">{roadmap[activeRoadmap].year}</div>
                  <div className="rm-popup-period">{roadmap[activeRoadmap].period}</div>
                </div>
                <div className="rm-popup-summary">&quot;{roadmap[activeRoadmap].summary}&quot;</div>
                <ul className="rm-popup-list">
                  {roadmap[activeRoadmap].highlights.map((h, j) => (
                    <li key={j}>
                      <span className="rm-dot-mini" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="rm-popup-turning">💡 {roadmap[activeRoadmap].turning}</div>
                <div className="rm-popup-tags">
                  {roadmap[activeRoadmap].tags.map((t) => (
                    <span key={t} className="rm-popup-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="sec-divider" />

        <section id="contact">
          <div className="ct-head fu">
            <div className="ct-line" />
            <span className="ct-tag">Contact</span>
            <div className="ct-line" />
          </div>
          <div className="ct-center fu">
            <div className="ct-title">Let&apos;s Connect</div>
            <p className="ct-desc">
              Graduating in 2026 and actively seeking full-time opportunities in AI, ML, and Data Science. If
              you&apos;re hiring or interested in collaboration, feel free to reach out.
            </p>
            <div className="clinks">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=zameer.trichy@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="cl gcard"
                {...H}
              >
                <MailIcon /> zameer.trichy@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/mohamed-zameer-z"
                target="_blank"
                rel="noopener noreferrer"
                className="cl gcard"
                {...H}
              >
                <LinkedInIcon /> LinkedIn
              </a>
              <a
                href="http://github.com/Zameer-7"
                target="_blank"
                rel="noopener noreferrer"
                className="cl gcard"
                {...H}
              >
                <GitHubIcon /> GitHub
              </a>
            </div>
          </div>
        </section>

        <footer>
          <span>© 2026 Mohamed Zameer Z</span>
          <span>AI & Machine Learning · SVIT</span>
        </footer>
      </div>
    </>
  );
}
