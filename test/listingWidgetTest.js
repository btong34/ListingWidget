import React from 'react';
import {mount} from 'enzyme';
import {expect} from 'chai';
import ListingWidget from '../src/components/listingWidget';
import {feed1Data } from './testData';

describe('Listing Widget', () => {
  const jsx = <ListingWidget />;

  describe('inititialization', () => {
    it('renders the sort buttons', () => {
      let component = mount(jsx);
      let sortBtns = component.find('.sort-buttons button');

      expect(sortBtns.at(0).text()).to.eq('Price');
      expect(sortBtns.at(1).text()).to.eq('Beds');
      expect(sortBtns.at(2).text()).to.eq('Sq. ft.');
    })

    it('renders the property list', () => {
      let component = mount(jsx);
      expect(component.find('.property-list')).to.have.length(1);
    })

    it('defaults to sorting by `Price` descending', () => {
      let component = mount(<ListingWidget initData={feed1Data} />);

      expect(component.find('.sort-buttons button').at(0)).to.have.className('active');
      expect(component.find('.property-list .prop-card').at(0).find('.price').text()).to.eq('$600,000');
    })
  })

  describe('`Beds` button', () => {
    let component;
    let bedBtn;

    beforeEach(() => {
      component = mount(<ListingWidget initData={feed1Data} />);
      bedBtn = component.find('.sort-buttons button').at(1);
    })

    describe('clicking once', () => {
      it('sets the button to `active`', () => {
        bedBtn.simulate('click');
        expect(bedBtn).to.have.className('active');
      })

      it('lists properties with the most bedrooms first', () => {
        bedBtn.simulate('click');
        expect(component.find('.property-list .prop-card').at(0).find('.size').text()).to.eq('4 beds · 3 baths ·  sq ft');
      })
    })

    describe('clicking a second time', () => {
      it('remains `active`', () => {
        bedBtn.simulate('click');
        bedBtn.simulate('click');
        expect(bedBtn).to.have.className('active');
      })

      it('lists properties with the fewest bedrooms first', () => {
        bedBtn.simulate('click');
        bedBtn.simulate('click');
        expect(component.find('.property-list .prop-card').at(0).find('.size').text()).to.eq('2 beds · 1 baths · 1500 sq ft');
      })
    })
  })

  describe('items with missing fields when ordering', () => {
    it('get de-prioritized to the end of the list', () => {
      let component = mount(<ListingWidget initData={feed1Data} />);
      let sqftBtn = component.find('.sort-buttons button').at(2);

      sqftBtn.simulate('click');
      expect(component.find('.property-list .prop-card').at(0).find('.size').text()).to.eq('3 beds · 2.5 baths · 2875 sq ft')
      expect(component.find('.property-list .prop-card').at(2).find('.size').text()).to.eq('4 beds · 3 baths ·  sq ft')

      sqftBtn.simulate('click');
      expect(component.find('.property-list .prop-card').at(0).find('.size').text()).to.eq('2 beds · 1 baths · 1500 sq ft')
      expect(component.find('.property-list .prop-card').at(2).find('.size').text()).to.eq('4 beds · 3 baths ·  sq ft')
    })
  })
})