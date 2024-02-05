import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
// import { useState } from "react";

const SearchBar = ({handleSearch}) => {
  const [product, setProduct] = useState('')
  return (
    <div className="wrap">
        <div className="search">
            <input type="search" 
              onInput={(e)=>setProduct(e.target.value)}
              name="searchProduct" className="searchTerm" 
              placeholder="Search a Product" 
            />
            <button type="submit" className="searchButton">
                <IoIosSearch onClick={()=>handleSearch(product)}/>
            </button>
        </div>
    </div>
  )
}

export default SearchBar