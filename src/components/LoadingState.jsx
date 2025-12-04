const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 md:py-24">
      <img 
        src="/assets/images/icon-loading.svg" 
        alt="Loading" 
        className="w-20 h-20 mb-6 animate-spin"
      />
      <p className="text-neutral-300 text-lg font-medium">Loading weather data...</p>
    </div>
  )
}

export default LoadingState

