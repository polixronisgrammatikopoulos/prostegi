import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const contactSchema = z.object({
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
  systemType: z.string().trim().max(80).optional(),
  message: z.string().trim().max(2000).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const firstError =
        parsed.error.issues[0]?.message ?? "Μη έγκυρα στοιχεία φόρμας";
      return NextResponse.json({ ok: false, error: firstError }, { status: 400 });
    }

    const { name, phone, email, systemType, message } = parsed.data;

    const lead = await db.contactLead.create({
      data: {
        name,
        phone,
        email: email || null,
        systemType: systemType || null,
        message: message || null,
      },
    });

    return NextResponse.json({ ok: true, id: lead.id });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { ok: false, error: "Προέκυψε σφάλμα διακομιστή. Δοκιμάστε ξανά ή καλέστε μας." },
      { status: 500 }
    );
  }
}
