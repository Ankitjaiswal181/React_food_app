import React,{Fragment} from "react";
import classes from "./Modal.module.css";
import ReactDOM from 'react-dom'

const Backdrop=(props)=>{
    return <div className={classes.backdrop} onClick={props.onCloseButton}/>
};

const ModalOverlays=(props)=>{
    return (
        <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
        </div>
    );
};


const Modal = (props) => {
    const display=document.getElementById("overlays")
  return( 
  <Fragment>
      {ReactDOM.createPortal(<Backdrop onCloseButton={props.onClose}/>,display) }
      {ReactDOM.createPortal(<ModalOverlays>{props.children}</ModalOverlays>,display)}
  </Fragment>
  );
};

export default Modal;
