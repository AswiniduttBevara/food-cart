import { useReducer } from "react";

import CartContext from "./Cart-Context";

const defaultCartState = {
    items : [],
    totalAmount: 0,
}

const cartReducer = (state, action) => {
    
    
    if(action.type === 'ADD'){
        const updatedTotalAmount = state.totalAmount + action.items.price * action.items.amount;

        const existingCartItemIndex = state.items.findIndex(meal => meal.id === action.items.id);

        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems;
        if(existingCartItem){
            const updatedItem = {
                ...existingCartItem,
                amount : existingCartItem.amount + action.items.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }else{

            updatedItems = state.items.concat(action.items);
        }

        return {
            items:updatedItems,
            totalAmount:updatedTotalAmount,
        }
    }

    if(action.type === 'REMOVE'){
        
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
        
        const existingCartItem = state.items[existingCartItemIndex];
        
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;
        let updatedItems;
        if(existingCartItem.amount === 1){
            updatedItems = state.items.filter(item => item.id !== action.id);
        }else{
            const updatedItem = {...existingCartItem, amount: existingCartItem.amount-1};
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount : updatedTotalAmount,       
        }
    }
    return defaultCartState;
};

const CartProvider = (props) => {
    
    const[cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

    const addToCartHandler = (item) => {
        dispatchCart({
            type : 'ADD',
            items: item,
        })
    };
    
    const removeFromCartHandler = (id) => {
        dispatchCart({
            type : 'REMOVE',
            id: id,
        })
    };
    
    const cartContext = {items:cartState.items, totalAmount:cartState.totalAmount, addItem:addToCartHandler, removeItem: removeFromCartHandler}

    return (<CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>);
};

export default CartProvider;