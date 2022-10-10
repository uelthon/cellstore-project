import React from 'react'
import PanelStats from '../../components/admin/stats/panelStats'
import UserStats from '../../components/admin/stats/userStats'
import OrderStats from '../../components/admin/stats/orderStats'
import './stats.css'
import ProductsStats from '../../components/admin/stats/productsStats'

function Stats() {
  return (
    <div className='container-stats'>
      <PanelStats />
      <div className="container-stats-charts">
        <UserStats />
        <OrderStats />
        <ProductsStats />
      </div>
    </div>
  )
}

export default Stats