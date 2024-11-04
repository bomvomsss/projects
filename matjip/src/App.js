import './styles/App.scss';
import {useState} from "react";
import itemData from './data.js';
import Item from './components/Item.jsx';
import KakaoMap from './components/KakaoMap.jsx';
import { Row, Col } from "react-bootstrap";

function App() {
  const [cardItem, setCardItem] = useState(itemData);
  const [btnOpen, setBtnOpen] = useState(false);

  let clsMap = () => {
    setBtnOpen(false);
  }

  return (
    <div className="App">
      <div className="list">
        <div className="listInner">
          <h1>맛집 리스트</h1>
          <p className="search">검색 🔍</p>
          <Row xs={1} md={3}>
          {cardItem.map((item, i) => {
            let x = cardItem.x;
            let y = cardItem.y;
            return (
              <Col key={i}>
                <Item btnOpen={btnOpen} setBtnOpen={setBtnOpen} cardItem={item} index={i} x={x} y={y}></Item>
              </Col>
              )
            })}
          </Row>
        </div>
        <div className={`${btnOpen ? "mapBox on" : "mapBox"}`}>
          <ul className="clsBtn" onClick={clsMap}>
            <li></li>
            <li></li>
          </ul>
          <KakaoMap onClick={(e) => {e.stopPropagation();}}/>
        </div>
      </div>
    </div>
  );
}

export default App;