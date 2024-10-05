import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import CancelPage from './components/CancelPage';
import SuccessPage from './components/SuccessPage';
import Music from './assets/Romans.mp3';

const App = () => {
    const [fullscreenIframe, setFullscreenIframe] = useState(false);
    const [isMinimized, setIsMinimized] = useState(true);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
const [isLoaded, setIsLoaded] = useState(false); // Tracks when everything is fully loaded


  useEffect(() => {
    // Wait for the DOM and resources to be completely loaded
    const handleLoad = () => {
      setIsLoaded(true);
    };


    // Check if document is already loaded
    if (document.readyState === 'complete') {
      setIsLoaded(true);
    } else {
      window.addEventListener('load', handleLoad);
    }


    // Cleanup the event listener
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);


    // Dummy data for products (assuming this is fetched or passed in reality)
    const products = [
        { title: 'Product 1', price: '$10', image: 'image1.jpg' },
        { title: 'Product 2', price: '$20', image: 'image2.jpg' },
        // Add more products here
    ];
    
    // Array of iframe video sources
const videoSources = [
    'https://www.youtube.com/embed/JxOuQxq5AOg?si=MBBCrqRAVjza4P7i',
    'https://www.youtube.com/embed/bwD99EqbTKQ?si=-f6L6QX3Xrgz_-Hv',
    'https://www.youtube.com/embed/rnHldmO4vdk?si=5wEyWNlcwt_4lzN1',
    'https://www.youtube.com/embed/J6OTCWSurYQ?si=3D5zWsloCKFnwc-J',
    'https://www.youtube.com/embed/ujqiec1bAds?si=oqw-5FZ-8p-hfIWb',
    'https://www.youtube.com/embed/25LO-SCcD4c?si=LHy-zjQExf4QswaN',
    'https://www.youtube.com/embed/25LO-SCcD4c?si=sPx7A2oMikPdLp_5',
    'https://www.youtube.com/embed/l7C4_v4Lnxc?si=lqt2aVK__4wBUupj',
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

<header ref={headerRef}>
                <div className="nav container">
                    <nav>
                        <div className="container">
                            <div className="menu-toggle" onClick={option} >&#9776;</div>
                            <ul id="largeul">
                                <li className="projects">
                                    <a href="#" onClick={handleShare} id="icons-l"><i className="fa fa-share"></i></a>
                                </li>
                                <li>
                                    <a href="#" onClick={handleContact} id="icons-l"><i className="fas fa-address-card"></i></a>
                                </li>
                            </ul>
                        </div>
                        <div id="info-panel" className="info-panel" ref={infoPanelRef} >
                            <div className="menu-exit" onClick={hideInfoPanel}>&times;</div>
                            <ul>
                                <li className="shareButton"><a href="#" onClick={handleContact}><i className="fa fa-user-plus"></i> Invite friends</a></li>
                                <hr />
                                <li className="projects"><a href="#" onClick={handleShare}><i className="fa fa-share"></i> Share</a></li>
                                <hr />
                                <li className="contacts"><a href="#contact"><i className="fas fa-address-card"></i> Contact</a></li>
                                <hr />
                            </ul>
                        </div>
                    </nav>
                    <a href="#" className="logo">Wayfinderreads</a>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search for books..."
                            className="search-input"
                            onChange={(e) => handleSearch(e.target.value)}
                            style={{
                                color: "#00000f"
                            }}
                        />
                        <i className="bx bx-search search-icon"></i>
                    </div>
                    <i className="bx bx-shopping-bag" id="cart-icon" data-quantity="0" onClick={toggleCart}></i>
                </div>
            </header>

        
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
<audio src={Music} autoPlay />


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

      {!isLoaded ? (
        <div className="loader">Loading...</div> // Display a loader while loading
      ) : (
        <div className="content">
          {/* Your iframe or other content */}
          <iframe
            src="https://david12peters.github.io/OGM_LOGO/index.html"
            width="100%"
            height="600px"
            title="PDF Document"
          />
        </div>
      )}

            {/* Floating Contact Section */}
            <div className="contact-section">
                <p>Contact us!</p>
                <p>Email: <a href="mailto:davidoluwaseun874@gmail.com">davidoluwaseun874@gmail.com</a></p>
                <p>Phone: <a href="tel:+2348087846847">+2348087846847</a></p>
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

