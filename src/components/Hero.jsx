const Hero = () => {
  return (
    <section className="relative z-10 flex items-center justify-center min-h-[80vh] px-6">
      <div className="text-center max-w-4xl mx-auto">
        {/* AI Badge */}
        

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl items-center font-bold  leading-tight">
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

export default Hero
