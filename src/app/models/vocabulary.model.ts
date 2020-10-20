import { GeneralResponse } from './general-response.model';

export interface Category {
  id?: string;
  name: string;
  level: string;
}

export interface CategoryData {
  allCategory: Category[];
  createCategory: Category;
}

export interface CategoryResponse extends GeneralResponse {
  data: CategoryData;
}

export interface Words {
  _id: string;
  name: string,
  category: string,
  image: string,
  linkW: string,
  meaning: string
}

export interface WordsData {
  allWords: Words[];
  createWord: Words;
}
export interface WordsResponse extends GeneralResponse {
  data: WordsData;
}
