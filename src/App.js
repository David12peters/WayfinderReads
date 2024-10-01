import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import CancelPage from './CancelPage';
import SuccessPage from './SuccessPage';


const App = () => {
    const [fullscreenIframe, setFullscreenIframe] = useState(false);
    const [isMinimized, setIsMinimized] = useState(true);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);


    // Dummy data for products (assuming this is fetched or passed in reality)
    const products = [
        { title: 'Product 1', price: '$10', image: 'image1.jpg' },
        { title: 'Product 2', price: '$20', image: 'image2.jpg' },
        // Add more products here
    ];


    // Video sources
    const videoSources = [
        'https://www.youtube.com/embed/dQw4w9WgXcQ', // Video 1
        'https://www.youtube.com/embed/9bZkp7q19f0',  // Video 2
        // Add more video sources here
    ];


    // Function to switch video every 30 minutes
    useEffect(() => {
        const videoInterval = setInterval(() => {
            setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
        }, 1800000); // 30 minutes
        return () => clearInterval(videoInterval);
    }, [videoSources.length]);


    const handleRead = (iframeId) => {
        setFullscreenIframe(true);
        // Ensure the iframe with the given ID is displayed in fullscreen
        document.getElementById(iframeId).requestFullscreen();
    };


    const exitFullscreen = () => {
        setFullscreenIframe(false);
        document.exitFullscreen();
    };


    const addProductToCart = (product) => {
        // Handle adding product to the cart
        console.log(`Added ${product.title} to the cart.`);
    };


    return (
        <div className="app">
            <Router>
                <Routes>
                    <Route path="/" element={
                        <section>
                            <div className="products-container">
                                {products.map((product, index) => (
                                    <div className="product" key={index}>
                                        <div className="product-image">
                                            <img src={product.image} alt={product.title} />
                                            <a href="#cart">
                                                <img
                                                    src="small-overlay-image.png"
                                                    alt="Overlay"
                                                    style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        right: 0,
                                                        width: '50px',
                                                        height: '50px',
                                                        borderRadius: '50%',
                                                        zIndex: 1
                                                    }}
                                                />
                                            </a>
                                        </div>
                                        <h2 className="product-title">{product.title}</h2>
                                        <span className="price">{product.price}</span>
                                        <button className="btn-read" onClick={() => handleRead(`iframe-${index}`)}>
                                            Read <i className="fa-solid fa-book"></i>
                                        </button>
                                        <i className="bx bx-shopping-bag add-cart" onClick={() => addProductToCart(product)}></i>
                                    </div>
                                ))}
                            </div>
                        </section>
                    } />
                    <Route path="/cancel" element={<CancelPage />} />
                    <Route path="/success" element={<SuccessPage />} />
                </Routes>
            </Router>


            {fullscreenIframe && (
                <div className="fullscreen-exit" onClick={exitFullscreen}>Exit</div>
            )}


            {/* Video iframe list at the bottom */}
            <div className="iframe-sec-container">
                {videoSources.map((source, index) => (
                    <iframe
                        key={index}
                        src={source}
                        title={`Video ${index + 1}`}
                        allow="autoplay"
                        className={`video-frame ${index === currentVideoIndex ? 'active' : ''}`}
                        allowFullScreen
                    ></iframe>
                ))}
            </div>


            {/* Video icon that toggles between minimized and maximized */}
            <div className={`video-icon ${isMinimized ? 'minimized' : 'expanded'}`}>
                {isMinimized ? (
                    <button className="toggle-button" onClick={() => setIsMinimized(false)}>Open Video</button>
                ) : (
                    <div className="expanded-video-container">
                        <iframe
                            src={videoSources[currentVideoIndex]}
                            title="Playing Video"
                            allowFullScreen
                            className="expanded-video"
                        ></iframe>
                        <button className="toggle-button" onClick={() => setIsMinimized(true)}>Minimize</button>
                    </div>
                )}
            </div>


            {/* Floating Contact Section */}
            <div className="contact-section">
                <p>Contact us!</p>
                <p>Email: contact@example.com</p>
                <p>Phone: +123456789</p>
            </div>


            <footer id="contact">
                <h2>Contact Us</h2>
                <p>Email: davidoluwaseun874@gmail.com <a href="mailto:davidoluwaseun874@gmail.com"><i className="fa-solid fa-envelope"></i></a></p>
                <p>Whatsapp: <a href="https://wa.link/chjxqu"><i className="fab fa-whatsapp"></i></a></p>
                <p>Facebook: <a href="https://www.facebook.com/profile.php?id=61551330303945&mibextid=ZbWKwL">
                    <i className="fab fa-facebook-f"></i>
                </a></p>
                <p>Twitter: <a href="https://twitter.com/davidpeters874/">
                    <i className="fab fa-twitter"></i>
                </a></p>
                <p>Instagram: <a href="https://www.instagram.com/davidpeters1098/">
                    <i className="fab fa-instagram"></i>
                </a></p>
                <p>Youtube: <a href="https://youtube.com/@wayfinder728?si=iacxUCLgIsO7r3Ge" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-youtube"></i>
                </a></p>
            </footer>


            <Analytics />
        </div>
    );
}


export default App;

