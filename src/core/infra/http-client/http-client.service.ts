import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpClientService {
  private http: AxiosInstance;
  constructor(private readonly config: AxiosRequestConfig) {
    this.http = axios.create(this.config);
  }

  async get(url: string, params?: object): Promise<any> {
    try {
      return await this.http.get(url, { params });
    } catch (error) {
      throw error;
    }
  }
  async post(url: string, data: any): Promise<any> {
    try {
      return await this.http.post(url, data);
    } catch (error) {
      throw error;
    }
  }
  async put(url: string, data: any): Promise<any> {
    try {
      return await this.http.put(url, data);
    } catch (error) {
      throw error;
    }
  }
  async delete(url: string): Promise<any> {
    try {
      return await this.http.delete(url);
    } catch (error) {
      throw error;
    }
  }
}
