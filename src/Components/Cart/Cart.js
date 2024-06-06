import { useContext } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../Store/Cart-Context';
import CartItem from './CartItem';

const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const hasCartItems = cartCtx.items.length > 0;
    
    const removeCartHandler = (id) => {
        cartCtx.removeItem(id);
    };
    
    const addCartHandler = (item) => {
        cartCtx.addItem({...item, amount:1})
    };

    const cartItems = (<ul className={classes['cart-items']}>{cartCtx.items.map(item => <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onAdd={addCartHandler.bind(null, item)} onRemove={removeCartHandler.bind(null, item.id)} />)}</ul>)

    return (
        <Modal onCartClose={props.onCartHide}>
            {cartItems}
            <div className={classes.total}>
                <span>total amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onCartHide}>close</button>
                {hasCartItems && <button className={classes.button}>ordering</button>}
            </div>
        </Modal>
    );
};

export default Cart;