const ApplicationsGrid = () => {
    const applications = [
      {
        title: "Healthcare",
        image: "/placeholder.svg?height=300&width=250",
        description: "AI-powered medical diagnostics and treatment solutions",
      },
      {
        title: "Agriculture",
        image: "/placeholder.svg?height=300&width=250",
        description: "Smart farming and crop optimization technologies",
      },
      {
        title: "Law Enforcement",
        image: "/placeholder.svg?height=300&width=250",
        description: "Advanced security and crime prevention systems",
      },
      {
        title: "Transportation",
        image: "/placeholder.svg?height=300&width=250",
        description: "Intelligent traffic management and logistics",
      },
    ]
  
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Orange accent bar */}
          <div className="w-16 h-1 bg-orange-500 mx-auto mb-8"></div>
  
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Unleashing AI's Potential in Ethiopia</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Exploring diverse applications of artificial intelligence across key sectors
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {applications.map((app, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={app.image || "/placeholder.svg"}
                    alt={app.title}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-2">{app.title}</h3>
                    <p className="text-sm text-gray-200">{app.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  export default ApplicationsGrid
  