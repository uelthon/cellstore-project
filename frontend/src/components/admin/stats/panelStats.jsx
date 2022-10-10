import { faChartSimple } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useSearchParams } from 'react-router-dom'
import React from 'react'
import './panelStats.css'

function PanelStats() {
  const [query] = useSearchParams()
  const show = query.get('show') || 'orders'

  return (
    <div className='container-panel-stats'>
      <div>
        <FontAwesomeIcon icon={faChartSimple} />
        <h4>Stats</h4>
      </div>
        <ul>
          <li style={{borderBottom:show === 'orders' ? '2px solid white' : ''}}>
            <Link to='/admin/stats?show=orders'>Orders</Link>
          </li>
          <li style={{borderBottom:show === 'users' ? '2px solid white' : ''}}>
            <Link to='/admin/stats?show=users'>Users</Link>
          </li>
          <li style={{borderBottom:show === 'products' ? '2px solid white' : ''}}>
            <Link to='/admin/stats?show=products'>Products</Link>
          </li>
        </ul>
    </div>
  )
}

export default PanelStats