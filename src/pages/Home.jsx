const Home = () => {
  return (
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
        <button className="bg-gray-800/50 border border-gray-600 text-white px-8 py-3 rounded-full hover:border-gray-400 hover:bg-gray-700/50 transition-all duration-200 text-lg font-medium">
          Get in Touch
        </button>
      </div>
    </section>
  )
}

export default Home
