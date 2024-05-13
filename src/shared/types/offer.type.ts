import { City } from '../enums/city.enum.js';
import { Housing } from '../enums/housing.enum.js';
import { Location} from './location.type.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  publicationDate: Date;
  city:  City;
  previewImage: string;
  propertyImages: string[];
  premium: boolean;
  favorite: boolean;
  rating: number;
  housingType: Housing;
  numberOfRooms: number;
  numberOfGuests: number;
  rentalCost: number;
  amenities: string[];
  author: User;
  comments: number;
  coordinates: Location;
}
