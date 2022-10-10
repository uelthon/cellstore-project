import React from 'react' 
import { lazy, Suspense } from 'react'
import { useStartLogin, useStartProducts } from './hooks/startHooks'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/navbar'
import Notification from './components/notification'
import Home from './views/home'
import Product from './views/product'
import Footer from './components/footer'
import Search from './views/search'
import NotFound from './views/notFound'
import AllProducts from './views/allproducts'
import ScrollToTop from './views/scrollToTop'
import PayButton from './components/payButton'
import Orders from './views/orders'
import Order from './views/order'
import Compare from './views/compare'
import Success from './views/success'
import CompareWidget from './components/compareWidget/'
import ProtectedRoute from './components/protectedRoute'
import Loading from './views/loading'
import './App.css'

const LazyPay = lazy(() => import('./views/pay'))
const LazyAdminProducts = lazy(() => import('./components/admin/products'))
const LazyAdminOrders = lazy(() => import('./components/admin/orders'))
const LazyUsersAdmin = lazy(() => import('./components/admin/users'))
const LazyAdminOrder = lazy(() => import('./components/admin/order/adminOrder'))
const LazyStats = lazy(() => import('./views/stats'))
const LazyAdmin = lazy(() => import('./views/admin'))

function App() {

  const { startLoading } = useStartLogin()
  const { productsLoading } = useStartProducts()
  
  return (
    <div className="App">
      <NavBar />
      <Notification />
      <PayButton />
      <CompareWidget />
      <div style={{marginTop:'82px',width:'100%',minHeight:'90vh',marginBottom:'2rem'}}>
        <ScrollToTop>
        <Routes>
          <Route path='/search/:name' element={<Search />} />
          <Route path='/allproducts' element={<AllProducts />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/orders/:id' element={<Order />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/compare' element={<Compare />} />
          <Route path='/pay' element={
            <Suspense fallback={<Loading />}>
              <LazyPay />
            </Suspense>
          } />
          <Route path='/success' element={<Success />} />
          <Route element={<ProtectedRoute />}>
              <Route path='/admin' element={
                <Suspense fallback={<Loading/>} >
                  <LazyAdmin />
                </Suspense>
                } />
              <Route path='/admin/products' element={
                <Suspense fallback={<Loading/>} >
                  <LazyAdminProducts />
                </Suspense>
                } />
              <Route path='/admin/users' element={
                <Suspense fallback={<Loading/>} >
                  <LazyUsersAdmin />
                </Suspense>
                } />
              <Route path='/admin/orders' element={
                <Suspense fallback={<Loading/>} >
                  <LazyAdminOrders />
                </Suspense>
                } />
              <Route path='/admin/orders/:id' element={
                <Suspense fallback={<Loading/>} >
                  <LazyAdminOrder />
                </Suspense>
                } />
              <Route path='/admin/stats' element={
                <Suspense fallback={<Loading/>} >
                  <LazyStats />
                </Suspense>
                } />
          </Route>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        </ScrollToTop>
      </div>
      <Footer />
    </div>
  )
}

export default App