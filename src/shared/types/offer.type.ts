import { CityType } from './city-type.enum.js';
import { Comment } from './comment.type.js';
import { HousingType } from './housing-type.enum.js';
import { User } from './user.type.js';

export type Offer = {
  name: string;
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
  comments: Comment[];
  coordinates: {
      latitude: number;
      longitude: number;
  };
}
