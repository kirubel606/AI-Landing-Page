import CoolSvg from "../components/CoolSVg"
import React, { useState, useEffect } from "react";
import axios from "axios"
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { ChevronDown, Search, ChevronLeft, ChevronRight } from "lucide-react"
import Footer from "../components/Footer";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Research = () => {
    const [activeTab, setActiveTab] = useState("latest");
    const timeAgo = (dateString) => {
        if (!dateString) return "unknown time";

        // Truncate fractional seconds if present
        const safeDateString = dateString.split(".")[0] + "Z";
        const date = new Date(safeDateString);
        if (isNaN(date)) return "invalid date";

        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        const hours = Math.floor(diffInSeconds / 3600);
        const days = Math.floor(diffInSeconds / 86400);
        const weeks = Math.floor(diffInSeconds / 604800);
        const months = Math.floor(diffInSeconds / 2592000);
        const years = Math.floor(diffInSeconds / 31536000);

        if (diffInSeconds < 3600) return "just now";
        if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
        if (days < 7) return `${days} day${days !== 1 ? "s" : ""} ago`;
        if (weeks < 4) return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
        if (months < 12) return `${months} month${months !== 1 ? "s" : ""} ago`;
        return `${years} year${years !== 1 ? "s" : ""} ago`;
    };


    const formatMonthYear = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
        });
    };

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCategoryName, setSelectedCategoryName] = useState("All Categories");
    console.log("Selected Category:", selectedCategory);
    const [startIndex, setStartIndex] = useState(0);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${BASE_URL}` + "/categories/");
                setCategories(response.data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };

        fetchCategories();
    }, []);

    // Auto-scroll every 2 seconds
    useEffect(() => {
        if (categories.length > 5) {
            const interval = setInterval(() => {
                setStartIndex((prevIndex) =>
                    (prevIndex + 1) % categories.length
                );
            }, 20000);
            return () => clearInterval(interval);
        }
    }, [categories]);

    const visibleCategories = categories.length <= 5
        ? categories
        : [...categories.slice(startIndex), ...categories.slice(0, 5 - (categories.length - startIndex))].slice(0, 5);

    const overflow = categories.length > 5;

    const goNext = () => {
        setStartIndex((prevIndex) =>
            (prevIndex + 1) % categories.length
        );
    };

    const goPrev = () => {
        setStartIndex((prevIndex) =>
            (prevIndex - 1 + categories.length) % categories.length
        );
    };

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`${BASE_URL}` + "/rnd/");
                setProjects(response.data.slice(0, 4));
            } catch (error) {
                console.error("Failed to fetch R&D projects:", error);
            }
        };

        fetchProjects();
    }, []);
    const itemsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);

    const filteredProjects = projects.filter(
        (div) => !selectedCategory || div.category === selectedCategory
    );

    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    const paginatedProjects = filteredProjects.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
      const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
      const pages = []
      const maxVisible = 5

      if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        if (currentPage <= 3) {
          for (let i = 1; i <= 4; i++) {
            pages.push(i)
          }
          pages.push("...")
          pages.push(totalPages)
        } else if (currentPage >= totalPages - 2) {
          pages.push(1)
          pages.push("...")
          for (let i = totalPages - 3; i <= totalPages; i++) {
            pages.push(i)
          }
        } else {
          pages.push(1)
          pages.push("...")
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pages.push(i)
          }
          pages.push("...")
          pages.push(totalPages)
        }
      }

      return pages
    }

    return (
      <div className="flex items-center justify-center space-x-2 mt-8">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={page === "..."}
            className={`px-3 py-2 rounded border text-sm ${page === currentPage
              ? "bg-blue-600 text-white border-blue-600"
              : page === "..."
                ? "border-transparent cursor-default"
                : "border-gray-300 hover:bg-gray-50"
              }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    )
  }
    // Add this definition for tabItems
    const tabItems = [
        { label: "Latest", value: "latest" },
        { label: "Research", value: "research" },
        { label: "Case Study", value: "case-study" },
        { label: "Development", value: "development" }
    ];
    const getFilteredProjects = () => {
        if (activeTab === "latest") {
            return [...projects]
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 6);
        }
        return projects.filter((item) => item.type === activeTab);
    };

    return (

        <div className="min-h-screen overflow-y-clip bg-white">
            <div className="min-h-[30vh] md:min-h-[50vh] bg-gray-900 relative overflow-hidden">
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

            {/* Category divs */}
            <div className="container mx-auto px-4 py-8 overflow-y-clip">
                <div className="relative mb-8">
                    {overflow && (
                        <div className="absolute top-1/2 -left-4 z-10 scro">
                            <button onClick={goPrev} className="bg-white rounded-full shadow p-2">
                                ◀
                            </button>
                        </div>
                    )}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {visibleCategories.map((category, index) => (
                            <div
                                key={`${category.id}-${index}`}
                                onClick={() => {
                                    setSelectedCategory(category.id);
                                    setSelectedCategoryName(category.name);
                                }}

                                className="overflow-hidden cursor-pointer rounded-xl hover:shadow-lg transition-shadow"
                            >

                                <div className="relative h-32">
                                    <img
                                        src={category.image || "/placeholder.svg"}
                                        alt={category.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        <h1 className="text-white font-semibold">{category.name}</h1>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {overflow && (
                        <div className="absolute top-1/2 -right-4 z-10">
                            <button onClick={goNext} className="bg-white rounded-full shadow p-2">
                                ▶
                            </button>
                        </div>
                    )}
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Content divs */}
                    <div className="lg:col-span-2">
                        {selectedCategoryName && (
                            <h1 className="text-2xl font-bold mb-6 text-gray-900">
                                {selectedCategoryName}
                            </h1>
                        )}

                        {paginatedProjects
                            .filter((div) => !selectedCategory || div.category === selectedCategory)
                            .map((div, index) => (
                                <div key={div.id} className="lg:col-span-2">
                                    <div className="space-y-4">
                                        <div className="overflow-hidden shadow-sm">
                                            <div className="p-4">
                                                <div className="flex gap-4">
                                                    {/* Image */}
                                                    <div className="relative flex-shrink-0 w-40 h-36">
                                                        <img
                                                            src={div.coverimage || "/placeholder.svg"}
                                                            alt={div.title}
                                                            className="w-full h-full rounded-lg object-cover"
                                                        />
                                                        {div.logo && (
                                                            <img
                                                                src={div.logo}
                                                                alt={`${div.title} logo`}
                                                                className="absolute bottom-1 right-1 w-8 h-8 rounded-full border-2 border-white shadow-md object-cover"
                                                            />
                                                        )}
                                                    </div>

                                                    {/* Content */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <h1 className="text-orange-500 text-xs">
                                                                {formatMonthYear(div.timestamp)}
                                                            </h1>
                                                        </div>
                                                        <h1 className="text-gray-900 font-semibold mb-2 text-sm leading-tight">
                                                            {div.title}
                                                        </h1>
                                                        <h1 className="text-gray-600 text-xs leading-relaxed mb-3 line-clamp-3">
                                                            {div.description}
                                                        </h1>
                                                        <button
                                                            className="bg-indigo-950 hover:bg-indigo-700 rounded-md text-white flex items-center gap-2 text-sm px-4 py-2"
                                                        >
                                                            Download
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>


                    {/* Sidebar - Related Topics */}
                    <aside className="lg:col-span-1">
                        <Card className="shadow-sm ">
                            {/* Tab Headers */}
                            <div className="flex gap-2 mb-4">
                                {tabItems.map((tab) => (
                                    <button
                                        key={tab.value}
                                        onClick={() => setActiveTab(tab.value)}
                                        className={`text-xs font-medium py-2 px-3 transition-all -skew-x-12  ${activeTab === tab.value
                                            ? "bg-orange-500 text-white"
                                            : " text-gray-600 hover:text-gray-900"
                                            }`}

                                    >
                                        <span className="-skew-x-12 inline-block">{tab.label}</span>
                                    </button>

                                ))}
                            </div>
                            <CardBody className="p-4 max-h-[500px] overflow-y-auto">

                                {/* Tab Content */}
                                <div className="space-y-3">
                                    {getFilteredProjects().map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                                        >
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={item.coverimage || "/placeholder.svg"}
                                                    alt={item.title}
                                                    className="w-[110px] h-[110px] rounded object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 overflow-hidden min-w-0">
                                                <Typography
                                                    variant="small"
                                                    className="text-gray-800 text-xs mb-1 inline-block"
                                                >
                                                    {
                                                        categories.find(cat => cat.id === item.category)?.name || "Unknown"
                                                    } / { }
                                                </Typography>
                                                <Typography
                                                    variant="small"
                                                    className="text-gray-500 text-xs mb-1 inline"
                                                >
                                                    {timeAgo(item.timestamp)}
                                                </Typography>
                                                <Typography
                                                    variant="small"
                                                    className="text-gray-900 font-extrabold text-lg truncate block"
                                                    style={{ width: "500px" }}
                                                >
                                                    {item.title}
                                                </Typography>
                                                <Typography
                                                    variant="small"
                                                    className="text-gray-500 text-xs block"
                                                    style={{
                                                        display: "-webkit-box",
                                                        WebkitLineClamp: 3,
                                                        WebkitBoxOrient: "vertical",
                                                        overflow: "hidden",
                                                        maxWidth: "500px",
                                                    }}
                                                >
                                                    {item.description}
                                                </Typography>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </CardBody>
                        </Card>
                    </aside>
                </div>
                {/* Pagination */}
            {totalPages > 1 && (
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            )}
            </div>
            <Footer />
        </div>
    )
}

export default Research
