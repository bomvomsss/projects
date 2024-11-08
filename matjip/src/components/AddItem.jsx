import MapKakao from './MapKakao'
import {Button, Modal, Form} from 'react-bootstrap';
import { useState, useEffect } from "react";

const AddItem = (props) => {
  const [input, setInput] = useState('');
  const [searchKeyword, setSearchKeyword] = useState(''); // 검색 키워드
  const [selectedPlace, setSelectedPlace] = useState(null); // 선택된 장소

  const handleSearch = () => {
    if (input === "" || input === null || input === undefined) {
      alert("검색어를 입력하세요.");
    }else{
      setSearchKeyword(input);
    }
  };

  const handleAdd = () => {
    if(selectedPlace) {
      const newItem = {
        title : selectedPlace.place_name,
        content : selectedPlace.address_name,
        img : selectedPlace.place_url ? selectedPlace.place_url : 'https://via.placeholder.com/150', // 임시 이미지 URL
      };
        props.addItem(newItem); // 아이템 추가
        props.handleClose(); // 모달 닫기
    } else {
      alert("장소를 선택해 주세요.");
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(); // Enter 키가 눌리면 검색 실행
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
              onKeyDown={handleKeyDown}
            />
            <Button variant="primary" onClick={handleSearch}>
              검색
            </Button>
          </Form>
          <MapKakao 
            searchKeyword={searchKeyword}
            setSelectedPlace={setSelectedPlace} // 선택된 장소 설정
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAdd}>추가</Button>
          <Button variant="secondary" onClick={props.handleClose}>취소</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )  
}

export default AddItem;