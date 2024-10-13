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
    const [isMinimized, setIsMinimized] = useState(true);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const iframeRef = useRef(null); // To hold the reference to the iframe element
    const infoPanelRef = useRef(null);
    const headerRef = useRef(null);
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    
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




  useEffect(() => {
        const videoInterval = setInterval(() => {
            setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
        }, 1800000); // 30 minutes
        return () => clearInterval(videoInterval);
    }, [videoSources.length]);




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
        { id: 25, title: 'The Visions', price: '$2', url: 'https://drive.google.com/file/d/1mZsoV1v90jWnKLpTHUdJIYl4zM89UE8t/preview' },
        { id: 26, title: 'The Price of Greatness - Nicholas Duncan-Williams', price: '$2', url: 'https://drive.google.com/file/d/1VrLF9Hd_Gz2Tt0rTTTk2Rx7mhB9vc652/preview?usp=embed_googleplus' },
        { id: 27, title: 'Understanding the Power of Praise - David Oyedepo', price: '$2', url: 'https://drive.google.com/file/d/1VsxkhQIYxudXg7V8T22OQaiASaf51PrB/preview?usp=embed_googleplus' },
        { id: 28, title: 'When God Writes Your Love Story (Expanded Edition)', price: '$2', url: 'https://drive.google.com/file/d/1Vzgd7I5j8D0es32t4Qlm5LffDx-0cHfG/preview?usp=embed_googleplus' },
        { id: 29, title: 'Who is this Allah? - GJO Moshay', price: '$2', url: 'https://drive.google.com/file/d/1W0iafNZs0oN9_yMStU94-AzFWqCM2zxr/preview?usp=embed_googleplus' },
        { id: 30, title: 'Why You Act the Way You Do - Tim Lahaye', price: '$2', url: 'https://drive.google.com/file/d/1W8nmBicW3uUq8BPEpeq2u0p_qvP-mvXO/preview?usp=embed_googleplus' }
         
        ];


    // Function to load products initially
    useEffect(() => {
        setDisplayedProducts(products);
    }, []);


    // Function to filter products based on search query
    const handleSearch = (query) => {
        const filteredProducts = products.filter(product =>
            product.title.toLowerCase().includes(query.toLowerCase())
        );
        setDisplayedProducts(filteredProducts);
    };

    // Fullscreen functionality for the iframe
    const handleRead = (iframeId) => {
        setFullscreenIframe(iframeId);
    };

    const exitFullscreen = () => {
        setFullscreenIframe(null); // Exit fullscreen mode
    };



const hideInfoPanel = () => {
    const infoPanel = infoPanelRef.current;
    const header = headerRef.current;
    if (infoPanel && header) {
        infoPanel.style.display = 'none';
    }
};


    
    


    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Check out this book!',
                url: window.location.href
            }).catch(console.error);
        } else {
            alert("Sharing is not supported in your browser.");
        }
    };


    const handleContact = () => {
        // Scroll to contact section or open a modal
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.location.href = "mailto:davidoluwaseun874@gmail.com"; // Update with the actual email
        }
    };


    // Cart logic: Load, save, and handle updates
    const saveCartItems = (items) => {
        localStorage.setItem('cartItems', JSON.stringify(items));
    };


    
const loadCartItems = () => {
        const storedItems = localStorage.getItem('cartItems');
        const storedTotal = localStorage.getItem('cartTotal');


        if (storedItems) {
            setCartItems(JSON.parse(storedItems));
        }
        if (storedTotal) {
            setTotal(parseFloat(storedTotal));
        }
    };


    const calculateTotal = (items) => {
        const newTotal = items.reduce((acc, item) => {
            return acc + parseFloat(item.price.replace('$', '')) * item.quantity;
        }, 0);
        setTotal(newTotal);
        localStorage.setItem('cartTotal', newTotal.toFixed(2));
    };


    const addProductToCart = (product) => {
        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
            alert('This item is already in the cart');
        } else {
            const newItems = [...cartItems, { ...product, quantity: 1 }];
            setCartItems(newItems);
            saveCartItems(newItems);
            calculateTotal(newItems);
        }
    };


    const removeProductFromCart = (productId) => {
        const newItems = cartItems.filter(item => item.id !== productId);
        setCartItems(newItems);
        saveCartItems(newItems);
        calculateTotal(newItems);
    };


    const updateProductQuantity = (productId, quantity) => {
        if (quantity < 1) return;
        const newItems = cartItems.map(item =>
            item.id === productId ? { ...item, quantity } : item
        );
        setCartItems(newItems);
        saveCartItems(newItems);
        calculateTotal(newItems);
    };


    // Toggles the cart visibility
    const toggleCart = () => {
        setIsActive(!isActive);
    };


    const getTotalQuantity = () => {
        return cartItems.reduce((acc, item) => acc + item.quantity, 0);
    };


    useEffect(() => {
        loadCartItems();
    }, []);
    
    useEffect(() => {
        // Update the cart icon's data-quantity attribute
        const cartIcon = document.getElementById('cart-icon');
        if (cartIcon) {
            cartIcon.setAttribute('data-quantity', getTotalQuantity());
        }
    }, [cartItems]);





            
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

