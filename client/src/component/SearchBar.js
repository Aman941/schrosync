import React from 'react';


const SearchBar = (props) => {
    const url = props.url;
    function handleChange(e) {
        props.onUrlChange(e.target.value);
    }
    return(
        <input className = 'url_input' type = 'text' placeholder = 'Video url' onChange = {(e) => handleChange(e)} />
    )
}

export default SearchBar;