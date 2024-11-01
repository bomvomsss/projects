import './styles/App.scss';
import {useState} from "react";
import itemData from './data.js';
import Item from './components/Item.jsx';
import { Row, Col } from "react-bootstrap";

function App() {
  let [cardItem, setCardItem] = useState(itemData);

  return (
    <div className="App">
      <div className="list">
        <Row xs={1} md={4}>
        {cardItem.map((item, i) => {
          return (
            <Col key={i}>
              <Item cardItem={item} index={i}></Item>
            </Col>
            )
          })}
        </Row>
      </div>
    </div>
  );
}

export default App;