const NoResultsState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 md:py-24 text-center">
      <img 
        src="/assets/images/icon-error.svg" 
        alt="No results" 
        className="w-20 h-20 mb-6"
      />
      <h3 className="text-2xl font-bold mb-3 font-bricolage">No Search results found</h3>
      <p className="text-neutral-300 text-lg max-w-md">
        We couldn't find that location. Please try searching for a different city.
      </p>
    </div>
  )
}

export default NoResultsState

