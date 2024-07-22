import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import LogoutIcon from "../../assets/bigIcon/logoutIcon.png";
// import LogoutIcon from "../../../assets/bigIcon/logoutIcon.png";

import AuthencationHeader from '../Headers/AuthencationHeader';
import { Image } from 'react-bootstrap';
const SearchResults = () => {
    const { query } = useParams();
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate fetching or processing search results based on the query
        // Replace with your actual logic to match search query to routes
        const results = [
            { id: 1, title: 'Create New User',desc:"User Information",path: '/CreateNewUser' },
            { id: 2, title: 'Add School',desc:"School Information" ,path: '/AddSchool' },
            { id: 3, title: 'Generate Inventory',desc:"", path: '/GenerateInventory' },
            // { id: 4, title: 'School Detail',desc:"", path: '/SchoolDetail/1' }, // Replace 1 with actual pk
            { id: 5, title: 'Edit School',desc:"", path: '/EditSchool/1' }, // Replace 1 with actual pk
            { id: 6, title: 'User Detail',desc:"", path: '/UserDetail/1' }, // Replace 1 with actual pk
            { id: 7, title: 'Edit User',desc:"", path: '/EditUser/1' } // Replace 1 with actual pk
        ];

        // Filter results based on the search query (e.g., matching titles)
        const filteredResults = results.filter(result =>
            result.title.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredResults);
    }, [query]);

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className='pt-4' >
                    <div style={{display:"flex", alignItems:"center", textAlign:"center"}}><AuthencationHeader text={"EdoSUBEB Inventory Management System"} /></div>
            <h2 style={{marginLeft:"25px"}}>Search Results for: {query}</h2>
            {searchResults.length > 0 ? (
                <ul className='d-flex gap-4'>
                    {searchResults.map(result => (
                        <li onClick={() => handleNavigation(result.path)}  key={result.id} className='d-flex justify-content-center flex-column' style={{listStyle:"none", padding:"30px", cursor:"pointer", border:"1px solid green", marginTop:"15px", width:"300px",fontFamily:"poppins",textAlign:"center",}}>
                            <div >
                            <h3>{result.title}</h3>
                            </div>
                            <p>{result.desc}</p>
                            <button style={{border:"none", padding:"10px",backgroundColor:"green",color:"white",borderRadius:"10px",marginTop:"10px",fontFamily:"poppins"}} >{result.title}</button>
                        </li>
                    ))}
                </ul>
            ) : (
               <div className='d-flex justify-content-center align-items-center flex-column '><Image src={LogoutIcon} className="my-3" style={{width:"200px"}} />  <p>No results found for "{query}".</p></div>
            )}
        </div>
    );
};

export default SearchResults;
