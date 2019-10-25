import * as fs from 'fs';
import { Router } from 'express';

module.exports = ({ config, db }) => {
  let storeLocApi = Router();
  let locDataPath = __dirname + '/store-locations.json';
  
  storeLocApi.get('/', (req, res) => {
    fs.readFile(locDataPath, 'utf8', (err, data) => {
      if (err) {
        console.log(err)
        console.log(__filename)
        throw err;
      }
      res.send(JSON.parse(data));
    });
  })

  return storeLocApi;
};

