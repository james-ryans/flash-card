interface Recent {
  text: string;
  translation: string;
}

interface RecentResponse {
  data: Recent[];
}

export type { Recent, RecentResponse };
