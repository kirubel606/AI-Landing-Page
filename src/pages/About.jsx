import CoolSvg from "../components/CoolSVg"

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <CoolSvg/>
    <section className="flex items-center justify-center min-h-[80vh] px-6">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-8 text-white">
          About <span className="text-orange-400">Us</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10">
          The Ethiopian Artificial Intelligence Institute is dedicated to advancing AI research and development for the
          benefit of society.
        </p>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Our Mission</h3>
            <p className="text-gray-300">
              To lead AI innovation and create solutions that address real-world challenges.
            </p>
          </div>
          <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Our Vision</h3>
            <p className="text-gray-300">To be a world-class AI research center driving technological advancement.</p>
          </div>
          <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Our Values</h3>
            <p className="text-gray-300">Excellence, innovation, collaboration, and ethical AI development.</p>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

export default About
