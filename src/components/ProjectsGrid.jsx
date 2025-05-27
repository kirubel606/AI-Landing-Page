const ProjectsGrid = () => {
    const projects = [
      {
        title: "ETPApp",
        description: "Ethiopian Telecom mobile application for enhanced customer service and digital solutions",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        title: "ETPApp",
        description: "Advanced telecommunications platform integrating AI for improved user experience",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        title: "Learn and Transcribe ET",
        description: "AI-powered language learning and transcription service for Ethiopian languages",
        image: "/placeholder.svg?height=200&width=300",
      },
    ]
  
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Orange accent bar */}
          <div className="w-16 h-1 bg-orange-500 mx-auto mb-8"></div>
  
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Unleashing AI's Potential in Ethiopia</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Innovative projects driving technological advancement and digital transformation
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  export default ProjectsGrid
  