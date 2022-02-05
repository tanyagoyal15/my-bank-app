import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import {Home} from './components/Home'
import {Favorite} from './components/Favorite'
import {BankDetails} from './components/BankDetails'

function App() {
  return (
    <div className="App">
      <Router>
        <div className="my-bank-app">
          <div className="left-section">
            <ul>
              <li><Link to="/">All Banks</Link></li>
              <li><Link to="/favorites">Favorites</Link></li>
              <li><Link to="/bank-details/:id"></Link></li>
            </ul>
          </div>

          <div className="right-section">
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/bank-details/:id" element={<BankDetails />} />
              <Route exact path="/favorites" element={<Favorite />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
