"use client"

import { useState } from "react"
import CoolSvg from "../components/CoolSVg"
import Footer from "../components/Footer"
import { Phone, Mail, MapPin, HelpCircle, BookOpen, MessageSquare } from "lucide-react"

function Contactus() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Simulate API call - replace with your actual endpoint
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Reset form on success
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      })
      setSubmitStatus("success")
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      description: "The phrasal sequence of the is now so that many campaign and benefit",
      value: "+251 938-737-383",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      icon: Mail,
      title: "Email",
      description: "The phrasal sequence of the is now so that many campaign and benefit",
      value: "contact@eai.com",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      icon: MapPin,
      title: "Location",
      description: "C/64 Northwest Freeway, Suite 558, Houston, USA 485",
      value: "View on Google map",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      isLink: true,
    },
  ]

  const helpSections = [
    {
      icon: HelpCircle,
      title: "FAQs",
      description: "The phrasal sequence of the is now so that many campaign and benefit",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      icon: BookOpen,
      title: "Guides / Support",
      description: "The phrasal sequence of the is now so that many campaign and benefit",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      icon: MessageSquare,
      title: "Support Request",
      description: "The phrasal sequence of the is now so that many campaign and benefit",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background */}
      <div className="min-h-[30vh] md:min-h-[50vh] bg-gray-900 relative overflow-hidden">
        <div className="absolute h-dvh w-full">
          <CoolSvg />
        </div>
        <div className="relative h-full bg-transparent container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl md:text-6xl lg:text-6xl text-white xl:text-7xl font-bold mt-[45%] mb-4 leading-tight4">Contact Us</h1>
            <div className="w-24 h-1 bg-orange-400 mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Contact Information */}
          <div className="space-y-8 col-span-2">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon
              return (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`${info.bgColor} p-4 rounded-full flex-shrink-0`}>
                    <IconComponent className={`w-6 h-6 ${info.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
                    <p className="text-gray-600 mb-3">{info.description}</p>
                    {info.isLink ? (
                      <a
                        href="https://maps.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-600 hover:text-orange-700 font-medium"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="font-medium text-gray-900">{info.value}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-lg col-span-3">
            <h2 className="text-2xl font-bold text-orange-600 mb-6">Contact Us</h2>

            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                There was an error sending your message. Please try again.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Message"
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-vertical"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto bg-indigo-900 hover:bg-indigo-800 text-white px-8 py-3 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Now"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-gray-50 py-16 px-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Find The Help You Need</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Artificial Intelligence makes it fast easy to create content for your blog, social media, website, and
              more!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {helpSections.map((section, index) => {
              const IconComponent = section.icon
              return (
                <div key={index} className="text-center">
                  <div
                    className={`${section.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <IconComponent className={`w-8 h-8 ${section.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{section.title}</h3>
                  <p className="text-gray-600 mb-4">{section.description}</p>
                  <button className="text-orange-600 hover:text-orange-700 font-medium">Read More</button>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Contactus
