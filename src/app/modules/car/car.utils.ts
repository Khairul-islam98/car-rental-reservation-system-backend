const convertTimesToHours = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  const minutesToHours = minutes / 60;
  return hours + minutesToHours;
};

export const totalCostCalculation = (
  startTime: string,
  endTime: string,
  pricePerHour: number,
): number => {
  const startHours = convertTimesToHours(startTime);
  const endHours = convertTimesToHours(endTime);
  const timeDuration = endHours - startHours;
  const totalCost = timeDuration * pricePerHour;

  return totalCost;
};
