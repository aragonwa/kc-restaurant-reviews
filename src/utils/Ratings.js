export default class Ratings {
  static getRatings (num) {
    const rating = {};
    switch (num) {
      case 1:
      {
        rating.img = 'excellent';
        rating.string = 'Excellent';
        break;
      }
      case 2:
      {
        rating.img = 'fair';
        rating.string = 'Fair';
        break;
      }
      case 3:
      {
        rating.img = 'good';
        rating.string = 'Good';
        break;
      }
      case 4:
      {
        rating.img = 'needs_improvement';
        rating.string = 'Needs improvement';
        break;
      }
    }
    return rating;
  }
}



