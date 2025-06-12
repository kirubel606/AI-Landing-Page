import { useState, useMemo, useEffect } from "react"
import axios from "axios"
import CoolSvg from "../components/CoolSVg"
import { ChevronDown, Search, ChevronLeft, ChevronRight } from "lucide-react"
import Footer from "../components/Footer"

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000"

const Resources = () => {
  const [mockData, setMockData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // NEW

  useEffect(() => {
    const fetchresource = async () => {
      try {
        const response = await axios.get(BASE_URL + "/resources/");
        setMockData(response.data);
      } catch (error) {
        console.error("Failed to fetch R&resources projects:", error);
      } finally {
        setIsLoading(false); // Stop loading once done (success or error)
      }
    };

    fetchresource();
  }, []);
  const [categoryData, setCategoryData] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(BASE_URL + "/categories/");
        setCategoryData(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);


  const FilterDropdown = ({ label, options, selectedValues, onChange, placeholder, disabled }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionClick = (optionValue) => {
      if (disabled) return;
      if (selectedValues.includes(optionValue)) {
        onChange(selectedValues.filter((val) => val !== optionValue));
      } else {
        onChange([...selectedValues, optionValue]);
      }
    };

    const getSelectedLabels = () =>
      selectedValues
        .map((val) => options.find((opt) => opt.value === val)?.label)
        .filter(Boolean)
        .join(", ");

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between px-3 py-2 text-left text-sm 
          ${disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "text-gray-700 bg-white"} 
          border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
          disabled={disabled}
        >
          <span className="truncate text-sm">
            {selectedValues.length === 0
              ? placeholder
              : getSelectedLabels()}
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""} 
            ${disabled ? "text-gray-300" : ""}`}
          />
        </button>

        {!disabled && isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
            <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-48 overflow-auto">
              {options.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleOptionClick(option.value)}
                  className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(option.value)}
                    onChange={() => { }}
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };



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

  const [activeTab, setActiveTab] = useState("PUBLICATIONS")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedYears, setSelectedYears] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedCollections, setSelectedCollections] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Filter data by tab first
  const tabFilteredData = useMemo(() => {
    return mockData.filter((item) => {
      if (activeTab === "PUBLICATIONS") {
        return item.classification === "publication";
      } else {
        return item.classification === "resource";
      }
    });
  }, [activeTab, mockData]); // <-- ADD mockData here


  // Get unique values for filters from tab-filtered data
  const years = [...new Set(tabFilteredData.map((item) => new Date(item.published_at).getFullYear().toString()))].sort(
    (a, b) => b - a,
  )

  const [categoryNames, setCategoryNames] = useState([])
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(BASE_URL + "/categories/");
        setCategoryNames(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);
  const categories = [...new Set(tabFilteredData.map((item) => item.category))].sort()


  const collections = [
    "Biomedical Engineering",
    "Medical Imaging",
    "Healthcare Analytics",
    "Clinical Data",
    "Drug Discovery",
    "Healthcare Management",
  ].sort()


  // Apply additional filters and sort
  const filteredData = useMemo(() => {
    const filtered = tabFilteredData.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.toLowerCase().includes(searchTerm.toLowerCase())

      const itemYear = new Date(item.published_at).getFullYear().toString()
      const matchesYear = selectedYears.length === 0 || selectedYears.includes(itemYear)
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category)
      const matchesCollection =
        selectedCollections.length === 0 ||
        selectedCollections.some((col) => item.tags.toLowerCase().includes(col.toLowerCase()))

      return matchesSearch && matchesYear && matchesCategory && matchesCollection
    })

    // Sort by date (latest first)
    return filtered.sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
  }, [tabFilteredData, searchTerm, selectedYears, selectedCategories, selectedCollections])

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)
console.log(paginatedData)
  // Reset filters and page when tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setCurrentPage(1)
    setSelectedYears([])
    setSelectedCategories([])
    setSelectedCollections([])
    setSearchTerm("")
  }

  // Reset to first page when filters change
  const handleFilterChange = (filterType, values) => {
    setCurrentPage(1)
    switch (filterType) {
      case "years":
        setSelectedYears(values)
        break
      case "categories":
        setSelectedCategories(values)
        break
      case "collections":
        setSelectedCollections(values)
        break
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
      .toUpperCase()
  }
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
                Resource  & <p className="text-orange-400 ml-3">Publications</p>
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
      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4">
            <button
              onClick={() => handleTabChange("PUBLICATIONS")}
              className={`py-2 px-3 text-sm transition-all duration-200 ${activeTab === "PUBLICATIONS"
                ? "text-orange-600 font-bold italic bg-orange-100 rounded"
                : "text-gray-400 italic hover:text-gray-600"
                }
              }`}
            >
              PUBLICATIONS
            </button>
            <button
              onClick={() => handleTabChange("RESOURCES")}
              className={`py-2 px-3 text-sm transition-all duration-200 ${activeTab === "RESOURCES"
                ? "text-orange-600 font-bold italic bg-orange-100 rounded"
                : "text-gray-400 italic hover:text-gray-600"
                }`}
            >
              RESOURCES
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl h-screen mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            {/* Search */}
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search for publications, authors..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="space-y-4 bg-white rounded-lg shadow-md p-4">
              <h3 className="text-sm font-bold text-gray-900 border-b pb-2">Filters</h3>

              <div className="space-y-4">
                {/* Year Filter */}
                <div>
                  <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-1">
                    Year
                  </label>
                  <FilterDropdown
                    label="Year"
                    options={years.map((year) => ({ label: year, value: year }))}
                    selectedValues={selectedYears}
                    onChange={(values) => handleFilterChange("years", values)}
                    placeholder="Select years"
                  />
                </div>

                {/* Category Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Research Areas
                  </label>
                  <FilterDropdown
                    label="Category"
                    options={categoryData.map((cat) => ({
                      label: cat.name,
                      value: cat.id,
                    }))}
                    selectedValues={selectedCategories}
                    onChange={(values) => handleFilterChange("categories", values)}
                    placeholder="Select categories"
                  />
                </div>


                {/* Collections Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Collections
                  </label>
                  <FilterDropdown
                    disabled
                    label="Collections"
                    options={collections.map((col) => ({ label: col, value: col }))}
                    selectedValues={selectedCollections}
                    onChange={(values) => handleFilterChange("collections", values)}
                    placeholder="Select collections"
                  />

                </div>
              </div>
            </div>

          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Content List */}
            <div className="space-y-6">
              {paginatedData.map((item) => (
                <div key={item.id} className="bg-white p-5 rounded border border-gray-200">
                  <div className="mb-2">
                    <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded">
                      {formatDate(item.published_at)}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-gray-900 mb-2 leading-tight">{item.title}</h3>

                  <div className="space-y-1 text-sm text-gray-600 mb-3">
                    <div>
                      <span className="font-medium">Author:</span> {item.author}
                    </div>
                    <div>
                      <span className="font-medium">Published:</span> {item.plublisher}
                    </div>
                  </div>

                  <div>
                    <a href={item.link} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View More
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            )}

            {/* No results */}
            {filteredData.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No {activeTab.toLowerCase()} found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Resources
