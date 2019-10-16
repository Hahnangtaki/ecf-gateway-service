import { Moment } from 'moment';

export interface ICategory {
  id?: number;
  catCode?: string;
  catName?: string;
  createSystemDate?: Moment;
  createDate?: Moment;
  createUserId?: number;
  lastModificationSystemDate?: Moment;
  lastModificationDate?: Moment;
  lastModificationUserId?: number;
}

export const defaultValue: Readonly<ICategory> = {};
