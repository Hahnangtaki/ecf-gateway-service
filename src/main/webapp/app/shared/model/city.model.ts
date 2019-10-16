import { Moment } from 'moment';

export interface ICity {
  id?: number;
  cityCode?: string;
  cityName?: string;
  createSystemDate?: Moment;
  createDate?: Moment;
  createUserId?: number;
  lastModificationSystemDate?: Moment;
  lastModificationDate?: Moment;
  lastModificationUserId?: number;
  provinceId?: number;
}

export const defaultValue: Readonly<ICity> = {};
