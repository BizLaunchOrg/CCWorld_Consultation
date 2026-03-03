export interface Profile {
  id: string;
  role: 'client' | 'admin';
  name: string | null;
  avatar_url: string | null;
  email: string | null;
  created_at: string;
  updated_at: string;
}
