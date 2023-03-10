export interface JwtPayload {
    readonly jti: string;
    readonly aud: string;
    readonly sub: string;
    readonly roles: string[];
    readonly iat?: number;
    readonly exp?: number;
}