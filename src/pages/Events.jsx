import CoolSvg from "../components/CoolSVg"

const Events = () => {
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <CoolSvg/>
    <section className="flex items-center justify-center min-h-[80vh] px-6">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-8 text-white">
          Upcoming <span className="text-orange-400">Events</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10">
          Join us for conferences, workshops, and seminars on artificial intelligence and technology.
        </p>
        <div className="space-y-6 mt-12">
          <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6 text-left">
            <h3 className="text-xl font-semibold text-white mb-2">AI Conference 2025</h3>
            <p className="text-gray-400 text-sm mb-3">March 15-17, 2025</p>
            <p className="text-gray-300">Annual conference bringing together AI researchers and industry experts.</p>
          </div>
          <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6 text-left">
            <h3 className="text-xl font-semibold text-white mb-2">Machine Learning Workshop</h3>
            <p className="text-gray-400 text-sm mb-3">February 10, 2025</p>
            <p className="text-gray-300">
              Hands-on workshop covering the latest machine learning techniques and applications.
            </p>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

export default Events
