/* eslint-disable @typescript-eslint/no-redeclare */

import * as t from 'io-ts';
import { PathReporter } from 'io-ts/lib/PathReporter'

import planetsJSON from './data/planets-array-simple.json';
import planetsCorruptedJSON from './data/planets-array-corrupted.json';
import { isLeft } from 'fp-ts/lib/Either';

type Planet = t.TypeOf<typeof Planet>;
const Planet = t.intersection([
  t.type({
    name: t.string,
    films: t.array(t.string),
    url: t.string,
  }),
  t.partial({
    climate: t.string,
    gravity: t.string,
  })
]);

type Planets = t.TypeOf<typeof Planets>;
const Planets = t.array(Planet);

// this is more readable in pure TS
type PureTSPlanets = {
  name: string,
  climate?: string,
  gravity?: string,
  films: string[],
  url: string,
}[];



const validationResult = Planets.decode(planetsCorruptedJSON);
// const validationResult = Planets.decode(planetsJSON);


// validationResult is some fancy functional programming "Either" object
// Left is bad, Right is good
if (isLeft(validationResult)) {
  console.log('planetsData has an error');
  console.log(PathReporter.report(validationResult));

} else {
  console.log('planetsData passed validation');

  const planets : PureTSPlanets = validationResult.right;
  console.log(JSON.stringify(planets, null, 2));
}
