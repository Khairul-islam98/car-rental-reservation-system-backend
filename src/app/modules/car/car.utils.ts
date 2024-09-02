// Helper function to convert time in "HH:MM" format to hours
const convertTimesToHours = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  const minutesToHours = minutes / 60;
  return hours + minutesToHours; // Returns the total hours
};

// Function to calculate the total cost
export const totalCostCalculation = (
  startTime: string,
  endTime: string,
  pricePerHour: number,
): number => {
  const startHours = convertTimesToHours(startTime);
  const endHours = convertTimesToHours(endTime);

  // Calculate the duration in hours
  const timeDuration = endHours - startHours;

  // Ensure time duration is not negative
  if (timeDuration < 0) {
    throw new Error('End time must be later than start time.');
  }

  // Calculate the total cost
  const totalCost = timeDuration * pricePerHour;
  return parseFloat(totalCost.toFixed(2)); // Returns total cost rounded to 2 decimal places
};

// Example usage
// const startTime = '10:30';
// const endTime = '14:15';
// const pricePerHour = 385.38333333331144;

// const totalCost = totalCostCalculation(startTime, endTime, pricePerHour);
// console.log(`Total Cost: $${totalCost}`);
