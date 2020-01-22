import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

import Fib from "./Fib";
import OtherPage from "./OtherPage";

function App() {
    return (
        
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />

                <div>
                
                    <Router exact path="/" component={Fib} >
                        <Fib/>
                        <Link to="/">Home</Link>
                        <p></p>
                        <Link to="/otherpage">Other page</Link>
                    </Router>
                    <Router path="/otherpage" component={OtherPage} />
                </div>
            </header>
        </div>
    );
}

export default App;
