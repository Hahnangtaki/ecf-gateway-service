import { Moment } from 'moment';
import { ICompanyBank } from 'app/shared/model/company-bank.model';

export interface IBank {
  id?: number;
  bankCode?: string;
  bankName?: string;
  initialName?: string;
  biCode?: string;
  swiftCode?: string;
  createSystemDate?: Moment;
  createDate?: Moment;
  createUserId?: number;
  lastModificationSystemDate?: Moment;
  lastModificationDate?: Moment;
  lastModificationUserId?: number;
  companyBanks?: ICompanyBank[];
}

export const defaultValue: Readonly<IBank> = {};
