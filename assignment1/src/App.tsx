import './App.css';
import Router from './components/Router';
import Route from './components/Route';
import Root from './pages/Root';
import About from './pages/About';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={<Root />} />
        <Route path="/about" component={<About />} />
      </Router>
    </div>
  );
}

export default App;
