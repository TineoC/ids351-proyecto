import { Prisma, PrismaClient, type Product } from '@prisma/client'
import express, { type Request, type Response } from 'express'

const productRouter = express.Router()

const prisma = new PrismaClient()

productRouter.get('/products', async (req: Request, res: Response) => {
  const products: Product[] = await prisma.product.findMany()

  res.json(products)
})
interface TopMoreSale {
  quantityOrdered: number | null
  productCode: string
}

productRouter.get('/products/topten', async (req: Request, res: Response) => {
  const groupByProductCode = await prisma.orderDetail.groupBy({
    by: ['productCode'],
    _sum: {
      quantityOrdered: true,
    },
    orderBy: {
      _sum: {
        quantityOrdered: 'desc',
      },
    },
    take: 10,
  })
  const productCodeTopMoreSale: TopMoreSale[] = groupByProductCode.map(
    (value) => ({
      productCode: value.productCode,
      quantityOrdered: value._sum.quantityOrdered,
    })
  )

  res.json(productCodeTopMoreSale)
})

productRouter.post('/products', async (req, res) => {
  try {
    const product: Product = await prisma.product.create({
      data: req.body,
    })

    res.json({ product })

  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
        return res.status(409).json({
          error: 'There is already a product with this code'
        })
      }
    }
    throw e
  }
  

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
