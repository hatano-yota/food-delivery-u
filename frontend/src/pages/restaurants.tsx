import Cart from "@/components/Cart";
import { useCart } from "@/hooks/useCart";
import { Dish } from "@/types/Types";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useRouter } from "next/router";
import { Button, Card, CardBody, CardImg, CardTitle, Col, Row } from "reactstrap";

const GET_RESTAURANT_DISHES = gql`
  query ($id: ID!) {
    restaurant(id: $id) {
      id
      name
      dishes {
        id
        name
        description
        price
        image {
          url
        }
      }
    }
  }
`;

const Restaurants = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { id: router.query.id },
  });
  const { addDish } = useCart();

  if (error) return <h2>レストランの読み込みに失敗しました</h2>;

  if (loading) return <h2>ロード中...</h2>;

  if (data) {
    const { restaurant } = data;
    return (
      <div style={{ margin: "25px" }}>
        <h1>{restaurant.name}</h1>
        <Row>
          {restaurant.dishes.map((dish: Dish) => (
            <Col xs="6" sm="4" key={dish.id} style={{ padding: "0" }}>
              <Card style={{ margin: "0 10px" }}>
                <CardImg
                  src={`${process.env.NEXT_PUBLIC_API_URL}${dish.image.url}`}
                  top={true}
                  style={{ height: 250, objectFit: "cover" }}
                />
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardTitle>{dish.description}</CardTitle>
                </CardBody>
                <div className="card-footer">
                  <Button outline color="primary" onClick={() => addDish(dish)}>
                    + カートに追加
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
          <Col xs="3" style={{ padding: 0 }}>
            <div>
              <Cart />
            </div>
          </Col>
        </Row>
      </div>
    );
  } else {
    return <h1>レストランが見つかりませんでした。</h1>;
  }
};

export default Restaurants;
