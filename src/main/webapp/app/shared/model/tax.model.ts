import { Moment } from 'moment';

export interface ITax {
  id?: number;
  taxCode?: string;
  shortDesc?: string;
  longDesc?: string;
  createSystemDate?: Moment;
  createDate?: Moment;
  createUserId?: number;
  lastModificationSystemDate?: Moment;
  lastModificationDate?: Moment;
  lastModificationUserId?: number;
}

export const defaultValue: Readonly<ITax> = {};
