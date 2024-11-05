import './styles/App.scss';
import {useState} from "react";
import itemData from './data.js';
import Item from './components/Item.jsx';
import AddItem from './components/AddItem';
import { Row, Col } from "react-bootstrap";

function App() {
  const [cardItem, setCardItem] = useState(itemData);

  return (
    <div className="App">
      <div className="list">
        <div className="listInner">
          <h1>맛집 리스트</h1>
          <div className="wrap">
            <form className="formBox">
              <input type="text"></input>
              <button className="search">🔍 검색</button>
            </form>
            <form className="formBox">
              <button className="add">➕ 추가</button>
            </form>
            <AddItem />
          </div>
          <Row xs={1} md={4}>
          {cardItem.map((item, i) => {
            return (
              <Col key={i}>
                <Item 
                  cardItem={item} 
                  index={i}
                />
              </Col>
              )
            })}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default App;