import React from "react";
import { useState } from "react";
const Search=()=>{

    const [searchstate,setSearchState]=useState({
        title:"",


    });
    

return(
    <div>
          <div className="wrapperSearch col s12 m12">
        <input
          type="text"
          value={searchstate.title}
          onChange={(e) => setSearchState(e.target.value)}
          placeholder="Search Movies Here..."
          style={{ textAlign: "center", color: "white" }}
        />
      </div>
    </div>

);


}

export default Search;