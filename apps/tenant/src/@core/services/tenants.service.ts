import { http } from "./http.service";

export const getTenantByUrl = () => http.get(`${process.env.NEXT_PUBLIC_ACCOUNT_URL}/tenants`)