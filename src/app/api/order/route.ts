import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const orderItemSchema = z.object({
  slug: z.string().trim().min(1).max(120),
  name: z.string().trim().min(1).max(200),
  qty: z.number().int().min(1).max(99),
  price: z.number().min(0).max(500000),
});

const orderSchema = z.object({
  name: z.string().trim().min(2, "Το όνομα πρέπει να έχει τουλάχιστον 2 χαρακτήρες").max(120),
  phone: z
    .string()
    .trim()
    .min(6, "Το τηλέφωνο πρέπει να έχει τουλάχιστον 6 ψηφία")
    .max(25)
    .regex(/^[0-9+\-\s()]+$/, "Μη έγκυρος αριθμός τηλεφώνου"),
  email: z
    .union([z.string().trim().email("Μη έγκυρο email"), z.literal("")])
    .optional(),
  city: z.string().trim().max(120).optional(),
  contactTime: z.string().trim().max(80).optional(),
  items: z.array(orderItemSchema).min(1, "Το καλάθι είναι κενό").max(50),
  total: z.number().min(0).max(1000000),
  savings: z.number().min(0).max(500000).optional(),
  notes: z.string().trim().max(2000).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = orderSchema.safeParse(body);

    if (!parsed.success) {
      const firstError =
        parsed.error.issues[0]?.message ?? "Μη έγκυρα στοιχεία παραγγελίας";
      return NextResponse.json({ ok: false, error: firstError }, { status: 400 });
    }

    const { name, phone, email, city, contactTime, items, total, savings, notes } =
      parsed.data;

    const order = await db.orderRequest.create({
      data: {
        name,
        phone,
        email: email || null,
        city: city || null,
        contactTime: contactTime || null,
        items: JSON.stringify(items),
        total,
        savings: savings ?? 0,
        notes: notes || null,
      },
    });

    return NextResponse.json({ ok: true, id: order.id });
  } catch (error) {
    console.error("Order form error:", error);
    return NextResponse.json(
      { ok: false, error: "Προέκυψε σφάλμα διακομιστή. Δοκιμάστε ξανά ή καλέστε μας." },
      { status: 500 }
    );
  }
}
