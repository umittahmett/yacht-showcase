export interface BoatFilterOption {
  id: string;
  label: string;
  value: string | number;
}

export interface BoatFilterCategory {
  id: string;
  title: string;
  options: BoatFilterOption[];
  type: 'checkbox' | 'range';
}

export const boatFilters: BoatFilterCategory[] = [
  {
    id: 'width',
    title: 'Width',
    type: 'checkbox',
    options: [
      { id: 'width-1', label: 'Under 10 ft', value: 'under-10' },
      { id: 'width-2', label: '10-15 ft', value: '10-15' },
      { id: 'width-3', label: '15-20 ft', value: '15-20' },
      { id: 'width-4', label: '20-25 ft', value: '20-25' },
      { id: 'width-5', label: 'Over 25 ft', value: 'over-25' },
    ],
  },
  {
    id: 'height',
    title: 'Height',
    type: 'checkbox',
    options: [
      { id: 'height-1', label: 'Under 8 ft', value: 'under-8' },
      { id: 'height-2', label: '8-12 ft', value: '8-12' },
      { id: 'height-3', label: '12-16 ft', value: '12-16' },
      { id: 'height-4', label: '16-20 ft', value: '16-20' },
      { id: 'height-5', label: 'Over 20 ft', value: 'over-20' },
    ],
  },
  {
    id: 'crew',
    title: 'Crew',
    type: 'checkbox',
    options: [
      { id: 'crew-1', label: 'No crew required', value: 'none' },
      { id: 'crew-2', label: '1 crew member', value: '1' },
      { id: 'crew-3', label: '2 crew members', value: '2' },
      { id: 'crew-4', label: '3+ crew members', value: '3+' },
    ],
  },
  {
    id: 'capacity',
    title: 'Passenger Capacity',
    type: 'checkbox',
    options: [
      { id: 'capacity-1', label: '1-4 passengers', value: '1-4' },
      { id: 'capacity-2', label: '5-8 passengers', value: '5-8' },
      { id: 'capacity-3', label: '9-12 passengers', value: '9-12' },
      { id: 'capacity-4', label: '13-20 passengers', value: '13-20' },
      { id: 'capacity-5', label: '20+ passengers', value: '20+' },
    ],
  },
  {
    id: 'location',
    title: 'Location',
    type: 'checkbox',
    options: [
      { id: 'location-1', label: 'Miami Beach', value: 'miami-beach' },
      { id: 'location-2', label: 'Fort Lauderdale', value: 'fort-lauderdale' },
      { id: 'location-3', label: 'Key West', value: 'key-west' },
      { id: 'location-4', label: 'Tampa Bay', value: 'tampa-bay' },
      { id: 'location-5', label: 'Naples', value: 'naples' },
      { id: 'location-6', label: 'Sarasota', value: 'sarasota' },
      { id: 'location-7', label: 'Destin', value: 'destin' },
      { id: 'location-8', label: 'Panama City', value: 'panama-city' },
    ],
  },
  {
    id: 'price-range',
    title: 'Price Range (per day)',
    type: 'checkbox',
    options: [
      { id: 'price-1', label: 'Under $500', value: 'under-500' },
      { id: 'price-2', label: '$500 - $1,000', value: '500-1000' },
      { id: 'price-3', label: '$1,000 - $2,000', value: '1000-2000' },
      { id: 'price-4', label: '$2,000 - $5,000', value: '2000-5000' },
      { id: 'price-5', label: '$5,000 - $10,000', value: '5000-10000' },
      { id: 'price-6', label: 'Over $10,000', value: 'over-10000' },
    ],
  },
];

export interface BoatFilters {
  width: string[];
  height: string[];
  crew: string[];
  capacity: string[];
  location: string[];
  priceRange: string[];
}

export const initialBoatFilters: BoatFilters = {
  width: [],
  height: [],
  crew: [],
  capacity: [],
  location: [],
  priceRange: [],
}; 