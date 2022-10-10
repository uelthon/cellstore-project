import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useOrderStats } from '../../../hooks/ordersHook'
import { months } from '../../../utils/months'
import Loading from '../../../views/loading'
import LineChart from '../../charts/LineChart'

function OrderStats() {
  const [query] = useSearchParams()
  const { orderStats, orderStatsLoading } = useOrderStats()
  const show = query.get('show') || 'orders'

  if(show !== 'orders') return null
  if(orderStatsLoading) return <Loading />
  
  const dataOrders = {
    labels: orderStats.map(e => months[e._id]),
    datasets: [{
      label: 'Sales',
      data: orderStats.map(e => e.total),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)'
    }]
  }

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Orders Stats',
      },
    },
  };

  return (
  <div style={{minHeight:'90vh'}}>
    <LineChart chartData={dataOrders} options={options} />
  </div>
  )

}

export default OrderStats