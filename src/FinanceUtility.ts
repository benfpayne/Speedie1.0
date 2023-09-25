import { CarRecord } from './components/types/CarRecord';
import { PaymentCalculations } from './components/types/PaymentCalculations';
import { LoanConstants } from './FinanceSettings';

function convertCurrencyToNumber(currencyString: string) {
  // Remove dollar sign ($) and commas from the string
  if (currencyString === undefined) return 0;
  const cleanedString = currencyString.replace(/\$|,/g, '');
  // Parse the cleaned string as a float or integer
  const numericValue = parseFloat(cleanedString);
  return numericValue;
}

export class FinanceUtility {
  private carRecord: CarRecord;
  private depositPercentage = 0.1;

  constructor(carRecord: CarRecord) {
    this.carRecord = carRecord;
  }

  getFinanceTerms(months: number, kilometres: number) {
    return {
      purchasePriceRetail: this.getPurchasePriceRetail(),
      depositAmount: this.getDepositAmount(),
      financeAmount: this.getFinanceAmount(),
      optifineEndOfTermValuation: this.getOptifineEndOfTermValuation(
        months,
        kilometres
      )
    };
  }

  getAllPaymentCalculations(
    months: number,
    kilometres: number
  ): PaymentCalculations {
    return {
      purchasePriceRetail: this.getPurchasePriceRetail(),
      depositAmount: this.getDepositAmount(),
      depreciationAdjustment: this.getDepreciationAdjustment(
        months,
        kilometres
      ),
      residualValueForCustomer: this.getResidualValueForCustomer(
        months,
        kilometres
      ),
      depreciationForCustomer: this.getDepreciationForCustomer(
        months,
        kilometres
      ),
      depreciationForCustomerPercentage:
        this.getDepreciationForCustomerPercentage(months, kilometres),
      actualDepreciationPercentage: this.getActualDepreciationPercentage(
        months,
        kilometres
      ),
      interestOverLifeOfTerm: this.getInterestOverLifeOfTerm(months),
      totalPaymentOverTerm: this.getTotalPaymentOverTerm(months, kilometres),
      balloonPayment: this.getBalloonPayment(months, kilometres),
      totalFinanceAgreementCost: this.getTotalFinanceAgreementCost(
        months,
        kilometres
      ),
      interestPerPeriod: this.getInterestPerPeriod(months),
      depreciationPerPeriod: this.getDepreciationPerPeriod(months, kilometres),
      totalPaymentPerPeriod: this.getTotalPaymentPerPeriod(months, kilometres),
      contributionToPrinciplePerPeriod:
        this.getContributionToPrinciplePerPeriod(months),
      comparisonPPPForRegularFinance:
        this.getComparisonPPPForRegularFinance(months)
    };
  }

  getPurchasePriceRetail() {
    const rrpincGST = convertCurrencyToNumber(this.carRecord.RRPincGST);
    return rrpincGST;
  }

  getDepositAmount() {
    return Math.round(this.depositPercentage * this.getPurchasePriceRetail());
  }

  getFinanceAmount() {
    return this.getPurchasePriceRetail() - this.getDepositAmount();
  }

  getOptifineEndOfTermValuation(months: number, kilometres: number) {
    const loanTerm = months;
    const kilometerValue = kilometres;

    let fieldKey = '';
    if (loanTerm === 12) {
      fieldKey = `_12_${kilometerValue}km`;
    } else if (loanTerm === 24) {
      fieldKey = `_24_${kilometerValue}km`;
    } else if (loanTerm === 36) {
      fieldKey = `_36_${kilometerValue}km`;
    } else if (loanTerm === 48) {
      fieldKey = `_48_${kilometerValue}km`;
    }

    // Access the corresponding field value from carRecord
    const optifineEndOfTermValuation = convertCurrencyToNumber(
      this.carRecord[fieldKey]
    );
    return optifineEndOfTermValuation;
  }

  getDepreciationAdjustment(months: number, kilometres: number) {
    return Math.round(
      -1 *
        this.getOptifineEndOfTermValuation(months, kilometres) *
        LoanConstants.BALLOON_PAYMENT_BUFFER
    );
  }

  getResidualValueForCustomer(months: number, kilometres: number) {
    const optifineEndOfTermValuation = this.getOptifineEndOfTermValuation(
      months,
      kilometres
    );
    const depreciationAdjustment = this.getDepreciationAdjustment(
      months,
      kilometres
    );
    return Math.round(optifineEndOfTermValuation + depreciationAdjustment);
  }

  getDepreciationForCustomer(months: number, kilometres: number) {
    const rrpincGST = this.getPurchasePriceRetail();
    const residualValueForCustomer = this.getResidualValueForCustomer(
      months,
      kilometres
    );
    return Math.round(rrpincGST - residualValueForCustomer);
  }

  getDepreciationForCustomerPercentage(months: number, kilometres: number) {
    const depreciationForCustomer = this.getDepreciationForCustomer(
      months,
      kilometres
    );
    const financeAmount = this.getFinanceAmount();
    return Math.round((depreciationForCustomer / financeAmount) * 100);
  }

  getActualDepreciationPercentage(months: number, kilometres: number) {
    const purchasePriceRetail = this.getPurchasePriceRetail();
    const optifineEndOfTermValuation = this.getOptifineEndOfTermValuation(
      months,
      kilometres
    );
    return Math.round(
      ((purchasePriceRetail - optifineEndOfTermValuation) /
        purchasePriceRetail) *
        100
    );
  }

  getInterestOverLifeOfTerm(months: number) {
    const financeAmount = this.getFinanceAmount();
    return Math.round(
      financeAmount * LoanConstants.INTEREST_RATE_PER_PERIOD * months
    );
  }

  getTotalPaymentOverTerm(months: number, kilometres: number) {
    const interestOverLifeOfTerm = this.getInterestOverLifeOfTerm(months);
    const depreciationForCustomer = this.getDepreciationForCustomer(
      months,
      kilometres
    );
    return Math.round(interestOverLifeOfTerm + depreciationForCustomer);
  }

  getBalloonPayment(months: number, kilometres: number) {
    const residualValueForCustomer = this.getResidualValueForCustomer(
      months,
      kilometres
    );
    return Math.round(residualValueForCustomer);
  }

  getTotalFinanceAgreementCost(months: number, kilometres: number) {
    const totalPaymentOverTerm = this.getTotalPaymentOverTerm(
      months,
      kilometres
    );
    const balloonPayment = this.getBalloonPayment(months, kilometres);
    return Math.round(totalPaymentOverTerm + balloonPayment);
  }

  getInterestPerPeriod(months: number) {
    const interestOverLifeOfTerm = this.getInterestOverLifeOfTerm(months);
    return Math.round(interestOverLifeOfTerm / LoanConstants.NUMBER_OF_PERIODS);
  }

  getDepreciationPerPeriod(months: number, kilometres: number) {
    const depreciationForCustomer = this.getDepreciationForCustomer(
      months,
      kilometres
    );
    return Math.round(
      depreciationForCustomer / LoanConstants.NUMBER_OF_PERIODS
    );
  }

  getTotalPaymentPerPeriod(months: number, kilometres: number) {
    const interestPerPeriod = this.getInterestPerPeriod(months);
    const depreciationPerPeriod = this.getDepreciationPerPeriod(
      months,
      kilometres
    );
    return Math.round((interestPerPeriod + depreciationPerPeriod) / 4);
  }

  getContributionToPrinciplePerPeriod(months: number) {
    const financeAmount = this.getFinanceAmount();
    return Math.round(financeAmount / months);
  }

  getComparisonPPPForRegularFinance(months: number) {
    const interestPerPeriod = this.getInterestPerPeriod(months);
    const contributionToPrinciplePerPeriod =
      this.getContributionToPrinciplePerPeriod(months);
    return Math.round(
      (interestPerPeriod + contributionToPrinciplePerPeriod) / 4
    );
  }
}
