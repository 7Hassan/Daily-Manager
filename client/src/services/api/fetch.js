

import { useState, useEffect } from 'react'
import PropTypes from "prop-types"

export const useGet = (url, setSate) => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const token = 'react'
  useEffect(() => {
    if (!url) return;
    setLoading(true)
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(res.message);
        res = await res.json()
        return res;
      })
      .then((data) => {
        setLoading(false)
        setSate(data)
      })
      .catch((error) => {
        setLoading(false);
        setErr(error.message);
      })
  }, [url]);
  return { loading, err }
}
useGet.propTypes = { url: PropTypes.string, setSate: PropTypes.func }



export const usePost = (url, data) => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const token = 'react'
  useEffect(() => {
    if (!url) return;
    setLoading(true)
    fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      }, body: JSON.stringify(data)
    })
      .then(async (res) => {
        res = await res.json()
        if (!res.ok) throw new Error(res.message);
        return res;
      })
      .then((data) => {
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false);
        setErr(error.message);
      })
  }, [url]);
  return { loading, err }
}
useGet.propTypes = { url: PropTypes.string }