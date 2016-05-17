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

    // Deprioritize entries that have no value for a field we want to sort by
    // by pulling it out, sorting by a given field, then adding it back at the end of the list
    this.orderBy = (list, field, direction) => {
      let nilForField = _.remove(list, (item) => {
        return _.isEmpty(item[field])
      })

      let newList = _.orderBy(list, field, direction)
      newList.push(nilForField)

      return _.flatten(newList)
    }
  }
}