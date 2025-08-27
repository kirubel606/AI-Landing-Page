"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Cards, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Cards"
import { Badge } from "../components/ui/Badge"
import { Lightbulb, TrendingUp, Monitor, QrCode, ExternalLink, ArrowRight, Rocket, Target, Zap } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function TrainingsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    program: "",
  })

  const bootcampPrograms = [
    {
      id: 1,
      title: "Full-Stack Web Development",
      description:
        "Comprehensive 16-week program covering frontend and backend technologies including React, Node.js, and databases.",
      duration: "16 weeks",
      icon: <Monitor className="w-8 h-8" />,
      features: ["React & Next.js", "Node.js & Express", "Database Design", "Portfolio Projects"],
    },
    {
      id: 2,
      title: "Data Science & Analytics",
      description: "Intensive 20-week program focusing on Python, machine learning, and data visualization techniques.",
      duration: "20 weeks",
      icon: <TrendingUp className="w-8 h-8" />,
      features: ["Python Programming", "Machine Learning", "Data Visualization", "Real-world Projects"],
    },
    {
      id: 3,
      title: "Mobile App Development",
      description: "12-week intensive course covering iOS and Android development with React Native and Flutter.",
      duration: "12 weeks",
      icon: <Rocket className="w-8 h-8" />,
      features: ["React Native", "Flutter", "App Store Deployment", "UI/UX Design"],
    },
    {
      id: 4,
      title: "Cybersecurity Specialist",
      description: "18-week program covering ethical hacking, network security, and cybersecurity best practices.",
      duration: "18 weeks",
      icon: <Zap className="w-8 h-8" />,
      features: ["Ethical Hacking", "Network Security", "Risk Assessment", "Security Auditing"],
    },
  ]

  const summerCampPrograms = [
    {
      id: 1,
      title: "Young Coders Camp",
      description: "4-week introduction to programming for kids aged 8-12 using Scratch and basic Python concepts.",
      duration: "4 weeks",
      icon: <Lightbulb className="w-8 h-8" />,
      features: ["Scratch Programming", "Basic Python", "Game Development", "Creative Projects"],
    },
    {
      id: 2,
      title: "Teen Tech Innovators",
      description: "6-week program for teenagers to learn web development, app creation, and digital design.",
      duration: "6 weeks",
      icon: <Target className="w-8 h-8" />,
      features: ["HTML/CSS/JavaScript", "Mobile Apps", "Digital Design", "Team Projects"],
    },
    {
      id: 3,
      title: "AI & Robotics Explorer",
      description: "5-week hands-on camp introducing artificial intelligence concepts and basic robotics programming.",
      duration: "5 weeks",
      icon: <Rocket className="w-8 h-8" />,
      features: ["AI Fundamentals", "Robot Programming", "Sensor Integration", "Competition Prep"],
    },
  ]

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    window.open("https://aistartup.aii.et/", "_blank")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/modern-training-center-with-students-learning-tech.png"
            alt="Training Center"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Training
            <span className="text-accent block">Center</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Join our comprehensive training programs designed to launch your career in technology
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg"
            onClick={() => document.getElementById("bootcamp")?.scrollIntoView({ behavior: "smooth" })}
          >
            Explore Programs
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">What is Our Training Center?</h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Our Training Center is a premier educational facility dedicated to providing world-class technology
            education. We offer intensive bootcamp programs for career changers and professionals, as well as engaging
            summer camps for young learners. With expert instructors, hands-on projects, and industry-relevant
            curriculum, we prepare students for successful careers in the rapidly evolving tech industry.
          </p>
        </div>
      </section>

      {/* Bootcamp Section */}
      <section id="bootcamp" className="py-20 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Bootcamp Programs</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Intensive, career-focused programs designed to transform you into a skilled tech professional
            </p>
          </div>

          {/* Bootcamp Images */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <img
              src="/students-coding-in-modern-classroom-with-laptops.png"
              alt="Bootcamp Classroom"
              className="rounded-lg shadow-lg w-full h-64 object-cover"
            />
            <img
              src="/instructor-teaching-programming-on-whiteboard.png"
              alt="Bootcamp Instruction"
              className="rounded-lg shadow-lg w-full h-64 object-cover"
            />
            <img
              src="/students-collaborating-on-tech-project.png"
              alt="Bootcamp Collaboration"
              className="rounded-lg shadow-lg w-full h-64 object-cover"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {bootcampPrograms.map((program) => (
              <Cards
                key={program.id}
                className="group hover:shadow-lg transition-all duration-300 border-border bg-card"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {program.icon}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {program.duration}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mb-2">{program.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{program.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {program.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Cards>
            ))}
          </div>
        </div>
      </section>

      {/* Summer Camp Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Summer Camp Programs</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Fun and engaging technology camps for young learners to explore coding and innovation
            </p>
          </div>

          {/* Summer Camp Images */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <img
              src="/kids-learning-programming-with-colorful-blocks-and.png"
              alt="Kids Coding Camp"
              className="rounded-lg shadow-lg w-full h-64 object-cover"
            />
            <img
              src="/teenagers-building-robots-and-electronic-projects.png"
              alt="Teen Tech Camp"
              className="rounded-lg shadow-lg w-full h-64 object-cover"
            />
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {summerCampPrograms.map((program) => (
              <Cards
                key={program.id}
                className="group hover:shadow-lg transition-all duration-300 border-border bg-card"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-accent/10 rounded-lg text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                      {program.icon}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {program.duration}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mb-2">{program.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{program.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {program.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Cards>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section className="py-20 px-6 bg-primary/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Ready to Start Learning?</h2>
            <p className="text-lg text-muted-foreground">
              Join our training programs and take the next step in your technology journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Cards className="p-8 bg-card border-border">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-2xl mb-4">Enroll Today</CardTitle>
                <CardDescription>Scan the QR code to access our enrollment portal and secure your spot</CardDescription>
              </CardHeader>
            </Cards>

            <div className="text-center">
              <div className="inline-block p-8 bg-white rounded-lg shadow-lg border border-border">
                <QrCode className="w-32 h-32 mx-auto mb-4 text-foreground" />
                <h3 className="text-xl font-semibold mb-2 text-foreground">Scan to Enroll</h3>
                <p className="text-muted-foreground mb-4">
                  Use your phone to scan this QR code and access our enrollment portal directly
                </p>
                <Button
                  variant="outline"
                  onClick={() => window.open("https://aistartup.aii.et/", "_blank")}
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Visit Enrollment Site
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
