export interface JwtPayload {
    readonly aud: string;
    readonly exp?: number;
    readonly iat?: number;
    readonly jti: string;
    readonly roles?: string[];
    readonly sub: string;
    readonly tenantUrl?: string;
}