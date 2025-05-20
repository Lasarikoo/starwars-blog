// src/hooks/useFetch.js
import { useState, useEffect } from 'react'

export function useFetch(url) {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(url)
      .then(res => res.json())
      .then(json => {
        // Si es listado (/api/people, /planets, /vehicles)
        if (Array.isArray(json.results)) {
          setData(json.results)
        }
        // Si es detalle (/api/people/:id, etc.)
        else if (json.result) {
          setData(json.result)
        }
        // Fallback
        else {
          setData(json)
        }
        setLoading(false)
      })
      .catch(err => {
        setError(err)
        setLoading(false)
      })
  }, [url])

  return { data, loading, error }
}
