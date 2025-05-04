import { useState } from 'react'
import PropTypes from 'prop-types'
import { FiSearch } from 'react-icons/fi'

const SearchBar = ({ placeholder = "Search for products, services, or blog posts..." }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    // In a real app, you would implement search functionality here
    console.log('Searching for:', searchTerm)
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-12 pr-10 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-600 hover:text-primary-700"
        >
          Search
        </button>
      </form>
    </div>
  )
}

SearchBar.propTypes = {
  placeholder: PropTypes.string,
}

export default SearchBar