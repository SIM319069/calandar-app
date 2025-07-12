export interface Event {
  id?: number;
  title: string;
  description?: string;
  start_date: string;
  end_date: string;
  priority: number;
  created_at?: string;
  updated_at?: string;
}
