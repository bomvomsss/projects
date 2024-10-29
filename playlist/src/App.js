import {Routes, Route, Link} from 'react-router-dom';
import './App.css';
import '../src/css/Main.css'
import ListItems from './components/ListItems';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* home */}
        <Route path="/" element={
          <div>
            <div className="linkList">
              <Link to="/page1">[New!] 30 (성진 Solo) 전곡 재생</Link>
              <Link to="/page2">[New!] Band Aid 전곡 재생</Link>
              <Link to="/page3">공연 셋리스트</Link>
            </div>
          </div>
        } />
        <Route path="/page1" />
        <Route path="/page2" />
        <Route path="/page3" />
        <Route path="/page4" />
        <Route path="/page5" />
        <Route path="/page6" />
        <Route path="*" element={<div> 404 </div>}/>
      </Routes>
    </div>
  );
}

export default App;
