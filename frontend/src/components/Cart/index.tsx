import { Badge, Button, Card, CardBody, CardTitle } from "reactstrap";
import Link from "@/components/common/Link";
import { cartState } from "@/hooks/atom/cart";
import { useRecoilValue } from "recoil";
import { removeDish } from "@/hooks/useRemoveDish";
import { addDish } from "@/hooks/useAddDish";

const Cart = () => {
  const cart = useRecoilValue(cartState);

  return (
    <div>
      <Card style={{ padding: "10px 5px" }}>
        <CardTitle style={{ margin: 10, textAlign: "center", fontWeight: 600, fontSize: "25px" }}>
          注文一覧
        </CardTitle>
        <hr />
        <CardBody style={{ padding: 10 }}>
          <div style={{ marginBottom: 6 }}>
            <small>料理：</small>
          </div>
          <div>
            {cart.dishes
              ? cart.dishes.map((dish) => {
                  if (dish.quantity > 0) {
                    return (
                      <div className="items-one" key={dish.id} style={{ marginBottom: 15 }}>
                        <div>
                          <span id="item-name">&nbsp; {dish.name}</span>
                          <span id="item-price">&nbsp; {dish.price}円</span>
                        </div>
                        <div>
                          <Button
                            style={{
                              height: 25,
                              padding: 0,
                              width: 15,
                              marginRight: 5,
                              marginLeft: 10,
                            }}
                            color="link"
                            onClick={() => addDish(dish)}
                          >
                            +
                          </Button>
                          <Button
                            style={{
                              height: 25,
                              padding: 0,
                              width: 15,
                              marginRight: 5,
                              marginLeft: 10,
                            }}
                            color="link"
                            onClick={() => removeDish(dish)}
                          >
                            -
                          </Button>
                          <span id="item-quantity" style={{ marginLeft: 5 }}>
                            {dish.quantity}つ
                          </span>
                        </div>
                      </div>
                    );
                  }
                })
              : null}
            <div>
              <Badge style={{ width: 200, padding: 10 }} color="light">
                <h5 style={{ fontWeight: 100, color: "gray" }}>合計：</h5>
                <h3>{cart.totalPrice}円</h3>
              </Badge>
              <div>
                <Link href="/checkout">
                  <Button style={{ width: "100%" }} color="primary">
                    <a href="" style={{ color: "white" }}>
                      注文する
                    </a>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      <style jsx>{`
        #item-price {
          font-size: 1.3rem;
          color: rgba(97, 97, 97, 1);
        }
        #item-quantity {
          font-size: 0.95rem;
          padding-bottom: 4px;
          color: rgba(158, 158, 158, 1);
        }
        #item-name {
          font-size: 1.3rem;
          color: rgba(97, 97, 97, 1);
        }
      `}</style>
    </div>
  );
};

export default Cart;
