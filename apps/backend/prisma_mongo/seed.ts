import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log(`Start seeding ...`)
    await prisma.$connect();
    await prisma.user.deleteMany();
    await prisma.user.create({
        data: {
            email: 'admin@starter.com',
            firstName: 'Admin',
            lastName: 'Starter',
            password: '$2b$10$mpRF.dW4GupwVD3apkH1y.oPvdFrmGELxSebXvanmHrU9sI84aYWi',
            roles: ['Admin']
        },
    })
    await prisma.user.create({
        data: {
            email: 'client@starter.com',
            firstName: 'Client',
            lastName: 'Starter',
            password: '$2b$10$oeMKDFLR.PN4obPdCcufY.SNuilb82PS4yzcSO/FEtyqTeymBcrwq',
            roles: ['User']
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
