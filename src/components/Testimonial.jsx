const Testimonial = () => {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Orange accent bar */}
          <div className="w-16 h-1 bg-white mx-auto mb-8"></div>
  
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Unleashing AI's Potential in Ethiopia</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Leading voices in Ethiopian AI development share their insights
            </p>
          </div>
  
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg shadow-xl p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <img
                  src="/placeholder.svg?height=120&width=120"
                  alt="Dr. Worku Gachena"
                  className="w-32 h-32 rounded-full object-cover border-4 border-orange-200"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <blockquote className="text-lg text-gray-700 mb-4 italic">
                  "AI has the potential to revolutionize Ethiopia's development trajectory. Through strategic
                  implementation and capacity building, we can leverage artificial intelligence to address our most
                  pressing challenges and create sustainable solutions for the future."
                </blockquote>
                <div className="text-gray-900">
                  <p className="font-bold text-lg">Dr. Worku Gachena</p>
                  <p className="text-gray-600">Director, Ethiopian AI Institute</p>
                </div>
              </div>
            </div>
          </div>
  
          {/* Pagination dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {[1, 2, 3, 4, 5].map((dot) => (
              <button key={dot} className={`w-3 h-3 rounded-full ${dot === 1 ? "bg-white" : "bg-orange-300"}`}></button>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  export default Testimonial
  