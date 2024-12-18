export interface User {
  id: number;
  name: string;
  username: string;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
}
