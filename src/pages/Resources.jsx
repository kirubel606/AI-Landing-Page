import { useState, useMemo, useEffect } from "react"
import axios from "axios"
import CoolSvg from "../components/CoolSVg"
import { ChevronDown, Search, ChevronLeft, ChevronRight } from "lucide-react"
import Footer from "../components/Footer"
import SocialMediaLinks from "../components/SocialMediaLinks";
import { useTranslation } from 'react-i18next';
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000"

const Resources = () => {
  const { t, i18n } = useTranslation();
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
                  <span className="text-sm text-gray-700">{option.label}
                  </span>
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
      } else if (activeTab === "PATENTS") {  // also fix typo "PATTENT" -> "PATENT"
        return item.classification === "patents";
      } else {
        return item.classification === "resource" || item.classification === "dataset" || item.classification === "tool";
      }
    });
  }, [activeTab, mockData]); // <-- mockData is correctly added



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
    { label: "Datasets", value: "dataset" },
    { label: "Tools", value: "tool" },
  ];



  // Apply additional filters and sort
  const filteredData = useMemo(() => {
    const filtered = tabFilteredData.filter((item) => {
      // Search filter
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.toLowerCase().includes(searchTerm.toLowerCase());

      // Year filter
      const itemYear = new Date(item.published_at).getFullYear().toString();
      const matchesYear =
        selectedYears.length === 0 || selectedYears.includes(itemYear);

      // Category filter
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(item.category);

      // Collection filter
      const matchesCollection =
        selectedCollections.length === 0 ||
        selectedCollections.some((col) => {
          const colLower = col.toLowerCase();

          // dataset / tool → check classification
          if (["dataset", "tool"].includes(colLower)) {
            return item.classification?.toLowerCase() === colLower;
          }

          // default → check tags
          return item.tags?.toLowerCase().includes(colLower);
        });

      return (
        matchesSearch &&
        matchesYear &&
        matchesCategory &&
        matchesCollection
      );
    });

    // Sort latest first
    return filtered.sort(
      (a, b) => new Date(b.published_at) - new Date(a.published_at)
    );
  }, [
    tabFilteredData,
    searchTerm,
    selectedYears,
    selectedCategories,
    selectedCollections,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)
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
  <div className="min-h-screen flex flex-col bg-white">
    {/* Hero Section */}
    <div className="relative min-h-[30vh] md:min-h-[50vh] bg-gray-900 overflow-hidden">
      <div className="absolute inset-0">
        <CoolSvg />
      </div>

      <SocialMediaLinks />

      <div className="relative flex items-center justify-center h-full px-6">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mt-20 md:mt-36 mb-3">
            {t("resource_and_publications")}
          </h1>
          <p className="text-lg opacity-90">{t("advancing_innovation")}</p>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl" />
      </div>
    </div>

    {/* Tabs */}
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2">
          {["PUBLICATIONS", "RESOURCES", "PATENTS"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`py-2 px-3 text-sm rounded transition-all duration-200 ${
                activeTab === tab
                  ? "text-orange-600 font-bold italic bg-orange-100"
                  : "text-gray-400 italic hover:text-gray-600"
              }`}
            >
              {t(tab.toLowerCase())}
            </button>
          ))}
        </div>
      </div>
    </div>

    {/* Content Section */}
    <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
      <div className="flex flex-col lg:flex-row gap-6">
       {/* Sidebar */}
<aside className="lg:w-64 flex-shrink-0 space-y-4">
  {/* Search */}
  <div className="relative">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
    <input
      type="text"
      placeholder={t("search_publications")}
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
      }}
      className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Filters */}
  <div className="space-y-4 bg-white rounded-lg shadow-md p-4">
    <h3 className="text-sm font-bold text-gray-900 border-b pb-2">{t("Filters")}</h3>

    {/* Year Filter */}
    <div>
      <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-1">
        {t("year")}
      </label>
      <FilterDropdown
        label={t("year")}
        options={years.map((year) => ({ label: year, value: year }))}
        selectedValues={selectedYears}
        onChange={(values) => handleFilterChange("years", values)}
        placeholder={t("select_years")}
      />
    </div>

    {/* Category Filter */}
    <div>
      <label className="text-sm font-medium text-gray-700 mb-1 block">
        {t("research_areas")}
      </label>
      <FilterDropdown
        label={t("research_areas")}
        options={categoryData.map((cat) => ({
          label: i18n.language === "am" ? cat.name_am : cat.name,
          value: cat.id,
        }))}
        selectedValues={selectedCategories}
        onChange={(values) => handleFilterChange("categories", values)}
        placeholder={t("select_categories")}
      />
    </div>

    {/* Collections Filter */}
    {(activeTab === "RESOURCES" || activeTab === "PATENTS") && (
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          {t("collections")}
        </label>
        <FilterDropdown
          label={t("collections")}
          options={collections}
          selectedValues={selectedCollections}
          onChange={(values) => handleFilterChange("collections", values)}
          placeholder={t("select_collections")}
        />
      </div>
    )}
  </div>
</aside>


        {/* Main Content */}
        <main className="flex-1">
          {/* Content List */}
          <div className="space-y-6">
            {paginatedData
              .filter((item) =>
                i18n.language === "am"
                  ? item.title_am?.trim()
                  : item.title?.trim()
              )
              .map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm"
                >
                  <span className="inline-block text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded">
                    {formatDate(item.published_at)}
                  </span>

                  <h3 className="text-base font-semibold text-gray-900 my-2 leading-tight">
                    {i18n.language === "am" ? item.title_am : item.title}
                  </h3>

                  <div className="space-y-1 text-sm text-gray-600 mb-3">
                    <div>
                      <span className="font-medium">{t("author")}:</span>{" "}
                      {item.author}
                    </div>
                    <div>
                      <span className="font-medium">{t("published")}:</span>{" "}
                      {i18n.language === "am"
                        ? item.plublisher_am
                        : item.plublisher}
                    </div>
                  </div>

                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    {t("view_more")}
                  </a>
                </div>
              ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}

          {/* No Results */}
          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">{t("no_news_available")}</p>
            </div>
          )}
        </main>
      </div>
    </div>

    {/* Footer */}
    <Footer />
  </div>
);

}

export default Resources
