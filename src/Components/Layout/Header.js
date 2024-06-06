import React from "react";
import classes from './Header.module.css';
import meals from '../../Assets/meals.jpg';
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
    return (
        <React.Fragment>
            <header className={classes.header}>
                <h1>React Meals</h1>
                <HeaderCartButton onClick={props.onCartShown} />
            </header>
            <div className={classes['main-image']}>
                <img src={meals} alt="table full of tasty foods"/>
            </div>
        </React.Fragment>
    );
};

export default Header;