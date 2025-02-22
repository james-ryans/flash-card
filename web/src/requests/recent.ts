import axios, { AxiosResponse } from 'axios';

type Recent = {
  text: string;
  translation: string;
};

interface RecentResponse {
  data: Recent[];
}

async function recent(): Promise<AxiosResponse<RecentResponse>> {
  return await axios.get(import.meta.env.VITE_SERVER_BASE_URL + '/recent', {
    withCredentials: true,
  });
}

export { recent };
export type { Recent, RecentResponse };
