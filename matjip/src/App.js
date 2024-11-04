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
      <h1>맛집 리스트</h1>
      <div className="list">
        <Row xs={1} md={4}>
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
        <div className={`${btnOpen ? "mapWrap on" : "mapWrap"}`}>
          <ul className="clsBtn">
            <li></li>
            <li></li>
          </ul>
          <div className="mapBox">
            <KakaoMap onClick={(e) => {e.stopPropagation();}}/>
          </div>
          {/* <div className="mapBg" onClick={clsMap}></div> */}
        </div>
      </div>
    </div>
  );
}

export default App;