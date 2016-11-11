export default class Ratings {
  static getRatings (num) {
    const rating = {};
    switch (num) {
      case 1:
      {
        rating.icon = 'fa-smile-o';
        rating.string = 'Satisfactory';
        break;
      }
      case 2:
      {
        rating.icon = 'fa-meh-o';
        rating.string = 'On warning';
        break;
      }
      case 3:
      {
        rating.icon = 'fa-frown-o';
        rating.string = 'Unsatisfactory';
        break;
      }
    }
    return rating;
  }
}



