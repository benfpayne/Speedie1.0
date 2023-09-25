import { useEffect, useState } from "react";
import { CarDataClient } from "../CarDataClient";

function useCarDataClient(allSqliteCarRecords: any) {
  const [carMakes, setCarMakes] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [carDescriptions, setCarDescriptions] = useState([]);

  const carDataClient = new CarDataClient(allSqliteCarRecords);

  const fetchCarMakes = async () => {
    const carMakesData = await carDataClient.getCarMakes();
    setCarMakes(carMakesData);
  };

  const fetchCarModels = async (make) => {
    const carModelsData = await carDataClient.getAvailableModelsForMake(make);
    setCarModels(carModelsData);
  };

  const fetchCarDescriptions = async (make, model) => {
    const carDescriptionsData = await carDataClient.getAvailableDescriptions(make, model);
    setCarDescriptions(carDescriptionsData);
  };

  useEffect(() => {
    fetchCarMakes();
  }, []);

  return {
    carMakes,
    carModels,
    carDescriptions,
    fetchCarModels,
    fetchCarDescriptions,
  };
}

export default useCarDataClient;