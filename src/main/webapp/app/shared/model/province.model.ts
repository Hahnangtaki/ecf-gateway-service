import { Moment } from 'moment';
import { ICity } from 'app/shared/model/city.model';

export interface IProvince {
  id?: number;
  provinceCode?: string;
  provinceName?: string;
  createSystemDate?: Moment;
  createDate?: Moment;
  createUserId?: number;
  lastModificationSystemDate?: Moment;
  lastModificationDate?: Moment;
  lastModificationUserId?: number;
  cities?: ICity[];
  countryId?: number;
}

export const defaultValue: Readonly<IProvince> = {};
