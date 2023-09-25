export class LoanConstants {
  static BALLOON_PAYMENT_BUFFER = 0.08;
  static INTEREST_PERIODS_PER_YEAR = 12;
  static INTEREST_RATE = 0.07;
  static INTEREST_RATE_PER_PERIOD =
    LoanConstants.INTEREST_RATE / LoanConstants.INTEREST_PERIODS_PER_YEAR;
  static NUMBER_OF_PERIODS = 36;
  static BROKERAGE_FEE = 0.0085;
  static RETURN_CAR_COST = 0;
  static NO_CAR_LOANS = 20000;
  static AVERAGE_CAR_LOAN = 50000;
}
