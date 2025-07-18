"use client"

import { useState, useContext, useRef, useEffect } from "react"
import CoolSvg from "../components/CoolSVg"
import Footer from "../components/Footer"
import { AppContext } from "../context/Appcontext"
import { Phone, Mail, MapPin, HelpCircle, BookOpen, MessageSquare } from "lucide-react"
import { useTranslation } from 'react-i18next';
import SocialMediaLinks from "../components/SocialMediaLinks"
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
function Contactus() {

  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",

  })
  const { settings, loading } = useContext(AppContext)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [faqs, setFaqs] = useState([])

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch(`${BASE_URL}/faq/`)
        const data = await res.json()
        setFaqs(data)
      } catch (error) {
        console.error("Failed to fetch FAQs:", error)
      }
    }

    fetchFaqs()
  }, [])
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

    const name = `${formData.firstName} ${formData.lastName}`

    try {
      const response = await fetch(`${BASE_URL}/contacts/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          name: name.trim()
        }),
      })
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" })
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
      title: t('contact_phone'),
      description: t('contact_phone_desc'),
      value: "+251 938-737-383",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      icon: Mail,
      title: t('contact_email'),
      description: t('contact_email_desc'),
      value: "contact@eai.com",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-400",
    },
    {
      icon: MapPin,
      title: t('contact_location'),
      value: t('contact_location_link'),
      bgColor: "bg-orange-100",
      iconColor: "text-orange-400",
      isLink: settings.map_link,
    },
  ]

  const helpSections = [
    {
      icon: HelpCircle,
      title: t('help_faqs'),
      description: t('help_faqs_desc'),
      bgColor: "bg-orange-100",
      iconColor: "text-orange-400",
    },
    {
      icon: BookOpen,
      title: t('help_guides'),
      description: t('help_guides_desc'),
      bgColor: "bg-orange-100",
      iconColor: "text-orange-400",
    },
    {
      icon: MessageSquare,
      title: t('help_support'),
      description: t('help_support_desc'),
      bgColor: "bg-orange-100",
      iconColor: "text-orange-400",
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
            <h1 className="text-4xl sm:text-6xl md:text-6xl lg:text-6xl text-white xl:text-7xl font-bold mt-[45%] mb-4 leading-tight4">{t('contactus')}</h1>
            <div className="w-24 h-1 bg-orange-400 mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-16 py-6">
        <SocialMediaLinks />
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
                    {info.isLink && (
                      <div
                        className="prose prose-lg overflow-clip"
                        dangerouslySetInnerHTML={{ __html: info.isLink }}
                      />
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-lg col-span-3">
            <h2 className="text-2xl font-bold text-orange-400 mb-6">{t('contactus')}</h2>

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
                    {t('first_name')}
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder={t('first_name')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('last_name')}
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder={t('last_name')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t('email')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('phone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t('phone_number')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t('message')}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-vertical"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto bg-sky-950 hover:bg-indigo-800 text-white px-8 py-3 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t('submitting') : t('submit_now')}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-gray-50 py-16 px-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-5">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('find_help')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('find_help_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {helpSections.map((section, index) => {
              const IconComponent = section.icon
              return (
                <div
                  key={index}
                  className="text-center group relative overflow-hidden bg-white rounded-lg shadow-md p-6 transition-all duration-300"
                >
                  <div
                    className={`${section.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <IconComponent className={`w-8 h-8 ${section.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{section.title}</h3>
                  <p className="text-gray-600 mb-4">{section.description}</p>
                  <button className="text-orange-400 hover:text-orange-700 font-medium">
                    {t('read_more')}
                  </button>

                  {/* Expanded Panel */}
                  {section.title === t('help_faqs') && (
                    <div
                      className="
      max-h-0 overflow-hidden transition-all duration-500 ease-in-out
      group-hover:max-h-96 group-hover:mt-4
    "
                    >
                      {faqs.length > 0 ? (
                        <ul className="text-left text-sm text-gray-700 max-h-48 overflow-y-auto pr-2 space-y-2">
                          {faqs.map((faq) => {
                            const answer = i18n.language === 'am' ? faq.answer_am : faq.answer;
                            const question = i18n.language === 'am' ? faq.question_am : faq.question;
                            const preview = answer.length > 100 ? answer.slice(0, 100) + '...' : answer;

                            return (
                              <li key={faq.id} className="pb-2 border-b last:border-none group relative">
                                <strong className="text-gray-900 block">
                                  {question}
                                </strong>
                                <p className="ml-2 text-gray-700">
                                  {preview}
                                </p>

                                {/* Hidden full answer, shown on hover */}
                                {answer.length > 100 && (
                                  <div className="
          absolute top-0 left-0 w-full h-full
          bg-white/90 backdrop-blur-md rounded-md p-4 shadow-lg
          opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto
          transition duration-300
          z-10
        ">
                                    <strong className="text-gray-900 block mb-2">{question}</strong>
                                    <p className="text-gray-800">{answer}</p>
                                  </div>
                                )}
                              </li>
                            );
                          })}

                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500">No FAQs found.</p>
                      )}
                    </div>
                  )}


                  {/* Guides & Support keep same as before, or add custom expanded panels */}
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
