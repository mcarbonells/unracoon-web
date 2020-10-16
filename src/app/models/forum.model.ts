import { GeneralResponse } from './general-response.model';

export interface Thread {
  _id?: string;
  title: string;
  description: string;
  levelId: string;
  userName: string;
  userId: string;
  active?: boolean;
}

export interface ThreadData {
  allThreads: Thread[];
  createThread: Thread;
}
export interface ThreadResponse extends GeneralResponse {
  data: ThreadData;
}

export interface Entry {
  _id: string;
  message: string;
  threadId: string;
  userName: string;
  userId: string;
  active: boolean;
  isAuthor: boolean;
}

export interface EntryData {
  entryThread: Entry[];
  createEntry: Entry;
}
export interface EntryResponse extends GeneralResponse {
  data: EntryData;
}
