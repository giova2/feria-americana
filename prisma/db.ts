import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;

// here we handle connection close
export const handlePostQueryActions = async () => {
  try {
    await prisma.$disconnect()
  } catch (error) {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  }  
}

// wrapper to make sure we close the connection after we make our query
// also, we could handle any previous actions we may need to execute before the query execution
export const queryDBHandler = async <TypeQueryReturn>(query: () => TypeQueryReturn, autoDisconnect: boolean = true): Promise<TypeQueryReturn> => {
  try {
    return await query()
  } catch (error) {
    console.error(error)
    throw new Error("an error occurred while fetching the data");
  }finally{
    if (autoDisconnect) {
      await handlePostQueryActions()
    }
  }

}