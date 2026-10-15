import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
const leads = await db.contactLead.findMany({ orderBy: { createdAt: "desc" }, take: 2 });
console.log(JSON.stringify(leads, null, 2));
const ids = leads.filter(l => l.name === "Μαρία Ιωάννου").map(l => l.id);
if (ids.length) {
  await db.contactLead.deleteMany({ where: { id: { in: ids } } });
  console.log("cleaned:", ids);
}
await db.$disconnect();
