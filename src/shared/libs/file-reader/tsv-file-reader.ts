import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { Offer, User, Location } from '../../types/index.js';
import { City, UserType, Housing } from '../../enums/index.js';

export class TSVFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384; // 16KB

  constructor(
    private readonly filename: string
  ) {
    super();
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

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);
        this.emit('line', parsedOffer);
      }
    }

    this.emit('end', importedRowCount);
  }
}
