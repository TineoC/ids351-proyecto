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
    let result = await prisma.employee.findMany({
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

    // Remove employees with no customers

    result = result.filter((employee) => {
      return employee.customers.length > 0
    })

    // Calculate total sales for each employee and sort them
    let topTenEmployees = result.map((employee) => {
      const totalSales = employee.customers.reduce((total, customer) => {
        return (
          total +
          customer.payments.reduce((total, payment) => {
            return total + payment.amount.toNumber()
          }, 0)
        )
      }, 0)

      const { firstName, lastName } = employee

      return {
        employeeNumber: employee.employeeNumber,
        name: `${firstName} ${lastName}`,
        totalSales,
      }
    })

    topTenEmployees.sort((a, b) => {
      return b.totalSales - a.totalSales
    })

    // Return the top 10 employees by sales
    topTenEmployees = topTenEmployees.slice(0, 10)

    res.json(topTenEmployees)
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
