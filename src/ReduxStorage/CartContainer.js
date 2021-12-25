import React from "react";
import CartItem from './CartItem';
import { connect } from 'react-redux';
// import { CLEAR_CART, GET_TOTALS } from '../actions';

const CartContainer = ({ cart = [] //, total, remove, getTotal
 }) => {
// React.useEffect(() => {
// 	getTotal();
// })
if (cart.length === 0) {
	return (
	<section className="cart">

		<header>
		<h2>your bag</h2>
		<h4 className="empty-cart">
			is currently empty
		</h4>
		</header>
	</section>
	);
}
return (
	<section className="cart">
	{/* cart header */}
	<header>
		<h2>your bag</h2>
	</header>
	{/* cart items */}
	<article>
		{cart.map((item) => {
		console.log('init '+JSON.stringify(item))

		return <CartItem key={item.key} {...item} />
		})}
	</article>
	{/* cart footer */}
	<footer>
		<hr />
		{/* <div className="cart-total">
		<h4>
			total <span>{total}</span>
		</h4>
		</div>
		<button className="btn clear-btn"
		onClick={() => remove()} >clear cart</button> */}
	</footer>
	</section>
);
};

function mapStateToProps(store) {
const { cart, total } = store;
return { cart: cart, total: total };
}

function mapDispatchToProps(dispatch) {
return {
	remove: () => dispatch({ type: 'CLEAR_CART' }),
	getTotal: () => dispatch({ type: 'GET_TOTALS' })
}
}

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);
