import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

const fetcher = (url: string, config?: AxiosRequestConfig) => axios.get(url, config).then((response) => response.data);

export { fetcher };
