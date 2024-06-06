import React, {useContext, useState, useEffect} from "react";
import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css';
import CartContext from "../../Store/Cart-Context";

const HeaderCartButton = (props) => {
    const [btnHighlighted, setBtnHighlighted] = useState(false);
    const cartCxt = useContext(CartContext);
    const {items} = cartCxt;

    const numberOfCartItems = items.reduce((curNumber,item) =>  {
        return curNumber+item.amount;
    },0)
    useEffect(()=>{
        if(items.length === 0){
            return;
        }
        setBtnHighlighted(true);

        const timer = setTimeout(() => {
            setBtnHighlighted(false);
        },300)

        return () => {
            clearTimeout(timer);
        }

    },[items])
    
    const classButton = `${classes.button} ${btnHighlighted ? classes.bump : ''}` ;
    return (
        <button className={classButton} onClick={props.onClick}>
            <span className={classes.icon}> <CartIcon /> </span>
            <span>your cart </span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
};


export default HeaderCartButton