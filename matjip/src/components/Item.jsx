import {Button, Card} from 'react-bootstrap';

function Item(props){
  let btnTxt = "지도 보기";
  const mapUrl = "https://map.kakao.com/link/search/";

  let toggleMap = () => {
    // window.open(mapUrl + props.cardItem.link);
    props.setBtnOpen(!props.btnOpen);
  }
  return(
    <>
      <Card style={{ width: '23rem' }}>
        <div className="card-img-top">
          <img src={props.cardItem.img} alt="" />
        </div>
        <Card.Body>
          <Card.Title>{props.cardItem.title}</Card.Title>
          <Card.Text>
            {props.cardItem.content}
          </Card.Text>
          <div className='d-grid gap-2'>
            <Button variant="primary" onClick={toggleMap} >{btnTxt}</Button>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}

export default Item;