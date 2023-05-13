import React, { useContext, useEffect, useState } from 'react'
import "./Carts.css"
import axios from 'axios';
import { cartContext } from '../../context/cart';
import { toast } from 'react-toastify';
export default function Carts() {

  const [CartDetails, setCartDetails] = useState([''])
  const [Loading, setLoading] = useState(false)
  let { getLoggedUserCart } = useContext(cartContext)
  let { RemoveData, setnumOfCartItems ,numOfCartItems } = useContext(cartContext)
  let { UpdateData } = useContext(cartContext)
  async function getCart() {
    setLoading(true)
    let respone = await getLoggedUserCart()
    console.log(respone.data.data.products);
    setCartDetails(respone.data.data)
    setLoading(false)
  }
  useEffect(() => {
    getCart()
  }, [])
  async function DeleteItems(productId) {
    let respone = await RemoveData(productId)
    console.log(respone.data.numOfCartItems);
    setnumOfCartItems(respone.data.numOfCartItems)
    toast.success('prodect Remove')
    setCartDetails(respone.data.data)
  }
  // async function UpdateItems(productId, count) {
  //   let respone = await UpdateData(productId, count)
  //   toast.success('prodect Update count')
  //   setCartDetails(respone.data.data)
  // }


  return <>


    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header border-0">
            <h5 className="modal-title ms-auto model-color fw-bold" id="exampleModalLabel">My Cart</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className='head mb-3'>
              <h5 className='fw-bold '>Cart Summary</h5>

            </div>
            {numOfCartItems == 0 ? <>
              <div className='cart'>
                <div className='row py-3'>
                  <h5 className='fw-bold'>You have no items yet..</h5>

                </div>
              </div>
            </> : <>
              <div className='cart'>
                {CartDetails.products?.map((product, index) => {
                  return <div key={index} className=''>
                    <div className='row py-3 bordercart mb-3'>
                      <div className='col-lg-4 col-md-10'>
                        <div className='images'>
                          <img src={product.product.imageCover} alt="" className='w-100 px-3' />
                        </div>
                      </div>
                      <div className='col-lg-8 col-md-10'>
                        <div className='title-model'>
                          <span className='fw-bold'>{product.product.title}</span>
                          <p className='fw-bold py-2'>Quantity:{product.count}</p>
                        </div>
                        <div className='row'>
                          <div className='col-lg-6'>
                            <div className='price'>
                              <h3 className='price-color fw-bold'>{product.count * product.price} LE</h3>

                            </div>
                          </div>
                          <div className='col-lg-6'>
                            <button onClick={() => { DeleteItems(product.product._id) }} className='btn fw-bold rounded-5 btn-bg '>Remove</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='Total'>
                      <h2 className='price-color fw-bold text-center py-4'>Total: {product.count * product.price} LE</h2>

                    </div>
                  </div>
                })}
                <div className='row g-3'>
                  <div className='col-lg-6 col-md-12'>
                    <button className='btn w-100 rounded-5 py-2 btn-bg '>Review Cart</button>
                  </div>
                  <div className='col-lg-6 col-md-12'>
                    <button className='btn w-100 rounded-5 py-2  price-bg'>Complete Checkout</button>

                  </div>
                </div>
              </div>
            </>
            }
          </div>

          {/* <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div> */}
        </div>
      </div>
    </div>

  </>
}
