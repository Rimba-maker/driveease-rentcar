export type CarCategory = 'City Car' | 'MPV' | 'SUV' | 'Sedan' | 'Bus';
export type Transmission = 'Manual' | 'Matic';

export interface Car {
  id: string;
  name: string;
  category: CarCategory;
  pricePerDay: number;
  seats: number;
  transmission: Transmission;
  imageUrl: string;
  popular?: boolean;
}

export const cars: Car[] = [
  {
    id: 'c1',
    name: 'Honda Brio Satya',
    category: 'City Car',
    pricePerDay: 280000,
    seats: 5,
    transmission: 'Matic',
    imageUrl: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 'c2',
    name: 'Toyota Avanza 2023',
    category: 'MPV',
    pricePerDay: 350000,
    seats: 7,
    transmission: 'Matic',
    imageUrl: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 'c3',
    name: 'Daihatsu Xenia 2023',
    category: 'MPV',
    pricePerDay: 330000,
    seats: 7,
    transmission: 'Manual',
    imageUrl: 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=800',
    popular: true
  },
  {
    id: 'c4',
    name: 'Toyota Innova Reborn V',
    category: 'SUV',
    pricePerDay: 550000,
    seats: 8,
    transmission: 'Matic',
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 'c5',
    name: 'Toyota Fortuner VRZ',
    category: 'SUV',
    pricePerDay: 750000,
    seats: 7,
    transmission: 'Matic',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 'c6',
    name: 'Mitsubishi Pajero Sport',
    category: 'SUV',
    pricePerDay: 800000,
    seats: 7,
    transmission: 'Matic',
    imageUrl: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 'c7',
    name: 'Toyota Camry 2.5G',
    category: 'Sedan',
    pricePerDay: 950000,
    seats: 5,
    transmission: 'Matic',
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 'c8',
    name: 'Toyota Hiace Premio',
    category: 'Bus',
    pricePerDay: 1200000,
    seats: 16,
    transmission: 'Manual',
    imageUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80',
    popular: true
  }
];
