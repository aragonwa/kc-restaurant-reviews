export default class Ratings {
  static getRatings (num) {
    const rating = {};
    switch (Number(num)) {
      case 1:
      {
        rating.img = 'excellent';
        rating.string = 'Excellent';
        break;
      }
      case 2:
      {
        rating.img = 'good';
        rating.string = 'Good';
        break;
      }
      case 3:
      {
        rating.img = 'okay';
        rating.string = 'Okay';
        break;
      }
      case 4:
      {
        rating.img = 'needstoimprove';
        rating.string = 'Needs to improve';
        break;
      }
    }
    return rating;
  }
}



