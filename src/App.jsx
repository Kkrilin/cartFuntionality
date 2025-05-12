import { useEffect, useRef, useState } from "react";
import data from "./assets/shopping_cart (1).json";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const quantyRef = useRef(0);
  const CartItemRef = useRef({});
  useEffect(() => {
    const fetchDay = async () => {
      try {
        const res = await fetch("src/assets/shopping_cart (1).json");
        const item = await res.json();
        setItems(item.cart);
      } catch (error) {
        console.log(error.stack);
      }
    };
    fetchDay();
  }, []);
  const handleAddItem = (addItem) => {
    CartItemRef.current[addItem.name] =
      (CartItemRef.current[addItem.name] || 0) + 1;
    setCartItems((prv) => {
      const itemExist = prv.find((item) => item.name === addItem.name);
      if (itemExist) {
        return prv.map((item) => {
          return {
            ...item,
            quanTity:
              item.name === addItem.name ? item.quanTity + 1 : item.quanTity,
          };
        });
      } else {
        return [...prv, { ...addItem, quanTity: 1 }];
      }
    });
    quantyRef.current++;
  };

  const handleRemoveItem = (removeItem) => {
    CartItemRef.current[removeItem.name] =
      CartItemRef.current[removeItem.name] - 1;
    setCartItems((prv) => {
      const itemExist = prv.find((item) => item.name === removeItem.name);
      if (itemExist.quanTity > 1) {
        return prv.map((item) => {
          return {
            ...item,
            quanTity:
              item.name === removeItem.name ? item.quanTity - 1 : item.quanTity,
          };
        });
      } else {
        return prv.filter((item) => item.name !== removeItem.name);
      }
    });
    quantyRef.current--;
  };
  return (
    <>
      <div className="flex justify-center items-center">
        <div className=" py-10 px-12 w-400">
          <header className="sticky top-1 flex justify-between items-center bg-amber-300 my-10">
            <h1>Shop It ++</h1>
            <div
              onClick={() => setShowCart((prv) => !prv)}
              className="relative"
            >
              <img src="src/assets/cart_icon (1).svg" alt="" />
              <h1 className="rounded-full flex justify-center items-center w-6 h-6 absolute top-0 right-0  bg-yellow-200">
                {quantyRef.current}
              </h1>
            </div>
          </header>
          {!showCart && (
            <div className="grid grid-cols-4 gap-8">
              {items.length > 0 &&
                items.map((item) => (
                  <div className="flex flex-col justify-center items-center gap-2">
                    <div className="border shadow rounded-md">
                      <div className=" flex flex-col gap-2 px-10 py-5">
                        <h1 className="text-4xl">{item.name}</h1>
                        <p>{item.description}</p>
                        <p className="text-4xl font-bold">${item.price}</p>
                      </div>
                    </div>
                    <div className="h-12">
                      {CartItemRef.current[item.name] ? (
                        <div>
                          <button
                            className="px-2 w-10 mx-4  rounded-4xl bg-blue-500 text-3xl"
                            onClick={() => handleAddItem(item)}
                          >
                            +
                          </button>
                          <span className="text-3xl">
                            {CartItemRef.current[item.name]}
                          </span>
                          <span>in Cart</span>
                          <button
                            className="px-2 w-10 mx-4  rounded-4xl bg-blue-500 text-3xl"
                            onClick={() => handleRemoveItem(item)}
                          >
                            -
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAddItem(item)}
                          className="py-4 px-12 bg-yellow-300 rounded-2xl"
                        >
                          add to cart
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
      {showCart && (
        <div
          style={{
            marginLeft: "400px",
            width: "70vw",
          }}
        >
          <h1 className="my-10">Your Shopping Cart</h1>
          <div>
            {cartItems.length > 0 &&
              cartItems.map((cItem) => (
                <div className="flex justify-around items-center bg-amber-50 w-full h-20 rounded-2xl my-4">
                  <h1 className="text-2xl">{cItem.name}</h1>
                  <div>
                    <div className="text-center text-2xl">
                      ${cItem.price * (cItem.quanTity || 1)}
                    </div>
                    <div className="flex text-white items-center">
                      <button
                        className="text-xl font-semibold w-6 mx-4 h-6 flex justify-center items-center  rounded-full bg-blue-500 "
                        onClick={() => handleAddItem(cItem)}
                      >
                        +
                      </button>
                      <span className="text-black">{cItem.quanTity}</span>
                      <button
                        className="text-xl font-semibold w-6 mx-4 flex h-6 justify-center items-center  rounded-4xl bg-blue-500 "
                        onClick={() => handleRemoveItem(cItem)}
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            <div>
              <div className="flex justify-end items-center gap-2">
                <div className="text-2xl">
                  Total: $
                  {cartItems.reduce(
                    (acc, cur) => acc + cur.price * cur.quanTity,
                    0
                  )}
                </div>
                <div className="text-3xl font-bold">{`(${quantyRef.current})items`}</div>
              </div>
              <div className="flex justify-end items-center gap-2 my-10">
                <button
                  onClick={() => setShowCart((prv) => !prv)}
                  className="bg-yellow-200 px-4 py-2 text-2xl font-bold rounded-md"
                >{`< Select more`}</button>
                <button className="bg-blue-500 px-4 py-2 text-2xl font-bold rounded-md">
                  Proceed to Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
