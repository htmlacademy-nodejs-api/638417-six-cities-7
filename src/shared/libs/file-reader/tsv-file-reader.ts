import { readFileSync } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { Offer } from '../../types/offer.type.js';
import { User } from '../../types/user.type.js';
import { CityType } from '../../types/city-type.enum.js';
import { UserType } from '../../types/user-type.enum.js';
import { HousingType } from '../../types/housing-type.enum.js';
import { Location } from '../../types/location.type.js';
import { Comment } from '../../types/comment.type.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  private validateRawData(): void {
    if (! this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): Offer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }


  private parseLineToOffer(line: string): Offer {
    const [
      title,
      description,
      publicationDate,
      city,
      previewImage,
      propertyImages,
      premium,
      favorite,
      rating,
      housingType,
      numberOfRooms,
      numberOfGuests,
      rentalCost,
      amenities,
      name, email, avatarPath, password, type,
      comments,
      coordinates
    ] = line.split('\t');

    return {
      title,
      description,
      publicationDate: new Date(publicationDate),
      city: city as CityType,
      previewImage,
      propertyImages: this.parseImages(propertyImages),
      premium: Boolean(premium),
      favorite:  Boolean(favorite),
      rating: Number(rating),
      housingType: housingType as HousingType,
      numberOfRooms: Number(numberOfRooms),
      numberOfGuests: Number(numberOfGuests),
      rentalCost: this.parsePrice(rentalCost),
      amenities: this.parseAmenities(amenities),
      author: this.parseUser(name, email, avatarPath, password, type as UserType),
      comments: JSON.parse(comments) as Comment[],
      coordinates: this.parseLocation(coordinates)
    };
  }


  private parseImages(propertyImages: string): string[] {
    return propertyImages.split(';');
  }

  private parsePrice(priceString: string): number {
    return Number.parseInt(priceString, 10);
  }

  private parseAmenities(amenities: string): string[] {
    return amenities.split(';');
  }

  private parseUser(name: string, email: string, avatarPath: string, password: string, type: UserType): User {
    return { name, email, avatarPath, password, type };
  }

  private parseLocation(location: string):Location {
    const [lt, ln] = location.split(';');

    return {
      lt: Number.parseInt(lt, 10),
      ln:  Number.parseInt(ln, 10),
    };
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
