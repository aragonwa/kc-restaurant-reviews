import _ from 'underscore';
import {PAGER_ITEMS_PER_PAGE as itemsPerPage} from '../constants/appSettings';

export default class Filters {
  static filterRestaurants (items, filter) {
    return items.filter((item) => {
       return item.businessName.toLowerCase().includes(filter.toLowerCase());
    });
  }
  static filterPagerItems (displayRows, pagerNum) {
    return _.first((_.rest(displayRows, [(pagerNum - 1) * itemsPerPage])), itemsPerPage);
  }
  // TODO: Convert to ES6
  static shuffle (sourceArray) {
    for (let i = 0; i < sourceArray.length - 1; i++) {
        let j = i + Math.floor(Math.random() * (sourceArray.length - i));

        let temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
  }
  static alphaSort (items) {
    items.sort((a,b) => {
      if(a.businessName.toLowerCase() < b.businessName.toLowerCase()) return -1;
      if(a.businessName.toLowerCase() > b.businessName.toLowerCase()) return 1;
      return 0;
    });
    return items;
  }
}



