import React from 'react'

const RightSidebar = ({ activeTab, setActiveTab, renderSidebarContent }) => {
  return (
    <>
              {/* Right News Sidebar */}
              <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="w-full">
                <div className="grid grid-cols-3 p-1 mb-6">
                  <button
                    className={`text-xs font-medium py-2 px-3 transition-all -skew-x-12 ${
                      activeTab === "latest"
                        ? "bg-orange-400 text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    onClick={() => setActiveTab("latest")}
                  >
                    LATEST
                  </button>
                  <button
                    className={`text-xs font-medium py-2 px-3 transition-all -skew-x-12 ${
                      activeTab === "trending"
                      ? "bg-orange-400 text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                    onClick={() => setActiveTab("trending")}
                  >
                    TRENDING
                  </button>
                  <button
                    className={`text-xs font-medium py-2 px-3 transition-all -skew-x-12 ${
                      activeTab === "videos"
                      ? "bg-orange-400 text-white shadow-sm"
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
    </>
  )
}

export default RightSidebar



