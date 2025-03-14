import { Status } from "@core/enums/Status";
import { Priority } from "@core/enums/Priority";

export interface Task {
  id: number;
  name: string;
  status: Status;
  priority: Priority;
  created_at: Date;
  due_date: Date;
};