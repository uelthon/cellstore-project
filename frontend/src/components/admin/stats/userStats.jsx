import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useUserStats } from '../../../hooks/usersHook'
import Loading from '../../../views/loading/loading'
import { months } from '../../../utils/months'
import LineChart from '../../charts/LineChart'

function UserStats() {
  const [query] = useSearchParams()
  const { userStats, userStatsLoading } = useUserStats()
  const show = query.get('show')

  if(show !== 'users') return null
  if(userStatsLoading) return <Loading />

  const dataUsers = {
    labels: userStats.map(e => months[e._id]),
    datasets: [{
      label: 'Users sing up',
      data: userStats.map(e => e.total),
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
        text: 'Registered users',
      },
    },
  };

  return (
  <div style={{minHeight:'90vh'}}>
    <LineChart chartData={dataUsers} options={options} />
  </div>
  )
}

export default UserStats