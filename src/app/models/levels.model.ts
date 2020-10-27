import { GeneralResponse } from './general-response.model';

export interface Classification {
  id?: number;
  level: string;
  type: string;
}

export interface ClassificationData {
  allClassification: Classification[];
  createClassification: Classification;
}

export interface ClassificationResponse extends GeneralResponse {
  data: ClassificationData;
}

export interface Progress {
  id?: number;
  type: string;
  name: string;
  advance: number;
  enable: boolean;
}

export interface ProgressData {
  allProgress: Progress[];
  createProgress: Progress;
}
export interface ProgressResponse extends GeneralResponse {
  data: ProgressData;
}