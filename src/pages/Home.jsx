import ApplicationsGrid from "../components/Applicationsgrid"
import Collaborations from "../components/Collaborations"
import ContentSection from "../components/ContentSection"
import Footer from "../components/Footer"
import Header from "../components/Header"
import ProjectsGrid from "../components/ProjectsGrid"
import Testimonial from "../components/Testimonial"

const Home = () => {
  const dummyImages = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1497493292307-31c376b6e479?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  ];
  
  return (
    <>
      <div className="min-h-screen bg-gray-900 relative overflow-hidden">

        {/* Animated Circuit SVG Background */}
        <div className="absolute inset-0 overflow-hidden">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1920 1080"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Circuit Board Base Pattern */}
            <defs>
              <pattern id="circuitGrid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="1" />
              </pattern>

              {/* Glowing effect filter */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Animated gradient for flowing data */}
              <linearGradient id="flowingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0)">
                  <animate
                    attributeName="stop-color"
                    values="rgba(59, 130, 246, 0);rgba(59, 130, 246, 0.8);rgba(59, 130, 246, 0)"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="50%" stopColor="rgba(59, 130, 246, 0.8)">
                  <animate
                    attributeName="stop-color"
                    values="rgba(59, 130, 246, 0.8);rgba(59, 130, 246, 0);rgba(59, 130, 246, 0.8)"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0)">
                  <animate
                    attributeName="stop-color"
                    values="rgba(59, 130, 246, 0);rgba(59, 130, 246, 0.8);rgba(59, 130, 246, 0)"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </stop>
              </linearGradient>
            </defs>

            {/* Base grid pattern */}
            <rect width="100%" height="100%" fill="url(#circuitGrid)" opacity="0.3" />

            {/* Main circuit paths */}
            <g className="circuit-paths">
              {/* Horizontal main lines */}
              <path d="M 0 200 L 400 200 L 450 250 L 800 250 L 850 200 L 1200 200 L 1250 250 L 1600 250 L 1650 200 L 1920 200" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="2" fill="none" />
              <path d="M 0 400 L 300 400 L 350 450 L 700 450 L 750 400 L 1100 400 L 1150 450 L 1500 450 L 1550 400 L 1920 400" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="2" fill="none" />
              <path d="M 0 600 L 500 600 L 550 650 L 900 650 L 950 600 L 1300 600 L 1350 650 L 1700 650 L 1750 600 L 1920 600" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="2" fill="none" />
              <path d="M 0 800 L 200 800 L 250 850 L 600 850 L 650 800 L 1000 800 L 1050 850 L 1400 850 L 1450 800 L 1920 800" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="2" fill="none" />

              <path d="M 0 300 L 300 300 L 350 350 L 700 350 L 750 300 L 1100 300 L 1150 350 L 1500 350 L 1550 300 L 1920 300" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="2" fill="none" />
              <path d="M 0 500 L 400 500 L 450 550 L 800 550 L 850 500 L 1200 500 L 1250 550 L 1600 550 L 1650 500 L 1920 500" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="2" fill="none" />
              <path d="M 0 700 L 200 700 L 250 750 L 600 750 L 650 700 L 1000 700 L 1050 750 L 1400 750 L 1450 700 L 1920 700" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="2" fill="none" />
              <path d="M 0 900 L 200 900 L 250 950 L 600 950 L 650 900 L 1000 900 L 1050 950 L 1400 950 L 1450 900 L 1920 900" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="2" fill="none" />


              {/* Vertical connecting lines */}
              <path d="M 200 0 L 200 300 L 250 350 L 250 700 L 200 750 L 200 1080" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="2" fill="none" />
              <path d="M 600 0 L 600 150 L 650 200 L 650 500 L 600 550 L 600 1080" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="2" fill="none" />
              <path d="M 1000 0 L 1000 250 L 1050 300 L 1050 600 L 1000 650 L 1000 1080" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="2" fill="none" />
              <path d="M 1400 0 L 1400 350 L 1450 400 L 1450 750 L 1400 800 L 1400 1080" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="2" fill="none" />

              <path d="M 100 0 L 100 200 L 150 250 L 150 600 L 100 650 L 100 1080" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="2" fill="none" />
              <path d="M 400 0 L 400 180 L 450 230 L 450 580 L 400 630 L 400 1080" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="2" fill="none" />
              <path d="M 800 0 L 800 220 L 850 270 L 850 620 L 800 670 L 800 1080" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="2" fill="none" />
              <path d="M 1200 0 L 1200 260 L 1250 310 L 1250 660 L 1200 710 L 1200 1080" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="2" fill="none" />
              <path d="M 1600 0 L 1600 300 L 1650 350 L 1650 700 L 1600 750 L 1600 1080" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="2" fill="none" />
            </g>

            {/* Animated flowing data paths */}
            <g className="flowing-data">
              <path
                d="M 0 200 L 400 200 L 450 250 L 800 250 L 850 200 L 1200 200 L 1250 250 L 1600 250 L 1650 200 L 1920 200"
                stroke="url(#flowingGradient)"
                strokeWidth="3"
                fill="none"
                filter="url(#glow)"
              >
                <animate
                  attributeName="stroke-dasharray"
                  values="0 2000;100 2000;0 2000"
                  dur="4s"
                  repeatCount="indefinite"
                />
                <animate attributeName="stroke-dashoffset" values="0;-2000" dur="4s" repeatCount="indefinite" />
              </path>

              <path d="M 1200 0 L 1200 260 L 1250 310 L 1250 660 L 1200 710 L 1200 1080" stroke="url(#flowingGradient)" strokeWidth="3" fill="none" filter="url(#glow)">                <animate
                  attributeName="stroke-dasharray"
                  values="0 2000;100 2000;0 2000"
                  dur="4s"
                  repeatCount="indefinite"
                />
                <animate attributeName="stroke-dashoffset" values="0;-2000" dur="4s" repeatCount="indefinite" /></path>
              <path d="M 1600 0 L 1600 300 L 1650 350 L 1650 700 L 1600 750 L 1600 1080" stroke="url(#flowingGradient)" strokeWidth="3" fill="none" filter="url(#glow)">                <animate
                  attributeName="stroke-dasharray"
                  values="0 2000;100 2000;0 2000"
                  dur="4s"
                  repeatCount="indefinite"
                />
                <animate attributeName="stroke-dashoffset" values="0;-2000" dur="4s" repeatCount="indefinite" /></path>
              <path
                d="M 200 0 L 200 300 L 250 350 L 250 700 L 200 750 L 200 1080"
                stroke="url(#flowingGradient)"
                strokeWidth="3"
                fill="none"
                filter="url(#glow)"
              >
                <animate
                  attributeName="stroke-dasharray"
                  values="0 1500;80 1500;0 1500"
                  dur="5s"
                  repeatCount="indefinite"
                />
                <animate attributeName="stroke-dashoffset" values="0;-1500" dur="5s" repeatCount="indefinite" />
              </path>

              <path
                d="M 1000 0 L 1000 250 L 1050 300 L 1050 600 L 1000 650 L 1000 1080"
                stroke="url(#flowingGradient)"
                strokeWidth="3"
                fill="none"
                filter="url(#glow)"
              >
                <animate
                  attributeName="stroke-dasharray"
                  values="0 1800;90 1800;0 1800"
                  dur="6s"
                  repeatCount="indefinite"
                />
                <animate attributeName="stroke-dashoffset" values="0;-1800" dur="6s" repeatCount="indefinite" />
              </path>
            </g>

            {/* Circuit nodes/connection points */}
            <g className="circuit-nodes">
              {/* Main intersection nodes */}
              <circle cx="200" cy="200" r="4" fill="rgba(59, 130, 246, 0.6)">
                <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
                <animate
                  attributeName="fill"
                  values="rgba(59, 130, 246, 0.6);rgba(59, 130, 246, 1);rgba(59, 130, 246, 0.6)"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>

              <circle cx="450" cy="250" r="4" fill="rgba(59, 130, 246, 0.6)">
                <animate attributeName="r" values="4;6;4" dur="2.5s" repeatCount="indefinite" />
                <animate
                  attributeName="fill"
                  values="rgba(59, 130, 246, 0.6);rgba(59, 130, 246, 1);rgba(59, 130, 246, 0.6)"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </circle>

              <circle cx="850" cy="200" r="4" fill="rgba(59, 130, 246, 0.6)">
                <animate attributeName="r" values="4;6;4" dur="3s" repeatCount="indefinite" />
                <animate
                  attributeName="fill"
                  values="rgba(59, 130, 246, 0.6);rgba(59, 130, 246, 1);rgba(59, 130, 246, 0.6)"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>

              <circle cx="1250" cy="250" r="4" fill="rgba(59, 130, 246, 0.6)">
                <animate attributeName="r" values="4;6;4" dur="2.2s" repeatCount="indefinite" />
                <animate
                  attributeName="fill"
                  values="rgba(59, 130, 246, 0.6);rgba(59, 130, 246, 1);rgba(59, 130, 246, 0.6)"
                  dur="2.2s"
                  repeatCount="indefinite"
                />
              </circle>

              <circle cx="1650" cy="200" r="4" fill="rgba(59, 130, 246, 0.6)">
                <animate attributeName="r" values="4;6;4" dur="2.8s" repeatCount="indefinite" />
                <animate
                  attributeName="fill"
                  values="rgba(59, 130, 246, 0.6);rgba(59, 130, 246, 1);rgba(59, 130, 246, 0.6)"
                  dur="2.8s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Secondary nodes */}
              <circle cx="600" cy="400" r="3" fill="rgba(59, 130, 246, 0.4)">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="3.5s" repeatCount="indefinite" />
              </circle>

              <circle cx="1000" cy="600" r="3" fill="rgba(59, 130, 246, 0.4)">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="4s" repeatCount="indefinite" />
              </circle>

              <circle cx="1400" cy="800" r="3" fill="rgba(59, 130, 246, 0.4)">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="3.2s" repeatCount="indefinite" />
              </circle>
            </g>

            {/* Microchip-like rectangles */}
            <g className="microchips">
              <rect x="180" y="380" width="40" height="20" fill="none" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1">
                <animate
                  attributeName="stroke"
                  values="rgba(59, 130, 246, 0.4);rgba(59, 130, 246, 0.8);rgba(59, 130, 246, 0.4)"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </rect>

              <rect x="580" y="580" width="40" height="20" fill="none" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1">
                <animate
                  attributeName="stroke"
                  values="rgba(59, 130, 246, 0.4);rgba(59, 130, 246, 0.8);rgba(59, 130, 246, 0.4)"
                  dur="5s"
                  repeatCount="indefinite"
                />
              </rect>

              <rect x="980" y="780" width="40" height="20" fill="none" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1">
                <animate
                  attributeName="stroke"
                  values="rgba(59, 130, 246, 0.4);rgba(59, 130, 246, 0.8);rgba(59, 130, 246, 0.4)"
                  dur="3.5s"
                  repeatCount="indefinite"
                />
              </rect>

              <rect
                x="1380"
                y="180"
                width="40"
                height="20"
                fill="none"
                stroke="rgba(59, 130, 246, 0.4)"
                strokeWidth="1"
              >
                <animate
                  attributeName="stroke"
                  values="rgba(59, 130, 246, 0.4);rgba(59, 130, 246, 0.8);rgba(59, 130, 246, 0.4)"
                  dur="4.5s"
                  repeatCount="indefinite"
                />
              </rect>
            </g>
          </svg>
        </div>

        {/* Circuit board background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="circuit-pattern"></div>
        </div>

        {/* Glowing dots scattered across the background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-1/3 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
          <div className="absolute top-60 left-1/2 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-700"></div>
          <div className="absolute bottom-40 left-1/5 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-60 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-32 right-1/5 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-200"></div>
          <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-800"></div>
        </div>
        <Header/>
    <section className="flex items-center justify-center min-h-[80vh] px-6">
      <div className="text-center max-w-4xl mx-auto">
        {/* AI Badge */}
        <div className="inline-flex items-center bg-gray-800/50 border border-gray-700 rounded-full px-4 py-2 mb-8">
          <span className="bg-white text-black text-xs font-bold px-2 py-1 rounded mr-2">AI</span>
          <span className="text-gray-300 text-sm font-medium">ARTIFICIAL INTELLIGENCE FOR ALL</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
          <span className="text-white">Ethiopian Artificial</span>
          <br />
          <span className="text-orange-400">Intelligence Institute</span>
        </h1>

        {/* Description */}
        <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 max-w-3xl mx-auto">
          In 2030 to be a state-of-the-art National AI Research and Development Center with Excellence and Key Role in
          Creating Innovative AI-enabled solutions at national and international level.
        </p>

        {/* CTA Button */}
        <button className="relative px-[3px] py-[3px] rounded-full text-white text-lg font-medium bg-[#202024] hover:border-gray-400 hover:bg-gray-700/50 transition-all duration-200">
          {/* Gradient border layer */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-white to-orange-400 p-[1px]"></span>

          {/* Inner solid bg to create border effect */}
          <span className="relative block rounded-full bg-[#202024] px-8 py-3">
            Get in Touch
          </span>
        </button>

      </div>
    </section>
    </div>
      <ContentSection
        title="Our Gallery"
        subtitle="A glimpse into our vibrant events and passionate community."
        images={dummyImages.slice(0, 4)}
        large={false}
      />
      <ApplicationsGrid />
      <ProjectsGrid />
      <Testimonial />
      <Collaborations />
      <Footer />
    </>
  )
}

export default Home
