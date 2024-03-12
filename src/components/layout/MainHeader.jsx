import React,{useState} from "react"
import Carousel from 'react-bootstrap/Carousel';
const MainHeader = () => {

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <header className="mt-2 mb-2 d-flex justify-content-center">
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block img-fluid" 
            style={{height:"50vh", width:"85vw"}}
            src="src/assets/images/parrall.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block img-fluid"
            style={{height:"50vh", width:"85vw"}}
            src="src/assets/images/services-1.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block img-fluid"
            style={{height:"50vh", width:"85vw"}}
            src="src/assets/images/services4.jpg"
            alt="First slide"
          />
        </Carousel.Item>
      </Carousel>
    </header>
  )
}

export default MainHeader