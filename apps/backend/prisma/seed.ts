import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log(`Start seeding ...`)
    await prisma.user.deleteMany();
    await prisma.user.create({
        data: {
            email: 'admin@starter.com',
            firstName: 'Admin',
            password: '$2b$10$X.h5/Xl14i5C9J2wx3mjKODi6WoyhZnfk9vaiVIQa8VYiO3wWvbJ6',
            role: 'ADMIN'
        },
    })
    await prisma.user.create({
        data: {
            email: 'client@starter.com',
            firstName: 'Client',
            password: '$2b$10$c8XyRQ4JY99GY6ICVhuWhOPhYw7JocldbA4hH4otqKibYnBTL3X..',
            role: 'USER'
        },
    })
    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
