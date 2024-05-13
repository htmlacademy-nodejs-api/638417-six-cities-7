import dayjs from 'dayjs';

import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/index.js';
import { generateRandomValue, getRandomBoolean, getRandomItem, getRandomItems } from '../../helpers/index.js';
import { CITIES } from '../../../constants/constants.js';
import { Amenities, City, Housing, UserType } from '../../enums/index.js';

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const MIN_ROOMS = 1;
const MAX_ROOMS = 8;

const MIN_GUESTS = 1;
const MAX_GUESTS = 10;

const MIN_RATING = 1;
const MAX_RATING = 5;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) { }
  public generate(): string {
    const title = getRandomItem(this.mockData.titles);
    const description = getRandomItem(this.mockData.descriptions);
    const publicDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const city = getRandomItem(Object.keys(City));
    const previewImage = getRandomItem(this.mockData.previewImages);
    const propertyImages = getRandomItems(this.mockData.photos).join(';');
    const premium = getRandomBoolean();
    const favorite = getRandomBoolean();
    const rating = generateRandomValue(MIN_RATING, MAX_RATING);
    const housingType = getRandomItem(Object.keys(Housing));
    const numberOfRooms = generateRandomValue(MIN_ROOMS, MAX_ROOMS);
    const numberOfGuests = generateRandomValue(MIN_GUESTS, MAX_GUESTS);
    const rentalCost = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const amenities = getRandomItems(Object.keys(Amenities)).join(';');
    const user = getRandomItem(this.mockData.user);
    const userType = getRandomItem(Object.keys(UserType));
    const comments = generateRandomValue(0, 15);
    const cityLocation = CITIES[city as keyof typeof City];

    const generateLocation = (lt: number, ln: number) => {
      const uncertaintyRadius = 0.005;
      const newLt = Math.round((Math.random() * ((lt + uncertaintyRadius) - (lt - uncertaintyRadius)) + (lt - uncertaintyRadius)) * 100000) / 100000;
      const newLn = Math.round(Math.random() * ((ln + uncertaintyRadius) - (ln - uncertaintyRadius)) + (ln - uncertaintyRadius) * 100000) / 100000;

      return `${newLt};${newLn}`;
    };

    return [
      title,
      description,
      publicDate,
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
      user.name,
      user.email,
      user.avatar,
      userType,
      comments,
      generateLocation(cityLocation.lt, cityLocation.ln)
    ].join('\t');
  }
}
