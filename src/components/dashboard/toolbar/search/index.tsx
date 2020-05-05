import SearchIcon from './icon'

import './dashboard-search.styl'

const Search = () => {
  return (
    <form id="dashboard-search">
      <SearchIcon />
      <input className="search" placeholder="Search" type="text" />
    </form>
  )
}

export default Search
