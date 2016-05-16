import _ from 'lodash';

export default class StringUtils {
  constructor() {
    this.parseAddress = (addressStr) => {
      let [street, city, stateZip] = addressStr.split(',')
      return {
        street: _.trim(street),
        city: _.trim(city),
        stateZip: _.trim(stateZip)
      }
    }

    this.builtInStr = (yearStr) => {
      if (yearStr) {
        return 'Built in ' + yearStr
      } else {
        return ''
      }
    }

    this.addCommasToNum = (num) => {
      if (num.indexOf(',') > -1) {
        return num
      } else {
        return parseInt(num).toLocaleString()
      }
    }
  }
}