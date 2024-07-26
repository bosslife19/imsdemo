import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import LogoutIcon from "../../../assets/bigIcon/logoutIcon.png";
// import LogoutIcon from "../../../assets/bigIcon/logoutIcon.png";
import { Col, Container, Image, Row, Button } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
 import AuthencationHeader from '../../Headers/AuthencationHeader';
const SearchResulted = () => {
    const { query } = useParams();
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate fetching or processing search results based on the query
        // Replace with your actual logic to match search query to routes
        const results = [
            { id: 1, title: 'Push schedule',path: '/WareHouseScheduler' },
            { id: 2, title: 'AddMovement',path: '/WareHouseAddMovement' },
            { id: 3, title: 'PushNotification',desc:"", path: '/WareHousePushNotification' },
            { id: 4, title: 'GenerateInventory',desc:"", path: '/WareHouseGenerateInventory' },
            { id: 5, title: 'TrackMovement',desc:"", path: 'TrackMovementLog' },
            { id: 6, title: 'Scan Material',desc:"", path: '/ScanMaterial' },
            { id: 7, title: 'TrackMaterial',desc:"", path: '/WareHouseTrack' },
            { id: 8, title: 'DiscrepancyReport',desc:"", path: '/DiscrepancyDetail/1' },
            { id: 9, title: 'Edit User',desc:"", path: '/EditUser/1' }
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

    const goBack = () => {
        navigate(-1); // Navigate to the previous page
    };

    return (
        <Container> 
            <Row className='pt-4 pb-4'>
                <Col>
                <Button variant="link" onClick={goBack} style={{ marginRight: "10px", fontSize: "24px", textDecoration: "none",color:"#000" }}>
                            <FaArrowLeft />
                        </Button>
                    <div style={{ display: "flex", alignItems: "center", textAlign: "center", marginBottom: "20px" ,justifyContent:"center"}}>
                        
                        <AuthencationHeader text={"EdoSUBEB Inventory Management System"} />
                    </div>
                    <h2 className='mt-3' style={{ marginLeft: "25px" }}>Search Results for: {query}</h2>
                    {searchResults.length > 0 ? (
                        <Row className="d-flex flex-wrap gap-3 justify-content-center ">
                            {searchResults.map(result => (
                                <Col
                                    key={result.id}
                                    xs={12} sm={6} md={4} lg={3}
                                    className='d-flex justify-content-center align-items-center'
                                >
                                    <div
                                        onClick={() => handleNavigation(result.path)}
                                        className='search-result-item'
                                        style={{
                                            listStyle: "none",
                                            padding: "30px",
                                            cursor: "pointer",
                                            border: "1px solid green",
                                            marginTop: "15px",
                                            width: "100%",
                                            fontFamily: "Poppins",
                                            textAlign: "center"
                                        }}
                                    >
                                        <h3>{result.title}</h3>
                                        <p>{result.desc}</p>
                                        <Button
                                            style={{
                                                border: "none",
                                                padding: "10px",
                                                backgroundColor: "green",
                                                color: "white",
                                                borderRadius: "10px",
                                                marginTop: "10px",
                                                fontFamily: "Poppins"
                                            }}
                                        >
                                            {result.title}
                                        </Button>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <div className='d-flex justify-content-center align-items-center flex-column'>
                            <Image src={LogoutIcon} className="my-3" style={{ width: "200px" }} />
                            <p>No results found for "{query}".</p>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default SearchResulted;
