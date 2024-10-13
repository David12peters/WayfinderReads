import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import CancelPage from './components/CancelPage';
import SuccessPage from './components/SuccessPage';


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
        <div className="App">
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
<div className={`cart ${isActive ? 'active' : ''}`}>
                <h2 className="cart-title">Your Cart</h2>
                <div className="cart-content">
                    {cartItems.map((item, index) => (
                        <div key={index} className="cart-box">
                            <a id="cartImLink" ><iframe src={item.url} className="cart-img" title={item.title}></iframe>
                            <img
                                            src={ProductImgPray}
                                            alt="Product Overlay"
                                            className="product-overlay"
                                            style={{
                                                position: 'absolute',
                                                top: '10px',
                                                right: '10px',
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '50%',
                                                zIndex: 1
                                            }}
                                        />
                            </a>
                            <div className="detail-box">
                                <div className="cart-product-title">{item.title}</div>
                                <div className="cart-price">{item.price}</div>
                                <input
                                    type="number"
                                    value={item.quantity}
                                    className="cart-quantity"
                                    onChange={(e) => updateProductQuantity(item.id, parseInt(e.target.value))}
                                />
                            </div>
                            <i className="bx bx-trash-alt cart-remove" onClick={() => removeProductFromCart(item.id)}></i>
                        </div>
                    ))}
                </div>
                <div className="total">
                    <div className="total-title">Total</div>
                    <div className="total-price">NGN{total.toFixed(2) * 1700}</div>
                </div>  <button
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
              console.log(response);
              closePaymentModal(); // close modal programmatically
            },
            onClose: () => {},
          });
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#00796b')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#009688')}
        type="button" 
        className='btn-buy'
      >
       Pay Now
      </button>




                <i className="bx bx-x" id="close-cart" onClick={toggleCart}></i>
            </div>


            <Router>
                <Routes>
                    <Route path="/" element={
                        <section className="shop container">
                        <h2 className="section-title"><i>Gearing Up</i></h2>
                        <div className="products-container">
                            {displayedProducts.map((product, index) => (
                                <div key={product.id} className="product-box">
                                    <div className="iframe-container">
                                        <iframe
                                            id={`iframe-${index}`}
                                            src={product.url}
                                            title={product.title}
                                            className={`product-frame ${fullscreenIframe === `iframe-${index}` ? 'fullscreen' : ''}`}
                                            style={{ width: '100%', height: fullscreenIframe === `iframe-${index}` ? '100vh' : '300px', border: 'none' }}
                                            ref={iframeRef}
                                        />
                                        <a href="https://david12peters.github.io/OGM_LOGO/index.html"> <img
                                                src={ProductImgPray}
                                                alt="Product Overlay"
                                                className="product-overlay"
                                                style={{
                                                    position: 'absolute',
                                                    top: '10px',
                                                    right: '10px',
                                                    width: '50px',
                                                    height: '50px',
                                                    borderRadius: '50%',
                                                    zIndex: 1
                                                }}
                                            /></a>
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
                    <Route path="/cancel" element={<CancelPage />} /> {/* CancelPage Route */}
                    <Route path="/success" element={<SuccessPage />} /> {/* SuccessPage Route */}
                </Routes>
            </Router>


            {fullscreenIframe && (
                <div className="fullscreen-exit" onClick={exitFullscreen}>Exit</div>
            )}






                        {/*<audio src={Music} style={{
    visibility: 'hidden'
}} autoPlay loop></audio>*/}






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
          <p>
    Youtube: <a href="https://youtube.com/@wayfinder728?si=iacxUCLgIsO7r3Ge" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-youtube"></i>
    </a>
  </p>
        </footer>
          <Analytics /> 


        </div>
    );
}


export default App

            
