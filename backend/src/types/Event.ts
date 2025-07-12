export interface Event {
  id?: number;
  title: string;
  description?: string;
  start_date: Date;
  end_date: Date;
  priority: number;
  created_at?: Date;
  updated_at?: Date;
}
