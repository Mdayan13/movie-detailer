import React from 'react'

const Search = ({input, setinput}) => {
  return (
    <div className="search" >
      <div>
        <img src='../../public/Search-Input.png' alt="noimg"/>
        <input type='text' placeholder='serach a movie my buddy '
        value={input} onChange={(event) => setinput(event.target.value)} />
      </div>
    </div>
  )
}

export default Search