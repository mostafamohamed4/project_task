import axios from "axios";
import { createContext, useEffect, useState } from "react";
export let cartContext = createContext();

export function CartContextprovieder(props) {
    let BaseUrl = `https://route-ecommerce-app.vercel.app`
    let addheaders = {
        token: localStorage.getItem('useToken')
    }
    const [CartId, setCartId] = useState()
    const [Cart, setCart] = useState()
    const [numOfCartItems, setnumOfCartItems] = useState(0)
  


    async function getdata() {
        let response = await getLoggedUserCart()
        if (response?.data?.status === 'success') {
            setCartId(response.data.data._id)
            setnumOfCartItems(response.data.numOfCartItems)
            setCart(response.data.data)
      
        }

    }

    useEffect(() => {
        getdata()
    },[])
    async function addprodectcard(productId) {
      return  await axios.post(`${BaseUrl}/api/v1/cart`, {
            productId: productId
        }, {
            headers: addheaders
        })  
    }

    function getLoggedUserCart() {
        return axios.get(`${BaseUrl}/api/v1/cart`, {
            headers: addheaders
        })
            .then((response) => response)
            .catch((erorr) => erorr)

    }

    function RemoveData(productId) {
        return axios.delete(`${BaseUrl}/api/v1/cart/${productId}`, {
            headers: addheaders
        })
            .then((response) => response)
            .catch((erorr) => erorr)

    }
    function UpdateData(productId, count) {
        return axios.put(`${BaseUrl}/api/v1/cart/${productId}`, {
            count: count
        }, {
            headers: addheaders
        })
            .then((response) => response)
            .catch((erorr) => erorr)

    }

  
    return <cartContext.Provider value={{addprodectcard, getLoggedUserCart, RemoveData, UpdateData ,CartId ,numOfCartItems,setnumOfCartItems,Cart,setCart}}>
        {props.children}
    </cartContext.Provider>
}