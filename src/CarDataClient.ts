import { CarRecord } from './components/types/CarRecord';
import { PaymentCalculations } from './components/types/PaymentCalculations';
import { FinanceUtility } from './FinanceUtility';

export class CarDataClient {
  private allCarData: any;

  constructor(allCarData: any) {
    this.allCarData = allCarData;
  }

  getCarMakes() {
    return this.allCarData.distinct;
  }

  getAvailableModelsForMake(make: string): any {
    const availableModels = Array.from(
      new Set(
        this.allCarData.nodes
          .filter((node: any) => node.Make === make)
          .map((node: any) => node.Model)
      )
    );
    return availableModels;
  }

  getAvailableDescriptions(make: string, model: string): any {
    const availableDescriptions = Array.from(
      new Set(
        this.allCarData.nodes
          .filter((node: any) => node.Make === make && node.Model === model)
          .map((node: any) => node.Description)
      )
    );
    return availableDescriptions;
  }

  getCarRecord(make: string, model: string, description: string | null) {
    const carRecord: CarRecord = this.allCarData.nodes.find(
      (node: any) =>
        node.Make === make &&
        node.Model === model &&
        node.Description === description
    );

    return carRecord;
  }

  getAllPaymentCalculations(
    carRecord: CarRecord,
    months: number,
    kilometres: number
  ): PaymentCalculations {
    const financeUtility = new FinanceUtility(carRecord);
    return financeUtility.getAllPaymentCalculations(months, kilometres);
  }

  getPurchasePriceRetail(carRecord: CarRecord) {
    const financeUtility = new FinanceUtility(carRecord);
    return financeUtility.getPurchasePriceRetail();
  }
}
