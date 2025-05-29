import { createContext, useEffect, useState } from "react"
import axios from "axios"

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [settings, setSettings] = useState([])
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [newsloading, setnewsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [collabs,setCollabs] = useState(null)

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
    axios.get('http://127.0.0.1:8000/news/all/')
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
    axios.get('http://127.0.0.1:8000/collaborations/')
      .then(res => {
        setCollabs(res.data.slice(0, 6))
      })
      .catch(err => {
        setError(err.message)
      })
  }, [])

  return (
    <AppContext.Provider value={{ settings,loading,news,collabs,newsloading, error }}>
      {children}
    </AppContext.Provider>
  )
}
