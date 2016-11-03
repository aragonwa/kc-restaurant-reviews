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
}



