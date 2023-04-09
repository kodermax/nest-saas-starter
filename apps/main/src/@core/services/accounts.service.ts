import { http } from "./http.service";

export const createAccount = (data: { email: string, password: string }) => http.post(`${process.env.NEXT_PUBLIC_ACCOUNT_URL}/accounts`, data)

