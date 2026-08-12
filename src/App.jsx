import { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Calendar as CalendarIcon, 
  ArrowRight, 
  ArrowLeft,
  Shield, 
  TrendingUp, 
  Percent, 
  Briefcase, 
  Hotel, 
  Mail, 
  Phone, 
  Menu, 
  X, 
  ChevronDown, 
  CheckCircle,
  Building,
  UserCheck,
  Check,
  Award,
  Users,
  Clock,
  Printer,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import './App.css';
import NuDifference from './NuDifference';

// Hotel Data
const HOTELS_DATA = [
  {
    id: 1,
    name: "NU Luxe Hotel Tamarind",
    location: "Sector 66A, Chandigarh Airport Road, Mohali, Punjab",
    category: "luxe",
    image: "/hotel_images/hotel_tamarind.webp",
    tag: "Flagship Luxury",
    features: ["Airport Proximity", "Fine Dining", "Luxe Suites"],
    keys: 45,
    rgi: "116%",
    occupancy: "71%",
    narrative: "Flagship property in Mohali's corporate zone. Features high-end executive suites, a custom soundproof acoustics build, and dedicated meeting rooms targeting airport transit travellers and MICE demands.",
    objectPosition: "center 20%"
  },
  {
    id: 2,
    name: "NU Luxe Hotel Highway Inn",
    location: "Sector 82, Chandigarh Airport Road, Mohali, Punjab",
    category: "luxe",
    image: "/hotel_images/hotel_highway.webp",
    tag: "Transit Premium",
    features: ["Sleek Lounge", "Business Hub", "High Speed Wi-Fi"],
    keys: 60,
    rgi: "112%",
    occupancy: "68%",
    narrative: "Sleek, business-focused transit hotel on the busy airport corridor. Built to optimize quick business stops with high-speed Wi-Fi, modern ergonomic workspaces, and direct airport shuttle operations.",
    objectPosition: "center 20%"
  },
  {
    id: 3,
    name: "NU Luxe Hotel Ramee Collection",
    location: "Sector -65A, Phase 11, Mohali, Punjab",
    category: "luxe",
    image: "/hotel_images/hotel_ramee.webp",
    tag: "Boutique Experience",
    features: ["Bespoke Decor", "Curated Wellness", "Private Dining"],
    keys: 32,
    rgi: "118%",
    occupancy: "72%",
    narrative: "Bespoke boutique hotel in Phase 11. Emphasizes curated wellness treatment facilities, artisanal regional decor, and private upscale dining options for corporate gatherings.",
    objectPosition: "center 20%"
  },
  {
    id: 4,
    name: "NU Luxe Hotel Tamarind Tree",
    location: "Chandigarh-Ludhiana Highway, Mohali, Punjab",
    category: "luxe",
    image: "/hotel_images/hotel_tamarind_tree.webp",
    tag: "Resort Sanctuary",
    features: ["Landscaped Gardens", "Banquet Hall", "Infinity Pool"],
    keys: 25,
    rgi: "124%",
    occupancy: "75%",
    narrative: "A lush resort turnaround story on the Ludhiana highway. Combines wide-open landscaped gardens, banquets for large events, and a signature pool deck to drive strong leisure weekends.",
    objectPosition: "center 20%"
  },
  {
    id: 5,
    name: "NU Axis Hotel South End",
    location: "Sector 35, Chandigarh",
    category: "axis",
    image: "/hotel_images/hotel_south_end.webp",
    tag: "Urban Business",
    features: ["Central Chandigarh", "Meeting Spaces", "Executive Club"],
    keys: 40,
    rgi: "114%",
    occupancy: "70%",
    narrative: "Centrally positioned in Sector 35, Chandigarh. An urban corporate hotel optimized for business meetings, features modular boardrooms, high-tech workspaces, and direct access to commercial districts.",
    objectPosition: "center 20%"
  },
  {
    id: 6,
    name: "NU Axis Hotel Chandigarh Grand & Banquet",
    location: "IT Park, Chandigarh",
    category: "axis",
    image: "/hotel_images/hotel_chandigarh_grand.webp",
    tag: "Grand Venue",
    features: ["IT Hub location", "Massive Banquet", "Pre-function Area"],
    keys: 85,
    rgi: "126%",
    occupancy: "78%",
    narrative: "A massive grand venue near IT Park. Equipped with extensive pre-function space and a state-of-the-art banquet hall seating 500+ guests, catering to weddings, conventions, and corporate retreats.",
    objectPosition: "center 20%"
  },
  {
    id: 7,
    name: "NU Nest Hotel Samci Riviera",
    location: "Raj Bagh, Srinagar, Jammu & Kashmir",
    category: "nest",
    image: "/hotel_images/hotel_samci_riviera.webp",
    tag: "Alpine Retreat",
    features: ["Riverfront View", "Cozy Fireplace", "Warm Kashmiri Tea"],
    keys: 48,
    rgi: "110%",
    occupancy: "65%",
    narrative: "Riverfront boutique retreat in Raj Bagh, Srinagar. Combines traditional Kashmiri woodcraft motifs with direct river vistas, cozy fireplace lounges, and curated alpine wellness.",
    objectPosition: "center"
  },
  {
    id: 8,
    name: "NU Nest Hotel Vale Montis",
    location: "Dal Lake, Srinagar, Jammu & Kashmir",
    category: "nest",
    image: "/hotel_images/hotel_vale_montis.webp",
    tag: "Lakeside Sanctuary",
    features: ["Shikara Dock Access", "Scenic Roof", "Heritage Luxury"],
    keys: 30,
    rgi: "116%",
    occupancy: "71%",
    narrative: "Lakeside sanctuary right on Dal Lake. Features a private shikara dock, scenic roofdeck tea garden, and custom heritage suites crafted to attract international slow-travel guests.",
    objectPosition: "center 40%"
  }
];

const SERVICES_DATA = [
  {
    id: "revenue",
    title: "1. Centralised Sales & Distribution Support",
    desc: "Direct integration with major global distribution systems (GDS) and corporate travel desks. Combined with PMS, CRS, and AI-driven Revenue Management tools to dynamically optimize ADR and RevPAR in real-time.",
    image: "/sales_support.webp"
  },
  {
    id: "operations",
    title: "2. Operational Audits & Quality Control",
    desc: "Rigorous and regular operational gap audits to maintain brand consistency, safety standards, and high guest satisfaction scores across all properties.",
    image: "/quality_audit.webp"
  },
  {
    id: "marketing",
    title: "3. Marketing & Brand Positioning",
    desc: "Targeted digital marketing campaigns, local PR integration, active social media engagement, and advanced online reputation management to build local demand and brand equity.",
    image: "/brand_marketing.webp"
  },
  {
    id: "talent",
    title: "4. Talent Acquisition & Culture ('Sewak')",
    desc: "Comprehensive staff hiring and training governed by our signature Talent Development Program, 'Sewak'. Drives high employee retention strategies, keeping labor costs efficient and guest experiences authentic.",
    image: "/talent_culture.webp"
  }
];

const TESTIMONIALS_DATA = [
  {
    id: 1,
    quote: "Converting our family-owned heritage resort to NU Hotels was the turning point. Within 90 days, our average room rates (ADR) surged by 38% and occupancy stabilized even during off-season months.",
    author: "Mr. Rohit Dhar",
    initials: "RD",
    role: "Owner",
    property: "NU Nest Heritage Suite Collection",
    location: "Srinagar, J&K"
  },
  {
    id: 2,
    quote: "NU's centralized procurement scale reduced our daily operating overheads by ₹45 per occupied room. Their 'Sewak' hospitality training has made our staff exceptionally attentive.",
    author: "Sardarni Harpreet Kaur",
    initials: "HK",
    role: "Managing Partner",
    property: "NU Highway Inn",
    location: "Mohali, Punjab"
  },
  {
    id: 3,
    quote: "Their digital revenue management tools dynamically adjust pricing in real-time. We've seen a consistent 15% outperformance against local market benchmarks.",
    author: "Mr. Amit Sharma",
    initials: "AS",
    role: "Investor & Owner",
    property: "NU Vale Montis",
    location: "Kasauli, Himachal"
  },
  {
    id: 4,
    quote: "Operational efficiency skyrocketed after integrating their cloud-based PMS and central reservation system. Front-desk checkout times fell by 60% within weeks.",
    author: "Mr. Jaspal Singh",
    initials: "JS",
    role: "Director",
    property: "NU Grand Plaza",
    location: "Chandigarh"
  },
  {
    id: 5,
    quote: "Their white-label onboarding minimized our brand migration downtime to just 10 days. We immediately captured corporate bookings through their marketing network.",
    author: "Mr. Sandeep Sharma",
    initials: "SS",
    role: "Promoter & Partner",
    property: "NU Urban Vista",
    location: "Mohali, Punjab"
  },
  {
    id: 6,
    quote: "We partnered with NU to revitalize our legacy asset in Chandigarh. Their yield management algorithms boosted our RevPAR by 24% in the first quarter itself.",
    author: "Mrs. Neerja Vyas",
    initials: "NV",
    role: "Asset Co-Owner",
    property: "NU Regency Rooms",
    location: "Ludhiana, Punjab"
  },
  {
    id: 7,
    quote: "Managing a remote property in J&K was a logistics nightmare. NU Hotels took complete control of supply chains and staff standards, boosting guest ratings to 4.7/5.",
    author: "Mr. Vikramaditya Singh",
    initials: "VS",
    role: "Managing Director",
    property: "NU Mountain Crest Resort",
    location: "Patnitop, J&K"
  }
];

const ROADMAP_DATA = [
  {
    phase: "Phase 1",
    title: "Due Diligence & Audit",
    timeline: "Weeks 1–2",
    bullets: [
      "Financial performance review & benchmark audit",
      "Comprehensive physical site & infrastructure inspection",
      "Detailed operational gap & revenue leakage analysis"
    ]
  },
  {
    phase: "Phase 2",
    title: "Strategy & Technology Integration",
    timeline: "Weeks 3–6",
    bullets: [
      "Core system integration (Vite PMS, CRS, Revenue Tech)",
      "Cross-functional team alignment & operational training",
      "Brand standard deployment & service quality assurance"
    ]
  },
  {
    phase: "Phase 3",
    title: "Pre-Launch & Re-positioning",
    timeline: "Weeks 7–8",
    bullets: [
      "Activation of our centralized corporate sales engine",
      "Setup of GDS distribution & global OTA connectivity",
      "Local marketing, branding, & PR blitz launch"
    ]
  },
  {
    phase: "Phase 4",
    title: "Operational Go-Live & Scaling",
    timeline: "Day 60+",
    bullets: [
      "Full operational handoff to the management team",
      "Ongoing real-time RevPAR performance monitoring",
      "Continuous cost control scaling & owner reporting"
    ]
  }
];

const GROWTH_STRATEGY = [
  {
    num: "01",
    title: "Consolidate",
    desc: "Optimize performance, technology systems, and guest experience across all 10 existing hotels to secure maximum flow-through."
  },
  {
    num: "02",
    title: "Expand Footprint",
    desc: "Add new premium properties across priority North Indian cities and high-momentum tier-2 growth corridors."
  },
  {
    num: "03",
    title: "Diversify Formats",
    desc: "Introduce branded management contracts and franchise-style operations alongside owned and leased assets."
  },
  {
    num: "04",
    title: "Scale & Diversify",
    desc: "Extend into adjacent segments: premium banquets, corporate MICE hubs, and resort/cultural leisure destinations."
  }
];

// Room Options for Booking Step 2
const ROOM_OPTIONS = {
  luxe: [
    { id: "lx-suite", title: "NU Luxe Executive Suite", price: 8500, img: "/luxury_suite.webp", desc: "Spacious layout with pool or garden view, premium toiletries, and direct butler access." },
    { id: "lx-room", title: "NU Luxe Superior Room", price: 5800, img: "/luxury_suite.webp", desc: "King bedding with custom acoustics, modern workspace, and skyline city views." }
  ],
  axis: [
    { id: "ax-business", title: "NU Axis Business Premium", price: 6200, img: "/hero_hotel.webp", desc: "Tailored for business executives, featuring double-height workspace and complimentary club lounge." },
    { id: "ax-grand", title: "NU Axis Grand Club", price: 4500, img: "/luxury_suite.webp", desc: "Standard corporate room with luxury bedding, high-speed Wi-Fi, and modular layout." }
  ],
  nest: [
    { id: "ns-sanctuary", title: "NU Nest Riverview Sanctuary", price: 9800, img: "/wellness_spa.webp", desc: "A cozy valley sanctuary with a private fireplace and panoramic views of Dal Lake or Jhelum." },
    { id: "ns-deluxe", title: "NU Nest Heritage Deluxe", price: 7200, img: "/hero_hotel.webp", desc: "Traditional Kashmiri woodcraft details paired with modern luxury amenities." }
  ]
};

// Automated Counter component for stats with IntersectionObserver trigger and fallback
function AnimatedCounter({ target, duration = 1500, suffix = "" }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    let startTimestamp = null;
    let animationFrameId = null;
    let isAnimated = false;

    const startAnimation = () => {
      if (isAnimated) return;
      isAnimated = true;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCount(Math.floor(progress * target));
        if (progress < 1) {
          animationFrameId = window.requestAnimationFrame(step);
        } else {
          setCount(target);
        }
      };
      animationFrameId = window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          startAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    // Fallback: If it doesn't trigger in 300ms, start it anyway
    const fallbackTimer = setTimeout(() => {
      startAnimation();
      observer.disconnect();
    }, 300);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [target, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
}

function App() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [heroPos, setHeroPos] = useState({ x: 0, y: 0 });
  const [activeService, setActiveService] = useState("revenue");
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [activeHash, setActiveHash] = useState(window.location.hash || '#');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll Progress state
  const [scrollPercent, setScrollPercent] = useState(0);

  // Roadmap scroll timeline animation states
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [activeSteps, setActiveSteps] = useState([]);
  const timelineRef = useRef(null);
  const [growthProgress, setGrowthProgress] = useState(0);
  const growthRef = useRef(null);



  // Case Study modal state
  const [isCaseDrawerOpen, setIsCaseDrawerOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Promoter popovers states
  const [activePromoter, setActivePromoter] = useState(null);
  const [isFormHighlighted, setIsFormHighlighted] = useState(false);



  // Form states
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    comments: ''
  });

  const [modalInquiryForm, setModalInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    comments: ''
  });



  // Hotel Detailed inner page state
  const [activeHotelDetail, setActiveHotelDetail] = useState(null);

  // Testimonial Carousel Ref & State
  const testimonialSliderRef = useRef(null);
  const [sliderIndex, setSliderIndex] = useState(0);

  const scrollPrevTestimonial = () => {
    setSliderIndex((prevIndex) => {
      let visibleCards = 3;
      if (window.innerWidth <= 600) {
        visibleCards = 1;
      } else if (window.innerWidth <= 1024) {
        visibleCards = 2;
      }
      const maxIndex = TESTIMONIALS_DATA.length - visibleCards;
      
      if (prevIndex <= 0) {
        return maxIndex; /* Loop to the end */
      }
      return prevIndex - 1;
    });
  };

  const scrollNextTestimonial = () => {
    setSliderIndex((prevIndex) => {
      let visibleCards = 3;
      if (window.innerWidth <= 600) {
        visibleCards = 1;
      } else if (window.innerWidth <= 1024) {
        visibleCards = 2;
      }
      const maxIndex = TESTIMONIALS_DATA.length - visibleCards;

      if (prevIndex >= maxIndex) {
        return 0; /* Loop to the beginning */
      }
      return prevIndex + 1;
    });
  };

  // Testimonial Auto Scroll Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setSliderIndex((prevIndex) => {
        let visibleCards = 3;
        if (window.innerWidth <= 600) {
          visibleCards = 1;
        } else if (window.innerWidth <= 1024) {
          visibleCards = 2;
        }
        const maxIndex = TESTIMONIALS_DATA.length - visibleCards;

        if (prevIndex >= maxIndex) {
          return 0; /* Loop to beginning */
        }
        return prevIndex + 1;
      });
    }, 4500); /* Shift every 4.5 seconds */

    return () => clearInterval(timer);
  }, []);

  // Sync scroll position whenever sliderIndex changes or window resizes
  useEffect(() => {
    const slider = testimonialSliderRef.current;
    if (slider) {
      const card = slider.querySelector('.testimonial-card-item');
      if (card) {
        const cardWidth = card.offsetWidth + 24; /* width + gap */
        slider.scrollTo({
          left: sliderIndex * cardWidth,
          behavior: 'smooth'
        });
      }
    }

    const handleResize = () => {
      const slider = testimonialSliderRef.current;
      if (slider) {
        const card = slider.querySelector('.testimonial-card-item');
        if (card) {
          const cardWidth = card.offsetWidth + 24;
          slider.scrollTo({
            left: sliderIndex * cardWidth,
            behavior: 'auto' /* Instant update on resize */
          });
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sliderIndex]);

  // LOCK BODY SCROLL: While booking, case study, or hotel detailed drawers are open, lock scroll chaining.
  useEffect(() => {
    if (isCaseDrawerOpen || activeHotelDetail || isContactModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isCaseDrawerOpen, activeHotelDetail, isContactModalOpen]);

  // Dynamic 3D mouse tilt handlers for portfolio hotel cards (with inner image parallax, drone zoom, and glare)
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = x - xc;
    const dy = y - yc;
    // Maximum tilt angle of 5 degrees
    const rx = -(dy / yc) * 5;
    const ry = (dx / xc) * 5;
    
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.boxShadow = `${-ry * 1.5}px ${rx * 1.5 + 15}px 35px rgba(169, 127, 56, 0.15)`;
    
    // Parallax glide on image opposite to cursor + drone push-in zoom
    const img = card.querySelector('.hotel-img');
    if (img) {
      const tx = -(dx / xc) * 5;
      const ty = -(dy / yc) * 5;
      img.style.transform = `scale(1.05) translate3d(${tx}px, ${ty}px, 0)`;
    }

    // Dynamic glass glare tracking
    const glare = card.querySelector('.card-glare');
    if (glare) {
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255, 255, 255, 0.12) 0%, transparent 80%)`;
      glare.style.opacity = '1';
    }
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.boxShadow = 'var(--shadow-subtle)';
    
    const img = card.querySelector('.hotel-img');
    if (img) {
      img.style.transform = 'scale(1) translate3d(0, 0, 0)';
    }

    const glare = card.querySelector('.card-glare');
    if (glare) {
      glare.style.background = 'transparent';
      glare.style.opacity = '0';
    }
  };

  const handleTestimonialMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    // Smooth 3D tilt calculations (max 3 degrees rotation for a solid, high-end feel)
    const rx = ((yc - y) / yc) * 3;
    const ry = ((x - xc) / xc) * 3;
    
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.01, 1.01, 1.01)`;
    card.style.boxShadow = `${-ry * 1.5}px ${rx * 1.5 + 10}px 30px rgba(169, 127, 56, 0.12)`;
    
    // Subtle internal translation for visual depth
    const content = card.querySelector('.testimonial-slides-wrapper');
    if (content) {
      const tx = ((x - xc) / xc) * 4;
      const ty = ((y - yc) / yc) * 4;
      content.style.transform = `translate3d(${tx}px, ${ty}px, 15px)`;
    }
  };

  const handleTestimonialMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.boxShadow = 'none';
    
    const content = card.querySelector('.testimonial-slides-wrapper');
    if (content) {
      content.style.transform = 'translate3d(0, 0, 0)';
    }
  };



  // Cursor-based depth shifts across the hero section
  const handleHeroMouseMove = (e) => {
    const { clientX, clientY } = e;
    const xc = window.innerWidth / 2;
    const yc = window.innerHeight / 2;
    const dx = clientX - xc;
    const dy = clientY - yc;
    setHeroPos({
      x: (dx / xc) * 12, // shift up to 12px
      y: (dy / yc) * 12
    });
  };

  const handleHeroMouseLeave = () => {
    setHeroPos({ x: 0, y: 0 });
  };

  // Magnetic CTA hover controls
  const handleMagneticMove = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate3d(${x * 0.35}px, ${y * 0.35}px, 0) scale(1.02)`;
    btn.style.boxShadow = '0 10px 20px rgba(169, 127, 56, 0.12)';
  };

  const handleMagneticLeave = (e) => {
    const btn = e.currentTarget;
    btn.style.transform = 'translate3d(0, 0, 0) scale(1)';
    btn.style.boxShadow = 'none';
  };

  // Scroll-driven vertical roadmap progress tracker
  useEffect(() => {
    const handleScrollProgress = () => {
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const isAtBottom = viewportHeight + scrollY >= scrollHeight - 50;

      const timeline = timelineRef.current;
      if (timeline) {
        let progress = 0;
        if (isAtBottom) {
          progress = 100;
        } else {
          const rect = timeline.getBoundingClientRect();
          const startOffset = viewportHeight * 0.75;
          const totalDistance = rect.height + (viewportHeight * 0.3);
          const scrolled = startOffset - rect.top;
          progress = (scrolled / totalDistance) * 100;
          progress = Math.max(0, Math.min(100, progress));
        }
        setTimelineProgress(progress);
      }

      const growthTimeline = growthRef.current;
      if (growthTimeline) {
        let progress = 0;
        if (isAtBottom) {
          progress = 100;
        } else {
          const rect = growthTimeline.getBoundingClientRect();
          const startOffset = viewportHeight * 0.75;
          const totalDistance = rect.height + (viewportHeight * 0.3);
          const scrolled = startOffset - rect.top;
          progress = (scrolled / totalDistance) * 100;
          progress = Math.max(0, Math.min(100, progress));
        }
        setGrowthProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScrollProgress, { passive: true });
    window.addEventListener('resize', handleScrollProgress);
    
    const timer = setTimeout(handleScrollProgress, 100);

    return () => {
      window.removeEventListener('scroll', handleScrollProgress);
      window.removeEventListener('resize', handleScrollProgress);
      clearTimeout(timer);
    };
  }, []);

  // Handle header scroll percentage
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollPercent((window.scrollY / totalHeight) * 100);
      }
    };

    // Ensure body starts clean and strictly in light theme
    document.body.classList.remove('theme-dark');

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.classList.remove('theme-dark');
    };
  }, []);

  // Hash-based router listener with cross-page section scrolling
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      setActiveHash(hash || '#');
      if (hash === '#difference') {
        setCurrentPage('difference');
        window.scrollTo({ top: 0 });
      } else {
        setCurrentPage('home');
        if (!hash || hash === '#' || hash === '#home') {
          window.scrollTo({ top: 0 });
        }
      }
    };
    
    handleHashChange(); // Run once on load to catch initial hash
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Scroll Spy Observer to highlight navbar links on scroll
  useEffect(() => {
    const handleScrollSpy = () => {
      if (currentPage === 'difference') {
        setActiveHash('#difference');
        return;
      }
      
      const sections = ['about', 'hotels', 'partner'];
      let currentSection = '#';
      
      if (window.scrollY < 100) {
        setActiveHash('#');
        return;
      }

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.35) {
            currentSection = `#${sectionId}`;
          }
        }
      }
      setActiveHash(currentSection);
    };

    window.addEventListener('scroll', handleScrollSpy);
    window.addEventListener('hashchange', handleScrollSpy);
    handleScrollSpy();

    return () => {
      window.removeEventListener('scroll', handleScrollSpy);
      window.removeEventListener('hashchange', handleScrollSpy);
    };
  }, [currentPage]);

  // Smooth scroll to homepage sections after page mount
  useEffect(() => {
    if (currentPage === 'home') {
      const hash = window.location.hash;
      if (hash && hash !== '#difference') {
        const id = hash.replace('#', '');
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      }
    }
  }, [currentPage]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.05
    });

    revealElements.forEach(el => observer.observe(el));
    return () => revealElements.forEach(el => observer.unobserve(el));
  }, [activeCategory, currentPage]);

  // Promoter trigger actions: Auto-fills form, scrolls down, and flashes target form area
  const handlePromoterAction = (promoterName, actionType) => {
    let commentsText = "";
    if (actionType === 'zoom') {
      commentsText = `Hi ${promoterName}, I would like to schedule a Zoom consultation to discuss managing/converting my hotel property. Please coordinate dates.`;
    } else if (actionType === 'deck') {
      commentsText = `Hi ${promoterName}, please send the NU Hotels India B2B Partnership Pitch Deck & Conversion Prospectus to my email.`;
    } else {
      commentsText = `Hi ${promoterName}, I have a direct query regarding a management contract for my hospitality asset.`;
    }

    setInquiryForm({
      ...inquiryForm,
      comments: commentsText
    });

    setActivePromoter(null);
    
    // Smooth scroll to partnership section
    const partnerSection = document.getElementById('partner');
    if (partnerSection) {
      partnerSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Flash/highlight B2B card border in gold to capture attention
    setIsFormHighlighted(true);
    setTimeout(() => setIsFormHighlighted(false), 3000);
  };





  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setSuccessMsg("Consultation Request Received. Our partnership team will contact you within 24 hours.");
    setShowSuccess(true);
    setInquiryForm({ name: '', email: '', phone: '', comments: '' });
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const handleModalInquirySubmit = (e) => {
    e.preventDefault();
    setSuccessMsg("Consultation Request Received. Our partnership team will contact you within 24 hours.");
    setShowSuccess(true);
    setIsContactModalOpen(false);
    setModalInquiryForm({ name: '', email: '', phone: '', comments: '' });
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const filteredHotels = activeCategory === "all" 
    ? HOTELS_DATA 
    : HOTELS_DATA.filter(h => h.category === activeCategory);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="scroll-progress-container">
        <div className="scroll-progress-bar" style={{ width: `${scrollPercent}%` }}></div>
      </div>

      <header className={`header ${isScrolled ? 'glass-nav scaff-scrolled' : ''}`}>
        <div className="container">
          <a href="#" className="logo-container">
            <img src="/logo.webp" alt="NU Hotels & Resorts Logo" className="logo-img" />
            <span className="logo-text">NU Hotels & Resorts</span>
          </a>

          <ul className="nav-links">
            <li><a href="#" className={`nav-link ${currentPage === 'home' && (activeHash === '#' || activeHash === '' || activeHash === '#home') ? 'active' : ''}`}>Home</a></li>
            <li><a href="#about" className={`nav-link ${currentPage === 'home' && activeHash === '#about' ? 'active' : ''}`}>About Us</a></li>
            <li><a href="#difference" className={`nav-link ${currentPage === 'difference' || activeHash === '#difference' ? 'active' : ''}`}>The NU Difference</a></li>
            <li><a href="#hotels" className={`nav-link ${currentPage === 'home' && activeHash === '#hotels' ? 'active' : ''}`}>Portfolio</a></li>
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              className="btn btn-primary magnetic-btn header-contact-btn" 
              style={{ padding: '6px 14px', fontSize: '0.68rem', letterSpacing: '0.05em' }}
              onClick={() => setIsContactModalOpen(true)}
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
            >
              Contact Us
            </button>
            <button 
              className="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div 
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '100%',
              backgroundColor: 'var(--bg-cream)',
              borderBottom: '1px solid rgba(169, 127, 56, 0.2)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              zIndex: 90
            }}
            className="glass-card mobile-nav-drawer"
          >
            <a href="#" className={`nav-link ${currentPage === 'home' && (activeHash === '#' || activeHash === '' || activeHash === '#home') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#about" className={`nav-link ${currentPage === 'home' && activeHash === '#about' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>About Us</a>
            <a href="#difference" className={`nav-link ${currentPage === 'difference' || activeHash === '#difference' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>The NU Difference</a>
            <a href="#hotels" className={`nav-link ${currentPage === 'home' && activeHash === '#hotels' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Portfolio</a>
            <button 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '8px', padding: '12px', fontSize: '0.8rem' }}
              onClick={() => { setMobileMenuOpen(false); setIsContactModalOpen(true); }}
            >
              Contact Us
            </button>
          </div>
        )}
      </header>

      {currentPage === 'difference' ? (
        <NuDifference />
      ) : (
        <>
      {/* Hero Section */}
      <section 
        className="hero-section"
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        style={{
          backgroundImage: `url('/heritage_palace.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundAttachment: 'scroll',
          position: 'relative'
        }}
      >
        {/* Full-screen Dark overlay to ensure contrast */}
        <div className="hero-overlay-dark"></div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-centered-content">


            <span className="hero-subtitle">NU Hotels India</span>
            
            <h1 className="hero-title">
              Partnering for <br />
              <span>Profitability & Growth</span>
            </h1>
            
            <p className="hero-desc">
              A premium, promoter-led hotel management platform with a growing portfolio of <span style={{ color: 'var(--gold-light)', fontWeight: '600' }}>10+ properties</span> across Northern India. We combine <span style={{ color: 'var(--gold-light)', fontWeight: '600' }}>50+ years</span> of hands-on hospitality expertise with cutting-edge operations to drive <span style={{ color: 'var(--gold-light)', fontWeight: '600' }}>maximum yield and asset value</span> for hotel owners.
            </p>
            
            <div className="hero-cta-group">
              <a 
                href="#partner" 
                className="btn btn-primary magnetic-btn"
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
              >
                Become a Partner
              </a>
              <a 
                href="#hotels" 
                className="btn btn-secondary magnetic-btn"
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                style={{ borderColor: 'rgba(255, 255, 255, 0.4)', color: '#ffffff' }}
              >
                Explore Portfolio
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Bar */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">
                <AnimatedCounter target={10} suffix="+" />
              </span>
              <span className="stat-label">Operating Hotels</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                <AnimatedCounter target={3} />
              </span>
              <span className="stat-label">States / UTs Covered</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                <AnimatedCounter target={50} suffix="+" />
              </span>
              <span className="stat-label">Years Combined Leadership</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                <AnimatedCounter target={100} suffix="%" />
              </span>
              <span className="stat-label">Process Driven</span>
            </div>
          </div>
        </div>
      </section>

      {/* Promoters & Legacy Section */}
      <section id="about" className="about-section reveal">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <div className="about-header">
                <span className="hero-subtitle" style={{ marginBottom: '10px' }}>Who We Are</span>
              </div>
              <p className="about-desc-large">
                NU Hotels India is a system-driven hotel management and operating company with an established portfolio of <span style={{ color: 'var(--gold-primary)', fontWeight: '600' }}>10+ hotels</span> across Chandigarh, Punjab and Jammu & Kashmir.
              </p>
              <p className="about-desc-detail" style={{ marginBottom: '20px' }}>
                Built on three decades of hospitality leadership, we combine disciplined sales-driven operations with deep regional market knowledge to run profitable, guest-focused properties.
              </p>
              <p className="about-desc-detail">
                Now, we are scaling with a vision for structured, capital-backed expansion across India.
              </p>
            </div>

            <div className="about-image-container">
              <div className="about-image-wrapper">
                <img src="/about_lobby.webp" alt="NU Hotels Premium Lobby Reception" className="about-lobby-img" />
              </div>
            </div>
          </div>
        </div>
      </section>
        
        {/* Editorial Team Section */}
        <section className="team-editorial-section reveal">
          <div className="container">
            <div className="team-split-grid">
              {/* Left Column: Fully Visible 8K Portrait Frame */}
              <div className="team-photo-frame" style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(22, 17, 12, 0.15)',
                border: '1px solid rgba(169, 127, 56, 0.2)',
                height: '520px'
              }}>
                <img 
                  src="/owners/hospitality_team.webp" 
                  alt="NU Hotels Executive Leadership Board" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  className="team-main-photo"
                />

              </div>

              {/* Right Column: Editorial Text & Grid */}
              <div className="team-content-col" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="showcase-header" style={{ margin: '0 0 35px 0', textAlign: 'left' }}>
                  <span className="hero-subtitle" style={{ color: 'var(--gold-primary)', display: 'block', marginBottom: '8px' }}>Our Leadership</span>
                  <h2 style={{ color: 'var(--text-dark)', fontSize: '2.2rem', marginBottom: '15px', lineHeight: '1.2' }}>The Executive Board</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    An elite advisory group aligning operational protocols, brand audits, and yield monetization technology to guarantee risk-mitigated returns across all segments.
                  </p>
                </div>

                <div className="team-exec-grid" style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '20px'
                }}>
                  {/* Exec 1 */}
                  <div className="exec-card glass-card" style={{
                    background: 'rgba(255, 255, 255, 0.65)',
                    border: '1px solid rgba(169, 127, 56, 0.15)',
                    borderRadius: '4px',
                    padding: '20px',
                    textAlign: 'left',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}>
                    <h4 style={{ color: 'var(--text-dark)', fontSize: '1rem', marginBottom: '4px', fontWeight: '600' }}>Rajesh Nair</h4>
                    <span style={{ color: 'var(--gold-primary)', fontSize: '0.75rem', display: 'block', marginBottom: '12px', fontWeight: '600' }}>President & CEO</span>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', lineHeight: '1.4' }}>
                      Directs corporate growth strategy and asset management policies across our tier segments.
                    </p>
                  </div>

                  {/* Exec 2 */}
                  <div className="exec-card glass-card" style={{
                    background: 'rgba(255, 255, 255, 0.65)',
                    border: '1px solid rgba(169, 127, 56, 0.15)',
                    borderRadius: '4px',
                    padding: '20px',
                    textAlign: 'left',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}>
                    <h4 style={{ color: 'var(--text-dark)', fontSize: '1rem', marginBottom: '4px', fontWeight: '600' }}>Priya Sen</h4>
                    <span style={{ color: 'var(--gold-primary)', fontSize: '0.75rem', display: 'block', marginBottom: '12px', fontWeight: '600' }}>Chief Operating Officer</span>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', lineHeight: '1.4' }}>
                      Leads on-ground property operations, procurement networks, and service delivery audits.
                    </p>
                  </div>

                  {/* Exec 3 */}
                  <div className="exec-card glass-card" style={{
                    background: 'rgba(255, 255, 255, 0.65)',
                    border: '1px solid rgba(169, 127, 56, 0.15)',
                    borderRadius: '4px',
                    padding: '20px',
                    textAlign: 'left',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}>
                    <h4 style={{ color: 'var(--text-dark)', fontSize: '1rem', marginBottom: '4px', fontWeight: '600' }}>Karan Kapoor</h4>
                    <span style={{ color: 'var(--gold-primary)', fontSize: '0.75rem', display: 'block', marginBottom: '12px', fontWeight: '600' }}>VP, Yield & Technology</span>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', lineHeight: '1.4' }}>
                      Drives dynamic pricing algorithms, CRS integrations, and OTA channel optimization.
                    </p>
                  </div>

                  {/* Exec 4 */}
                  <div className="exec-card glass-card" style={{
                    background: 'rgba(255, 255, 255, 0.65)',
                    border: '1px solid rgba(169, 127, 56, 0.15)',
                    borderRadius: '4px',
                    padding: '20px',
                    textAlign: 'left',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}>
                    <h4 style={{ color: 'var(--text-dark)', fontSize: '1rem', marginBottom: '4px', fontWeight: '600' }}>Anjali Sharma</h4>
                    <span style={{ color: 'var(--gold-primary)', fontSize: '0.75rem', display: 'block', marginBottom: '12px', fontWeight: '600' }}>Director, Guest Standards</span>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', lineHeight: '1.4' }}>
                      Directs the "Sewak" training framework and ensures guest experience compliance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* The Hotels Collection */}
      <section id="hotels" className="section-padding reveal" style={{ borderTop: '1px solid rgba(169, 127, 56, 0.12)' }}>
        <div className="container">
          <div className="showcase-header">
            <span className="hero-subtitle">The Collection</span>
            <h2>Our Architectural Portfolios</h2>
            <p>Explore our carefully segmented hospitality brand tiers, running profitably across Chandigarh, Mohali, Ludhiana, and Jammu & Kashmir.</p>
          </div>

          <div className="showcase-tabs">
            <button 
              className={`showcase-tab ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All Hotels
            </button>
            <button 
              className={`showcase-tab ${activeCategory === 'luxe' ? 'active' : ''}`}
              onClick={() => setActiveCategory('luxe')}
            >
              NU Luxe
            </button>
            <button 
              className={`showcase-tab ${activeCategory === 'axis' ? 'active' : ''}`}
              onClick={() => setActiveCategory('axis')}
            >
              NU Axis
            </button>
            <button 
              className={`showcase-tab ${activeCategory === 'nest' ? 'active' : ''}`}
              onClick={() => setActiveCategory('nest')}
            >
              NU Nest
            </button>
          </div>

          <div className="showcase-grid">
            {filteredHotels.map((hotel) => (
              <article 
                key={hotel.id} 
                className="hotel-card" 
                style={{ cursor: 'pointer' }}
                onClick={() => setActiveHotelDetail(hotel)}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="hotel-card-inner">
                  <div className="card-border-shine"></div>
                  <div className="card-glare"></div>
                  <div className="hotel-img-wrapper">
                    <img 
                      src={hotel.image} 
                      alt={hotel.name} 
                      className="hotel-img" 
                      style={{ objectPosition: hotel.objectPosition || 'center' }}
                    />
                  </div>
                  <div className="hotel-content-box">
                    <h3 className="hotel-name">{hotel.name}</h3>
                    <div className="hotel-location">
                      <MapPin size={14} className="footer-contact-icon" style={{ marginTop: 0 }} />
                      <span>{hotel.location}</span>
                    </div>
                    <div className="hotel-features">
                      {hotel.features.map((f, i) => (
                        <span key={i} className="hotel-feature">
                          <Check size={12} style={{ color: 'var(--gold-primary)' }} />
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Onboarding Roadmap */}
      <section id="roadmap" className="section-padding reveal" style={{ borderTop: '1px solid rgba(169, 127, 56, 0.12)' }}>
        <div className="container">
          <div className="showcase-header">
            <span className="hero-subtitle">Asset Onboarding</span>
            <h2>Roadmap to Transition</h2>
            <p>A seamless roadmap engineered to re-position and integrate your hotel asset into our operations with zero downtime.</p>
          </div>

          <div ref={timelineRef} className="roadmap-timeline">
            {/* Scroll-driven progressive timeline progress overlay line */}
            <div className="roadmap-track-container">
              <div className="roadmap-progress-line" style={{ height: `${timelineProgress}%` }}></div>
            </div>
            {ROADMAP_DATA.map((step, idx) => {
              // Synchronize dot/card activation directly with the gold line progression height
              const isStepActive = 
                (idx === 0 && timelineProgress >= 2) ||
                (idx === 1 && timelineProgress >= 30) ||
                (idx === 2 && timelineProgress >= 60) ||
                (idx === 3 && timelineProgress >= 93);

              return (
                <div key={idx} className="roadmap-step">
                  <div className={`roadmap-dot ${isStepActive ? 'active' : ''}`}>
                    {idx + 1}
                  </div>
                  <div className={`roadmap-connector ${isStepActive ? 'active' : ''}`}></div>
                  <div className={`glass-card roadmap-card ${isStepActive ? 'active' : ''}`}>
                    <div className="roadmap-badges">
                      <span className="roadmap-badge phase">{step.phase}</span>
                      <span className="roadmap-badge timeline">{step.timeline}</span>
                    </div>
                    <h3 className="roadmap-title">{step.title}</h3>
                    <ul className="roadmap-bullets">
                      {step.bullets.map((bullet, i) => (
                        <li key={i} className="roadmap-bullet-item">
                          <span className="roadmap-bullet-marker">◆</span>
                          <span className="roadmap-bullet-text">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section id="case" className="section-padding reveal" style={{ borderTop: '1px solid rgba(169, 127, 56, 0.12)' }}>
        <div className="container">
          <div className="showcase-header" style={{ marginBottom: '50px' }}>
            <span className="hero-subtitle">Success Story</span>
            <h2>Proven Turnaround Results</h2>
            <p>Our operational framework in action. Click to reveal detailed operational milestones.</p>
          </div>

          <div className="glass-card case-study-card">
            <div className="case-study-card-inner">
              <div className="case-info">
                <span className="case-meta">Case Study • Performance Turnaround</span>
                <h3 className="case-title">NU Tamarind Tree</h3>
                <span className="hero-subtitle" style={{ fontSize: '0.75rem', marginBottom: '24px', display: 'block' }}>25-Key Boutique Hotel</span>
                
                <p className="case-narrative">
                  Prior to our transition, the boutique property struggled with low occupancy, high dependency on OTA channels, and operational friction. By deploying our centralized sales network, integrating Vite PMS/CRS dynamic rate management, and retraining staff with our signature <span className="highlight-gold">"Sewak"</span> hospitality program, we unlocked high efficiency and turned the asset profitable in under 60 days.
                </p>

              </div>

              <div className="case-metrics-grid">
                <div className="grid-metric-item">
                  <span className="grid-metric-sub">Financial Lift</span>
                  <div className="grid-metric-val">+42.0%</div>
                  <span className="grid-metric-lbl">RevPAR Growth</span>
                </div>

                <div className="grid-metric-item">
                  <span className="grid-metric-sub">Marketing Reach</span>
                  <div className="grid-metric-val">+56.0%</div>
                  <span className="grid-metric-lbl">Direct Bookings</span>
                </div>

                <div className="grid-metric-item">
                  <span className="grid-metric-sub">Owner Profitability</span>
                  <div className="grid-metric-val">+480 bps</div>
                  <span className="grid-metric-lbl">GOP Margin Expansion</span>
                </div>

                <div className="grid-metric-item">
                  <span className="grid-metric-sub">Execution Window</span>
                  <div className="grid-metric-val">60 Days</div>
                  <span className="grid-metric-lbl">Onboarding Duration</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Growth Strategy */}
      <section id="growth" className="section-padding reveal" style={{ borderTop: '1px solid rgba(169, 127, 56, 0.12)' }}>
        <div className="container">
          <div className="showcase-header" style={{ marginBottom: '60px' }}>
            <span className="hero-subtitle">Growth Strategy</span>
            <h2>Phased Path to Scale</h2>
            <p>Our long-term roadmap to expand our portfolio and secure market leadership.</p>
          </div>

          <div ref={growthRef} className="growth-dashboard">
            {/* Left: Constellation Map */}
            <div className="growth-map-col">
              <svg className="constellation-svg" viewBox="0 0 300 740" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background Connecting Path (Inactive) */}
                <path 
                  d="M 150 62 L 90 252 L 210 442 L 150 632" 
                  stroke="rgba(169, 127, 56, 0.12)" 
                  strokeWidth="2" 
                  strokeDasharray="4 4" 
                />
                
                {/* Active drawing path */}
                <path 
                  d="M 150 62 L 90 252 L 210 442 L 150 632" 
                  stroke="var(--gold-primary)" 
                  strokeWidth="2" 
                  strokeDasharray="620" 
                  style={{
                    strokeDashoffset: 620 - (growthProgress / 100) * 620,
                    transition: 'stroke-dashoffset 0.1s linear'
                  }}
                />

                {/* Node 1: Core Operations */}
                <g className={`map-node ${growthProgress >= 0 ? 'active' : ''}`}>
                  <circle cx={150} cy={62} r={12} className="node-dot" />
                  <text x={150} y={62} dy=".35em" textAnchor="middle" className="node-number">1</text>
                  <text x={150} y={28} className="node-label-phase" textAnchor="middle">Phase 01</text>
                  <text x={150} y={40} className="node-label-city" textAnchor="middle">Core Operations</text>
                </g>

                {/* Node 2: Market Scale */}
                <g className={`map-node ${growthProgress >= 30 ? 'active' : ''}`}>
                  <circle cx={90} cy={252} r={12} className="node-dot" />
                  <text x={90} y={252} dy=".35em" textAnchor="middle" className="node-number">2</text>
                  <text x={68} y={247} className="node-label-phase" textAnchor="end">Phase 02</text>
                  <text x={68} y={259} className="node-label-city" textAnchor="end">Market Scale</text>
                </g>

                {/* Node 3: New Formats */}
                <g className={`map-node ${growthProgress >= 65 ? 'active' : ''}`}>
                  <circle cx={210} cy={442} r={12} className="node-dot" />
                  <text x={210} y={442} dy=".35em" textAnchor="middle" className="node-number">3</text>
                  <text x={232} y={437} className="node-label-phase" textAnchor="start">Phase 03</text>
                  <text x={232} y={449} className="node-label-city" textAnchor="start">New Formats</text>
                </g>

                {/* Node 4: Adjacent Verticals */}
                <g className={`map-node ${growthProgress >= 93 ? 'active' : ''}`}>
                  <circle cx={150} cy={632} r={12} className="node-dot" />
                  <text x={150} y={632} dy=".35em" textAnchor="middle" className="node-number">4</text>
                  <text x={150} y={662} className="node-label-phase" textAnchor="middle">Phase 04</text>
                  <text x={150} y={674} className="node-label-city" textAnchor="middle">Adjacent Verticals</text>
                </g>
              </svg>
            </div>

            {/* Right: Evaporating Mist Cards */}
            <div className="growth-cards-col">
              {GROWTH_STRATEGY.map((st, idx) => {
                const isStepActive = 
                  (idx === 0 && growthProgress >= 0) ||
                  (idx === 1 && growthProgress >= 30) ||
                  (idx === 2 && growthProgress >= 65) ||
                  (idx === 3 && growthProgress >= 93);

                return (
                  <div key={idx} className={`growth-step-card ${isStepActive ? 'active' : ''}`}>
                    {/* The Mountain Mist Cloud Overlay */}
                    <div className="growth-mist-overlay">
                      <div className="mist-cloud-particle"></div>
                    </div>
                    {/* The Card content beneath the mist */}
                    <div className="growth-card-content">
                      <span className="growth-num">{st.num} • Strategy Phase</span>
                      <h3 className="growth-title">{st.title}</h3>
                      <p className="growth-desc">{st.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding reveal" style={{ borderTop: '1px solid rgba(169, 127, 56, 0.12)' }}>
        <div className="container">
          <div className="showcase-header" style={{ marginBottom: '80px' }}>
            <span className="hero-subtitle">Our Capabilities</span>
            <h2>The NU Management Engine</h2>
            <p>We combine your physical assets with our operational power to secure market leadership and RevPAR growth.</p>
          </div>

          <div className="services-grid">
            <div className="services-accordion">
              {SERVICES_DATA.map((srv) => (
                <div 
                  key={srv.id} 
                  className={`service-item ${activeService === srv.id ? 'active' : ''}`}
                >
                  <button 
                    className="service-trigger"
                    onClick={() => setActiveService(srv.id)}
                  >
                    <span>{srv.title}</span>
                    <ChevronDown 
                      size={20} 
                      style={{ 
                        transform: activeService === srv.id ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.3s ease'
                      }} 
                    />
                  </button>
                  <div className="service-content">
                    <p>{srv.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="services-visual-panel">
              {SERVICES_DATA.map((srv) => (
                <img 
                  key={srv.id}
                  src={srv.image} 
                  alt={srv.title} 
                  className={`services-panel-img ${activeService === srv.id ? 'active' : ''}`}
                />
              ))}
              <div className="services-panel-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership & B2B Form Section */}
      <section id="partner" className="section-padding reveal" style={{ borderTop: '1px solid rgba(169, 127, 56, 0.12)' }}>
        <div className="container">
          <div className="showcase-header" style={{ marginBottom: '80px' }}>
            <span className="hero-subtitle">B2B Partnerships</span>
            <h2>Unlock the Value of Your Hotel Asset</h2>
            <p>Explore customized management structures tailored to your property’s profile and regional potential.</p>
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
            <div className={`glass-card inquiry-form-card ${isFormHighlighted ? 'form-highlighted' : ''}`}>
              <h3 className="inquiry-title">Contact Us</h3>
              
              <form onSubmit={handleInquirySubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    required 
                    className="form-input"
                    value={inquiryForm.name}
                    onChange={(e) => setInquiryForm({...inquiryForm, name: e.target.value})}
                  />
                  <div className="form-input-line"></div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      required 
                      className="form-input"
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm({...inquiryForm, email: e.target.value})}
                    />
                    <div className="form-input-line"></div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">Contact Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      required 
                      className="form-input"
                      value={inquiryForm.phone}
                      onChange={(e) => setInquiryForm({...inquiryForm, phone: e.target.value})}
                    />
                    <div className="form-input-line"></div>
                  </div>
                </div>


                <div className="form-group">
                  <label htmlFor="comments" className="form-label">Comments / Requirements</label>
                  <textarea 
                    id="comments" 
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

      {/* Voices of Trust / Testimonials Section */}
      <section id="standards" className="section-padding reveal" style={{ borderTop: '1px solid rgba(169, 127, 56, 0.12)', backgroundColor: 'transparent' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            {/* Minimalist Heritage Peaked Roof SVG Crown - Section Header */}
            <svg 
              className="testimonial-roof-svg" 
              viewBox="0 0 200 40" 
              style={{ 
                width: '120px', 
                height: 'auto', 
                display: 'block', 
                margin: '0 auto 20px auto', 
                fill: 'none', 
                stroke: 'var(--gold-primary)', 
                strokeWidth: '1.25', 
                strokeLinecap: 'round', 
                strokeLinejoin: 'round', 
                opacity: 0.85 
              }}
            >
              <path d="M 20 35 L 100 8 L 180 35" />
              <path d="M 60 35 L 100 18 L 140 35" />
              <path d="M 100 8 L 100 35" />
              <path d="M 40 35 L 160 35" />
            </svg>
            <span className="hero-subtitle">Voices of Trust</span>
            <h2 style={{ fontSize: '2.4rem', fontFamily: 'var(--font-heading)', fontWeight: '400', color: 'var(--text-dark)' }}>Testimonials</h2>
            <p style={{ color: 'var(--text-muted)', margin: '16px auto 0 auto', maxWidth: '600px', fontSize: '0.98rem', lineHeight: '1.6' }}>
              Hear directly from independent hotel owners who partnered with NU Hotels to accelerate revenue, scale operations, and build brand equity.
            </p>
          </div>

          <div className="testimonial-slider-container" style={{ position: 'relative', marginTop: '40px' }}>
            {/* Viewport wrapper */}
            <div 
              ref={testimonialSliderRef}
              className="testimonial-slider-viewport" 
              style={{
                display: 'flex',
                gap: '24px',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                scrollBehavior: 'smooth',
                padding: '20px 4px',
                scrollbarWidth: 'none', /* Firefox */
                msOverflowStyle: 'none' /* IE/Edge */
              }}
            >
              {TESTIMONIALS_DATA.map((t) => (
                <div 
                  key={t.id}
                  className="testimonial-card-item glass-card"
                  style={{
                    flex: '0 0 calc(33.333% - 16px)',
                    scrollSnapAlign: 'start',
                    boxSizing: 'border-box',
                    padding: '36px 30px',
                    borderRadius: '8px',
                    border: '1px solid rgba(169, 127, 56, 0.15)',
                    borderTop: '3px solid var(--gold-primary)',
                    background: 'rgba(255, 255, 255, 0.55)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '320px',
                    boxShadow: '0 10px 30px rgba(169, 127, 56, 0.03)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                >
                  {/* Quote text */}
                  <div style={{ flex: 1 }}>
                    <p style={{ 
                      fontSize: '0.92rem', 
                      fontStyle: 'italic', 
                      lineHeight: '1.65', 
                      color: 'var(--text-dark)', 
                      margin: 0,
                      fontWeight: '300'
                    }}>
                      "{t.quote}"
                    </p>
                  </div>

                  {/* Divider */}
                  <div style={{ width: '30px', height: '1px', background: 'rgba(169, 127, 56, 0.2)', margin: '20px 0 16px 0' }}></div>

                  {/* Meta with Initials Avatar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: 'rgba(169, 127, 56, 0.1)',
                      border: '1px solid var(--gold-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--gold-primary)',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      letterSpacing: '0.5px',
                      boxShadow: '0 4px 10px rgba(169, 127, 56, 0.05)',
                      flexShrink: 0
                    }}>
                      {t.initials}
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ fontWeight: '500', color: 'var(--text-dark)', fontSize: '0.9rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {t.author}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {t.role}, <span style={{ color: 'var(--gold-primary)', fontWeight: '500' }}>{t.property}</span>
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                        <MapPin size={10} style={{ color: 'var(--gold-primary)' }} />
                        {t.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Slider Navigation Buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '24px' }}>
              <button 
                onClick={scrollPrevTestimonial}
                className="carousel-arrow"
                aria-label="Previous Testimonial"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '1px solid rgba(169, 127, 56, 0.25)',
                  background: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--gold-primary)',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(22, 17, 12, 0.05)'
                }}
              >
                <ArrowLeft size={16} />
              </button>
              <button 
                onClick={scrollNextTestimonial}
                className="carousel-arrow"
                aria-label="Next Testimonial"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '1px solid rgba(169, 127, 56, 0.25)',
                  background: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--gold-primary)',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(22, 17, 12, 0.05)'
                }}
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

        </>
      )}
      {/* Footer Section */}
      <footer id="contact" className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="logo-container" style={{ marginBottom: '20px' }}>
                <img src="/logo.webp" alt="NU Hotels & Resorts Logo" className="logo-img" style={{ filter: 'brightness(1.5)' }} />
                <span className="logo-text" style={{ color: 'var(--text-light)' }}>NU Hotels & Resorts</span>
              </div>
              <p className="footer-brand-desc">
                A promoter-led hospitality force elevating independent properties through optimized operations, sales power, and financial transparency.
              </p>
            </div>

            <div>
              <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#about" className="footer-link">About Us</a></li>
                <li><a href="#hotels" className="footer-link">Portfolio</a></li>
                <li><a href="#partner" className="footer-link">Partnerships</a></li>
                <li><a href="#standards" className="footer-link">Testimonials</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-title">Corporate Office</h4>
              <div className="footer-contact-item">
                <MapPin className="footer-contact-icon" size={16} />
                <span>
                  SCO 2A, Sector 66-A,<br />
                  Chandigarh Airport Road,<br />
                  Mohali, Punjab, India. 160308
                </span>
              </div>
              <div className="footer-contact-item">
                <Mail className="footer-contact-icon" size={16} />
                <a href="mailto:info@nuhotelsindia.com">info@nuhotelsindia.com</a>
              </div>
              <div className="footer-contact-item">
                <Phone className="footer-contact-icon" size={16} />
                <div>
                  <a href="tel:+9173477237688">+91 73477 237688</a><br />
                  <a href="tel:+919803099999">+91 98030 99999</a>
                </div>
              </div>
            </div>

            <div>
              <h4 className="footer-title">Location Map</h4>
              {/* Embedded Standard Google Map (No dark/grayscale filters) */}
              <div className="footer-map-container" style={{ marginTop: '16px' }}>
                <iframe 
                  title="NU Hotels India Corporate Office Location"
                  className="footer-map-iframe"
                  src="https://maps.google.com/maps?q=30.6558,76.7410&hl=en&z=15&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span className="footer-copyright">
              &copy; {new Date().getFullYear()} NU Hotels India. All Rights Reserved. Designed to brand guidelines.
            </span>
            <span className="footer-copyright" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              Designed &amp; Maintained by{' '}
              <a 
                href="https://foveainfotech.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ 
                  color: 'var(--text-light)', 
                  textDecoration: 'none', 
                  fontWeight: '600', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '4px',
                  transition: 'color 0.3s ease'
                }}
                className="footer-author-link"
              >
                Fovea Infotech
                <ExternalLink size={12} style={{ display: 'inline-block', opacity: 0.8 }} />
              </a>
            </span>
          </div>
        </div>
      </footer>

      {/* Booking Drawer (Multi-Step Wizard) */}
      {/* Hotel Detailed Catalogue Page (Immersive Centered Modal) */}
      <div 
        className={`hotel-detail-modal-container ${activeHotelDetail ? 'open' : ''}`}
        onClick={() => setActiveHotelDetail(null)}
      >
        {activeHotelDetail && (
          <div 
            className="hotel-detail-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Sticky Visual Column */}
            <div className="modal-visual-col">
              <img 
                src={activeHotelDetail.image} 
                alt={activeHotelDetail.name} 
                className="modal-visual-img" 
              />
              <div className="modal-visual-overlay"></div>
              
              {/* Performance Stats Overlay at the bottom of visual */}
              <div 
                className="detail-stats-grid" 
                style={{ 
                  position: 'absolute', 
                  bottom: '20px', 
                  left: '20px', 
                  right: '20px', 
                  background: 'rgba(15, 14, 13, 0.85)', 
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(169, 127, 56, 0.3)',
                  margin: 0
                }}
              >
                <div>
                  <div className="detail-stat-val" style={{ color: 'var(--gold-light)' }}>{activeHotelDetail.keys}</div>
                  <div className="detail-stat-lbl" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Keys Count</div>
                </div>
                <div>
                  <div className="detail-stat-val" style={{ color: 'var(--gold-light)' }}>{activeHotelDetail.rgi}</div>
                  <div className="detail-stat-lbl" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>RGI Boost</div>
                </div>
                <div>
                  <div className="detail-stat-val" style={{ color: 'var(--gold-light)' }}>{activeHotelDetail.occupancy}</div>
                  <div className="detail-stat-lbl" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Avg Occupancy</div>
                </div>
              </div>
            </div>

            {/* Right Scrollable Content Column */}
            <div className="modal-content-col">
              <div className="modal-header" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', border: 'none', padding: 0 }}>
                <div>
                  <span className="hero-subtitle" style={{ fontSize: '0.7rem', marginBottom: '2px', display: 'block' }}>
                    {activeHotelDetail.category.toUpperCase()} COLLECTION
                  </span>
                  <h3 className="detail-title">{activeHotelDetail.name}</h3>
                </div>
                <button 
                  className="modal-close-btn"
                  onClick={() => setActiveHotelDetail(null)}
                  aria-label="Close Property Catalogue"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dark)', padding: '4px' }}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="detail-location">
                <MapPin size={14} style={{ color: 'var(--gold-primary)', marginRight: '6px' }} />
                <span>{activeHotelDetail.location}</span>
              </div>

              {/* Narrative */}
              <p className="detail-narrative">{activeHotelDetail.narrative}</p>

              {/* Conversion & Integration Specifications */}
              <h4 className="detail-suite-header" style={{ marginTop: '24px', marginBottom: '16px' }}>Conversion & Integration Specifications</h4>
              <div className="detail-suites-list" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div style={{ padding: '16px', background: 'rgba(169, 127, 56, 0.05)', border: '1px solid rgba(169, 127, 56, 0.15)', borderRadius: '4px' }}>
                  <div style={{ fontWeight: '600', color: 'var(--gold-primary)', fontSize: '0.85rem', marginBottom: '4px' }}>Integration Speed</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>30–45 Days full property handover, systems, and PMS integration.</div>
                </div>
                <div style={{ padding: '16px', background: 'rgba(169, 127, 56, 0.05)', border: '1px solid rgba(169, 127, 56, 0.15)', borderRadius: '4px' }}>
                  <div style={{ fontWeight: '600', color: 'var(--gold-primary)', fontSize: '0.85rem', marginBottom: '4px' }}>Direct Distribution</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Setup on direct NU GDS/CRS engines, reducing OTA dependance.</div>
                </div>
                <div style={{ padding: '16px', background: 'rgba(169, 127, 56, 0.05)', border: '1px solid rgba(169, 127, 56, 0.15)', borderRadius: '4px' }}>
                  <div style={{ fontWeight: '600', color: 'var(--gold-primary)', fontSize: '0.85rem', marginBottom: '4px' }}>Staff & Culture Training</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>100% staff integration under our premium 'Sewak' hospitality model.</div>
                </div>
                <div style={{ padding: '16px', background: 'rgba(169, 127, 56, 0.05)', border: '1px solid rgba(169, 127, 56, 0.15)', borderRadius: '4px' }}>
                  <div style={{ fontWeight: '600', color: 'var(--gold-primary)', fontSize: '0.85rem', marginBottom: '4px' }}>Operational Audits</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Bi-weekly operations gap reviews and leakage analyses.</div>
                </div>
              </div>

              {/* Lower Actions */}
              <div style={{ borderTop: '1px solid rgba(169, 127, 56, 0.15)', paddingTop: '24px', marginTop: 'auto', display: 'flex' }}>
                <button 
                  type="button"
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '12px', fontSize: '0.75rem' }}
                  onClick={() => {
                    setInquiryForm({
                      ...inquiryForm,
                      comments: `Hi, I am interested in a franchise/management conversion prospectus for a property similar to ${activeHotelDetail.name}. Please share technical blueprints and commercial terms.`
                    });
                    setActiveHotelDetail(null);
                    const partnerSection = document.getElementById('partner');
                    if (partnerSection) {
                      partnerSection.scrollIntoView({ behavior: 'smooth' });
                    }
                    setIsFormHighlighted(true);
                    setTimeout(() => setIsFormHighlighted(false), 3000);
                  }}
                >
                  Convert Property
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Case Study Detail Modal (Centered Cinematic Overlay) */}
      <div 
        className={`case-modal-container ${isCaseDrawerOpen ? 'open' : ''}`}
        onClick={() => setIsCaseDrawerOpen(false)}
      >
        <div 
          className="centered-case-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="modal-header" style={{ marginBottom: '30px' }}>
              <div>
                <span className="hero-subtitle" style={{ fontSize: '0.7rem', marginBottom: '2px' }}>Case Study Detail</span>
                <h3 className="modal-title" style={{ fontSize: '1.8rem' }}>NU Tamarind Tree</h3>
              </div>
              <button 
                className="modal-close-btn"
                onClick={() => setIsCaseDrawerOpen(false)}
                aria-label="Close Case Study Details"
              >
                <X size={24} />
              </button>
            </div>

            <span className="hero-subtitle" style={{ fontSize: '0.75rem', marginBottom: '20px', display: 'block' }}>
              Operational Turnaround Roadmap (12 Months)
            </span>

            {/* Timeline phase list */}
            <div className="case-timeline-item">
              <span className="case-timeline-time">Month 1: Diagnostic Audit</span>
              <h4 className="case-timeline-title">Legacy Systems Overhaul</h4>
              <p className="case-timeline-desc">
                Displaced manual ledgers and standalone software. Deployed Centralized PMS and dynamic rate management tools linked to local demand trackers.
              </p>
            </div>

            <div className="case-timeline-item">
              <span className="case-timeline-time">Month 3: Service Alignment</span>
              <h4 className="case-timeline-title">Talent Retraining via "Sewak"</h4>
              <p className="case-timeline-desc">
                Retrained 100% of staff in brand hospitality, food safety, and sales desk upselling protocols, driving immediate guest rating increases.
              </p>
            </div>

            <div className="case-timeline-item">
              <span className="case-timeline-time">Month 6: Channel Optimization</span>
              <h4 className="case-timeline-title">OTA Commission Reduction</h4>
              <p className="case-timeline-desc">
                Integrated corporate travel contracts and launched direct GDS links, routing 40%+ bookings away from high-commission OTA channels.
              </p>
            </div>

            <div className="case-timeline-item">
              <span className="case-timeline-time">Month 12: Peak Valuation</span>
              <h4 className="case-timeline-title">Revenue Index Achievement</h4>
              <p className="case-timeline-desc">
                Surpassed direct competitor basket, registering a RevPAR growth index (RGI) of 115% and expanding gross operating margins by 480 basis points.
              </p>
            </div>

            {/* Before vs After stats table */}
            <div style={{ marginTop: '40px', borderTop: '1px solid rgba(169, 127, 56, 0.15)', paddingTop: '30px' }}>
              <span className="hero-subtitle" style={{ fontSize: '0.75rem', marginBottom: '20px', display: 'block' }}>
                Metrics Comparison
              </span>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(169, 127, 56, 0.25)', color: 'var(--text-dark)' }}>
                    <th style={{ padding: '10px 0' }}>KPI</th>
                    <th style={{ padding: '10px 0' }}>Before Transition</th>
                    <th style={{ padding: '10px 0', color: 'var(--gold-primary)', fontWeight: 'bold' }}>After NU Management</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(169, 127, 56, 0.1)' }}>
                    <td style={{ padding: '12px 0', fontWeight: '500' }}>Occupancy Rate</td>
                    <td style={{ padding: '12px 0' }}>45%</td>
                    <td style={{ padding: '12px 0', color: 'var(--gold-primary)', fontWeight: 'bold' }}>68%</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(169, 127, 56, 0.1)' }}>
                    <td style={{ padding: '12px 0', fontWeight: '500' }}>Direct Booking Ratio</td>
                    <td style={{ padding: '12px 0' }}>12%</td>
                    <td style={{ padding: '12px 0', color: 'var(--gold-primary)', fontWeight: 'bold' }}>38%</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px 0', fontWeight: '500' }}>GOP margin</td>
                    <td style={{ padding: '12px 0' }}>18%</td>
                    <td style={{ padding: '12px 0', color: 'var(--gold-primary)', fontWeight: 'bold' }}>22.8% (+480 bps)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '40px', display: 'flex', gap: '16px' }}>
            <button 
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={() => {
                setIsCaseDrawerOpen(false);
                const partnerSection = document.getElementById('partner');
                if (partnerSection) {
                  partnerSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Consult On Your Property
            </button>
          </div>
        </div>
      </div>

      {/* Contact Us Modal */}
      {isContactModalOpen && (
        <div 
          className="contact-modal-backdrop"
          onClick={() => setIsContactModalOpen(false)}
        >
          <div 
            className="contact-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="contact-modal-header">
              <div>
                <span className="hero-subtitle" style={{ fontSize: '0.7rem', marginBottom: '2px', display: 'block' }}>Partnerships & Conversions</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--text-dark)', margin: 0 }}>Contact Us</h3>
              </div>
              <button 
                className="contact-modal-close"
                onClick={() => setIsContactModalOpen(false)}
                aria-label="Close Contact Form"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleModalInquirySubmit} className="contact-modal-form">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  required
                  placeholder="e.g. Harpreet Singh"
                  value={modalInquiryForm.name}
                  onChange={(e) => setModalInquiryForm({...modalInquiryForm, name: e.target.value})}
                />
                <div className="form-input-line"></div>
              </div>

              <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    required
                    placeholder="name@example.com"
                    value={modalInquiryForm.email}
                    onChange={(e) => setModalInquiryForm({...modalInquiryForm, email: e.target.value})}
                  />
                  <div className="form-input-line"></div>
                </div>

                <div className="form-group">
                  <label className="form-label">Contact Number</label>
                  <input 
                    type="tel" 
                    className="form-input" 
                    required
                    placeholder="+91 XXXXX XXXXX"
                    value={modalInquiryForm.phone}
                    onChange={(e) => setModalInquiryForm({...modalInquiryForm, phone: e.target.value})}
                  />
                  <div className="form-input-line"></div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Comments / Requirements</label>
                <textarea 
                  rows="3" 
                  className="form-input" 
                  style={{ resize: 'none' }}
                  placeholder="Tell us about your property, location, and key requirements..."
                  value={modalInquiryForm.comments}
                  onChange={(e) => setModalInquiryForm({...modalInquiryForm, comments: e.target.value})}
                ></textarea>
                <div className="form-input-line"></div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Success Notification */}
      <div className={`success-notification ${showSuccess ? 'show' : ''}`}>
        <CheckCircle className="success-icon" size={24} />
        <div>
          <h4 className="success-title">Submission Successful</h4>
          <p className="success-msg">{successMsg}</p>
        </div>
      </div>
    </>
  );
}

export default App;
