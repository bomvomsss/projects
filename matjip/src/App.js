import './styles/App.scss';
import {useState} from "react";
import itemData from './data.js';
import Item from './components/Item.jsx';
import KakaoMap from './components/KakaoMap.jsx';
import { Row, Col } from "react-bootstrap";

function App() {
  const [cardItem, setCardItem] = useState(itemData);
  const [btnOpen, setBtnOpen] = useState(false);

  return (
    <div className="App">
      <div className="list">
        <div className={`${btnOpen ? "mapBg on" : "mapBg"}`}>
          <KakaoMap/>
        </div>
        <Row xs={1} md={4}>
        {cardItem.map((item, i) => {
          return (
            <Col key={i}>
              <Item btnOpen={btnOpen} setBtnOpen={setBtnOpen} cardItem={item} index={i}></Item>
            </Col>
            )
          })}
        </Row>
      </div>
    </div>
  );
}

export default App;