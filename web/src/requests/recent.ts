import { RecentResponse } from '../models/recent';
import { get } from './common';

async function recent(): Promise<RecentResponse> {
  return get('/recent');
}

export { recent };
