import { createContext, useEffect, useState } from "react"
import axios from "axios"

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [settings, setSettings] = useState([])
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [newsloading, setnewsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/settings/')
      .then(res => {
        setSettings(res.data[0])
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/news/')
      .then(res => {
        setNews(res.data[0])
        setnewsLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <AppContext.Provider value={{ settings, loading,news,newsloading, error }}>
      {children}
    </AppContext.Provider>
  )
}
