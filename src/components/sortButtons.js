import _ from 'lodash';
import React from 'react';

export default class SortButtons extends React.Component {
  setActive(sortOption) {
    this.props.sortCallback(sortOption)
  }

  checkIsActive(sortOption, currentSortBy) {
    return sortOption.fieldName === currentSortBy ? 'active' : ''
  }

  render() {
    let sortButtons = _.map(this.props.options, (opt, index) => {
      return <button key={index}
                     onClick={this.setActive.bind(this, opt)}
                     className={`${this.checkIsActive(opt, this.props.active)} ${this.props.direction}`}>{opt.label}
             </button>
    })

    return (
      <section className="sort-buttons">{sortButtons}</section>
    )
  }
}