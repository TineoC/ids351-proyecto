import { type OrderDetail, PrismaClient, type Product } from '@prisma/client'
import express, { type Request, type Response } from 'express'

const router = express.Router()

const prisma = new PrismaClient()

router.get('/products', async (req: Request, res: Response) => {
  const products: Product[] = await prisma.product.findMany()

  res.json(products)
})
interface ProductDetail {
  productCode: string
  quantityOrdered: number
}
router.get('/products/topten', async (req: Request, res: Response) => {
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

router.post('/products', async (req, res) => {
  const product: Product = await prisma.product.create({
    data: req.body,
  })
  res.json({ product })
})

router.get('/products/:productCode', async (req: Request, res: Response) => {
  const { productCode } = req.params

  const product: Product | null = await prisma.product.findUnique({
    where: {
      productCode,
    },
  })
  res.json(product)
})

export = router
