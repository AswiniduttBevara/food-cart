import React from "react";
import classes from './Modal.module.css';
import ReactDOM from 'react-dom';

const BackDrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onCartClose} />
};

const ModalOverlay = (props) => {
    return (<div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>);
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<BackDrop onCartClose={props.onCartClose} />,portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElement)}
        </React.Fragment>
    );
};

export default Modal;