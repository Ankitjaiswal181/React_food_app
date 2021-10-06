import React from "react";
import classes from './Cart.module.css'
import Modal from "../UI/Modal";
import CartContext from "../../store/Cart-context";
import { useContext,useState } from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckOut,setIsCheckOut]=useState(false);
  const [isSubmitting,setIsSubmitting]=useState(false);
  const [didSubmit,setDidSubmit]=useState(false);
  const cartCtx=useContext(CartContext);
  const totalAmount=`$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItem = cartCtx.items.length> 0;

  const cartItemRemoveHandler=(id)=>{
    cartCtx.removeItem(id); 
  };

  const cartItemAddHandler=(item)=>{
    cartCtx.addItem({...item,amount:1});
  };

  const orderHandler =()=>{
    setIsCheckOut(true);
  }

  const submitOrderHandler=async(userData)=>{
    setIsSubmitting(true);
    await fetch('https://food-app-8089e-default-rtdb.firebaseio.com/order.json',
    {method:'POST',
    body:JSON.stringify({
    user:userData,
    orderedItems:cartCtx.items
    })
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart()
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
      <CartItem 
        key={item.id} 
        name={item.name} 
        amount={item.amount} 
        price={item.price} 
        onRemove={cartItemRemoveHandler.bind(null,item.id)}
        onAdd={cartItemAddHandler.bind(null,item)}/>
      ))}
    </ul>
  );

  const modalAction=
    (<div className={classes.actions}>
      <button className={classes["button--alt"] } onClick={props.onCloseButton}>Close</button>
      {hasItem && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>);  
  
  const cartModalAction= <React.Fragment>
  {cartItems}
  <div className={classes.total}>
    <span>Total Amount</span>
    <span>{totalAmount}</span>
  </div>
  {isCheckOut && <Checkout onConfirm={submitOrderHandler} onCancel={props.onCloseButton}/>}
  {!isCheckOut && modalAction}
  </React.Fragment>   ;

  const isSubmittingModalContent=<p>Sending order data...</p>;

  const didSubmitModal=
  <React.Fragment><p>Successfully sent the order!!</p>
  <div className={classes.actions}>
      <button className={classes.button } onClick={props.onCloseButton}>Close</button>
      </div></React.Fragment>



  return (
      <Modal onClose={props.onCloseButton}> 
    {!isSubmitting &&!didSubmit && cartModalAction}
    {isSubmitting && isSubmittingModalContent}
    {!isSubmitting && didSubmit && didSubmitModal}

    </Modal>
  );
};

export default Cart;
