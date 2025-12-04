const ErrorState = ({ onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 md:py-24 text-center">
      <img 
        src="/assets/images/icon-error.svg" 
        alt="Error" 
        className="w-20 h-20 mb-6"
      />
      <h3 className="text-2xl font-bold mb-3 font-bricolage">Something went wrong</h3>
      <p className="text-neutral-300 mb-8 text-lg max-w-md">
        We couldn't fetch the weather data. Please try again.
      </p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-900 font-medium"
      >
        <img 
          src="/assets/images/icon-retry.svg" 
          alt="Retry" 
          className="w-5 h-5"
        />
        <span>Retry</span>
      </button>
    </div>
  )
}

export default ErrorState

