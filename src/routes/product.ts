import { type OrderDetail, PrismaClient, type Product } from '@prisma/client'
import express, { type Request, type Response } from 'express'

const productRouter = express.Router()

const prisma = new PrismaClient()

productRouter.get('/products', async (req: Request, res: Response) => {
  const products: Product[] = await prisma.product.findMany()

  res.json(products)
})
interface ProductDetail {
  productCode: string
  quantityOrdered: number
}
productRouter.get('/products/topten', async (req: Request, res: Response) => {
  const products: Array<OrderDetail & { products: Product }> =
    await prisma.orderDetail.findMany({
      take: 10,
      include: {
        products: true,
      },
      orderBy: {
        quantityOrdered: 'desc',
      },
    })
  const productsDetail: ProductDetail[] = products.map((orderDetail) => ({
    productCode: orderDetail.productCode,
    quantityOrdered: orderDetail.quantityOrdered,
  }))
  res.json(productsDetail)
})

productRouter.post('/products', async (req, res) => {
  const product: Product = await prisma.product.create({
    data: req.body,
  })
  res.json({ product })
})

productRouter.get(
  '/products/:productCode',
  async (req: Request, res: Response) => {
    const { productCode } = req.params

    const product: Product | null = await prisma.product.findUnique({
      where: {
        productCode,
      },
    })
    res.json(product)
  }
)

export = productRouter
