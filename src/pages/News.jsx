const News = () => {
  return (
    <section className="flex items-center justify-center min-h-[80vh] px-6">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-8 text-white">
          Latest <span className="text-orange-400">News</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10">
          Stay updated with the latest developments and breakthroughs in AI research and technology.
        </p>
        <div className="space-y-6 mt-12">
          <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6 text-left">
            <h3 className="text-xl font-semibold text-white mb-2">AI Research Breakthrough</h3>
            <p className="text-gray-400 text-sm mb-3">December 2024</p>
            <p className="text-gray-300">
              Our team has achieved significant progress in developing AI solutions for healthcare applications.
            </p>
          </div>
          <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6 text-left">
            <h3 className="text-xl font-semibold text-white mb-2">International Collaboration</h3>
            <p className="text-gray-400 text-sm mb-3">November 2024</p>
            <p className="text-gray-300">
              New partnership established with leading AI research institutions worldwide.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default News
