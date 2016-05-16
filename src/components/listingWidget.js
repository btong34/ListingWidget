import _ from 'lodash';
import React from 'react';
import PropertyList from './propertyList';
import SortButtons from './sortButtons';
import DataUtils from '../utils/dataUtils';

const SORT_OPTIONS = [
  { label: 'Price', fieldName: 'price' },
  { label: 'Beds', fieldName: 'beds' },
  { label: 'Sq. ft.', fieldName: 'sqft' }
]

let dataUtils = new DataUtils()

export default class ListingWidget extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      listings: this.props.initData || [],
      sortBy: 'price',
      sortDir: 'desc'
    }
  }

  componentDidMount() {
    this.setState({
      listings: _.orderBy(this.state.listings, this.state.sortBy, this.state.sortDir)
    })
  }

  // Flips order by direction on repeat clicks, otherwise sets order direction to descending
  toggleDirection(option) {
    let direction = this.state.sortDir
    let isRepeatClick = this.state.sortBy === option.fieldName

    if (direction === 'desc' && isRepeatClick) {
      return 'asc'
    } else if (direction === 'asc' && isRepeatClick) {
      return 'desc'
    } else {
      return 'desc'
    }
  }

  // Respond to user clicks on sort buttons by resetting state
  toggleSort(option) {
    let sortDir = this.toggleDirection(option)

    this.setState({
      listings: _.orderBy(this.state.listings, option.fieldName, sortDir),
      sortBy: option.fieldName,
      sortDir: sortDir
    })
  }

  render() {
    return (
      <div className="listing-widget">
        <h1 className="title">Awesome Listings Widget</h1>
        <SortButtons options={SORT_OPTIONS}
                     active={this.state.sortBy}
                     direction={this.state.sortDir}
                     sortCallback={this.toggleSort.bind(this)} />
        <PropertyList listings={this.state.listings} />
      </div>
    )
  }
}