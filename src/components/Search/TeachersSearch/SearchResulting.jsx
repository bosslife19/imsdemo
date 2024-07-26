import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LogoutIcon from '../../../assets/bigIcon/logoutIcon.png';
import { Col, Container, Image, Row, Button } from 'react-bootstrap';
import { faArrowLeft,  } from "@fortawesome/free-solid-svg-icons";// FontAwesome icon import
import AuthencationHeader from '../../Headers/AuthencationHeader';

const Searchresulting = () => {
    const { query } = useParams();
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate fetching or processing search results based on the query
        const results = [
            { id: 8, title: 'GenerateInventory', desc: "", path: '/HeadTeacherGenerateInventory' },
            { id: 9, title: 'RequestMaterial', desc: "", path: '/HeadTeacherRequestMaterial' },
            { id: 10, title: 'TrackMaterial', desc: "", path: '/HeadTeacherTrackMaterial' },
            { id: 11, title: 'PushNotification', desc: "", path: '/HeadTeacherPushNotification' },
            { id: 12, title: 'PeriodicReport', desc: "", path: '/PeriodicReport' },
            { id: 13, title: 'TeachersInventory', desc: "", path: '/HeaderTeacherInventory' },
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
                            <faArrowLeft />
                        </Button>
                    <div style={{ display: "flex", alignItems: "center", textAlign: "center", marginBottom: "20px" }}>
                        
                        <AuthencationHeader text={"EdoSUBEB Inventory Management System"} />
                    </div>
                    <h2 className='mt-3' style={{ marginLeft: "25px" }}>Search Results for: {query}</h2>
                    {searchResults.length > 0 ? (
                        <Row className="d-flex flex-wrap gap-3">
                            {searchResults.map(result => (
                                <Col
                                    key={result.id}
                                    xs={12} sm={6} md={4} lg={3}
                                    className='d-flex justify-content-center'
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

export default Searchresulting;
