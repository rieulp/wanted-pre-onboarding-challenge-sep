import axios from 'axios';

const fetcher = (api: string) => axios.get(api).then((response) => response.data);
const fetchWithId = (api: string, id: string) => axios.get([api, id].join('/')).then((response) => response.data);
export { fetcher, fetchWithId };
