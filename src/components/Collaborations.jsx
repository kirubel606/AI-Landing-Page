const Collaborations = () => {
    const partners = [
      { name: "Partner 1", logo: "/placeholder.svg?height=80&width=120" },
      { name: "Partner 2", logo: "/placeholder.svg?height=80&width=120" },
      { name: "Partner 3", logo: "/placeholder.svg?height=80&width=120" },
      { name: "Partner 4", logo: "/placeholder.svg?height=80&width=120" },
      { name: "Partner 5", logo: "/placeholder.svg?height=80&width=120" },
      { name: "Partner 6", logo: "/placeholder.svg?height=80&width=120" },
    ]
  
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Collaborations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Working together with leading organizations to advance AI research and development
            </p>
          </div>
  
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-6xl mx-auto items-center">
            {partners.map((partner, index) => (
              <div key={index} className="flex justify-center">
                <img
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  export default Collaborations
  