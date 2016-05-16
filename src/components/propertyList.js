import _ from 'lodash';
import React from 'react';
import PropertyCard from './propertyCard';

export default class PropertyList extends React.Component {
  render() {
    let items = _.map(this.props.listings, (item, index) => {
      return <PropertyCard key={index} listing={item} />
    })

    return (
      <section className="property-list">{items}</section>
    )
  }
}