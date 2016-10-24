export default class Filters {
  static filterRestaurants (items, filter) {
    return items.filter((item) => {
       return item.businessName.toLowerCase().includes(filter.toLowerCase());
    });
  }
}



