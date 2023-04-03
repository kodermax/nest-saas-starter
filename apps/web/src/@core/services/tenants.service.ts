import { http } from "./http.service";

export const checkAvailability = (domain: string) => http.post(`${process.env.NEXT_PUBLIC_ACCOUNT_URL}/tenants/check-availability`, { domain })

export const createTenant = (data: { domain: string, name: string }) => http.post(`${process.env.NEXT_PUBLIC_ACCOUNT_URL}/tenants`, { ...data })