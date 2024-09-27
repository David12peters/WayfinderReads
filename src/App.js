import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import CancelPage from './components/CancelPage';
import SuccessPage from './components/SuccessPage';
import './assets/style.css';
import ProductImgPray from './assets/Pray.jpg';
import ProductImgLogo from './assets/Logo.png';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import Music from './assets/Romans.mp3'

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
        <Router>
            <Routes>
                <Route path="/cancel" element={<CancelPage />} />
                <Route path="/success" element={<SuccessPage />} />
                <Route path="/" element={
                    <div className="App">
                        <header ref={headerRef}>
                            <input type="text" placeholder="Search books..." onChange={handleSearch} />
                            <div>
                                <img src={ProductImgLogo} alt="Logo" className="cart-img" />
                            </div>
                            <button onClick={option}>Option</button>
                        </header>
                        <main>
                            <div className="products">
                                {displayedProducts.map(product => (
                                    <div key={product.id}>
                                        <iframe src={product.url} title={product.title}></iframe>
                                        <h3>{product.title}</h3>
                                        <p>{product.price}</p>
                                        <button onClick={() => addToCart(product)}>Add to cart</button>
                                    </div>
                                ))}
                            </div>
                        </main>
                        <footer ref={infoPanelRef}>
                            <div className="cart">
                                <h2>Cart</h2>
                                <ul>
                                    {cartItems.map(item => (
                                        <li key={item.id}>
                                            {item.title} - {item.quantity} x {item.price}
                                            <button onClick={() => removeFromCart(item)}>Remove</button>
                                        </li>
                                    ))}
                                </ul>
                                <p>Total: ${total.toFixed(2)}</p>
                                <button onClick={() => handleFlutterPayment({
                                    callback: (response) => {
                                        console.log(response);
                                        closePaymentModal(); // Close payment modal
                                    },
                                    onClose: () => {
                                        console.log("Payment was not completed.");
                                    },
                                })}>Checkout</button>
                            </div>
                        </footer>
                        {fullscreenIframe && (
                            <div className="fullscreen-iframe">
                                <iframe src={fullscreenIframe} ref={iframeRef} title="Fullscreen Video" />
                                <button onClick={hideIframeFullscreen}>Close</button>
                            </div>
                        )}
                    </div>
                } />
            </Routes>
        </Router>
    );
}

export default App;
