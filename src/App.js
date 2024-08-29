import logo from './logo.svg';
import './App.css';
import UsingHooks from './UsingHooks';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and sav to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>Welcome</p>
        <UsingHooks />
      </header>

     
    </div>
  );
}

export default App;
