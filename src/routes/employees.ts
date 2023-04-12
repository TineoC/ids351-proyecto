import { PrismaClient, type Employee } from '@prisma/client'
import express, { type Request, type Response } from 'express'

const employeesRouter = express.Router()

const prisma = new PrismaClient()

employeesRouter.get('/employees', async (req: Request, res: Response) => {
  const employees: Employee[] = await prisma.employee.findMany()

  res.json(employees)
})

employeesRouter.get(
  '/employees/topten',
  async (req: Request, res: Response) => {
    const result = await prisma.employee.findMany({
      select: {
        employeeNumber: true,
        firstName: true,
        lastName: true,
        customers: {
          include: {
            payments: true,
          },
        },
      },
    })

    res.json(result)
  }
)

employeesRouter.get(
  '/employees/:employeeNumber',
  async (req: Request, res: Response) => {
    const { employeeNumber } = req.params
    const product: Employee | null = await prisma.employee.findUnique({
      where: {
        employeeNumber: parseInt(employeeNumber),
      },
    })
    res.json(product)
  }
)

export = employeesRouter
