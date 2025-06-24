import { createContext, useEffect, useState } from "react"
import axios from "axios"
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [settings, setSettings] = useState([])
  const [news, setNews] = useState([])
  const [newsData, setNewsData] = useState([])
  const [gallery, setGallery] = useState([])
  const [loading, setLoading] = useState(true)
  const [newsloading, setnewsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [collabs,setCollabs] = useState(null)

  useEffect(() => {
    axios.get(`${BASE_URL}`+'/settings/')
      .then(res => {
        setSettings(res.data[0] || {})
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    axios.get(`${BASE_URL}`+'/news/all/')
      .then(res => {
        setNews(res.data)
        setnewsLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const fetchNewsData = async () => {
    try {
      setLoading(true)
      // Replace with your actual API endpoint
      const response = await fetch(`${BASE_URL}/news/all/`) // Adjust this URL to match your backend
      const data = await response.json()

      if (data.results && data.results.result) {
        const allNews = data.results.result
        setNewsData(allNews)
      }
    } catch (err) {
      setError("Failed to fetch news data")
      console.error("Error fetching news:", err)
    } finally {
      setLoading(false)
    }
  }
  fetchNewsData();
      }, [])
  

  useEffect(() => {
    axios.get(`${BASE_URL}`+'/gallery/')
      .then(res => {
        setGallery(res.data)
      })
      .catch(err => {
        setError(err.message)
      })
  }, [])

  useEffect(() => {
    axios.get(`${BASE_URL}`+'/collaborations/')
      .then(res => {
        setCollabs(res.data)
      })
      .catch(err => {
        setError(err.message)
      })
  }, [])

  return (
    <AppContext.Provider value={{ settings,loading,news,newsData,gallery,collabs,newsloading, error }}>
      {children}
    </AppContext.Provider>
  )
}
