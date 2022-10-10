import { useEffect, useState } from "react";
import userServices from "../services/users";

export const useUserStats = () => {
  const [userStats, setUserStats] = useState([])
  const [userStatsLoading, setUserStatsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const data = await userServices.getUsersStats()
      setUserStats(data)
      setUserStatsLoading(false)
    }
    fetchData()
  },[])

  return {
    userStats,
    userStatsLoading
  }
}