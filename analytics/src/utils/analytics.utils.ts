interface LineItem {
  orderId: number
  productId: number
  productName: string
  price: number
  qty: number
  total: number
}

const getFrequentlyBoughtProducts = (lineItems: LineItem[]) => {
  const orderProducts: any = {}

  lineItems.forEach((lineItem: LineItem) => {
    const { orderId, productId, productName } = lineItem

    if (!orderProducts[orderId]) {
      orderProducts[orderId] = []
    }

    orderProducts[orderId].push(productId)
  })

  const frequentPairs: {
    [key: string]: number
  } = {}

  Object.values(orderProducts).forEach((products: any[]) => {
    products.forEach((product1, i) => {
      products.slice(i + 1).forEach((product2) => {
        const key = `${product1}-${product2}`
        frequentPairs[key] = (frequentPairs[key] || 0) + 1
      })
    })
  })

  console.log(frequentPairs)

  const maxCount = Math.max(...Object.values(frequentPairs))

  const frequentProductIds = Object.entries(frequentPairs)
    .filter(([key, val]) => val === maxCount)
    .map(([key, val]) => key.split('-'))[0]
    .map((val) => Number(val))

  return frequentProductIds.map((productId) => ({
    productId,
    productName: lineItems.find((product) => product.productId === productId).productName,
  }))
}

export { getFrequentlyBoughtProducts }
