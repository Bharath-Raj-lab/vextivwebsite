const fs = require('fs');
const { logger } = require('./logger');

let code = fs.readFileSync('components/sections/ServicesPreview.tsx', 'utf8');

// 1. Ensure all icons are imported
const importsMatch = code.match(/import\s+{([^}]+)}\s+from\s+["']lucide-react["'];/);
if (importsMatch) {
  const currentImports = importsMatch[1];
  const requiredIcons = [
    "Globe", "QrCode", "Palette", "Share2", "Video", "MapPin", 
    "ChevronLeft", "ChevronRight", "ArrowRight", "ArrowUp", 
    "Layout", "Smartphone", "Monitor", "Heart", "MessageCircle", 
    "Play", "Coffee", "TrendingUp", "MousePointerClick",
    "Instagram", "Facebook", "Youtube", "Linkedin", "Star", 
    "Store", "BarChart2", "Calendar", "Settings", "Home"
  ];
  
  let newImports = currentImports;
  for (const icon of requiredIcons) {
    if (!newImports.includes(icon)) {
      newImports += `, ${icon}`;
    }
  }
  code = code.replace(importsMatch[0], `import { ${newImports} } from "lucide-react";`);
}

// 2. Replace the SERVICES array
const newServicesArray = `const SERVICES: ServicePage[] = [
  {
    icon: <MapPin size={22} strokeWidth={1.5} aria-hidden="true" />,
    name: "Local SEO & Google Business",
    positioning:
      "Dominate local search and get found by nearby customers",
    benefits: [
      "Optimized Google Business Profile for maximum visibility",
      "Local keyword strategy that drives foot traffic",
      "Review management that builds trust and credibility",
    ],
    accentHue: "160, 240, 100",
    label: "Local Discovery",
    shortDesc:
      "Rank higher. Get found. Grow locally.",
    stats: [
      { value: "#1", label: "Local Rank" },
      { value: "5.6k", label: "Profile Views" },
    ],
  },
  {
    icon: <Share2 size={22} strokeWidth={1.5} aria-hidden="true" />,
    name: "Social Media Management",
    positioning:
      "Turn followers into paying customers with strategic content",
    benefits: [
      "Data-driven content calendars that maximize engagement",
      "Growth across Instagram, LinkedIn, and emerging platforms",
      "Community management that builds loyal brand advocates",
    ],
    accentHue: "280, 240, 120",
    label: "Social Growth",
    shortDesc:
      "Create. Schedule. Engage. Grow your brand every day.",
    stats: [
      { value: "48.2k", label: "Followers" },
      { value: "8.7%", label: "Engage Rate" },
    ],
  },
  {
    icon: <Globe size={22} strokeWidth={1.5} aria-hidden="true" />,
    name: "Website Design",
    positioning:
      "Turn your website into a 24/7 customer acquisition system",
    benefits: [
      "Lightning-fast load times that keep visitors engaged",
      "SEO-optimized architecture for higher search rankings",
      "Conversion-focused design that turns clicks into customers",
    ],
    accentHue: "210, 240, 100",
    label: "Web Platform",
    shortDesc:
      "Modern websites that convert visitors into clients.",
    stats: [
      { value: "98", label: "Speed Score" },
      { value: "12.4k", label: "Visitors" },
    ],
  },
  {
    icon: <Video size={22} strokeWidth={1.5} aria-hidden="true" />,
    name: "Content Creation",
    positioning:
      "Professional content that tells your story and converts",
    benefits: [
      "Scroll-stopping photo and video production",
      "Copywriting that speaks your audience's language",
      "Multi-format content optimized for every platform",
    ],
    accentHue: "20, 240, 120",
    label: "Creative Studio",
    shortDesc:
      "Engaging content that connects and converts.",
    stats: [
      { value: "1.2M", label: "Total Views" },
      { value: "340", label: "Assets Made" },
    ],
  },
  {
    icon: <QrCode size={22} strokeWidth={1.5} aria-hidden="true" />,
    name: "QR Code Solutions",
    positioning:
      "Automate restaurant orders and increase efficiency instantly",
    benefits: [
      "Contactless ordering branded to your restaurant",
      "Reduced wait times and operational overhead",
      "Real-time analytics on popular items and peak hours",
    ],
    accentHue: "150, 240, 100",
    label: "Smart Orders",
    shortDesc:
      "Smart QR codes for every business need.",
    stats: [
      { value: "3m", label: "Avg Wait" },
      { value: "847", label: "Orders/day" },
    ],
  },
  {
    icon: <TrendingUp size={22} strokeWidth={1.5} aria-hidden="true" />,
    name: "Growth Marketing",
    positioning:
      "Data-backed campaigns that scale your customer base",
    benefits: [
      "Predictable lead generation channels",
      "Advanced retargeting to maximize ad spend",
      "Performance tracking and clear ROI reporting",
    ],
    accentHue: "250, 240, 120",
    label: "Growth Marketing",
    shortDesc:
      "Performance campaigns that scale customer acquisition.",
    stats: [
      { value: "210%", label: "ROI" },
      { value: "3x", label: "Growth" },
    ],
  },
];`;

const oldServicesMatch = code.match(/const SERVICES: ServicePage\[\] = \[[\s\S]*?\];/);
if (oldServicesMatch) {
  code = code.replace(oldServicesMatch[0], newServicesArray);
}

// 3. Replace ServiceScreenUI component
const newServiceScreenUI = `function ServiceScreenUI({ service, isCenter }: { service: ServicePage; isCenter: boolean }) {
  const { name } = service;

  let themeClass = "";
  let topTitle = "";
  let topStatus = "";
  let centerContent = null;
  let bottomNav = null;

  if (name === "Local SEO & Google Business") {
    themeClass = "sp-theme-seo";
    topTitle = "Local SEO & Google Business";
    topStatus = "LIVE TRACKING";
    centerContent = (
      <div className="sp-visual-seo">
         <div className="vse-map-area">
           <div className="vse-pulse" />
           <MapPin size={48} color="#00FF80" strokeWidth={1.5} className="vse-pin" />
           <div className="vse-floating vse-f1"><Store size={12} color="#fff" /></div>
           <div className="vse-floating vse-f2"><Star size={12} color="#000" fill="#000" /></div>
           <div className="vse-floating vse-f3"><BarChart2 size={12} color="#fff" /></div>
         </div>
         <div className="vse-metrics">
           <div className="vse-metric">
              <span className="vse-m-val">4.9</span>
              <span className="vse-m-lbl"><Star size={8} fill="#00FF80" color="#00FF80" /> Rating</span>
           </div>
           <div className="vse-metric">
              <span className="vse-m-val">1.2K</span>
              <span className="vse-m-lbl">Views</span>
           </div>
           <div className="vse-metric">
              <span className="vse-m-val">562</span>
              <span className="vse-m-lbl">Calls</span>
           </div>
         </div>
         <div className="vse-perf">
            <div className="vse-perf-lbl">Performance Overview</div>
            <div className="vse-perf-chart">
               <div className="vse-bar" style={{height:'30%'}}/>
               <div className="vse-bar" style={{height:'40%'}}/>
               <div className="vse-bar" style={{height:'35%'}}/>
               <div className="vse-bar" style={{height:'50%'}}/>
               <div className="vse-bar" style={{height:'45%'}}/>
               <div className="vse-bar" style={{height:'60%'}}/>
               <div className="vse-bar" style={{height:'75%'}}/>
               <div className="vse-bar" style={{height:'90%'}}/>
               <div className="vse-bar" style={{height:'100%'}}/>
            </div>
         </div>
      </div>
    );
    bottomNav = <div className="v-phone-nav"><Home size={14} color="#00FF80" /><MapPin size={14} color="rgba(255,255,255,0.4)" /><Calendar size={14} color="rgba(255,255,255,0.4)" /><Settings size={14} color="rgba(255,255,255,0.4)" /></div>;
  } else if (name === "Social Media Management") {
    themeClass = "sp-theme-social";
    topTitle = "Social Media Management";
    topStatus = "ACTIVE";
    centerContent = (
      <div className="sp-visual-social">
         <div className="vsm-platforms">
            <div className="vsm-plat" style={{background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)'}}><Instagram size={14} color="#fff" /></div>
            <div className="vsm-plat" style={{background: '#1877F2'}}><Facebook size={14} fill="#fff" color="#fff" /></div>
            <div className="vsm-plat" style={{background: '#000'}}><Video size={14} fill="#fff" color="#fff" /></div>
            <div className="vsm-plat" style={{background: '#0A66C2'}}><Linkedin size={14} fill="#fff" color="#fff" /></div>
            <div className="vsm-plat" style={{background: '#FF0000'}}><Youtube size={14} fill="#fff" color="#fff" /></div>
         </div>
         
         <div className="vsm-reach-card">
            <div className="vsm-reach-header">
               <span className="vsm-reach-lbl">Total Reach</span>
               <div className="vsm-reach-val">248K</div>
               <span className="vsm-reach-inc">+6.3%</span>
            </div>
            <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="vsm-reach-chart">
               <path d="M0,25 L20,20 L40,22 L60,10 L80,15 L100,2" fill="none" stroke="#D946EF" strokeWidth="2" />
               <circle cx="100" cy="2" r="2" fill="#D946EF" />
            </svg>
         </div>

         <div className="vsm-metrics">
            <div className="vsm-metric">
               <span className="vsm-m-lbl">Posts</span>
               <span className="vsm-m-val">128</span>
               <span className="vsm-m-inc">+18%</span>
            </div>
            <div className="vsm-metric">
               <span className="vsm-m-lbl">Engagement</span>
               <span className="vsm-m-val">17.6K</span>
               <span className="vsm-m-inc">+42%</span>
            </div>
            <div className="vsm-metric">
               <span className="vsm-m-lbl">Followers</span>
               <span className="vsm-m-val">9.3K</span>
               <span className="vsm-m-inc">+28%</span>
            </div>
         </div>

         <div className="vsm-upcoming">
            <div className="vsm-up-lbl">Upcoming Posts</div>
            <div className="vsm-up-card">
               <div className="vsm-up-thumb"><Video size={12} color="#fff" /></div>
               <div className="vsm-up-info">
                  <div className="vsm-up-t1">New Collection</div>
                  <div className="vsm-up-t2">Tomorrow 10:00 AM</div>
               </div>
               <div className="vsm-up-add"><div className="vsm-add-btn">+</div></div>
            </div>
         </div>
      </div>
    );
    bottomNav = <div className="v-phone-nav"><Layout size={14} color="#D946EF" /><Calendar size={14} color="rgba(255,255,255,0.4)" /><MessageCircle size={14} color="rgba(255,255,255,0.4)" /><Heart size={14} color="rgba(255,255,255,0.4)" /></div>;
  } else if (name === "Website Design") {
    themeClass = "sp-theme-web";
    topTitle = "Website Design";
    topStatus = "LIVE PROJECT";
    centerContent = (
      <div className="sp-visual-web">
        <div className="vw-browser">
          <div className="vw-nav">
             <div className="vw-logo">VEXTIV</div>
             <div className="vw-links"><span>Home</span><span>About</span><span>Services</span><span>Contact</span></div>
          </div>
          <div className="vw-hero">
             <div className="vw-hero-h1">We Build Digital<br/>Experiences</div>
             <div className="vw-hero-h2">Creative. Responsive. Results.</div>
             <div className="vw-hero-btn">Get Started</div>
          </div>
          <div className="vw-features">
             <div className="vw-feat">
                <Monitor size={12} color="#3B82F6" />
                <span>Responsive<br/>Design</span>
             </div>
             <div className="vw-feat">
                <Video size={12} color="#3B82F6" />
                <span>Lightning<br/>Fast</span>
             </div>
             <div className="vw-feat">
                <Globe size={12} color="#3B82F6" />
                <span>SEO<br/>Optimized</span>
             </div>
          </div>
        </div>
        
        <div className="vw-progress-card">
           <div className="vw-prog-header"><span>Project Progress</span><span>85%</span></div>
           <div className="vw-prog-bar"><div className="vw-prog-fill" style={{width: '85%'}} /></div>
        </div>

        <div className="vw-bottom-metrics">
           <div className="vw-b-metric">
              <span className="vw-b-val">210%</span>
              <span className="vw-b-lbl">Growth</span>
           </div>
           <div className="vw-b-metric">
              <span className="vw-b-val">1.8s</span>
              <span className="vw-b-lbl">Load Time</span>
           </div>
           <div className="vw-b-metric">
              <span className="vw-b-val">98/100</span>
              <span className="vw-b-lbl">SEO Score</span>
           </div>
        </div>
      </div>
    );
    bottomNav = <div className="v-phone-nav"><Home size={14} color="#3B82F6" /><Globe size={14} color="rgba(255,255,255,0.4)" /><BarChart2 size={14} color="rgba(255,255,255,0.4)" /><Settings size={14} color="rgba(255,255,255,0.4)" /></div>;
  } else if (name === "Content Creation") {
    themeClass = "sp-theme-content";
    topTitle = "Content Creation";
    topStatus = "CONTENT CALENDAR";
    centerContent = (
      <div className="sp-visual-content">
         <div className="vcc-toggle">
            <div className="vcc-t-btn active">Reels</div>
            <div className="vcc-t-btn">Posts</div>
            <div className="vcc-t-btn">Stories</div>
         </div>
         <div className="vcc-gallery">
            <div className="vcc-gal-item">
               <div className="vcc-play"><Play fill="#fff" size={10} /></div>
               <div className="vcc-views"><Play fill="#fff" size={8} /> 12.4K</div>
            </div>
            <div className="vcc-gal-item">
               <div className="vcc-play"><Play fill="#fff" size={10} /></div>
               <div className="vcc-views"><Play fill="#fff" size={8} /> 8.7K</div>
            </div>
            <div className="vcc-gal-item">
               <div className="vcc-play"><Play fill="#fff" size={10} /></div>
               <div className="vcc-views"><Play fill="#fff" size={8} /> 9.1K</div>
            </div>
         </div>
         <div className="vcc-monthly">
            <div className="vcc-m-header">Monthly Stats</div>
            <div className="vcc-m-body">
               <div className="vcc-m-left">
                  <div className="vcc-m-lbl">Impressions</div>
                  <div className="vcc-m-val">342K</div>
                  <div className="vcc-m-inc">+45%</div>
               </div>
               <div className="vcc-m-right">
                  <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="vcc-m-chart">
                     <path d="M0,25 L20,28 L40,15 L60,20 L80,5 L100,10" fill="none" stroke="#F97316" strokeWidth="2" />
                  </svg>
               </div>
            </div>
         </div>
      </div>
    );
    bottomNav = <div className="v-phone-nav"><Home size={14} color="rgba(255,255,255,0.4)" /><Calendar size={14} color="rgba(255,255,255,0.4)" /><div className="v-nav-center"><div className="v-nav-center-btn">+</div></div><Layout size={14} color="rgba(255,255,255,0.4)" /><Heart size={14} color="rgba(255,255,255,0.4)" /></div>;
  } else if (name === "QR Code Solutions") {
    themeClass = "sp-theme-qr";
    topTitle = "QR Code Solutions";
    topStatus = "SMART QR";
    centerContent = (
      <div className="sp-visual-qr">
         <div className="vqr-box">
            <div className="vqr-corner t-l" />
            <div className="vqr-corner t-r" />
            <div className="vqr-corner b-l" />
            <div className="vqr-corner b-r" />
            <QrCode size={110} color="#10B981" strokeWidth={1.2} className="vqr-code" />
            <div className="vqr-logo-overlay">V</div>
         </div>
         <div className="vqr-analytics">
            <div className="vqr-a-header"><span>Scan Analytics</span><span className="vqr-a-filter">This Month v</span></div>
            <div className="vqr-a-metrics">
               <div className="vqr-a-metric">
                  <span className="vqr-a-lbl">Scans</span>
                  <span className="vqr-a-val">1,245</span>
                  <span className="vqr-a-inc">+34%</span>
               </div>
               <div className="vqr-a-metric">
                  <span className="vqr-a-lbl">Users</span>
                  <span className="vqr-a-val">892</span>
                  <span className="vqr-a-inc">+28%</span>
               </div>
               <div className="vqr-a-metric">
                  <span className="vqr-a-lbl">Clicks</span>
                  <span className="vqr-a-val">2,156</span>
                  <span className="vqr-a-inc">+42%</span>
               </div>
            </div>
         </div>
      </div>
    );
    bottomNav = <div className="v-phone-nav"><Home size={14} color="rgba(255,255,255,0.4)" /><QrCode size={14} color="#10B981" /><Layout size={14} color="rgba(255,255,255,0.4)" /><Settings size={14} color="rgba(255,255,255,0.4)" /></div>;
  } else {
    themeClass = "sp-theme-growth";
    topTitle = "Growth Marketing";
    topStatus = "SCALING";
    centerContent = (
      <div className="sp-visual-growth">
         <div className="vgm-hero-chart">
            <div className="vgm-hc-header">
               <div className="vgm-hc-left">
                  <span className="vgm-hc-lbl">Revenue Growth</span>
                  <span className="vgm-hc-val">$42,500</span>
               </div>
               <div className="vgm-hc-right">+124%</div>
            </div>
            <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="vgm-hc-svg">
               <path d="M0,35 L20,30 L40,32 L60,15 L80,20 L100,5" fill="none" stroke="#6366F1" strokeWidth="2" />
               <path d="M0,35 L20,30 L40,32 L60,15 L80,20 L100,5 L100,40 L0,40 Z" fill="rgba(99, 102, 241, 0.2)" />
            </svg>
         </div>

         <div className="vgm-metrics-grid">
            <div className="vgm-mg-item">
               <span className="vgm-mg-lbl">Traffic</span>
               <span className="vgm-mg-val">124K</span>
            </div>
            <div className="vgm-mg-item">
               <span className="vgm-mg-lbl">Leads</span>
               <span className="vgm-mg-val">3,420</span>
            </div>
            <div className="vgm-mg-item">
               <span className="vgm-mg-lbl">CAC</span>
               <span className="vgm-mg-val">$12.5</span>
            </div>
            <div className="vgm-mg-item">
               <span className="vgm-mg-lbl">Conv.</span>
               <span className="vgm-mg-val">4.2%</span>
            </div>
         </div>

         <div className="vgm-campaign">
            <div className="vgm-camp-header">Active Campaigns</div>
            <div className="vgm-camp-bar">
               <div className="vgm-cb-fill" style={{width: '65%'}} />
            </div>
            <div className="vgm-camp-lbls"><span>Retargeting</span><span>ROI 3.2x</span></div>
         </div>
      </div>
    );
    bottomNav = <div className="v-phone-nav"><Home size={14} color="rgba(255,255,255,0.4)" /><TrendingUp size={14} color="#6366F1" /><Calendar size={14} color="rgba(255,255,255,0.4)" /><Settings size={14} color="rgba(255,255,255,0.4)" /></div>;
  }

  return (
    <div className={\`sp-screen-ui \${themeClass} \${isCenter ? 'sp-screen-center' : ''}\`}>
      <div className="sp-screen-bg-glow" />
      <div className="sp-screen-top">
        <div className="sp-screen-header">
          <span className="sp-screen-title">{topTitle}</span>
          <div className="sp-screen-status">
            <span className="sp-status-dot" />
            {topStatus}
          </div>
        </div>
        <div className="sp-screen-desc">{service.shortDesc}</div>
      </div>
      <div className="sp-screen-middle">
        {centerContent}
      </div>
      <div className="sp-screen-bottom">
        {bottomNav}
      </div>
    </div>
  );
}`;

const oldServiceScreenUIMatch = code.match(/function ServiceScreenUI\([\s\S]*?\n\}\n\n\/\/ ─── Component/);
if (oldServiceScreenUIMatch) {
  code = code.replace(oldServiceScreenUIMatch[0], newServiceScreenUI + '\n\n// ─── Component');
}

// 4. Replace CSS
const newCss = `        /* ── Theme Specific Styles ────────────────────────────────────────────────── */

        /* 1. Local SEO & Google Business */
        .sp-theme-seo {
          --theme-glow: rgba(0, 255, 128, 0.4);
          --theme-accent: #00FF80;
          background: #0A110E;
        }
        .sp-visual-seo { width: 100%; height: 100%; display: flex; flex-direction: column; gap: 12px; }
        .vse-map-area { position: relative; height: 110px; display: flex; align-items: center; justify-content: center; }
        .vse-pulse { position: absolute; width: 60px; height: 60px; background: rgba(0,255,128,0.1); border-radius: 50%; box-shadow: 0 0 40px rgba(0,255,128,0.2); animation: pulse 2s infinite; }
        .vse-pin { position: relative; z-index: 2; filter: drop-shadow(0 4px 10px rgba(0,255,128,0.4)); }
        .vse-floating { position: absolute; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.5); z-index: 3; }
        .vse-f1 { background: #10B981; top: 10%; left: 15%; animation: float 3s ease-in-out infinite; }
        .vse-f2 { background: #FBBF24; top: 30%; right: 10%; animation: float 4s ease-in-out infinite reverse; }
        .vse-f3 { background: #3B82F6; bottom: 10%; right: 20%; animation: float 3.5s ease-in-out infinite; }
        .vse-metrics { display: flex; justify-content: space-between; background: rgba(255,255,255,0.03); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); }
        .vse-metric { display: flex; flex-direction: column; align-items: center; gap: 2px; }
        .vse-m-val { color: #fff; font-size: 14px; font-weight: 700; }
        .vse-m-lbl { color: #888; font-size: 8px; display: flex; align-items: center; gap: 2px; }
        .vse-perf { flex: 1; display: flex; flex-direction: column; gap: 6px; }
        .vse-perf-lbl { color: #888; font-size: 8px; }
        .vse-perf-chart { flex: 1; display: flex; align-items: flex-end; gap: 4px; padding-bottom: 4px; }
        .vse-bar { flex: 1; background: linear-gradient(0deg, #00FF80, #10B981); border-radius: 2px 2px 0 0; }
        
        /* 2. Social Media Management */
        .sp-theme-social {
          --theme-glow: rgba(217, 70, 239, 0.4);
          --theme-accent: #D946EF;
          background: #100616;
        }
        .sp-visual-social { width: 100%; height: 100%; display: flex; flex-direction: column; gap: 12px; }
        .vsm-platforms { display: flex; justify-content: space-between; }
        .vsm-plat { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.5); }
        .vsm-reach-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; padding: 10px; display: flex; flex-direction: column; gap: 6px; }
        .vsm-reach-header { display: grid; grid-template-columns: auto 1fr auto; align-items: baseline; gap: 6px; }
        .vsm-reach-lbl { color: #888; font-size: 9px; }
        .vsm-reach-val { color: #fff; font-size: 16px; font-weight: 700; }
        .vsm-reach-inc { color: #D946EF; font-size: 9px; font-weight: 600; }
        .vsm-reach-chart { width: 100%; height: 25px; overflow: visible; }
        .vsm-metrics { display: flex; justify-content: space-between; gap: 6px; }
        .vsm-metric { flex: 1; background: rgba(255,255,255,0.02); border-radius: 6px; padding: 6px; display: flex; flex-direction: column; align-items: center; gap: 2px; text-align: center; }
        .vsm-m-lbl { color: #888; font-size: 8px; }
        .vsm-m-val { color: #fff; font-size: 12px; font-weight: 700; }
        .vsm-m-inc { color: #D946EF; font-size: 8px; }
        .vsm-upcoming { flex: 1; display: flex; flex-direction: column; gap: 6px; }
        .vsm-up-lbl { color: #888; font-size: 9px; }
        .vsm-up-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; padding: 6px; display: flex; align-items: center; gap: 8px; }
        .vsm-up-thumb { width: 28px; height: 28px; border-radius: 4px; background: linear-gradient(135deg, #a855f7, #d946ef); display: flex; align-items: center; justify-content: center; }
        .vsm-up-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
        .vsm-up-t1 { color: #fff; font-size: 9px; font-weight: 600; }
        .vsm-up-t2 { color: #666; font-size: 7px; }
        .vsm-add-btn { width: 20px; height: 20px; border-radius: 50%; background: #D946EF; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; }

        /* 3. Website Design */
        .sp-theme-web {
          --theme-glow: rgba(59, 130, 246, 0.4);
          --theme-accent: #3B82F6;
          background: #080D1A;
        }
        .sp-visual-web { width: 100%; height: 100%; display: flex; flex-direction: column; gap: 10px; }
        .vw-browser { background: linear-gradient(180deg, #101827 0%, #1E3A8A 100%); border-radius: 8px; padding: 8px; display: flex; flex-direction: column; gap: 12px; border: 1px solid rgba(59,130,246,0.2); }
        .vw-nav { display: flex; justify-content: space-between; align-items: center; }
        .vw-logo { color: #fff; font-size: 8px; font-weight: 800; letter-spacing: 0.05em; }
        .vw-links { display: flex; gap: 4px; }
        .vw-links span { color: rgba(255,255,255,0.7); font-size: 5px; }
        .vw-hero { display: flex; flex-direction: column; gap: 4px; align-items: flex-start; padding: 8px 0; }
        .vw-hero-h1 { color: #fff; font-size: 12px; font-weight: 700; line-height: 1.1; }
        .vw-hero-h2 { color: rgba(255,255,255,0.6); font-size: 6px; }
        .vw-hero-btn { background: #3B82F6; color: #fff; font-size: 6px; padding: 3px 8px; border-radius: 4px; margin-top: 4px; }
        .vw-features { display: flex; gap: 4px; }
        .vw-feat { flex: 1; background: rgba(0,0,0,0.3); border: 1px solid rgba(59,130,246,0.3); border-radius: 4px; padding: 6px 4px; display: flex; flex-direction: column; align-items: center; gap: 4px; text-align: center; }
        .vw-feat span { color: #fff; font-size: 5px; line-height: 1.2; }
        .vw-progress-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; padding: 8px; display: flex; flex-direction: column; gap: 6px; }
        .vw-prog-header { display: flex; justify-content: space-between; color: #fff; font-size: 9px; font-weight: 600; }
        .vw-prog-bar { width: 100%; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; overflow: hidden; }
        .vw-prog-fill { height: 100%; background: #3B82F6; border-radius: 2px; }
        .vw-bottom-metrics { display: flex; justify-content: space-between; }
        .vw-b-metric { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 2px; text-align: center; }
        .vw-b-val { color: #fff; font-size: 12px; font-weight: 700; }
        .vw-b-lbl { color: #3B82F6; font-size: 7px; font-weight: 600; text-transform: uppercase; }

        /* 4. Content Creation */
        .sp-theme-content {
          --theme-glow: rgba(249, 115, 22, 0.4);
          --theme-accent: #F97316;
          background: #140A05;
        }
        .sp-visual-content { width: 100%; height: 100%; display: flex; flex-direction: column; gap: 12px; }
        .vcc-toggle { display: flex; background: rgba(255,255,255,0.05); border-radius: 20px; padding: 2px; }
        .vcc-t-btn { flex: 1; text-align: center; color: #888; font-size: 9px; padding: 4px 0; border-radius: 18px; }
        .vcc-t-btn.active { background: #F97316; color: #fff; font-weight: 600; }
        .vcc-gallery { display: flex; gap: 6px; height: 100px; }
        .vcc-gal-item { flex: 1; background: linear-gradient(180deg, #431407 0%, #140A05 100%); border-radius: 6px; border: 1px solid rgba(249,115,22,0.2); position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; padding: 6px; }
        .vcc-play { width: 16px; height: 16px; border-radius: 50%; background: rgba(0,0,0,0.5); backdrop-filter: blur(2px); display: flex; align-items: center; justify-content: center; align-self: flex-end; }
        .vcc-views { color: #fff; font-size: 7px; font-weight: 600; display: flex; align-items: center; gap: 2px; background: rgba(0,0,0,0.5); padding: 2px 4px; border-radius: 4px; width: fit-content; }
        .vcc-monthly { flex: 1; background: rgba(255,255,255,0.03); border-radius: 8px; padding: 10px; display: flex; flex-direction: column; gap: 6px; }
        .vcc-m-header { color: #888; font-size: 9px; }
        .vcc-m-body { display: flex; justify-content: space-between; align-items: flex-end; gap: 8px; }
        .vcc-m-left { display: flex; flex-direction: column; gap: 2px; }
        .vcc-m-lbl { color: #888; font-size: 8px; }
        .vcc-m-val { color: #fff; font-size: 16px; font-weight: 700; }
        .vcc-m-inc { color: #F97316; font-size: 9px; font-weight: 600; }
        .vcc-m-right { flex: 1; height: 30px; }
        .vcc-m-chart { width: 100%; height: 100%; overflow: visible; }

        /* 5. QR Code Solutions */
        .sp-theme-qr {
          --theme-glow: rgba(16, 185, 129, 0.4);
          --theme-accent: #10B981;
          background: #06110D;
        }
        .sp-visual-qr { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; gap: 16px; }
        .vqr-box { position: relative; padding: 10px; background: rgba(16,185,129,0.05); border-radius: 12px; margin-top: 10px; }
        .vqr-corner { position: absolute; width: 16px; height: 16px; border: 2px solid #10B981; }
        .vqr-corner.t-l { top: -2px; left: -2px; border-right: none; border-bottom: none; border-radius: 6px 0 0 0; }
        .vqr-corner.t-r { top: -2px; right: -2px; border-left: none; border-bottom: none; border-radius: 0 6px 0 0; }
        .vqr-corner.b-l { bottom: -2px; left: -2px; border-right: none; border-top: none; border-radius: 0 0 0 6px; }
        .vqr-corner.b-r { bottom: -2px; right: -2px; border-left: none; border-top: none; border-radius: 0 0 6px 0; }
        .vqr-code { filter: drop-shadow(0 0 10px rgba(16,185,129,0.5)); }
        .vqr-logo-overlay { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 24px; height: 24px; background: #10B981; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #06110D; font-weight: 800; font-size: 14px; box-shadow: 0 0 15px rgba(16,185,129,0.8); }
        .vqr-analytics { width: 100%; display: flex; flex-direction: column; gap: 8px; margin-top: auto; }
        .vqr-a-header { display: flex; justify-content: space-between; align-items: center; color: #fff; font-size: 10px; font-weight: 600; }
        .vqr-a-filter { color: #888; font-size: 8px; }
        .vqr-a-metrics { display: flex; justify-content: space-between; gap: 6px; }
        .vqr-a-metric { flex: 1; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; padding: 8px; display: flex; flex-direction: column; align-items: center; gap: 2px; }
        .vqr-a-lbl { color: #888; font-size: 8px; }
        .vqr-a-val { color: #fff; font-size: 14px; font-weight: 700; }
        .vqr-a-inc { color: #10B981; font-size: 8px; }

        /* 6. Growth Marketing */
        .sp-theme-growth {
          --theme-glow: rgba(99, 102, 241, 0.4);
          --theme-accent: #6366F1;
          background: #090914;
        }
        .sp-visual-growth { width: 100%; height: 100%; display: flex; flex-direction: column; gap: 12px; }
        .vgm-hero-chart { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; padding: 10px; display: flex; flex-direction: column; gap: 8px; }
        .vgm-hc-header { display: flex; justify-content: space-between; align-items: flex-start; }
        .vgm-hc-left { display: flex; flex-direction: column; gap: 2px; }
        .vgm-hc-lbl { color: #888; font-size: 8px; }
        .vgm-hc-val { color: #fff; font-size: 16px; font-weight: 700; }
        .vgm-hc-right { color: #6366F1; font-size: 10px; font-weight: 700; }
        .vgm-hc-svg { width: 100%; height: 40px; overflow: visible; }
        .vgm-metrics-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
        .vgm-mg-item { background: rgba(255,255,255,0.03); border-radius: 6px; padding: 8px; display: flex; flex-direction: column; gap: 2px; }
        .vgm-mg-lbl { color: #888; font-size: 8px; }
        .vgm-mg-val { color: #fff; font-size: 12px; font-weight: 700; }
        .vgm-campaign { flex: 1; background: rgba(255,255,255,0.03); border-radius: 8px; padding: 10px; display: flex; flex-direction: column; justify-content: center; gap: 6px; }
        .vgm-camp-header { color: #fff; font-size: 9px; font-weight: 600; }
        .vgm-camp-bar { width: 100%; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; overflow: hidden; }
        .vgm-cb-fill { height: 100%; background: linear-gradient(90deg, #6366F1, #8B5CF6); border-radius: 2px; }
        .vgm-camp-lbls { display: flex; justify-content: space-between; color: #888; font-size: 8px; }

        /* Generic Phone UI Elements */
        .v-phone-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background: rgba(0,0,0,0.4);
          border-radius: 16px;
          margin-top: 8px;
        }
        .v-nav-center {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #F97316;
        }
        .v-nav-center-btn {
          color: #fff;
          font-size: 14px;
          font-weight: 800;
          line-height: 1;
        }
        .sp-screen-desc {
          color: rgba(255,255,255,0.6);
          font-size: 9px;
          line-height: 1.3;
          margin-top: 8px;
        }`;

const oldCssMatch = code.match(/\/\* ── Theme Specific Styles ────────────────────────────────────────────────── \*\/[\s\S]*?\/\* Generic Phone UI Elements \*\/[\s\S]*?\n        \}\`/);

if (oldCssMatch) {
  code = code.replace(oldCssMatch[0], newCss + '\`');
} else {
  // Fallback if generic phone UI elements wasn't there before
  const oldCssMatchFallback = code.match(/\/\* ── Theme Specific Styles ────────────────────────────────────────────────── \*\/[\s\S]*?\/\* Phone home bar \*\//);
  if (oldCssMatchFallback) {
    code = code.replace(oldCssMatchFallback[0], newCss + '\n\n        /* Phone home bar */');
  } else {
    logger.error("Could not find CSS block to replace!");
  }
}

// Write the modified file back
fs.writeFileSync('components/sections/ServicesPreview.tsx', code);
logger.info("File patched successfully!");
