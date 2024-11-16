import z from 'zod'
export const userSchema = z.object({
    name: z.string().nonempty("Ism majburiy"),
    email: z.string().email("Yaroqli email kiriting"),
    password: z.string().min(6, "Parol kamida 6 belgidan iborat bo'lishi kerak"),
    role: z.enum(["user", "admin"]).default("user"),
    phone_number: z.string().regex(/^998[0-9]{9}$/, "Yaroqli telefon raqami kiriting"),
})