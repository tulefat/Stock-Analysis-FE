const Search = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <input
      type="text"
      name="search"
      value={props.value}
      placeholder="search stocks ex: GOOG"
      onChange={props.onChange}
      />
      <button>Submit</button>
    </form>
  )
}

export default Search
