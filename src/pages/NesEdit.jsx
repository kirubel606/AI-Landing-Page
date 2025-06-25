// "use client"

// import { useState } from "react"
// import CoolSvg from "../components/CoolSVg"

import { useTranslation } from 'react-i18next';

// const featuredArticle = {
//   id: 1,
//   title: "Strengthening collaboration is essential for advancing artificial intelligence development.",
//   excerpt:
//     "The General Director of the Addis Ababa's Civil Registration and Residency Service Agency, Mr. Yonas Alemayehu, stated that the upcoming system will enable citizens to utilize mobile phones for identification purposes.",
//   image: "https://cdn.pixabay.com/photo/2017/06/26/19/03/news-2444778_1280.jpg",
//   category: "TECH",
//   date: "2 hours ago",
//   featured: true,
// }

// const sidebarNews = [
//   {
//     id: 2,
//     title:
//       "The visit of Deputy Prime Minister Temesgen Tiruneh and Deputy Prime Minister Aregawi Berhe of the United Kingdom to the EAI",
//     image: "https://via.placeholder.com/80x80",
//     category: "LATEST",
//     date: "3 hours ago",
//   },
//   {
//     id: 3,
//     title:
//       "The visit of Deputy Prime Minister Temesgen Tiruneh and Deputy Prime Minister Aregawi Berhe of the United Kingdom to the EAI",
//     image: "https://via.placeholder.com/80x80",
//     category: "TRENDING",
//     date: "5 hours ago",
//   },
//   {
//     id: 4,
//     title:
//       "The visit of Deputy Prime Minister Temesgen Tiruneh and Deputy Prime Minister Aregawi Berhe of the United Kingdom to the EAI",
//     image: "https://via.placeholder.com/80x80",
//     category: "VIDEOS",
//     date: "1 day ago",
//   },
//   {
//     id: 5,
//     title:
//       "The visit of Deputy Prime Minister Temesgen Tiruneh and Deputy Prime Minister Aregawi Berhe of the United Kingdom to the EAI",
//     image: "https://via.placeholder.com/80x80",
//     category: "LATEST",
//     date: "2 days ago",
//   },
//   {
//     id: 6,
//     title:
//       "The visit of Deputy Prime Minister Temesgen Tiruneh and Deputy Prime Minister Aregawi Berhe of the United Kingdom to the EAI",
//     image: "https://via.placeholder.com/80x80",
//     category: "TRENDING",
//     date: "3 days ago",
//   },
// ]

// const leftColumnNews = [
//   {
//     id: 7,
//     title: "Visit of Delegation Led by France's Ambassador to Ethiopia",
//     image: "https://via.placeholder.com/300x200",
//     category: "TECH",
//     date: "4 hours ago",
//   },
//   {
//     id: 8,
//     title: "Officials from Zeal AI visited the Ethiopian Artificial Intelligence Institute",
//     image: "https://via.placeholder.com/300x200",
//     category: "TECH",
//     date: "6 hours ago",
//   },
//   {
//     id: 9,
//     title: "High-Ranking Officials from the African Union Visit the Institute",
//     image: "https://via.placeholder.com/300x200",
//     category: "TECH",
//     date: "1 day ago",
//   },
// ]

// const techNews = [
//   {
//     id: 10,
//     title: "AI Surgery Gives Super Vision to Legally Blind Patient",
//     excerpt:
//       "The General Director of the Addis Ababa's Civil Registration and Residency Service Agency, Mr. Yonas Alemayehu, stated that the upcoming system will enable citizens to utilize mobile phones for identification purposes. It has been pointed out that these systems will enable citizens to access various services in an integrated manner without needing to physically visit institutions.",
//     image: "https://via.placeholder.com/300x200",
//     category: "TECH",
//     date: "2 hours ago",
//   },
//   {
//     id: 11,
//     title: "AI Surgery Gives Super Vision to Legally Blind Patient",
//     excerpt:
//       "The General Director of the Addis Ababa's Civil Registration and Residency Service Agency, Mr. Yonas Alemayehu, stated that the upcoming system will enable citizens to utilize mobile phones for identification purposes.",
//     image: "https://via.placeholder.com/300x200",
//     category: "TECH",
//     date: "4 hours ago",
//   },
//   {
//     id: 12,
//     title: "AI Surgery Gives Super Vision to Legally Blind Patient",
//     excerpt:
//       "The General Director of the Addis Ababa's Civil Registration and Residency Service Agency, Mr. Yonas Alemayehu, stated that the upcoming system will enable citizens to utilize mobile phones for identification purposes.",
//     image: "https://via.placeholder.com/300x200",
//     category: "TECH",
//     date: "6 hours ago",
//   },
//   {
//     id: 13,
//     title: "AI Surgery Gives Super Vision to Legally Blind Patient",
//     excerpt:
//       "The General Director of the Addis Ababa's Civil Registration and Residency Service Agency, Mr. Yonas Alemayehu, stated that the upcoming system will enable citizens to utilize mobile phones for identification purposes.",
//     image: "https://via.placeholder.com/300x200",
//     category: "TECH",
//     date: "8 hours ago",
//   },
// ]

// const majorNews = {
//   id: 14,
//   title:
//     "An MoU has been Signed between Governmental Institutions to Modernize the Services of Addis Ababa's Civil Registration and Residency Service Agency.",
//   excerpt:
//     "The agreement has been signed between the Ethiopian Artificial Intelligence Institute (EAI), the Information Network Security Administration, the Addis Ababa Innovation and Technology Development Agency, the National ID Program Office, and Addis Ababa's Civil Registration and Residency Service Agency.",
//   image: "https://via.placeholder.com/800x400",
//   category: "MAJOR",
//   date: "1 hour ago",
//   hasVideo: true,
// }

// const footerLinks = {
//   quickLinks: [
//     { label: "About Us", href: "/about" },
//     { label: "Contact Us", href: "/contact" },
//     { label: "Privacy Policy", href: "/privacy" },
//     { label: "Terms of Service", href: "/terms" },
//   ],
//   contact: {
//     address: "123 Street, New York, USA",
//     phone: "+012 345 67890",
//     email: "info@example.com",
//   },
// }

// const videos = [
//   {
//     id: 1,
//     title: "An MoU has been Signed between Governmental Institutions to Modernize the Services",
//     description:
//       "The agreement has been signed between the Ethiopian Artificial Intelligence Institute (EAI), the Information Network Security Administration...",
//     thumbnail: "https://via.placeholder.com/500x300",
//     duration: "5:24",
//     views: "1.2K views",
//     date: "2 hours ago",
//   },
//   {
//     id: 2,
//     title: "AI Research Breakthrough in Healthcare Applications",
//     description:
//       "Latest developments in artificial intelligence applications for medical diagnosis and treatment planning...",
//     thumbnail: "https://via.placeholder.com/500x300",
//     duration: "8:15",
//     views: "3.4K views",
//     date: "1 day ago",
//   },
//   {
//     id: 3,
//     title: "Digital Transformation Initiative Launch",
//     description: "Government announces new digital transformation initiatives to modernize public services...",
//     thumbnail: "https://via.placeholder.com/500x300",
//     duration: "6:42",
//     views: "2.1K views",
//     date: "2 days ago",
//   },
// ]

// const trendingNews = [
//   {
//     id: 15,
//     title:
//       "The visit of Deputy Prime Minister Temesgen Tiruneh and Deputy Prime Minister Aregawi Berhe of the United Kingdom to the EAI",
//     image: "https://via.placeholder.com/80x80",
//     category: "TRENDING",
//     date: "1 hour ago",
//   },
//   {
//     id: 16,
//     title: "AI Innovation Summit brings together global experts",
//     image: "https://via.placeholder.com/80x80",
//     category: "TRENDING",
//     date: "3 hours ago",
//   },
//   {
//     id: 17,
//     title: "New partnership announced for technology development",
//     image: "https://via.placeholder.com/80x80",
//     category: "TRENDING",
//     date: "5 hours ago",
//   },
// ]

// const videoNews = [
//   {
//     id: 18,
//     title:
//       "The visit of Deputy Prime Minister Temesgen Tiruneh and Deputy Prime Minister Aregawi Berhe of the United Kingdom to the EAI",
//     image: "https://via.placeholder.com/80x80",
//     category: "VIDEOS",
//     date: "2 hours ago",
//     duration: "3:45",
//   },
//   {
//     id: 19,
//     title: "Live coverage of AI research presentation",
//     image: "https://via.placeholder.com/80x80",
//     category: "VIDEOS",
//     date: "4 hours ago",
//     duration: "12:30",
//   },
//   {
//     id: 20,
//     title: "Interview with technology leaders",
//     image: "https://via.placeholder.com/80x80",
//     category: "VIDEOS",
//     date: "1 day ago",
//     duration: "8:15",
//   },
// ]

// // Icon components (simple SVG icons)
// const MenuIcon = () => (
//   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//   </svg>
// )

// const XIcon = () => (
//   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//   </svg>
// )

// const PlayIcon = ({ size = "w-6 h-6" }) => (
//   <svg className={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <polygon points="5,3 19,12 5,21" fill="currentColor" />
//   </svg>
// )

// const CalendarIcon = ({ size = "w-3 h-3" }) => (
//   <svg className={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
//     <line x1="16" y1="2" x2="16" y2="6" />
//     <line x1="8" y1="2" x2="8" y2="6" />
//     <line x1="3" y1="10" x2="21" y2="10" />
//   </svg>
// )

// const ArrowRightIcon = ({ size = "w-4 h-4" }) => (
//   <svg className={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <line x1="5" y1="12" x2="19" y2="12" />
//     <polyline points="12,5 19,12 12,19" />
//   </svg>
// )

// function News() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//   const [email, setEmail] = useState("")
//   const [visibleVideos, setVisibleVideos] = useState(1)
//   const [isLoadingVideos, setIsLoadingVideos] = useState(false)
//   const [activeTab, setActiveTab] = useState("latest")

//   const handleNewsletterSubmit = (e) => {
//     e.preventDefault()
//     console.log("Newsletter subscription:", email)
//     setEmail("")
//   }

//   const handleVideoScroll = (e) => {
//     const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
//     if (scrollHeight - scrollTop === clientHeight && !isLoadingVideos && visibleVideos < videos.length) {
//       setIsLoadingVideos(true)
//       setTimeout(() => {
//         setVisibleVideos((prev) => Math.min(prev + 1, videos.length))
//         setIsLoadingVideos(false)
//       }, 1000)
//     }
//   }

//   const renderSidebarContent = () => {
//     let newsData = sidebarNews
//     let badgeColor = "bg-orange-100 text-orange-800"

//     switch (activeTab) {
//       case "trending":
//         newsData = trendingNews
//         badgeColor = "bg-blue-100 text-blue-800"
//         break
//       case "videos":
//         newsData = videoNews
//         badgeColor = "bg-green-100 text-green-800"
//         break
//       default:
//         newsData = sidebarNews
//         badgeColor = "bg-orange-100 text-orange-800"
//     }

//     return newsData.map((article) => (
//       <div key={article.id} className="flex space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
//         <div className="relative flex-shrink-0">
//           <img
//             src={article.image || "/placeholder.svg"}
//             alt={article.title}
//             className="w-20 h-20 object-cover rounded-lg"
//           />
//           {activeTab === "videos" && (
//             <>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="w-6 h-6 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center">
//                   <PlayIcon size="w-3 h-3" />
//                 </div>
//               </div>
//               <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
//                 {article.duration}
//               </div>
//             </>
//           )}
//         </div>
//         <div className="flex-1 min-w-0">
//           <span className={`inline-block text-xs mb-2 px-2 py-1 rounded ${badgeColor}`}>{article.category}</span>
//           <h4 className="text-sm font-medium leading-tight mb-2 line-clamp-3">{article.title}</h4>
//           <div className="flex items-center text-xs text-gray-500">
//             <CalendarIcon size="w-2.5 h-2.5" />
//             <span className="ml-1">{article.date}</span>
//           </div>
//         </div>
//       </div>
//     ))
//   }

//   return (
//     <div className="min-h-screen bg-white relative overflow-hidden">
//         <div className="min-h-[50vh] bg-gray-900 relative overflow-hidden">
//                 <div className="absolute h-dvh w-full">
//                     <CoolSvg />
//                 </div>
//                 <div className="relative h-64 bg-transparent mx-20">
//                     <img src="./../public/Assets/Andrew_Derr.png" className="absolute w-[27%] top-12 left-6 m-0 p-0" />
//                     <div className="z-20 flex items-center justify-center h-full">
//                         <div className="text-center text-white h-full">
//                             <h1 variant="h1" className="text-5xl md:text-6xl flex font-bold mt-36 mb-2 text-white">
//                                 Research & <p className="text-orange-400 ml-3">Development</p>
//                             </h1>
//                             <h1 variant="lead" className="text-lg opacity-90 text-white">
//                                 Advancing Innovation Through Technology
//                             </h1>
//                         </div>
//                     </div>
//                     {/* Decorative elements */}
//                     <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"></div>
//                     <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
//                 </div>
//         </div>
//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Left Column - Small News Items */}
//           <div className="lg:col-span-1 space-y-6">
//             {leftColumnNews.map((article) => (
//               <div
//                 key={article.id}
//                 className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
//               >
//                 <div className="relative">
//                   <img
//                     src={article.image || "/placeholder.svg"}
//                     alt={article.title}
//                     className="w-full h-48 object-cover"
//                   />
//                   <span className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
//                     {article.category}
//                   </span>
//                 </div>
//                 <div className="p-4">
//                   <h3 className="font-semibold text-sm leading-tight mb-2 line-clamp-3">{article.title}</h3>
//                   <div className="flex items-center text-xs text-gray-500">
//                     <CalendarIcon size="w-3 h-3" />
//                     <span className="ml-1">{article.date}</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Center Column - Featured Article */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer mb-8">
//               <div className="relative">
//                 <img
//                   src={featuredArticle.image || "/placeholder.svg"}
//                   alt={featuredArticle.title}
//                   className="w-full h-80 object-cover"
//                 />
//                 <span className="absolute top-4 left-4 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
//                   {featuredArticle.category}
//                 </span>
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
//                 <div className="absolute bottom-4 left-4 right-4 text-white">
//                   <h2 className="text-2xl font-bold mb-2 leading-tight">{featuredArticle.title}</h2>
//                   <p className="text-sm opacity-90 mb-2">{featuredArticle.excerpt}</p>
//                   <div className="flex items-center text-xs">
//                     <CalendarIcon size="w-3 h-3" />
//                     <span className="ml-1">{featuredArticle.date}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Tech News Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//               {techNews.map((article) => (
//                 <div
//                   key={article.id}
//                   className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
//                 >
//                   <div className="relative">
//                     <img
//                       src={article.image || "/placeholder.svg"}
//                       alt={article.title}
//                       className="w-full h-48 object-cover"
//                     />
//                     <span className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
//                       {article.category}
//                     </span>
//                   </div>
//                   <div className="p-4">
//                     <h3 className="font-semibold text-lg mb-2 line-clamp-2">{article.title}</h3>
//                     <p className="text-sm text-gray-600 mb-3 line-clamp-3">{article.excerpt}</p>
//                     <div className="flex items-center text-xs text-gray-500">
//                       <CalendarIcon size="w-3 h-3" />
//                       <span className="ml-1">{article.date}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Major News Article */}
//             <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
//               <div className="relative">
//                 <img
//                   src={majorNews.image || "/placeholder.svg"}
//                   alt={majorNews.title}
//                   className="w-full h-64 md:h-80 object-cover"
//                 />
//                 {majorNews.hasVideo && (
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
//                       <PlayIcon size="w-6 h-6" />
//                     </div>
//                   </div>
//                 )}
//                 <span className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
//                   {majorNews.category}
//                 </span>
//               </div>
//               <div className="p-6">
//                 <h2 className="text-2xl font-bold mb-4 leading-tight">{majorNews.title}</h2>
//                 <p className="text-gray-600 mb-4">{majorNews.excerpt}</p>
//                 <div className="flex items-center text-sm text-gray-500">
//                   <CalendarIcon size="w-3.5 h-3.5" />
//                   <span className="ml-1">{majorNews.date}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Sidebar */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-8">
//               <div className="w-full">
//                 <div className="grid grid-cols-3 bg-gray-100 rounded-lg p-1 mb-6">
//                   <button
//                     className={`text-xs font-medium py-2 px-3 rounded-md transition-all ${
//                       activeTab === "latest"
//                         ? "bg-white text-orange-600 shadow-sm"
//                         : "text-gray-600 hover:text-gray-900"
//                     }`}
//                     onClick={() => setActiveTab("latest")}
//                   >
//                     LATEST
//                   </button>
//                   <button
//                     className={`text-xs font-medium py-2 px-3 rounded-md transition-all ${
//                       activeTab === "trending"
//                         ? "bg-white text-orange-600 shadow-sm"
//                         : "text-gray-600 hover:text-gray-900"
//                     }`}
//                     onClick={() => setActiveTab("trending")}
//                   >
//                     TRENDING
//                   </button>
//                   <button
//                     className={`text-xs font-medium py-2 px-3 rounded-md transition-all ${
//                       activeTab === "videos"
//                         ? "bg-white text-orange-600 shadow-sm"
//                         : "text-gray-600 hover:text-gray-900"
//                     }`}
//                     onClick={() => setActiveTab("videos")}
//                   >
//                     VIDEOS
//                   </button>
//                 </div>

//                 <div className="space-y-4">{renderSidebarContent()}</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Video Section */}
//       <section className="max-w-7xl mx-auto px-4 py-16">
//         <h2 className="text-3xl font-bold mb-8 text-center">Featured Videos</h2>
//         <div className="space-y-8 max-h-screen overflow-y-auto" onScroll={handleVideoScroll}>
//           {videos.slice(0, visibleVideos).map((video) => (
//             <div key={video.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
//               <div className="relative">
//                 <img
//                   src={video.thumbnail || "/placeholder.svg"}
//                   alt={video.title}
//                   className="w-full h-64 md:h-80 object-cover"
//                 />
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="w-20 h-20 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-black/70 transition-colors">
//                     <PlayIcon size="w-8 h-8" />
//                   </div>
//                 </div>
//                 <div className="absolute bottom-4 right-4 bg-black/80 text-white text-sm px-2 py-1 rounded">
//                   {video.duration}
//                 </div>
//               </div>
//               <div className="p-6">
//                 <h3 className="text-xl font-bold mb-2">{video.title}</h3>
//                 <p className="text-gray-600 mb-4">{video.description}</p>
//                 <div className="flex items-center justify-between text-sm text-gray-500">
//                   <span>{video.views}</span>
//                   <span>{video.date}</span>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {isLoadingVideos && (
//             <div className="flex justify-center py-8">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
//             </div>
//           )}

//           {visibleVideos >= videos.length && (
//             <div className="text-center py-8 text-gray-500">
//               <p>No more videos to load</p>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white mt-16">
//         <div className="max-w-7xl mx-auto px-4 py-12">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {/* Logo and Description */}
//             <div className="lg:col-span-1">
//               <div className="flex items-center space-x-2 mb-4">
//                 <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
//                   <div className="w-6 h-6 bg-purple-600 rounded-full"></div>
//                 </div>
//                 <span className="font-bold text-xl">EAI</span>
//               </div>
//               <p className="text-gray-400 text-sm leading-relaxed">
//                 Ethiopian Artificial Intelligence Institute - Leading innovation in AI research and development.
//               </p>
//             </div>

//             {/* Address */}
//             <div>
//               <h4 className="font-semibold mb-4">Address</h4>
//               <div className="space-y-2 text-sm text-gray-400">
//                 <p>{footerLinks.contact.address}</p>
//                 <p>{footerLinks.contact.phone}</p>
//                 <p>{footerLinks.contact.email}</p>
//               </div>
//             </div>

//             {/* Quick Links */}
//             <div>
//               <h4 className="font-semibold mb-4">Quick Links</h4>
//               <div className="space-y-2">
//                 {footerLinks.quickLinks.map((link) => (
//                   <a
//                     key={link.label}
//                     href={link.href}
//                     className="block text-sm text-gray-400 hover:text-white transition-colors"
//                   >
//                     {link.label}
//                   </a>
//                 ))}
//               </div>
//             </div>

//             {/* Newsletter */}
//             <div>
//               <h4 className="font-semibold mb-4">Newsletter</h4>
//               <p className="text-sm text-gray-400 mb-4">Subscribe to our newsletter for the latest updates.</p>
//               <form onSubmit={handleNewsletterSubmit} className="space-y-3">
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   required
//                 />
//                 <button
//                   type="submit"
//                   className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition-colors flex items-center justify-center space-x-2"
//                 >
//                   <span>Subscribe</span>
//                   <ArrowRightIcon size="w-4 h-4" />
//                 </button>
//               </form>
//             </div>
//           </div>

//           {/* Bottom Bar */}
//           <div className="border-t border-gray-800 mt-8 pt-8 text-center">
//             <p className="text-sm text-gray-400">© 2024 ETHIOPIAN ARTIFICIAL INTELLIGENCE INSTITUTION TO ALL</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }

// export default News

const NesEdit = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
        <div className="min-h-[50vh] bg-gray-900 relative overflow-hidden">
                <div className="absolute h-dvh w-full">
                    <CoolSvg />
                </div>
                <div className="relative h-64 bg-transparent mx-20">
                    <img src="./../public/Assets/Andrew_Derr.png" className="absolute w-[27%] top-12 left-6 m-0 p-0" />
                    <div className="z-20 flex items-center justify-center h-full">
                        <div className="text-center text-white h-full">
                            <h1 variant="h1" className="text-5xl md:text-6xl flex font-bold mt-36 mb-2 text-white">
                                Research & <p className="text-orange-400 ml-3">Development</p>
                            </h1>
                            <h1 variant="lead" className="text-lg opacity-90 text-white">
                                Advancing Innovation Through Technology
                            </h1>
                        </div>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"></div>
                    <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
                </div>
        </div>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Small News Items */}
          <div className="lg:col-span-1 space-y-6">
            {leftColumnNews.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                    {article.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm leading-tight mb-2 line-clamp-3">{article.title}</h3>
                  <div className="flex items-center text-xs text-gray-500">
                    <CalendarIcon size="w-3 h-3" />
                    <span className="ml-1">{article.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Center Column - Featured Article */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer mb-8">
              <div className="relative">
                <img
                  src={featuredArticle.image || "/placeholder.svg"}
                  alt={featuredArticle.title}
                  className="w-full h-80 object-cover"
                />
                <span className="absolute top-4 left-4 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                  {featuredArticle.category}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h2 className="text-2xl font-bold mb-2 leading-tight">{featuredArticle.title}</h2>
                  <p className="text-sm opacity-90 mb-2">{featuredArticle.excerpt}</p>
                  <div className="flex items-center text-xs">
                    <CalendarIcon size="w-3 h-3" />
                    <span className="ml-1">{featuredArticle.date}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {techNews.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                      {article.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-3">{article.excerpt}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <CalendarIcon size="w-3 h-3" />
                      <span className="ml-1">{article.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Major News Article */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative">
                <img
                  src={majorNews.image || "/placeholder.svg"}
                  alt={majorNews.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
                {majorNews.hasVideo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <PlayIcon size="w-6 h-6" />
                    </div>
                  </div>
                )}
                <span className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                  {majorNews.category}
                </span>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 leading-tight">{majorNews.title}</h2>
                <p className="text-gray-600 mb-4">{majorNews.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <CalendarIcon size="w-3.5 h-3.5" />
                  <span className="ml-1">{majorNews.date}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="w-full">
                <div className="grid grid-cols-3 bg-gray-100 rounded-lg p-1 mb-6">
                  <button
                    className={`text-xs font-medium py-2 px-3 rounded-md transition-all ${
                      activeTab === "latest"
                        ? "bg-white text-orange-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    onClick={() => setActiveTab("latest")}
                  >
                    LATEST
                  </button>
                  <button
                    className={`text-xs font-medium py-2 px-3 rounded-md transition-all ${
                      activeTab === "trending"
                        ? "bg-white text-orange-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    onClick={() => setActiveTab("trending")}
                  >
                    TRENDING
                  </button>
                  <button
                    className={`text-xs font-medium py-2 px-3 rounded-md transition-all ${
                      activeTab === "videos"
                        ? "bg-white text-orange-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    onClick={() => setActiveTab("videos")}
                  >
                    VIDEOS
                  </button>
                </div>

                <div className="space-y-4">{renderSidebarContent()}</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Video Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Videos</h2>
        <div className="space-y-8 max-h-screen overflow-y-auto" onScroll={handleVideoScroll}>
          {videos.slice(0, visibleVideos).map((video) => (
            <div key={video.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-black/70 transition-colors">
                    <PlayIcon size="w-8 h-8" />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/80 text-white text-sm px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{video.title}</h3>
                <p className="text-gray-600 mb-4">{video.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{video.views}</span>
                  <span>{video.date}</span>
                </div>
              </div>
            </div>
          ))}

          {isLoadingVideos && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
          )}

          {visibleVideos >= videos.length && (
            <div className="text-center py-8 text-gray-500">
              <p>No more videos to load</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-purple-600 rounded-full"></div>
                </div>
                <span className="font-bold text-xl">EAI</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Ethiopian Artificial Intelligence Institute - Leading innovation in AI research and development.
              </p>
            </div>

            {/* Address */}
            <div>
              <h4 className="font-semibold mb-4">Address</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>{footerLinks.contact.address}</p>
                <p>{footerLinks.contact.phone}</p>
                <p>{footerLinks.contact.email}</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {footerLinks.quickLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-sm text-gray-400 mb-4">Subscribe to our newsletter for the latest updates.</p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Subscribe</span>
                  <ArrowRightIcon size="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-400">© 2024 ETHIOPIAN ARTIFICIAL INTELLIGENCE INSTITUTION TO ALL</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default NesEdit
