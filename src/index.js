import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import ListingWidget from 'components/listingWidget';
import DataUtils from 'utils/dataUtils';

let dataUtils = new DataUtils();

const batUrl = '../../data/batmanRealty.json';
const superUrl = '../../data/supermanRealty.json';

let batPromise = axios.get(batUrl)
let superPromise = axios.get(superUrl)

axios.all([batPromise, superPromise])
  .then(axios.spread((batData, superData) => {
    let compList = dataUtils.flattenAndUniqComps(superData.data.items, dataUtils.batDataFormatter(batData.data))
    render(<ListingWidget initData={compList} />, document.getElementById('listing-widget'));
  })
)
