const Search = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <input
      type="text"
      name="search"
      value={props.value}
      placeholder="search stocks ex: Microsoft"
      onChange={props.onChange}
      />
      <button>Search</button>
    </form>
  )
}

export default Search
