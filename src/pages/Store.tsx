import StoreItem from "../components/StoreItem"
import storeItems from "../data/items.json"
import { Col, Row } from "react-bootstrap"

export default function Store() {
  return (
    <>
    <h1>Store</h1>
    <Row lg={3} md={2} xs={1} className="g-3">
      {storeItems.map(item => (
        <Col key={item.id}><StoreItem item={item}/></Col>
      ))}
    </Row>
    </>
  )
}
