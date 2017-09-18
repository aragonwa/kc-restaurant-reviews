import React from 'react';
import PropTypes from 'prop-types';

class RestaurantReviewFilterPanel extends React.Component  {
  constructor(props, context) {
    super(props, context);
    this.state = {
      // Highlight all by default
      filters: []
    };
    this.toggleSelected = this.toggleSelected.bind(this);
    this.applyFilters = this.applyFilters.bind(this);
  }

  componentWillMount(){
    const filters = (this.props.ratingFilter+"").split("");
    this.setState({filters: filters.map(num => Number(num))});
  }
  applyFilters() {
    this.props.setRatingFilter(this.state.filters.join(''));
    this.props.displaySlider();
  }

  toggleSelected (rating) {
    const currRatings = this.state.filters;
    if(currRatings.includes(rating)){
      if(currRatings.length - 1 <= 0) return;
      currRatings.splice(currRatings.indexOf(rating), 1);
    } else {
      currRatings.push(rating);
    }
    this.setState({filters: currRatings});
  }
  render() {
    const ratings = [{ rating: 1, text: 'Excellent', img: 'excellent' }, { rating: 2, text: 'Good', img: 'good' }, { rating: 3, text: 'Okay', img: 'okay' }, { rating: 4, text: 'Needs To Improve', img: 'needstoimprove' }];
  return (
    <div>
      {
        ratings.map(rating => {
          return (
            <div className="media" key={rating.rating}>
              <div className="media-left">
                <img onClick={() => { this.toggleSelected(rating.rating);}} className={"media-object rating-img " + ((this.state.filters).includes(rating.rating)? 'rating-img-selected': '')} alt={rating.text} src={require('../assets/img/' + rating.img + '_50.gif')} />
              </div>
              <div className="media-body">
                <p className="media-heading h4" style={{ marginTop: "15px" }}>{rating.text}</p>
              </div>
            </div>
          );
        })
      }
      <br />
      <button className="m-t pull-right btn btn-primary"  onClick={this.applyFilters}>Apply</button>
   </div>
  );
}
}

RestaurantReviewFilterPanel.propTypes = {
  setRatingFilter: PropTypes.func.isRequired,
  ratingFilter: PropTypes.num,
  displaySlider: PropTypes.bool.isRequired
};

export default RestaurantReviewFilterPanel;
