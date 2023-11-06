import {Point} from 'geojson';
import {Document, Types} from 'mongoose';

interface Cat extends Document {
  cat_name: string;
  weight: number;
  birthdate: Date;
  owner: Types.ObjectId;
}

export {Cat};
