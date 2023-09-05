import React from 'react'

const Loader = () => {
  return (
    
    <div className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-yellow-1000 rounded-full" role="status" aria-label="loading">
    <span className="sr-only">Loading...</span>
  </div>
      
  )
}

export default Loader