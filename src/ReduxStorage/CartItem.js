import React from "react";
import { connect } from 'react-redux';
// import { DECREASE, INCREASE, REMOVE } from '../actions';

const CartItem = ({ key, city, WeatherText, increase, decrease, remove }) => {
	console.log({ key, city, WeatherText, increase, decrease, remove })
return (
	<div className="cart-item">
	{/* <img src={img} alt={img} /> */}
	<div>
		<h4>{key}</h4>
		<h4 className="item-price">{city}</h4>

	</div>
	<div>
		{/* increase amount */}
		<button className="amount-btn"
		onClick={() => increase()}>
			increase
		</button>
		{/* amount */}
		<p className="amount">{WeatherText}</p>

		{/* decrease amount */}
		<button className="amount-btn"
		onClick={() => decrease()} >
		decrease
		</button>
	</div>
	</div>
);
};

const mapDispatchToProps = (dispatch, ownProps) => {
const { id, amount } = ownProps;
return {
	increase: () => dispatch({ type: 'INCREASE', payload: { id } }),
	decrease: () => dispatch({ type: 'DECREASE', payload: { id } }),
	remove: () => dispatch({ type: 'REMOVE', payload: { id, amount } })
}
}

export default connect(null, mapDispatchToProps)(CartItem);
