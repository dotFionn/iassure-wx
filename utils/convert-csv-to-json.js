/**
 * This script can be used to convert a csv-file to the json format required by the wx-config.json
 * 
 * the csv needs to follow the following format: <FIX>,<LAT>,<LON>
 */

const fs = require('fs');

const points = fs
  .readFileSync('./fixes.csv')
  .toString()
  .split('\n')
  .map(str => str.split(','))
  .map(data => ({
    name: data[0],
    lat: Number(data[1]),
    lon: Number(data[2]),
  }));

fs.writeFileSync('./fixes.json', JSON.stringify(points, undefined, 2));
