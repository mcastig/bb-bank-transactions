export interface Transaction {
  [key: string]: any;
  categoryCode: string;
  dates: {
    valueDate: number;
  };
  transaction: {
    amountCurrency: {
      amount: number;
      currencyCode: string;
    };
    type: string;
    creditDebitIndicator: string;
  };
  merchant: {
    name: string;
    logo: string;
    accountNumber: string;
  };
}
