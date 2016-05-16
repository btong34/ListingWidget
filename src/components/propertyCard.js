import _ from 'lodash';
import React from 'react';
import StringUtils from '../utils/stringUtils'

let stringUtils = new StringUtils()

export default class PropertyCard extends React.Component {
  render() {
    let parsedAddr = stringUtils.parseAddress(this.props.listing.address)
    let builtInYear = stringUtils.builtInStr(this.props.listing.built)

    return (
      <div className="prop-card">
        <div className="box">
          <img className="prop-photo" src={this.props.listing.thumb} />
          <div className="prop-info">
            <p className="built-in">{builtInYear}</p>
            <h3 className="address">{parsedAddr.street}</h3>
            <h3 className="address">{parsedAddr.city}, {parsedAddr.stateZip}</h3>
            <h3 className="price">${stringUtils.addCommasToNum(this.props.listing.price)}</h3>
            <p className="size">{this.props.listing.beds + ' beds \u00b7 ' + this.props.listing.baths + ' baths \u00b7 ' + this.props.listing.sqft + ' sq ft'}</p>
          </div>
        </div>
      </div>
    )
  }
}