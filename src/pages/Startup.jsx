import React, { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Cards,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Cards";
import { Badge } from "../components/ui/Badge";
import {
  Building2,
  Users,
  Lightbulb,
  TrendingUp,
  Wifi,
  Coffee,
  Monitor,
  Car,
  QrCode,
  ExternalLink,
  ArrowRight,
  Rocket,
  Target,
  Zap,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function StartupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    program: "",
  });

  const programs = [
    {
      id: 1,
      title: "Accelerator Program",
      description:
        "12-week intensive program for early-stage startups with mentorship, funding, and demo day presentation.",
      duration: "12 weeks",
      icon: <Rocket className="w-8 h-8" />,
      features: ["$50K funding", "1:1 mentoring", "Demo day pitch"],
    },
    {
      id: 2,
      title: "Incubator Program",
      description:
        "6-month program for idea-stage entrepreneurs to validate and develop their business concepts.",
      duration: "6 months",
      icon: <Lightbulb className="w-8 h-8" />,
      features: ["Idea validation", "Market research", "MVP development"],
    },
    {
      id: 3,
      title: "Scale-Up Program",
      description:
        "Advanced program for growth-stage companies looking to expand and scale their operations.",
      duration: "9 months",
      icon: <TrendingUp className="w-8 h-8" />,
      features: ["Growth strategy", "Series A prep", "International expansion"],
    },
    {
      id: 4,
      title: "Tech Innovation Lab",
      description:
        "Specialized program for deep-tech startups in AI, blockchain, IoT, and emerging technologies.",
      duration: "18 months",
      icon: <Zap className="w-8 h-8" />,
      features: ["R&D support", "Tech partnerships", "Patent assistance"],
    },
    {
      id: 5,
      title: "Social Impact Program",
      description:
        "Dedicated track for startups solving social and environmental challenges with sustainable solutions.",
      duration: "12 months",
      icon: <Target className="w-8 h-8" />,
      features: ["Impact measurement", "ESG compliance", "Grant opportunities"],
    },
  ];

  const facilities = [
    {
      name: "Co-working Spaces",
      icon: <Users className="w-6 h-6" />,
      description: "Open collaborative workspaces",
    },
    {
      name: "Private Offices",
      icon: <Building2 className="w-6 h-6" />,
      description: "Dedicated team spaces",
    },
    {
      name: "Meeting Rooms",
      icon: <Monitor className="w-6 h-6" />,
      description: "Fully equipped conference rooms",
    },
    {
      name: "High-Speed Internet",
      icon: <Wifi className="w-6 h-6" />,
      description: "Fiber optic connectivity",
    },
    {
      name: "Café & Lounge",
      icon: <Coffee className="w-6 h-6" />,
      description: "Networking and relaxation areas",
    },
    {
      name: "Parking",
      icon: <Car className="w-6 h-6" />,
      description: "Free parking for members",
    },
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.open("https://aistartup.aii.et/", "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/modern-startup-incubator-building-with-glass-facad.png"
            alt="Startup Center Building"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <Badge className="mb-6 bg-accent text-accent-foreground">
            Innovation Hub
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Ignite Your
            <span className="text-accent block">Startup Journey</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Transform your innovative ideas into successful businesses with our
            comprehensive startup ecosystem
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg"
            onClick={() =>
              document
                .getElementById("programs")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore Programs
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            What is Startup Center?
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Our Startup Center is a world-class innovation hub designed to
            nurture entrepreneurial talent and transform groundbreaking ideas
            into successful businesses. We provide comprehensive support through
            mentorship, funding, state-of-the-art facilities, and a vibrant
            community of like-minded innovators. Whether you're at the idea
            stage or ready to scale, we offer tailored programs to accelerate
            your startup journey and connect you with the resources you need to
            succeed in today's competitive market.
          </p>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Our Programs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our specialized programs designed to support startups
              at every stage of their journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
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
                  <CardDescription className="text-sm leading-relaxed">
                    {program.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {program.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center text-sm text-muted-foreground"
                      >
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

      {/* Facilities Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              World-Class Facilities
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our modern facility is designed to inspire innovation and foster
              collaboration
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img
                src="/modern-startup-office-interior-with-co-working-spa.png"
                alt="Startup Center Interior"
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              {facilities.map((facility, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-lg bg-card border border-border hover:shadow-md transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg mb-4">
                    {facility.icon}
                  </div>
                  <h3 className="font-semibold mb-2 text-card-foreground">
                    {facility.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {facility.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section className="py-20 px-6 bg-primary/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join our startup ecosystem and take the first step towards
              building your dream company
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Cards className="p-8 bg-card border-border">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-2xl mb-4">Apply Now</CardTitle>
                <CardDescription>
                  Scan the QR code and we'll redirect you to our
                  registration portal
                </CardDescription>
              </CardHeader>
              <CardContent className="px-0 pb-0">

              </CardContent>
            </Cards>

            <div className="text-center">
              <div className="inline-block p-8 bg-white rounded-lg shadow-lg border border-border">
                <QrCode className="w-32 h-32 mx-auto mb-4 text-foreground" />
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  Scan to Register
                </h3>
                <p className="text-muted-foreground mb-4">
                  Use your phone to scan this QR code and access our
                  registration portal directly
                </p>
                <Button
                  variant="outline"
                  onClick={() =>
                    window.open("https://aistartup.aii.et/", "_blank")
                  }
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Visit Registration Site
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
