import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

type AxiosRequestConfigWithRetry = AxiosRequestConfig & { _retry: boolean }

class Http {
    private instance: AxiosInstance | null = null
    private isAlreadyFetchingAccessToken = false
    private get http(): AxiosInstance {
        return this.instance != null ? this.instance : this.initHttp()
    }

    initHttp() {
        const http = axios.create({
            baseURL: process.env.NEXT_PUBLIC_MAIN_API,
            withCredentials: true
        })

        http.interceptors.response.use(
            response => response,
            error => {
                return this.handleError(error)
            }
        )

        this.instance = http

        return http
    }

    request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
        return this.http.request(config)
    }

    get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.http.get<T, R>(url, config)
    }

    post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
        return this.http.post<T, R>(url, data, config)
    }

    put<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
        return this.http.put<T, R>(url, data, config)
    }

    delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.http.delete<T, R>(url, config)
    }

    refreshToken() {
        return this.http.get('/auth/refresh')
    }

    private async handleError(error: any) {
        const originalRequest: AxiosRequestConfigWithRetry = error.config as AxiosRequestConfigWithRetry
        if (error.response.status === 401 && !originalRequest._retry) {
            if (!this.isAlreadyFetchingAccessToken) {
                this.isAlreadyFetchingAccessToken = true
                originalRequest._retry = true
                try {
                    await this.refreshToken()
                } catch (error) {
                    //logout()
                }
                this.isAlreadyFetchingAccessToken = false

                return axios.request(originalRequest)
            }
        }

        return Promise.reject(error)
    }
}

export const http = new Http()
