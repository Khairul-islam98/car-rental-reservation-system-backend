"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.totalCostCalculation = void 0;
const convertTimesToHours = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const minutesToHours = minutes / 60;
    return hours + minutesToHours;
};
const totalCostCalculation = (startTime, endTime, pricePerHour) => {
    const startHours = convertTimesToHours(startTime);
    const endHours = convertTimesToHours(endTime);
    const timeDuration = endHours - startHours;
    const totalCost = timeDuration * pricePerHour;
    return totalCost;
};
exports.totalCostCalculation = totalCostCalculation;
