

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect, useContext, useRef } from 'react';
import './App.css';
import './assets/style.css';
import ProductImgPray from './assets/Pray.jpg';
import ProductImgLogo from './assets/Logo.png';
import CancelPage from './components/CancelPage';
import SuccessPage from './components/SuccessPage';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { useNavigate } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';  // Import Vercel Analytics
import Music from './assets/Romans.mp3';

function App() {
    const [isActive, setIsActive] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [fullscreenIframe, setFullscreenIframe] = useState(null);
    const iframeRef = useRef(null); // To hold the reference to the iframe element
    const infoPanelRef = useRef(null);
    const headerRef = useRef(null);




    const products = [
        { id: 1, title: 'Christ Jesus our royal highpriest', price: '$2', url: 'https://drive.google.com/file/d/1Sqe5wME6DAzXkv9Z21KQIP9QDlpEzIQz/preview?usp=embed_googleplus' },
        { id: 2, title: '21 Irrefutable Laws of LEADERSHIP', price: '$2', url: 'https://drive.google.com/file/d/1T-F_th0WpJuq0b_KeQwo7hu1B5vKkKv6/preview?usp=embed_googleplus' },
        { id: 3, title: 'Adult Children of Emotionally Immature Parents', price: '$2', url: 'https://drive.google.com/file/d/1T8ok_wVWG5v8UViey50OTcFbqAhX93b9/preview?usp=embed_googleplus' },
        { id: 4, title: 'TODAY MATTERS_ 12 Daily Practices To Guarantee Tomorrow\'s Success', price: '$2', url: 'https://drive.google.com/file/d/1TAc3-e6QYYHFelcOE4cnsIBKYv9FwN0t/preview?usp=embed_googleplus' },
        { id: 5, title: 'Battlefield of the Mind - Joyce Meyer', price: '$2', url: 'https://drive.google.com/file/d/1TDdPhMjOsJihAWWL2Kt207dtBytK5qRQ/preview?usp=embed_googleplus' },
        { id: 6, title: 'Becoming a Praise Warrior', price: '$2', url: 'https://drive.google.com/file/d/1TDoB0CSM7M94oy-GgKAV6ZCberUY6Asu/preview?usp=embed_googleplus' },
        { id: 7, title: 'BEYOND THE NAKED', price: '$2', url: 'https://drive.google.com/file/d/1TJId7JccxmjjdzSytkkX_LXlBo25bOVa/preview?usp=embed_googleplus' },
        { id: 8, title: 'Binding the Strong Man - Nicholas Duncan-Williams', price: '$2', url: 'https://drive.google.com/file/d/1TKNqc2sZ60xLtR0RKfLxFC_rCi_6rO9M/preview?usp=embed_googleplus' },
        { id: 9, title: 'Church Mafia - Makhado Sinthumule', price: '$2', url: 'https://drive.google.com/file/d/1TX96WapLBlyqT0bqdVqCBDCaQpSM_-Mc/preview?usp=embed_googleplus' },
        { id: 10, title: 'Demons: The Answer Book - Lester Sumrall', price: '$2', url: 'https://drive.google.com/file/d/1Tg0FDiusVaMHmN5IctdH73Tvh6hOqM2C/preview?usp=embed_googleplus' },
        { id: 11, title: 'Divine Timing - Nicholas Duncan-Williams', price: '$2', url: 'https://drive.google.com/file/d/1TkEFLCCC4QuwUOHnqnjGmyXM0kVZ962u/preview?usp=embed_googleplus' },
        { id: 12, title: 'Enforcing Prophetic Decrees - Nicholas Duncan-Williams', price: '$2', url: 'https://drive.google.com/file/d/1UATux7Se4H5ybXnyNhduX2NUoHmRwTtZ/preview?usp=embed_googleplus' },
        { id: 13, title: 'Erica Part 1', price: '$2', url: 'https://drive.google.com/file/d/1WlQg4Z3EkU2Mj8zqxSb5lR7ZPD94fUDV/preview?usp=embed_googleplus' },
        { id: 14, title: 'Erica Part 2', price: '$2', url: 'https://drive.google.com/file/d/1V7X3kVn6bDWk_P4d6Rj2xcTRg_aJOSMa/preview?usp=embed_googleplus' },
        { id: 15, title: 'Erica Part Three Witchcraft Spiritual Warfare (Book 3 of the Erica Testimonial Series)', price: '$2', url: 'https://drive.google.com/file/d/1V965wcXPekAS4Ib6vhEfCk3Umb3onVCD/preview?usp=embed_googleplus' },
        { id: 16, title: 'Find Your Why: A Practical Guide for Discovering Purpose for You and Your Team by Simon Sinek', price: '$2', url: 'https://drive.google.com/file/d/1V9e5f1o9ZFnQC1SxjShwRIE2izVdyu3k/preview?usp=embed_googleplus' },
        { id: 17, title: 'God\'s Generals: The Revivalists', price: '$2', url: 'https://drive.google.com/file/d/1VFAw2gPRzye1EBDPxdayv7857gG7AnL4/preview?usp=embed_googleplus' },
        { id: 18, title: 'God\'s Generals: Charles Finney', price: '$2', url: 'https://drive.google.com/file/d/1VGvTbuXqposa2hwBYjIe4xqTimLHiqhf/preview?usp=embed_googleplus' },
        { id: 19, title: 'God\'s General', price: '$2', url: 'https://drive.google.com/file/d/1VL25SyVWftilg7EnWT-LxpKqcPbe7LaB/preview?usp=embed_googleplus' },
        { id: 20, title: 'Healing Belongs to Us by Kenneth E. Hagin', price: '$2', url: 'https://drive.google.com/file/d/1VNjrRRP3mEwP5uNZEEeZJa7gkDw6M2i8/preview?usp=embed_googleplus' },
        { id: 21, title: 'I Went to Hell - Kenneth Hagin', price: '$2', url: 'https://drive.google.com/file/d/1VUy2nqHsb9AcNn4tu-P09nfHpykJpPdn/preview?usp=embed_googleplus' },
        { id: 22, title: 'Reaching the Lost: Evangelism by Bobby Jamieson', price: '$2', url: 'https://drive.google.com/file/d/1VdeGyq6trG9MXm7Z5DHpzzmD8h_brjBs/preview?usp=embed_googleplus' },
        { id: 23, title: 'The Emojis', price: '$2', url: 'https://drive.google.com/file/d/1mZ2mxVk3CXirbmDinOivE0Dl_0Oqv2c5/preview?usp=embed_googleplus' },
        { id: 24, title: 'The Miracle Seed - David O. Oyedepo', price: '$2', url: 'https://drive.google.com/file/d/1VqxfulKcacCH8b3zo59BPp9JzFRJwnxr/preview?usp=embed_googleplus' },
        { id: 25, title: 'The Visions', price: '$2', url: 'https://drive.google.com/file/d/1mZsoV1v90jWnKLpTHUdJIYl4cM89UE8t/preview?usp=embed_googleplus' },
        { id: 26, title: 'The Price of God\'s Miracle Working Power', price: '$2', url: 'https://drive.google.com/file/d/1VO3UnQpbXj9YhxZz4TxfgUXtQbcO8ix3/preview?usp=embed_googleplus' },
        { id: 27, title: 'The Principles & Power of Vision', price: '$2', url: 'https://drive.google.com/file/d/1VP29lAo7H95ptj3zTFeMVgLvCTF3DBuB/preview?usp=embed_googleplus' },
        { id: 28, title: 'Walking in Dominion', price: '$2', url: 'https://drive.google.com/file/d/1Vfa08qGDaO-e6HUNWnKwVfOufRT92J8M/preview?usp=embed_googleplus' },
        { id: 29, title: 'Walking in Financial Dominion', price: '$2', url: 'https://drive.google.com/file/d/1ViPrXgdh3uXAZnHnZyBmbQ1_4SeKKpqw/preview?usp=embed_googleplus' },
    ];




    useEffect(() => {
        setDisplayedProducts(products);
        const storedCartItems = localStorage.getItem('cartItems');
        const storedTotal = localStorage.getItem('total');
        if (storedCartItems) setCartItems(JSON.parse(storedCartItems));
        if (storedTotal) setTotal(parseFloat(storedTotal));
    }, []);




    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('total', total.toFixed(2));
    }, [cartItems, total]);




    const handleSearch = (e) => {
        const query = e.target.value;
        const filteredProducts = products.filter(product =>
            product.title.toLowerCase().includes(query.toLowerCase())
        );
        setDisplayedProducts(filteredProducts);
    };




    const addToCart = (product) => {
        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
            const updatedCartItems = cartItems.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCartItems(updatedCartItems);
            setTotal(total + parseFloat(product.price.slice(1)));
        } else {
            const newCartItem = { ...product, quantity: 1 };
            setCartItems([...cartItems, newCartItem]);
            setTotal(total + parseFloat(product.price.slice(1)));
        }
    };




    const removeFromCart = (product) => {
        const updatedCartItems = cartItems.filter(item => item.id !== product.id);
        setCartItems(updatedCartItems);
        setTotal(total - (product.quantity * parseFloat(product.price.slice(1))));
    };




    const handleFlutterPayment = useFlutterwave({
        public_key: 'FLWPUBK_TEST-SANDBOXDEMOKEY-X',
        tx_ref: Date.now(),
        amount: total * 1700, // Convert total from USD to NGN
        currency: 'NGN',
        payment_options: 'card,banktransfer,ussd',
        customer: {
            email: 'example@gmail.com',
            phone_number: '08102909304',
            name: 'John Doe',
        },
        customizations: {
            title: 'Book Store',
            description: 'Payment for items in cart',
            logo: ProductImgLogo, // Ensure this is the correct URL path to the logo
        },
    });




    const showIframeFullscreen = (iframeUrl) => {
        setFullscreenIframe(iframeUrl);
    };




    const hideIframeFullscreen = () => {
        setFullscreenIframe(null);
    };




    const option = () => {
        const header = headerRef.current;
        header.style.height = 'auto';
    };




    const hideInfoPanel = () => {
        const infoPanel = infoPanelRef.current;
        infoPanel.style.display = 'none';
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

