import MapKakao from './MapKakao'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const AddItem = () => {
  
  return(
    <div
      className="modal show"
      style={{ display: 'block', position: 'absolute' }}
    >      
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>추가하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="submit" >
            <input type="text" placeholder="상호명"/>
            <button type="submit" name="확인">검색</button>
          </form>
          <p><MapKakao /></p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  )  
}

export default AddItem;