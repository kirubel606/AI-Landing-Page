import ApplicationsGrid from "../components/ApplicationsGrid"
import Collaborations from "../components/Collaborations"
import ContentSection from "../components/ContentSection"
import CoolSvg from "../components/CoolSVg"
import Footer from "../components/Footer"
import Header from "../components/Header"
import ProjectsGrid from "../components/ProjectsGrid"
import Quotes from "../components/Quotes"
import Testimonial from "../components/Testimonial"

const Home = () => {
  const dummyImages = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1497493292307-31c376b6e479?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df080?auto=format&fit=crop&w=800&q=80",
  ];
  
  return (
    <>
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <CoolSvg/>
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
      <ContentSection
        title="Our Events"
        subtitle="A glimpse into our vibrant events and passionate community."
        images={dummyImages.slice(0, 4)}
        large={true}
      />
      <ApplicationsGrid />
      <ProjectsGrid />
      <Quotes />
      <Testimonial/>
      <Collaborations />
      <Footer />
    </>
  )
}

export default Home
