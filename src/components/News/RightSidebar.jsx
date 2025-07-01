import React from 'react'
import { useTranslation } from 'react-i18next';

const RightSidebar = ({ activeTab, setActiveTab, renderSidebarContent }) => {
  const { t } = useTranslation();
  return (
    <>
          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="w-full">
                <div className="grid grid-cols-3 p-1 mb-6">
                
                  <button
                    className={`text-xs font-medium py-2 px-3 transition-all -skew-x-12 ${
                      activeTab === "trending"
                        ? "bg-orange-400 text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    onClick={() => setActiveTab("trending")}
                  >
                    {t('trending')}
                  </button>
                  <button
                    className={`text-xs font-medium py-2 px-3 transition-all -skew-x-12 ${
                      activeTab === "videos"
                        ? "bg-orange-400 text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    onClick={() => setActiveTab("videos")}
                  >
                    {t('videos')}
                  </button>
                    <button
                    className={`text-xs font-medium py- px-3 transition-all -skew-x-12 ${
                      activeTab === "latest"
                        ? "bg-orange-400 text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    onClick={() => setActiveTab("latest")}
                  >
                    {t('Digital_magazine')}
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



