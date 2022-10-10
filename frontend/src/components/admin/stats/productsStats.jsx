import React from 'react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useBestBrand, useProductStats } from '../../../hooks/ordersHook'
import BartChart from '../../charts/BarChart'
import HBartChart from '../../charts/HBarChart'
import Loading from '../../../views/loading'
import './productsStats.css'

function ProductsStats() {
  const [query] = useSearchParams()
  const [ toggle, setToggle ] = useState('smartphones')
  const { dataProducts, dataProductsLoading } = useProductStats()
  const { bestBrand, bestBrandLoading } = useBestBrand()
  const show = query.get('show')

  if(show !== 'products') return null
  if(bestBrandLoading || dataProductsLoading) return <Loading />

  const dataBrand =  {
    smartphones: {
      labels: dataProducts.map(e => e.name),
      datasets:[{
        label: 'Sales',
        data: dataProducts.map(e => e.quantity),
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      }]
    },
    brands: {
      labels: bestBrand.map(e => e.brand),
      datasets:[{
        label: 'Sales',
        data: bestBrand.map(e => e.quantity),
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      }]
    }
  }

  return (
    <div>
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'1rem'}}>
          <div className={`toggle-brand ${toggle === 'smartphones' ? 'toggle-brand-active' : null  }`} onClick={() => setToggle('smartphones')}>Smarphones</div>
          <div className={`toggle-brand ${toggle === 'brands' ? 'toggle-brand-active' : null  }`} onClick={() => setToggle('brands')}>Brands</div>
        </div><br/>
        <div className='barchart-large'>
        <BartChart chartData={dataBrand[toggle]} />
        </div>
        <div className='barchart-small' style={{minHeight:'90vh'}}>
        <HBartChart chartData={dataBrand[toggle]} />
        </div>
    </div>
  )
}

export default ProductsStats