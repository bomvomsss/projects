import './styles/App.scss';
import { useState, useEffect } from "react";
import itemData from './data.js';
import Item from './components/Item.jsx';
import AddItem from './components/AddItem';
import { Row, Col } from "react-bootstrap";

function App() {
  const [cardItem, setCardItem] = useState(itemData);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('cardItems'));
    if(savedItems){
      setCardItem(savedItems);
    }else{
      setCardItem(itemData)
    }
  },[]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const addItem = (newItem) => {
    const updatedItems = [...cardItem, newItem];
    setCardItem(updatedItems);

    // 아이템을 로컬스토리지에 저장
    localStorage.setItem('cardItems', JSON.stringify(updatedItems));
  }

  return (
    <div className="App">
      <div className="list">
        <h1>📍 맛집 리스트</h1>
        <div className="headWrap">
          <form className="formBox">
            <input type="text"></input>
            <button className="search">🔍 검색</button>
          </form>
          <button className="add" onClick={handleShow}>➕ 추가</button>
          <AddItem 
            show={show} 
            handleClose={handleClose}
            addItem={addItem}
          />
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
  );
}

export default App;