import { useEffect, useState } from "react"
import axios from "axios"

const ApplicationsGrid = () => {
  const [applications, setApplications] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/categories/")
        setApplications(response.data.slice(0, 4))
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      }
    }

    fetchCategories()
  }, [])

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
          {applications.map((app) => (
            <div key={app.id} className="group cursor-pointer hover:scale-105 transition-transform duration-300">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src={app.coverimage || "/placeholder.svg"}
                  alt={app.name}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-2">{app.name}</h3>
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
