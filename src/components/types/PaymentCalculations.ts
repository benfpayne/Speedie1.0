export interface PaymentCalculations {
  purchasePriceRetail: number;
  depositAmount: number;
  depreciationAdjustment: number;
  residualValueForCustomer: number;
  depreciationForCustomer: number;
  depreciationForCustomerPercentage: number;
  actualDepreciationPercentage: number;
  interestOverLifeOfTerm: number;
  totalPaymentOverTerm: number;
  balloonPayment: number;
  totalFinanceAgreementCost: number;
  interestPerPeriod: number;
  depreciationPerPeriod: number;
  totalPaymentPerPeriod: number;
  contributionToPrinciplePerPeriod: number;
  comparisonPPPForRegularFinance: number;
}
