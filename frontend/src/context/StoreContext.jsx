import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:10000";
    const [token,setToken] = useState("");
    const [food_list,setFoodList] = useState([])
    const [searchQuery, setSearchQuery] = useState("");
    const [searchText, setSearchText] = useState(""); // avi



    const addToCart = async (itemId) => {
        console.log("Adding item:", itemId); 
        if (!itemId) return;  
    
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
            console.log(cartItems)
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
            console.log(cartItems)
        }
    
        if(token){
            await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
        }
    }
    

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if(token){
            await axios.post(`${url}/api/cart/remove`,{itemId},{headers:{token}})
        }
    }

    const getTotalCartAmount = async () => {
        let totalAmount = 0;
        console.log(cartItems)
        for (const item in cartItems) {
          if (cartItems[item] > 0) {
            const itemInfo = food_list.find((product) => product.id === item);
            if (itemInfo) {
              totalAmount += itemInfo.price * cartItems[item];
            }
          }
        }
        return totalAmount;
      };
      
    

    const fetchFoodList = async ()=>{
        const response = await axios.get(url+"/api/food/list");

        setFoodList(response.data.data);
    }

    const loadCartData = async (token)=>{
        const response = await axios.get(url+"/api/cart/get",{headers:{token}});
        setCartItems(response.data.cartData);
    }

    useEffect(()=>{
        
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        searchQuery,
        setSearchQuery,
        searchText,     
        setSearchText 

    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}


export default StoreContextProvider