import MapKakao from './MapKakao'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const AddItem = (props) => {

  return(
    <div>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>추가하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="submit" >
            <input type="text" placeholder="상호명"/>
            <button type="submit" name="확인">검색</button>
          </form>
          <MapKakao />
          <p>상호명</p>
          <p>주소</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={()=>props.handleClose}>추가</Button>
          <Button variant="secondary" onClick={()=>props.handleClose}>취소</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )  
}

export default AddItem;