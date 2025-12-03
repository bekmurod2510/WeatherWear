const OutfitSuggestions = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Outfit Suggestions</h2>
          <div className="text-center py-8">
            <span className="loading loading-spinner loading-lg"></span>
            <p className="mt-4">Generating recommendations...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-xl">👕 Outfit Recommendations</h2>
        <p className="text-sm text-gray-500 mb-4">{data.recommendation}</p>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">Base Outfit</h3>
            <div className="flex flex-wrap gap-2">
              {data.baseOutfit.map((item, index) => (
                <span key={index} className="badge badge-primary badge-lg">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {data.outerwear && data.outerwear[0] !== 'None needed' && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Outerwear</h3>
              <div className="flex flex-wrap gap-2">
                {data.outerwear.map((item, index) => (
                  <span key={index} className="badge badge-secondary badge-lg">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.accessories && data.accessories.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Accessories</h3>
              <div className="flex flex-wrap gap-2">
                {data.accessories.map((item, index) => (
                  <span key={index} className="badge badge-accent badge-lg">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="divider"></div>
        
        <div className="alert alert-info">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>These recommendations are personalized based on your clothing style preference.</span>
        </div>
      </div>
    </div>
  )
}

export default OutfitSuggestions