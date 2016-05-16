import _ from 'lodash';

export default class DataUtils {
  constructor() {
    this.batDataFormatter = (data) => {
      return _.map(data, (info, address) => {
        return {
          address: address,
          price: info.cost,
          beds: info.beds,
          baths: info.baths,
          sqft: info.sq_ft,
          built: info.built,
          thumb: info.img,
          url: info.url
        }
      })
    }

    this.flattenAndUniqComps = (...comps) => {
      return _.chain(comps)
        .compact()
        .flatten()
        .uniqBy('address') // not ideal; this would be better if we could unique by something like `zpid`
        .value()
    }
  }
}