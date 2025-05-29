import CoolSvg from "../components/CoolSVg"
import { Card, CardBody, Typography } from "@material-tailwind/react";
import Footer from "../components/Footer";
import {
  LightBulbIcon,
  CogIcon,
  HandThumbUpIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/solid";
const About = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="min-h-[50vh] bg-gray-900 relative overflow-hidden">
        <div className="absolute h-lvh w-full">
          <CoolSvg />
        </div>
        <div className="relative h-64 bg-transparent mx-20">
          <img src="./../public/Assets/Andrew_Derr.png" className="absolute w-[27%] top-12 left-6 m-0 p-0" />
          <div className="z-20 flex items-center justify-center h-full">
            <div className="text-center text-white h-full">
              <h1 variant="h1" className="text-5xl underline font-bold mt-36 mb-2 text-white">
                About Us
              </h1>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
        </div>
      </div>
      <div className="max-w-7xl mb-28 mx-auto space-y-24 mt-10">
        {/* Header Section with Blue Border */}
        <Card className="">
          <CardBody className="p-6">
            <div className="flex flex-col h-fit lg:flex-row gap-6">
              {/* Speaker Image */}
              <div className="lg:w-2/3  h-full flex ">
                <img
                  src="../Assets/speaker.png"
                  alt="EAII Speaker"
                  className="w-full lg:h-[550px] object-cover rounded-lg"
                />
              </div>

              {/* Content */}
              <div className="lg:w-2/3 space-y-7">
                <Typography variant="h2" className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Ethiopian Artificial Intelligence Institute (EAII)
                </Typography>
                <div className="space-y-3 text-gray-700 text-sm lg:text-lg leading-relaxed">
                  <Typography className="text-gray-700">
                    The Ethiopian Artificial Intelligence Institute is a leading research and development organization dedicated to advancing AI technologies and applications in Ethiopia. Our mission is to foster innovation, conduct cutting-edge research, and develop AI solutions that address local and global challenges.
                  </Typography>
                  <Typography className="text-gray-700">
                    We are committed to building Ethiopia's capacity in artificial intelligence through research, education, and collaboration with international partners. Our institute serves as a hub for AI innovation, bringing together researchers, practitioners, and stakeholders to drive technological advancement.
                  </Typography>
                  <Typography className="text-gray-700">
                    Through our comprehensive programs, we aim to position Ethiopia as a leader in AI research and development in Africa, while ensuring that AI technologies are developed and deployed responsibly for the benefit of society.
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
                Our Mission
              </Typography>
              <Typography className="text-sm leading-relaxed text-white">
                To advance artificial intelligence research and applications through innovative solutions, collaborative partnerships, and capacity building initiatives that drive technological progress and societal impact in Ethiopia and beyond.
              </Typography>
            </CardBody>
          </Card>

          {/* Our Vision */}
          <Card className="bg-blue-900">
            <CardBody className="p-6">
              <Typography variant="h3" className="text-xl font-bold mb-3 text-white">
                Our Vision
              </Typography>
              <Typography className="text-sm leading-relaxed text-white">
                To become a world-class AI research institute that drives innovation, fosters collaboration, and develops cutting-edge solutions that transform industries and improve lives across Ethiopia and the African continent.
              </Typography>
            </CardBody>
          </Card>
        </div>

        {/* Subtitle */}
        <div className="text-center ">
          <Typography className="text-gray-700 text-xl italic mb-4">
            At EAII, we believe in the power of AI to transform society, drive efficiency, and accelerate future. Join us in transforming Ethiopia through artificial intelligence.
          </Typography>
        </div>

        {/* Four Pillars Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Advancing AI Research */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12rounded-full flex items-center justify-center">
                <img src="../public/Assets/impact.png"/>
              </div>
            </div>
            <div>
              <Typography variant="h4" className="font-bold text-gray-900 mb-2">
                Advancing AI Research for Real-World Impact
              </Typography>
              <Typography className="text-gray-600 text-sm leading-relaxed">
                We conduct cutting-edge research in artificial intelligence, machine learning, and data science to develop innovative solutions that address real-world challenges and create meaningful impact for communities and industries.
              </Typography>
            </div>
          </div>

          {/* Developing AI-Powered Tools */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full flex items-center justify-center">
                <img src="../public/Assets/develop.png"/>
              </div>
            </div>
            <div>
              <Typography variant="h4" className="font-bold text-gray-900 mb-2">
                Developing AI-Powered Tools for Public and Private Sectors
              </Typography>
              <Typography className="text-gray-600 text-sm leading-relaxed">
                We create sophisticated AI applications and tools that enhance efficiency, improve decision-making, and drive innovation across various sectors including healthcare, agriculture, finance, and government services.
              </Typography>
            </div>
          </div>

          {/* Fostering Collaboration */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full flex items-center justify-center">
                <img src="../public/Assets/foster.png"/>
              </div>
            </div>
            <div>
              <Typography variant="h4" className="font-bold text-gray-900 mb-2">
                Fostering Collaboration with Academia, Businesses, and Government
              </Typography>
              <Typography className="text-gray-600 text-sm leading-relaxed">
                We build strategic partnerships and collaborative networks with universities, research institutions, private companies, and government agencies to accelerate AI adoption and create synergistic opportunities for innovation.
              </Typography>
            </div>
          </div>

          {/* Cultivating Next Generation */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full flex items-center justify-center">
                <img src="../public/Assets/cultivate.png"/>
              </div>
            </div>
            <div>
              <Typography variant="h4" className="font-bold text-gray-900 mb-2">
                Cultivating Ethiopia's Next Generation of AI Experts
              </Typography>
              <Typography className="text-gray-600 text-sm leading-relaxed">
                We provide comprehensive education, training, and mentorship programs to develop skilled AI professionals, researchers, and practitioners who will lead Ethiopia's technological advancement and innovation ecosystem.
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default About
