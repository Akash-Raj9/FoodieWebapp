import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const {
    getTotalCartAmount = () => 0,
    token = '',
    food_list = [],
    cartItems = [],
    url = ''
  } = useContext(StoreContext);

  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];

    food_list.forEach((item) => {
      if (cartItems[item.id] > 0) {
        orderItems.push({ ...item, quantity: cartItems[item.id] });
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: totalAmount + (totalAmount === 0 ? 0 : 50),
      paymentMethod: "Cash on Delivery"
    };

    try {
      let response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });

      if (response.data.success) {
        alert("Your order has been placed successfully! Cash on Delivery selected.");
        navigate("/");  
      } else {
        console.log(response.data);
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error placing order.");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else {
      const fetchTotal = async () => {
        const total = await getTotalCartAmount();
        setTotalAmount(total);
      };
      fetchTotal();
    }
  }, [token, cartItems, getTotalCartAmount, navigate]);

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type='text' placeholder='First Name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type='text' placeholder='Last Name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type='text' placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type='text' placeholder='Street' />
        <div className='multi-fields'>
          <input required name='city' onChange={onChangeHandler} value={data.city} type='text' placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type='text' placeholder='State' />
        </div>
        <div className='multi-fields'>
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type='text' placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type='text' placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type='text' placeholder='Phone' />
      </div>

      <div className='place-order-right'>
        <div className='cart-total'>
          <h2>Cart Totals</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>₹{totalAmount}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery Charges</p>
              <p>₹{totalAmount === 0 ? 0 : 50}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <b>Total</b>
              <b>₹{totalAmount + (totalAmount === 0 ? 0 : 50)}</b>
            </div>
          </div>
          <button type='submit'>PLACE ORDER (COD)</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
