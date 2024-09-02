export type TCar = {
  name: string;
  image: string;
  location: string;
  description: string;
  color: string;
  isElectric: boolean;
  status: 'available' | 'unavailable';
  features: string[];
  pricePerHour: number;
  isDeleted: boolean;
  model: string;
  carType: string;
};
