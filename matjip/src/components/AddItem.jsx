import MapKakao from './MapKakao'
import {Button, Modal, Form} from 'react-bootstrap';
import { useState, useEffect } from "react";

const AddItem = (props) => {
  const [input, setInput] = useState('');
  const [mapKeyword, setMapKeyword] = useState('');// 실제로 검색에 사용할 키워드 상태

  const handleSearch = () => {
    if (input === "" || input === null || input === undefined) {
      alert("검색어를 입력하세요.");
    }else{
      setMapKeyword(input);
    }
  };

  return(
    <div>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>추가하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              type="text"
              placeholder="검색어를 입력하세요"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button variant="primary" onClick={handleSearch}>
              검색
            </Button>
          </Form>
          <MapKakao input={input}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={()=> alert('추가')}>추가</Button>
          <Button variant="secondary" onClick={props.handleClose}>취소</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )  
}

export default AddItem;