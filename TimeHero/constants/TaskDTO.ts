import { CompletionType } from "./CompletionType"

export interface TaskDTO {
    id: string;
    time: number | null;
    metric: number | null;
    completionType: CompletionType;
    label: string;
    steps: string[]; 
    taskType: string;
  }