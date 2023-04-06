import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

class Http {
    private instance: AxiosInstance | null = null
    private get http(): AxiosInstance {
        return this.instance != null ? this.instance : this.initHttp()
    }

    initHttp() {
        const http = axios.create({
            withCredentials: true
        })

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
}

export const http = new Http()
