import { getFrequentlyBoughtProducts } from '../analytics.utils'

describe('getFrequentlyBoughtProducts', () => {
  it('should return the frequent products', () => {
    const lineItems = [
      {
        orderId: 1,
        productId: 1,
        productName: 'Apple',
        qty: 2,
        price: 10,
        total: 20,
      },
      {
        orderId: 1,
        productId: 2,
        productName: 'Orange',
        qty: 3,
        price: 15,
        total: 45,
      },
      {
        orderId: 1,
        productId: 3,
        productName: 'Pear',
        qty: 2,
        price: 20,
        total: 40,
      },
      {
        orderId: 2,
        productId: 4,
        productName: 'Potato',
        qty: 100,
        price: 10,
        total: 1000,
      },
      {
        orderId: 2,
        productId: 2,
        productName: 'Orange',
        qty: 300,
        price: 15,
        total: 4500,
      },
      {
        orderId: 2,
        productId: 3,
        productName: 'Pear',
        qty: 300,
        price: 20,
        total: 6000,
      },
      {
        orderId: 3,
        productId: 1,
        productName: 'Apple',
        qty: 1,
        price: 10,
        total: 10,
      },
      {
        orderId: 3,
        productId: 2,
        productName: 'Orange',
        qty: 3,
        price: 15,
        total: 45,
      },
      {
        orderId: 3,
        productId: 3,
        productName: 'Pear',
        qty: 2,
        price: 20,
        total: 40,
      },
      {
        orderId: 4,
        productId: 1,
        productName: 'Apple',
        qty: 1,
        price: 10,
        total: 10,
      },
      {
        orderId: 4,
        productId: 5,
        productName: 'Nectarine',
        qty: 20,
        price: 15,
        total: 300,
      },
      {
        orderId: 4,
        productId: 3,
        productName: 'Pear',
        qty: 1,
        price: 20,
        total: 20,
      },
      {
        orderId: 5,
        productId: 1,
        productName: 'Apple',
        qty: 1,
        price: 10,
        total: 10,
      },
      {
        orderId: 5,
        productId: 6,
        productName: 'Grape',
        qty: 10,
        price: 15,
        total: 150,
      },
      {
        orderId: 5,
        productId: 3,
        productName: 'Pear',
        qty: 1,
        price: 20,
        total: 20,
      },
    ]

    const frequentProducts = getFrequentlyBoughtProducts(lineItems)

    expect(Array.isArray(frequentProducts)).toBe(true)

    expect(frequentProducts).toEqual([
      { productId: 1, productName: 'Apple' },
      { productId: 3, productName: 'Pear' },
    ])
  })
})
