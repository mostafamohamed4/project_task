import { useState } from 'react';
import './App.css';
import { createBrowserRouter, createHashRouter, RouterProvider, useNavigate } from 'react-router-dom'
import Layout from './Components/Layout/Layout';
import Carts from './Components/Carts/Carts';
import Shopping from './Components/Shopping/Shopping';
import { CartContextprovieder } from './context/cart';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  let routers = createHashRouter([
    {
      path: '', element: <Layout />, children: [

        { index: true, element: < Shopping /> },

      ]
    }


  ])

  return <>
    <CartContextprovieder>
      <Toaster />

      <RouterProvider router={routers}></RouterProvider>

    </CartContextprovieder>

  </>

}

export default App;
