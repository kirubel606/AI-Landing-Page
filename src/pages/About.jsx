import CoolSvg from "../components/CoolSVg"
import { Card, CardBody, Typography } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import axios from "axios"
import { useTranslation } from 'react-i18next';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import SocialMediaLinks from "../components/SocialMediaLinks";
const About = () => {
  const { t,i18n } = useTranslation();
  const [about, setAbout] = useState([]);
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/about/`);
        setAbout(response.data);
      } catch (error) {
        console.error("Failed to fetch about:", error);
      }
    };

    fetchAbout();
  }, []);
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="min-h-[50vh] bg-gray-900 relative overflow-hidden">
        <div className="absolute h-lvh w-full">
          <CoolSvg />
        </div>
                    <SocialMediaLinks />
        <div className="relative h-64 bg-transparent mx-20">
          <img src="./../public/Assets/Andrew_Derr.png" className="absolute w-[27%] top-12 left-6 m-0 p-0" />
          <div className="z-20 flex items-center justify-center h-full">
            <div className="text-center text-white h-full">
              <h1 variant="h1" className="text-5xl md:text-6xl flex font-bold mt-36 mb-2 text-white">
                {t('about')} <p className="text-orange-400 ml-4">{t('us')}</p>
              </h1>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
        </div>
      </div>
       {about.map((about, index) => (
      <div key={`${about.id}-${index}`} className="max-w-7xl mb-28 mx-auto space-y-24 mt-10">
        {/* Header Section with Blue Border */}
        <Card className="">
         
            <CardBody  className="p-6">
              <div className="flex flex-col h-fit lg:flex-row gap-6">
                {/* Speaker Image */}
                <div className="lg:w-2/3  h-full flex ">
                  <img
                    src={about.image}
                    alt="EAII Speaker"
                    className="w-full lg:h-[550px] object-cover rounded-lg"
                  />
                </div>

                {/* Content */}
                <div className="lg:w-2/3 space-y-7">
                  <Typography variant="h2" className="text-2xl lg:text-3xl font-bold text-gray-900">
                     {i18n.language === 'am' ? about.title_am : about.title}
                  </Typography>
                  <div className="space-y-3 text-gray-700 text-sm lg:text-lg leading-relaxed">

                    <Typography className="text-gray-700 whitespace-pre-line">
                       {i18n.language === 'am' ? about.description_am : about.description}

                    </Typography>


                  </div>
                </div>
              </div>
            </CardBody>
     
        </Card>

        {/* Mission and Vision Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Our Mission */}
          <Card className="bg-amber-500">
            <CardBody className="p-6">
              <Typography variant="h3" className="text-xl font-extrabold mb-3 text-white">
                {t('about_mission')}
              </Typography>
              <Typography className="text-sm leading-relaxed text-white">
                {t('about_mission_desc')}
              </Typography>
            </CardBody>
          </Card>

          {/* Our Vision */}
          <Card className="bg-blue-900">
            <CardBody className="p-6">
              <Typography variant="h3" className="text-xl font-bold mb-3 text-white">
                {t('about_vision')}
              </Typography>
              <Typography className="text-sm leading-relaxed text-white">
                {t('about_vision_desc')}
              </Typography>
            </CardBody>
          </Card>
        </div>
     
        {/* Subtitle */}
        <div className="text-center ">
          <Typography className="text-gray-700 text-xl italic mb-4">
            {about.quote}
          </Typography>
        </div>

        {/* Four Pillars Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Advancing AI Research */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12rounded-full flex items-center justify-center">
                <img src="../public/Assets/impact.png" />
              </div>
            </div>
            <div>
              <Typography variant="h4" className="font-bold text-gray-900 mb-2">
                {t('about_advancing_ai_research')}
              </Typography>
              <Typography className="text-gray-600 text-sm leading-relaxed">
                {t('about_advancing_ai_research_desc')}
              </Typography>
            </div>
          </div>

          {/* Developing AI-Powered Tools */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full flex items-center justify-center">
                <img src="../public/Assets/develop.png" />
              </div>
            </div>
            <div>
              <Typography variant="h4" className="font-bold text-gray-900 mb-2">
                {t('about_developing_tools')}
              </Typography>
              <Typography className="text-gray-600 text-sm leading-relaxed">
                {t('about_developing_tools_desc')}
              </Typography>
            </div>
          </div>

          {/* Fostering Collaboration */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full flex items-center justify-center">
                <img src="../public/Assets/foster.png" />
              </div>
            </div>
            <div>
              <Typography variant="h4" className="font-bold text-gray-900 mb-2">
                {t('about_fostering_collaboration')}
              </Typography>
              <Typography className="text-gray-600 text-sm leading-relaxed">
                {t('about_fostering_collaboration_desc')}
              </Typography>
            </div>
          </div>

          {/* Cultivating Next Generation */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full flex items-center justify-center">
                <img src="../public/Assets/cultivate.png" />
              </div>
            </div>
            <div>
              <Typography variant="h4" className="font-bold text-gray-900 mb-2">
                {t('about_cultivating_next_gen')}
              </Typography>
              <Typography className="text-gray-600 text-sm leading-relaxed">
                {t('about_cultivating_next_gen_desc')}
              </Typography>
            </div>
          </div>
        </div>
      </div>
      ))}
      <Footer />
    </div>
  )
}

export default About
