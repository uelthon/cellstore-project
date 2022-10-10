import { useEffect, useState } from "react";
import orderServices from "../services/orders";
import { useSelector } from "react-redux";

export const useOrderStats = () => {
  const [ orderStats, setOrdersStats ] = useState([])
  const [ orderStatsLoading, setOrdersStatsLoading ] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const data = await orderServices.getOrdersStats()
      setOrdersStats(data)
      setOrdersStatsLoading(false)
    }
    fetchData()
  }, [])

  return{
    orderStats,
    orderStatsLoading
  }
}

export const useBestBrand = () => {
  const [ bestBrand, setBestBrand ] = useState([])
  const [ bestBrandLoading, setBestBrandLoading ] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const data = await orderServices.getBestBrands()
      setBestBrand(data)
      setBestBrandLoading(false)
    }
    fetchData()
  }, [])

  return {
    bestBrand,
    bestBrandLoading
  }
}

export const useProductStats = () => {
  const items = useSelector((state) => state.products.value)
  const [products, setProducts] = useState(null)
  const [ dataProducts, setDataProducts ] = useState([])
  const [ dataProductsLoading, setDataProductsLoading ] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const data = await orderServices.getBestSellers()
      setProducts(data)
      setDataProductsLoading(false)
    }
    fetchData()
  }, [])

  useEffect(() => {
      products?.forEach(e => {
        const item = items?.find(el => e.product === el.id)
        if(item){
          const body = {
            name: item.name,
            quantity: e.quantity
          }
          setDataProducts(prev => [...prev, body])
        }
      })
  }, [products])

  return{
    dataProducts,
    dataProductsLoading
  }
}