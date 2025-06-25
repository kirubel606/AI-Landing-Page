import { useEffect, useState } from "react"
import axios from "axios"
import { Navigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ProjectsGrid = () => {
  const { t , i18n  } = useTranslation();
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${BASE_URL}`+"/rnd/")
        setProjects(response.data.slice(0, 3)) // Only take first 3
      } catch (error) {
        console.error("Failed to fetch R&D projects:", error)
      }
    }

    fetchProjects()
  }, [])

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Orange accent bar */}
        <div className="w-16 h-1 bg-orange-500 mx-auto mb-8"></div>

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('some_of_our_projects')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('building_the_future')}
          </p>
        </div>
      <div className="justify-center flex" >
         <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto${
              projects.length === 1 ? "grid-cols-1" :
              projects.length === 2 ? "grid-cols-2" :
              "grid-cols-1 md:grid-cols-3"
            }`}
          >
          {projects.map((project) => (
            <a
              href='/research'
              target="_blank"
              rel="noopener noreferrer"
              key={project.id}
              className="relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow max-w-sm w-full"
            >
              <img
                src={project.coverimage || "/placeholder.svg"}
                alt={i18n.language === 'am' ? project.title_am : item.title}
                
                className="w-full h-48 object-cover"
              />
                            {project.logo && (
                  <img
                      src={project.logo}
                      alt={`${project.title} logo`}
                      className="absolute top-40 right-10 w-16 rounded-full border-2 border-white shadow-md object-cover"
                  />
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{i18n.language === 'am' ? project.title_am : project.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{(i18n.language === 'am' ? project.description_am : project.description).split(" ").slice(0, 20).join(" ") + ((i18n.language === 'am' ? project.description_am : project.description).split(" ").length > 20 ? "..." : "")}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
      </div>
    </section>
  )
}

export default ProjectsGrid
