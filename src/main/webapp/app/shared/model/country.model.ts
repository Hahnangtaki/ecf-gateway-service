import { Moment } from 'moment';
import { IProvince } from 'app/shared/model/province.model';

export interface ICountry {
  id?: number;
  countryCode?: string;
  countryName?: string;
  nationality?: string;
  createSystemDate?: Moment;
  createDate?: Moment;
  createUserId?: number;
  lastModificationSystemDate?: Moment;
  lastModificationDate?: Moment;
  lastModificationUserId?: number;
  provinces?: IProvince[];
}

export const defaultValue: Readonly<ICountry> = {};
