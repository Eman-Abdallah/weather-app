import { useState } from 'react'

const SearchBar = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim() && !loading) {
      onSearch(query.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 max-w-[700px] mx-auto">
      <div className="flex-1 relative">
        <img 
          src="/assets/images/icon-search.svg" 
          alt="Search" 
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a place..."
          className="w-full pl-12 pr-4 py-4 bg-neutral-800 border border-neutral-700 rounded-xl text-neutral-0 placeholder-neutral-300 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-neutral-600"
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        disabled={loading || !query.trim()}
        className="px-6 py-4 bg-blue-500 hover:bg-blue-700 disabled:bg-neutral-700 disabled:cursor-not-allowed rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-900 font-medium text-white"
        aria-label="Search"
      >
        Search
      </button>
    </form>
  )
}

export default SearchBar

