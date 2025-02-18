import { prisma, queryDBHandler } from "@prisma/db";


export const getUser = async (userId: string) => {
  const query = async () => {
    const user = await prisma.user.findFirst({
      where: {
        id: userId
      }
    })
    return user
  }
  return await queryDBHandler(query)
}

export const getUserFromEmail = async (userEmail: string) => {
  const query = async () => {
    const user = await prisma.user.findFirst({
      where: {
        email: userEmail
      }
    })
    return user
  }
  return await queryDBHandler(query)
}

export const createUser = async (data) => {
  const query = async () => {
    const user = await prisma.user.create({
      data
    })
    return user
  }
  return await queryDBHandler(query)
}
