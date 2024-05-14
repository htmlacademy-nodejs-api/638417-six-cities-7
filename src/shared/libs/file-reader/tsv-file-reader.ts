import { FileReader } from './file-reader.interface.js';
import { Offer } from '../../types/offer.type.js';
import { User } from '../../types/user.type.js';
import { Location } from '../../types/location.type.js';
import { City } from '../../enums/index.js';
import { Housing } from '../../enums/index.js';
import { UserType } from '../../enums/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) { }

  private validateRawData(): void {
    if (!this.rawData) {
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
      name,
      email,
      avatarPath,
      type,
      comments,
      coordinates
    ] = line.split('\t');

    return {
      title,
      description,
      publicationDate: new Date(publicationDate),
      city: city as City,
      previewImage,
      propertyImages: this.parseImages(propertyImages),
      premium: Boolean(premium),
      favorite: Boolean(favorite),
      rating: Number(rating),
      housingType: housingType as Housing,
      numberOfRooms: Number(numberOfRooms),
      numberOfGuests: Number(numberOfGuests),
      rentalCost: this.parsePrice(rentalCost),
      amenities: this.parseAmenities(amenities),
      author: this.parseUser(name, email, avatarPath, type as UserType),
      comments: Number.parseInt(comments, 10),
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

  private parseUser(name: string, email: string, avatarPath: string, type: UserType): User {
    return { name, email, avatarPath, type };
  }

  private parseLocation(location: string): Location {
    const [lt, ln] = location.split(';');

    return {
      lt: Number(lt),
      ln: Number(ln),
    };
  }

  public read(): void {
    // Рефакторим метод импорта из файла
  }

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
