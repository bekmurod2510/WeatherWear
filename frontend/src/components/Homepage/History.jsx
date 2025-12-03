import { useState, useEffect } from 'react'
import axios from 'axios'

const History = () => {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      const response = await axios.get('https://weatherwear-3qko.onrender.com/api/weather/history', {
        withCredentials: true
      })
      setHistory(response.data.data)
    } catch (error) {
      console.error('Failed to fetch history:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="mt-4">Loading history...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Search History</h1>
      
      {history.length === 0 ? (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body text-center">
            <h2 className="card-title justify-center text-2xl">No Search History</h2>
            <p>Your weather search history will appear here once you start using WeatherWear.</p>
            <div className="card-actions justify-center">
              <a href="/dashboard" className="btn btn-primary">Go to Dashboard</a>
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Location</th>
                <th>Temperature</th>
                <th>Conditions</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.id}>
                  <td>{formatDate(item.createdAt)}</td>
                  <td>
                    <div className="font-medium">{item.location}</div>
                  </td>
                  <td>
                    <div className="badge badge-lg badge-primary">
                      {item.temperature.toFixed(1)}°C
                    </div>
                  </td>
                  <td>
                    <div className="badge badge-lg badge-outline">
                      {item.conditions}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default History