import { http } from "./http.service";

export const createAccount = (data: { email: string, password: string }) => http.post(`${process.env.NEXT_PUBLIC_ACCOUNT_URL}/accounts`, data)

export const parseRegToken = () => http.get(`${process.env.NEXT_PUBLIC_ACCOUNT_URL}/accounts/reg-token`)

export const verifyEmailCode = (code: string) => http.post(`${process.env.NEXT_PUBLIC_ACCOUNT_URL}/accounts/verify-email-code`, { code })