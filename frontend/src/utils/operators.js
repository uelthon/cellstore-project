export const convert = (date) => new Date(date).getTime()

export const orderProducts = {
  recents: (items) => items.sort((a, b) => 
    convert(b.createdAt) - convert(a.createdAt)
  ),
  older: (items) => items.sort((a, b) => 
    convert(a.createdAt) - convert(b.createdAt)
  ),
  hprice: (items) => items.sort((a, b) => b.price - a.price),
  lprice: (items) => items.sort((a, b) => a.price - b.price)
}

export const filterProducts = {
  brand: (brand, key) => {
    if(!key || key.length === 0 || key.includes(brand)){
      return true
    }
    return false
  },
  rom: (rom, key) => {
    if(!key || key === 0 || rom >= key){
      return true
    }
    return false
  },
  ram: (ram, key) => {
    if(!key || key === 0 || ram >= key){
      if(key === 0) return true;
      if(key >= 10 && ram >= 10) return true;
      if(ram >= (Number(key) + 2)) return false;
      return true
    }
    return false
  },
  display: (size,key) => {
    if(!key || key === 0 || size <= key ){
      return true
    }
    return false
  },
  battery:(battery, key) => {
    if(!key || key === 0 || battery >= key){
      return true
    }
    return false
  },
  price: (price, key) => {
    if(!key || key === 0 || price <= key ){
      if(price > (Number(key) - 300)) return true;
      return false
    }
    return false
  }
}

export const parseProducts = (items, filters) => items.filter(e => 
  filterProducts.brand(e.brand,filters.brand)
  && filterProducts.rom(e.memory.rom, filters.rom)
  && filterProducts.ram(e.memory.ram, filters.ram)
  && filterProducts.display(e.display.size, filters.display)
  && filterProducts.price(e.price,filters.price)
  && filterProducts.battery(e.battery, filters.battery)
  )