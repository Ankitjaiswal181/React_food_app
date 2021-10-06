import Header from "./Component/Layouts/Header";
import Meals from "./Component/Meals/Meals";
import Cart from "./Component/Cart/Cart";
import {useState} from 'react'
import CartProvider from "./store/CartProvider";
function App() {
  const [cartIsShown,setCartIsShown]=useState(false);

  const showCartHandler=()=>{
    setCartIsShown(true);
  }
  const hideCartHandler=()=>{
    setCartIsShown(false);
  }
  return (
    <CartProvider>
      {cartIsShown && <Cart  onCloseButton={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
