import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  TrendingUp, 
  Percent, 
  Briefcase, 
  Hotel, 
  CheckCircle, 
  Shield, 
  Award, 
  Users, 
  Clock, 
  Sparkles, 
  X,
  Check,
  Globe,
  Cpu,
  Building,
  UserCheck
} from 'lucide-react';

export default function NuDifference() {
  const [activeStep, setActiveStep] = useState(0); // 0 = BEFORE, 1 = TRANSITION, 2 = AFTER

  // B2B Inquiry Form states
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    comments: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setSuccessMsg("Consultation Request Received. Our partnership team will contact you within 24 hours.");
    setShowSuccess(true);
    setInquiryForm({ name: '', email: '', phone: '', comments: '' });
    setTimeout(() => setShowSuccess(false), 5000);
  };

  // Typewriter animation states
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [hasTyped, setHasTyped] = useState(false);
  const [cursorActive, setCursorActive] = useState(true);
  const ctaRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !hasTyped) {
        setHasTyped(true);
        
        const text1 = "\"You just think of the hotel. ";
        const text2 = "We design, construct and run it.\"";
        
        let i = 0;
        let j = 0;
        
        const typeLine1 = () => {
          if (i < text1.length) {
            setLine1(text1.substring(0, i + 1));
            i++;
            setTimeout(typeLine1, 30);
          } else {
            setTimeout(typeLine2, 120);
          }
        };

        const typeLine2 = () => {
          if (j < text2.length) {
            setLine2(text2.substring(0, j + 1));
            j++;
            setTimeout(typeLine2, 35);
          } else {
            setTimeout(() => setCursorActive(false), 2000);
          }
        };

        typeLine1();
      }
    }, { threshold: 0.15 });

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }
    return () => observer.disconnect();
  }, [hasTyped]);

  useEffect(() => {
    let observer;
    const elements = document.querySelectorAll('.step-card');

    const setupObserver = () => {
      if (observer) {
        elements.forEach(el => observer.unobserve(el));
        observer.disconnect();
      }

      const isMobile = window.innerWidth <= 768;
      const observerOptions = {
        root: null,
        rootMargin: isMobile ? '-60% 0px -5% 0px' : '-30% 0px -40% 0px', // Target the lower visible viewport area on mobile
        threshold: isMobile ? 0.05 : 0.1
      };

      const handleIntersect = (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const step = parseInt(entry.target.getAttribute('data-step'), 10);
            setActiveStep(step);
          }
        });
      };

      observer = new IntersectionObserver(handleIntersect, observerOptions);
      elements.forEach(el => observer.observe(el));
    };

    setupObserver();

    const handleResize = () => {
      setupObserver();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (observer) {
        elements.forEach(el => observer.unobserve(el));
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div className="difference-page-wrapper">
      {/* 1. HERO SECTION */}
      <section 
        className="difference-hero section-padding"
        style={{
          backgroundImage: `url('/himachal_resort_hero.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          paddingTop: '120px',
          position: 'relative'
        }}
      >
        <div className="hero-overlay-dark" style={{
          background: 'radial-gradient(circle at center, rgba(17, 17, 17, 0.2) 0%, rgba(17, 17, 17, 0.55) 100%), linear-gradient(to bottom, rgba(17, 17, 17, 0.2), rgba(17, 17, 17, 0.45))'
        }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-centered-content" style={{ opacity: 1, transform: 'none' }}>
            <span className="hero-subtitle" style={{ color: 'var(--gold-primary)', letterSpacing: '0.15em', fontWeight: 600 }}>
              THE NU DIFFERENCE
            </span>
            <h1 className="hero-title" style={{ fontSize: '3rem', margin: '16px 0', textShadow: '0 2px 10px rgba(0,0,0,0.3)', color: '#ffffff' }}>
              Unlocking the True Potential <br />
              <span className="highlight-gold" style={{ color: 'var(--gold-primary)' }}>of Your Hotel</span>
            </h1>
            <p className="hero-desc" style={{ maxWidth: '700px', fontSize: '1.1rem', lineHeight: '1.7', color: 'rgba(252, 249, 242, 0.85)', margin: '0 auto 30px' }}>
              From development to operations, NU Hotels brings strategy, expertise, and execution together to build and grow high-performing hotels.
            </p>
            <div className="hero-cta-group">
              <button 
                className="btn btn-primary"
                onClick={() => {
                  const partnerSection = document.getElementById('partner-form-section');
                  if (partnerSection) {
                    partnerSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Start a Conversation <ArrowRight size={16} style={{ marginLeft: '8px' }} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN STORY - BEFORE → NU HOTELS → AFTER */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-cream)', borderTop: '1px solid rgba(169, 127, 56, 0.12)', paddingBottom: '100px' }}>
        <div className="container">
          <div className="showcase-header" style={{ marginBottom: '40px', textAlign: 'center' }}>
            <span className="hero-subtitle">The Transformation</span>
            <h2>What Changes When NU Hotels Comes In?</h2>
            <p style={{ maxWidth: '650px', margin: '0 auto' }}>
              We don't just manage hotels - we transform them. Scroll down to see how our operational framework transforms a property visually and operationally.
            </p>
          </div>

          {/* Scrolling/Interactive Visual Console */}
          <div className="transformation-interactive-console">
            {/* Left Side: Sticky Visual Panel */}
            <div className="sticky-visual-wrapper">
              <div className="console-visual-panel">
                <img 
                  src="/tour_step_before.webp" 
                  alt="Struggling Independent Hotel Facade" 
                  className={`console-visual-img desaturated ${activeStep === 0 ? 'active' : ''}`} 
                />
                <img 
                  src="/tour_step_transition.webp" 
                  alt="Hotel Under Development Operations & Tech Integration" 
                  className={`console-visual-img blueprinted ${activeStep === 1 ? 'active' : ''}`} 
                />
                <img 
                  src="/tour_step_after.webp" 
                  alt="High Performing Cedarwood Mountain Resort in Himachal" 
                  className={`console-visual-img fully-saturated ${activeStep === 2 ? 'active' : ''}`} 
                />
                
                <div className="visual-caption-tag-container">
                  {activeStep === 0 && (
                    <div className="visual-caption-tag error-theme fade-in-fast">
                      Before: Independent Property with Operational Friction
                    </div>
                  )}
                  {activeStep === 1 && (
                    <div className="visual-caption-tag transition-theme fade-in-fast">
                      Transition: Integrating Sales Network & Centralized Systems
                    </div>
                  )}
                  {activeStep === 2 && (
                    <div className="visual-caption-tag success-theme fade-in-fast">
                      After: Premium High-Yielding Mountain Resort
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side: Scrollable Content Details */}
            <div className="scroll-cards-container">
              {/* BEFORE CARD */}
              <div className="console-slide-card step-card" data-step="0">
                <div className="card-header-badge before-badge">Before NU Hotels</div>
                <h3 className="transformation-card-title">Struggling Asset</h3>
                <ul className="transformation-bullets-list">
                  <li>
                    <span className="bullet-marker warning">✕</span>
                    <div className="bullet-content">
                      <strong>Limited Visibility</strong>
                      <p>Struggling to stand out in a crowded regional market.</p>
                    </div>
                  </li>
                  <li>
                    <span className="bullet-marker warning">✕</span>
                    <div className="bullet-content">
                      <strong>Inconsistent Revenue</strong>
                      <p>High dependency on discount OTA channels and weak pricing control.</p>
                    </div>
                  </li>
                  <li>
                    <span className="bullet-marker warning">✕</span>
                    <div className="bullet-content">
                      <strong>Limited Distribution</strong>
                      <p>Lack of connection with corporate networks and major travel networks.</p>
                    </div>
                  </li>
                  <li>
                    <span className="bullet-marker warning">✕</span>
                    <div className="bullet-content">
                      <strong>Operational Inefficiencies</strong>
                      <p>High procurement costs, staff turnover, and friction in day-to-day work.</p>
                    </div>
                  </li>
                  <li>
                    <span className="bullet-marker warning">✕</span>
                    <div className="bullet-content">
                      <strong>Untapped Potential</strong>
                      <p>The property is premium but fails to deliver high yields to owners.</p>
                    </div>
                  </li>
                </ul>
                
                <div className="scroll-hint-text">
                  Scroll down to transform <span className="arrow-down-animate">↓</span>
                </div>
              </div>

              {/* TRANSITION CARD */}
              <div className="console-slide-card step-card transition-slide-card" data-step="1">
                <div className="card-header-badge transition-badge">The NU Strategy</div>
                <h3 className="transformation-card-title" style={{ color: 'var(--gold-primary)' }}>Bridging the Gap</h3>
                <p className="bridge-intro-text">
                  NU Hotels takes over operations and plugs the property directly into our centralized revenue management engine:
                </p>
                
                <div className="bridge-service-pills-container">
                  <div className="bridge-pill">
                    <strong>Strategy</strong>
                    <p>Aligning asset brand, positioning and market tier.</p>
                  </div>
                  <div className="bridge-pill">
                    <strong>Sales Power</strong>
                    <p>Direct access to institutional corporate agreements.</p>
                  </div>
                  <div className="bridge-pill">
                    <strong>Marketing Edge</strong>
                    <p>Targeted campaigns and local regional visibility.</p>
                  </div>
                  <div className="bridge-pill">
                    <strong>Distribution</strong>
                    <p>Central channel managers connected to all platforms.</p>
                  </div>
                  <div className="bridge-pill">
                    <strong>Revenue Systems</strong>
                    <p>Central PMS/CRS with real-time rate audits.</p>
                  </div>
                  <div className="bridge-pill">
                    <strong>Operations</strong>
                    <p>Trained hospitality staff under standard brand audits.</p>
                  </div>
                </div>

                <div className="scroll-hint-text">
                  Scroll down for results <span className="arrow-down-animate">↓</span>
                </div>
              </div>

              {/* AFTER CARD */}
              <div className="console-slide-card step-card" data-step="2">
                <div className="card-header-badge after-badge">After NU Hotels</div>
                <h3 className="transformation-card-title">High-Performing Hotel</h3>
                <ul className="transformation-bullets-list">
                  <li>
                    <span className="bullet-marker success">✓</span>
                    <div className="bullet-content">
                      <strong>Stronger Revenue</strong>
                      <p>Optimized RevPAR and ADR through dynamic pricing and sales networks.</p>
                    </div>
                  </li>
                  <li>
                    <span className="bullet-marker success">✓</span>
                    <div className="bullet-content">
                      <strong>Wider Distribution</strong>
                      <p>Instant access to elite corporate agreements and booking channels.</p>
                    </div>
                  </li>
                  <li>
                    <span className="bullet-marker success">✓</span>
                    <div className="bullet-content">
                      <strong>Efficient Operations</strong>
                      <p>Lower operating costs and automated PMS/CRS channel managers.</p>
                    </div>
                  </li>
                  <li>
                    <span className="bullet-marker success">✓</span>
                    <div className="bullet-content">
                      <strong>Better Guest Experience</strong>
                      <p>Trained hospitality staff delivering high ratings and repeat bookings.</p>
                    </div>
                  </li>
                  <li>
                    <span className="bullet-marker success">✓</span>
                    <div className="bullet-content">
                      <strong>Stronger Brand Positioning</strong>
                      <p>Elite regional standing as a premium luxury destination.</p>
                    </div>
                  </li>
                  <li>
                    <span className="bullet-marker success">✓</span>
                    <div className="bullet-content">
                      <strong>Long-Term Asset Growth</strong>
                      <p>Continuous appreciation of physical real estate and capital value.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW NU HOTELS CREATES THE TRANSFORMATION */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff', borderTop: '1px solid rgba(169, 127, 56, 0.12)' }}>
        <div className="container">
          <div className="showcase-header" style={{ marginBottom: '60px', textAlign: 'center' }}>
            <span className="hero-subtitle">Our Methodology</span>
            <h2>From Potential to Performance</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>
              We follow a disciplined 6-stage operational journey to systematically unlock value at every level.
            </p>
          </div>

          <div className="journey-stages-grid">
            <div className="journey-stage-card">
              <span className="stage-num">01</span>
              <h4>Understand</h4>
              <span className="stage-subtitle">Market & Property Assessment</span>
              <p>Thorough assessment of the property, market demand, competition, and revenue opportunity.</p>
            </div>
            <div className="journey-stage-card">
              <span className="stage-num">02</span>
              <h4>Position</h4>
              <span className="stage-subtitle">Brand, Concept & Strategy</span>
              <p>Defining the hotel concept, tier positioning, pricing policy, and marketing blueprint.</p>
            </div>
            <div className="journey-stage-card">
              <span className="stage-num">03</span>
              <h4>Build</h4>
              <span className="stage-subtitle">Design & Development</span>
              <p>Supporting developers from spatial planning and interior alignment through construction and pre-opening.</p>
            </div>
            <div className="journey-stage-card">
              <span className="stage-num">04</span>
              <h4>Activate</h4>
              <span className="stage-subtitle">Sales, Marketing & Distribution</span>
              <p>Deploying corporate sales contracts, OTA channel connections, and local brand marketing campaigns.</p>
            </div>
            <div className="journey-stage-card">
              <span className="stage-num">05</span>
              <h4>Operate</h4>
              <span className="stage-subtitle">Hotel Management</span>
              <p>Directing daily operations, brand audits, procurement, and guest service standard checks.</p>
            </div>
            <div className="journey-stage-card">
              <span className="stage-num">06</span>
              <h4>Grow</h4>
              <span className="stage-subtitle">Revenue & Asset Performance</span>
              <p>Analyzing key metrics, maximizing ADR, protecting cash flows, and growing the asset's net value.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TWO WAYS NU HOTELS WORKS WITH HOTELS */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-cream)', borderTop: '1px solid rgba(169, 127, 56, 0.12)' }}>
        <div className="container">
          <div className="showcase-header" style={{ marginBottom: '65px', textAlign: 'center' }}>
            <span className="hero-subtitle">Partnership Routes</span>
            <h2>Two Ways We Create Value</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>
              Whether you are building a new landmark hotel or seeking to optimize an operating property, we have a route for you.
            </p>
          </div>

          <div className="options-flex-layout">
            {/* OPTION 1 */}
            <div className="partner-option-box glass-card">
              <div className="option-label">Option 01</div>
              <h3>Starting From Scratch</h3>
              <p className="option-tagline">"From land to launch and beyond."</p>
              
              <div className="option-arrows-timeline">
                <div className="arrow-step"><span>Concept & Strategy</span></div>
                <div className="arrow-separator">→</div>
                <div className="arrow-step"><span>Design & Planning</span></div>
                <div className="arrow-separator">→</div>
                <div className="arrow-step"><span>Construction</span></div>
                <div className="arrow-separator">→</div>
                <div className="arrow-step"><span>Furnishing</span></div>
                <div className="arrow-separator">→</div>
                <div className="arrow-step"><span>Operations & Growth</span></div>
              </div>

              <p className="option-description">
                NU Hotels acts as your end-to-end development and operations partner. We work with projects from early design/site layout through pre-opening setup, staffing, and active management to ensure a flawless launch.
              </p>
              
              <div className="outcomes-mini-grid" style={{ marginTop: 'auto', paddingTop: '20px' }}>
                <div className="outcome-tag">Seamless Launch</div>
                <div className="outcome-tag">Optimized Layouts</div>
                <div className="outcome-tag">Pre-Opening Setup</div>
                <div className="outcome-tag">Ongoing Management</div>
              </div>
            </div>

            {/* OPTION 2 */}
            <div className="partner-option-box glass-card">
              <div className="option-label">Option 02</div>
              <h3>Transforming Existing Hotels</h3>
              <p className="option-tagline">"Turn an existing property into a high-performing asset."</p>

              <div className="option-arrows-timeline">
                <div className="arrow-step"><span>Assessment</span></div>
                <div className="arrow-separator">→</div>
                <div className="arrow-step"><span>Strategy</span></div>
                <div className="arrow-separator">→</div>
                <div className="arrow-step"><span>Management</span></div>
                <div className="arrow-separator">→</div>
                <div className="arrow-step"><span>Revenue Growth</span></div>
                <div className="arrow-separator">→</div>
                <div className="arrow-step"><span>Operational Boost</span></div>
              </div>

              <p className="option-description">
                We take over management or convert operating properties to the NU branding network. We integrate our sales engine, dynamic revenue PMS, and staff protocols to deliver immediate results:
              </p>
              
              <div className="outcomes-mini-grid" style={{ marginTop: 'auto', paddingTop: '20px' }}>
                <div className="outcome-tag">Higher Revenue</div>
                <div className="outcome-tag">Efficient Operations</div>
                <div className="outcome-tag">Asset Value Protection</div>
                <div className="outcome-tag">Maximum Returns</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OUR EXPERTISE */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff', borderTop: '1px solid rgba(169, 127, 56, 0.12)' }}>
        <div className="container">
          <div className="showcase-header" style={{ marginBottom: '60px', textAlign: 'center' }}>
            <span className="hero-subtitle">Our Capabilities</span>
            <h2>Built Around Hospitality Performance</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>
              We leverage key structural advantages to keep our partner hotels highly profitable and competitive.
            </p>
          </div>

          <div className="expertise-compact-grid">
            <div className="expertise-item">
              <div className="expertise-header-row">
                <TrendingUp size={22} className="expertise-icon" />
                <h4>Established Market Power</h4>
              </div>
              <p>Deep, data-driven understanding of regional travel trends, corporate demand, and traveler habits in Northern India.</p>
            </div>

            <div className="expertise-item">
              <div className="expertise-header-row">
                <Award size={22} className="expertise-icon" />
                <h4>Brand Recognition</h4>
              </div>
              <p>Placing independent hotels into a recognized brand framework that instantly commands trust and visibility.</p>
            </div>

            <div className="expertise-item">
              <div className="expertise-header-row">
                <Globe size={22} className="expertise-icon" />
                <h4>Powerful Distribution Engine</h4>
              </div>
              <p>Broad integration across global OTA channels, travel agencies, corporate aggregators, and key travel desk networks.</p>
            </div>

            <div className="expertise-item">
              <div className="expertise-header-row">
                <Cpu size={22} className="expertise-icon" />
                <h4>Advanced Technology</h4>
              </div>
              <p>Deploying centralized cloud-based PMS/CRS systems, real-time rate analytics, and AI-driven pricing tools.</p>
            </div>

            <div className="expertise-item">
              <div className="expertise-header-row">
                <Percent size={22} className="expertise-icon" />
                <h4>Economies of Scale</h4>
              </div>
              <p>Reducing operating margins through bulk procurement contracts, shared services, and unified marketing campaigns.</p>
            </div>

            <div className="expertise-item">
              <div className="expertise-header-row">
                <Users size={22} className="expertise-icon" />
                <h4>Operational Excellence</h4>
              </div>
              <p>Deploying standard SOPs, intensive staff training programs, and regular audits to ensure consistent five-star hospitality delivery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL SECTION */}
      <section 
        ref={ctaRef}
        className="section-padding" 
        style={{ 
          backgroundColor: 'var(--bg-cream)', 
          borderTop: '1px solid rgba(169, 127, 56, 0.12)',
          color: 'var(--text-dark)',
          textAlign: 'center',
          padding: '120px 0'
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '750px', margin: '0 auto' }}>
            <span className="hero-subtitle" style={{ color: 'var(--gold-primary)', display: 'block', marginBottom: '16px' }}>Let's Build the Future</span>
            <h2 className="typing-headline" style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: 'var(--text-dark)', marginBottom: '16px', lineHeight: '1.4', minHeight: '80px' }}>
              {line1}
              {line1 && <br />}
              <span className="highlight-gold" style={{ color: 'var(--gold-primary)' }}>
                {line2}
              </span>
              {cursorActive && hasTyped && <span className="typing-cursor">|</span>}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: 0 }}>
              Partner with NU Hotels to unlock the potential of your property.
            </p>
          </div>
        </div>
      </section>

      {/* Partnership & B2B Form Section */}
      <section id="partner-form-section" className="section-padding" style={{ borderTop: '1px solid rgba(169, 127, 56, 0.12)', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="showcase-header" style={{ marginBottom: '80px', textAlign: 'center' }}>
            <span className="hero-subtitle">B2B Partnerships</span>
            <h2>Unlock the Value of Your Hotel Asset</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>Explore customized management structures tailored to your property’s profile and regional potential.</p>
          </div>

          <div className="partner-grid">
            {/* Left Column: Partnership tiers */}
            <div className="partnership-cards">
              <div className="partner-card-item">
                <Building className="partner-card-icon" size={28} />
                <h3 className="partner-card-title">Full Management</h3>
                <p className="partner-card-desc">
                  Complete end-to-end operation, brand integration, pricing optimization, centralized procurement scale, and full staffing control.
                </p>
              </div>

              <div className="partner-card-item">
                <UserCheck className="partner-card-icon" size={28} />
                <h3 className="partner-card-title">Manchise Contract</h3>
                <p className="partner-card-desc">
                  Maintain and manage operations using existing or hotel-acquired staff, utilizing our backend training protocols and PMS CRS scale.
                </p>
              </div>

              <div className="partner-card-item">
                <Hotel className="partner-card-icon" size={28} />
                <h3 className="partner-card-title">White-Label / Franchise</h3>
                <p className="partner-card-desc">
                  Operate under your own unique independent or soft brand name, while utilizing NU Hotels' sales distribution and operational engines.
                </p>
              </div>

              <div className="partner-card-item">
                <Shield className="partner-card-icon" size={28} />
                <h3 className="partner-card-title">Conversion Expertise</h3>
                <p className="partner-card-desc">
                  Smooth, rapid rebranding workflows engineered to minimize property downtime and capture bookings from day one of transition.
                </p>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="glass-card inquiry-form-card">
              <h3 className="inquiry-title">Contact Us</h3>
              
              <form onSubmit={handleInquirySubmit}>
                <div className="form-group">
                  <label htmlFor="diff-name" className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    id="diff-name" 
                    required 
                    className="form-input"
                    value={inquiryForm.name}
                    onChange={(e) => setInquiryForm({...inquiryForm, name: e.target.value})}
                  />
                  <div className="form-input-line"></div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="diff-email" className="form-label">Email</label>
                    <input 
                      type="email" 
                      id="diff-email" 
                      required 
                      className="form-input"
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm({...inquiryForm, email: e.target.value})}
                    />
                    <div className="form-input-line"></div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="diff-phone" className="form-label">Contact Number</label>
                    <input 
                      type="tel" 
                      id="diff-phone" 
                      required 
                      className="form-input"
                      value={inquiryForm.phone}
                      onChange={(e) => setInquiryForm({...inquiryForm, phone: e.target.value})}
                    />
                    <div className="form-input-line"></div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="diff-comments" className="form-label">Comments / Requirements</label>
                  <textarea 
                    id="diff-comments" 
                    rows="3" 
                    className="form-input" 
                    style={{ resize: 'none' }}
                    value={inquiryForm.comments}
                    onChange={(e) => setInquiryForm({...inquiryForm, comments: e.target.value})}
                  ></textarea>
                  <div className="form-input-line"></div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Success Notification */}
      <div className={`success-notification ${showSuccess ? 'show' : ''}`}>
        <CheckCircle className="success-icon" size={24} />
        <div>
          <h4 className="success-title">Submission Successful</h4>
          <p className="success-msg">{successMsg}</p>
        </div>
      </div>
    </div>
  );
}
