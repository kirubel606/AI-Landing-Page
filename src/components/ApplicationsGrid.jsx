import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from 'react-i18next';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ApplicationsGrid = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();
  const { t ,i18n } = useTranslation();

  const handleClick = (category) => {
    navigate(`/research?category=${category}`);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/categories/`);
        setApplications(response.data.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="w-16 h-1 bg-orange-500 mx-auto mb-8"></div>

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('unleashing_ai_potential')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('exploring_diverse_applications')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {applications.map((app) => (
            <div
  key={app.id}
  onClick={() => handleClick(app.id)}
  className="group cursor-pointer hover:scale-105 transition-transform duration-300"
>
  <div className="relative overflow-hidden rounded-lg shadow-lg h-[360px] flex flex-col justify-end">
    <img
      src={app.image || "/placeholder.svg"}
      alt={i18n.language === 'am' ? app.name_am : app.name}
      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
    <div className="absolute bottom-4 left-4 right-4 text-white">
      <h3 className="text-xl font-bold mb-2">
        {i18n.language === 'am' ? app.name_am : app.name}
      </h3>
      <p className="text-sm text-gray-200 line-clamp-3">
        {i18n.language === 'am' ? app.description_am : app.description}
      </p>
    </div>
  </div>
</div>

          ))}
        </div>
      </div>
    </section>
  );
};

export default ApplicationsGrid;
