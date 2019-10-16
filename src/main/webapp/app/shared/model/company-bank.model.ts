import { Moment } from 'moment';

export interface ICompanyBank {
  id?: number;
  bankAccountNo?: string;
  bankAccountName?: string;
  bankBranch?: string;
  status?: string;
  createSystemDate?: Moment;
  createDate?: Moment;
  createUserId?: number;
  lastModificationSystemDate?: Moment;
  lastModificationDate?: Moment;
  lastModificationUserId?: number;
  bankId?: number;
  currencyId?: number;
}

export const defaultValue: Readonly<ICompanyBank> = {};
