import { CityType } from './city-type.enum.js';
import { HousingType } from './housing-type.enum.js';
import { Location } from './location.type.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  publicationDate: Date;
  city: CityType;
  previewImage: string;
  propertyImages: string[];
  premium: boolean;
  favorite: boolean;
  rating: number;
  housingType: HousingType;
  numberOfRooms: number;
  numberOfGuests: number;
  rentalCost: number;
  amenities: string[];
  author: User;
  comments: number;
  coordinates: Location;
}
