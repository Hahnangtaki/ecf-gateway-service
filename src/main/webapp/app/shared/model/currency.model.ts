import { Moment } from 'moment';
import { ICompanyBank } from 'app/shared/model/company-bank.model';

export interface ICurrency {
  id?: number;
  currencyCode?: string;
  currencyName?: string;
  currencySymbol?: string;
  createSystemDate?: Moment;
  createDate?: Moment;
  createUserId?: number;
  lastModificationSystemDate?: Moment;
  lastModificationDate?: Moment;
  lastModificationUserId?: number;
  companyBanks?: ICompanyBank[];
}

export const defaultValue: Readonly<ICurrency> = {};
