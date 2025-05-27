const Research = () => {
  return (
    <section className="flex items-center justify-center min-h-[80vh] px-6">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-8 text-white">
          Research & <span className="text-orange-400">Development</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10">
          Advancing the frontiers of artificial intelligence through cutting-edge research and innovative development
          projects.
        </p>
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Machine Learning</h3>
            <p className="text-gray-300">Developing advanced ML algorithms for various applications.</p>
          </div>
          <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Natural Language Processing</h3>
            <p className="text-gray-300">Creating AI systems that understand and process human language.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Research
