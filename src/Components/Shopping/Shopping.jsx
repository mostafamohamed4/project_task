import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
// import OwlCarousel from 'react-owl-carousel';
import $ from "jquery";
import './Shopping.css'
import SimilarProducts from '../SimilarProducts/SimilarProducts';
import Carts from '../Carts/Carts';
import { cartContext } from '../../context/cart';
import { toast } from 'react-toastify';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
export default function Shopping() {
    let { addprodectcard, setnumOfCartItems } = useContext(cartContext)

    let BaseUrl = `https://route-ecommerce-app.vercel.app`
    let [listprodectDetials, setprodectDetials] = useState([])
    let [listprodectDetialsImagess, setlistprodectDetialsImagess] = useState([])
    let [loading, setLoading] = useState(false)
    async function addprodect(productId) {
        let response = await addprodectcard(productId)
        console.log(response);
        if (response.data.status === 'success') {
            setnumOfCartItems(response.data.numOfCartItems)
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message)

        }
    }
    useEffect(() => {
        getProdectDetials()
    }, [])

    async function getProdectDetials() {
        setLoading(true)
        let { data } = await axios.get(`${BaseUrl}/api/v1/products/6428cbd5dc1175abc65ca037`)
        localStorage.setItem('useToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjhiZjVlZDhlNDcwNWFlYjliMTIxYyIsIm5hbWUiOiJtb3N0YWZhIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2ODM5ODk1NDMsImV4cCI6MTY5MTc2NTU0M30.oU37j4-n_ppj-7l1p6e2VBPVDuTH_gAWClMsCXLSxBo')
        setprodectDetials(data.data)
        setlistprodectDetialsImagess(data.data.images)
        console.log(data.data);
        setLoading(false)
    }
    const [imageCover, setimageCover] = useState()
    function slider(element) {
        setimageCover(element.target.src);
    }



    return <>
 {loading ?
            <div className='loading  d-flex align-items-center justify-content-center  position-fixed end-0  start-0 bottom-0 '>
                <div>
                    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                </div>      </div>
            : <>

        <section className='shopping'>
            <div className='container'>
                <div className='row  pt-5 g-3'>
                    <div className='col-lg-5 col-md-10 m-auto' >
                        {/* <div className='iamges text-center'>

                            <OwlCarousel className='owl-theme' items={1} loop>
                                {listprodectDetials.iImagessmages?.map((element, index) => {
                                    return <>

                                        <div className='iamges' key={index}  >
                                            <img src={element} className='w-100' height={555} alt="" />
                                        </div>
                                    </>
                                })

                                }          </OwlCarousel>
                        </div> */}
                        <div className='w-100 mx-auto' data-bs-ride="carousel">
                            {imageCover == null ? <img src={listprodectDetials.imageCover} className='w-100' height={560} alt="" /> : <img src={imageCover} className='w-100' height={560} alt="" />
                            }
                            <div className='d-flex '>
                                {listprodectDetialsImagess.map((element, index) => {
                                    return <div key={index}> <img src={element} className='w-100 my-3 px-1 cursor-pointer' onClick={slider} alt="" />
                                    </div>
                                })}
                            </div>
                        </div>


                    </div>
                    <div className='col-lg-7 col-md-12 px-1'>
                        <div className='text'>
                            <h3 className='text-main fw-bold'>{listprodectDetials?.title}</h3>
                            <p className='mt-2 mb-1 main fw-bolder'>{listprodectDetials?.category?.name?.split(' ').slice(0, 1).join(' ')}</p>
                        </div>
                        <div className='icon'>
                            <i className="fa-solid fa-star rating-color"></i>
                            <i className="fa-solid fa-star rating-color"></i>
                            <i className="fa-solid fa-star rating-color"></i>
                            <i className="fa-regular fa-star-half-stroke rating-color"></i>
                            <i className="fa-regular fa-star rating-color"></i>
                            <span className='text-black fw-bolder px-3 font-l'>{listprodectDetials?.ratingsAverage} of 5</span>  </div>

                        <div className='d-flex align-items-center pb-2'>
                            <h2 className='primary-color fw-bolder'>{listprodectDetials?.price} LE</h2>
                            <span className='main text-decoration-line-through px-4 fw-bold'>{listprodectDetials?.price} EGP</span>
                            <div className=' rating-bg px-2 fw-bold'><span>30%off</span></div>
                            {/* <button onClick={() => addprodect(listprodectDetials._id)} className='btn bg-main text-white w-100'>Add card</button> */}
                        </div>
                        <div className='size my-2 py-3'>
                            <h2 className='fw-bold py-2'>Size</h2>
                            <div className='d-flex align-items-center'>
                                <button className='sizeing  mx-1 '>Small</button>
                                <button className='sizeing  mx-1'>Medium</button>
                                <button className='sizeing  mx-1'>Large</button>
                                <button className='sizeing  mx-1'>x-large</button>
                                <button className='sizeing  ms-1'>xx-large</button>
                            </div>
                        </div>

                        <div className='color my-2 py-3'>
                            <h2 className='fw-bold py-2'>Color</h2>
                            <div className='d-flex align-items-center'>
                                <img src={listprodectDetials.imageCover} className='coloring  me-2 ' />
                                <img src={listprodectDetials.imageCover} className='coloring  ms-2 ' />
                            </div>
                        </div>
                        <div className='Quantity my-2 py-3'>
                            <h2 className='fw-bold py-3'>Quantity</h2>
                            <div className='bord d-flex justify-content-between align-items-center'>
                                <button className='icon ms-1  rounded-5 border-main bg-main fw-bold btn-sm'>-</button>
                                <h5>1</h5>
                                <button className='icon me-1 rounded-5 border-main bg-main fw-bold btn-sm'>+</button>
                            </div>
                            <div className='d-flex align-items-center pt-3'>
                                <button onClick={() => addprodect(listprodectDetials._id)} data-bs-target="#exampleModal" className='btn mx-3 my-2  rounded-5 text-white fw-bold primary-bg'>Add To Cart</button>
                        <button className='btn btn1 rounded-5 fw-bold rating-bg'>Pickup From Store</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
        <SimilarProducts />
        {/* moule */}

        <Carts />

        </>
}
    </>
}
