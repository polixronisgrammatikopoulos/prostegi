import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();
p.contactLead.deleteMany({ where: { phone: '6912345678' } }).then(r => { console.log('deleted', r.count); return p.$disconnect(); }).catch(e => { console.error(e.message); process.exit(1); });
