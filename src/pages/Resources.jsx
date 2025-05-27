import CoolSvg from "../components/CoolSVg"

const Resources = () => {
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <CoolSvg/>
    <section className="flex items-center justify-center min-h-[80vh] px-6">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-8 text-white">
          Resources & <span className="text-orange-400">Publications</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10">
          Access our research papers, datasets, and educational materials to advance your AI knowledge.
        </p>
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Research Papers</h3>
            <p className="text-gray-300">Browse our collection of peer-reviewed research publications.</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              View Papers
            </button>
          </div>
          <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Datasets</h3>
            <p className="text-gray-300">Access curated datasets for AI research and development.</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              Browse Datasets
            </button>
          </div>
          <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Documentation</h3>
            <p className="text-gray-300">Technical documentation and API references for our tools.</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              Read Docs
            </button>
          </div>
          <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Educational Materials</h3>
            <p className="text-gray-300">Learning resources and tutorials for AI enthusiasts.</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              Start Learning
            </button>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

export default Resources
