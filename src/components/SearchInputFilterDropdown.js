import React from "react";
import PropTypes from "prop-types";

class SearchInputFilterDropdown extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      // Highlight all by default
      filters: []
    };
    this.toggleChecked = this.toggleChecked.bind(this);
    this.applyFilters = this.applyFilters.bind(this);
    this.selectAll = this.selectAll.bind(this);
  }

  componentWillMount(){
    const filters = (this.props.ratingFilter+"").split("");
    this.setState({filters: filters.map(num => Number(num))});
  }
  applyFilters() {
    const currRatings = this.state.filters;
    if(currRatings.includes(0)){currRatings.splice(currRatings.indexOf(0), 1);}
    this.props.setRatingFilter(Number(this.state.filters.join('')));
  }
  selectAll(){
    this.setState({filters: []});
    this.setState({filters: [1,2,3,4]});
  }
  toggleChecked (event) {
    const currRatings = this.state.filters;
    if(currRatings.includes(Number(event.target.name))){
      if(currRatings.length - 1 <= 0) return;
      currRatings.splice(currRatings.indexOf(Number(event.target.name)), 1);
    } else {
      currRatings.push(Number(event.target.name));
    }
    this.setState({filters: currRatings});
  }
  render() {
    const ratings = [
      { rating: 1, text: "Excellent", img: "excellent" },
      { rating: 2, text: "Good", img: "good" },
      { rating: 3, text: "Okay", img: "okay" },
      { rating: 4, text: "Needs To Improve", img: "needstoimprove" }
    ];

    return (
      <ul className="list-unstyled">
        {ratings.map(rating => {
          return (
            <li style={{ paddingBottom: "5px" }} key={rating.text}>
              <input name={rating.rating} type="checkbox" aria-label={rating.text} onChange={this.toggleChecked} checked={(this.state.filters).includes(rating.rating)} />&nbsp;
              <img
                style={{display:'inline'}}
                alt={rating.text}
                src={require("../assets/img/" + rating.img + "_25.gif")}
              />{" "}
              {rating.text}
            </li>
          );
        })}
        <br />
        <button className="btn btn-default" onClick={this.selectAll}>
          Select all
        </button>&nbsp;&nbsp;&nbsp;
        <button className="btn btn-primary" disabled={this.state.filters.includes(0) && (this.state.filters.length === 1)} onClick={this.applyFilters}>Apply</button>
      </ul>
    );
  }
}

SearchInputFilterDropdown.propTypes = {
  ratingFilter:PropTypes.number.isRequired,
  setRatingFilter: PropTypes.func.isRequired
};

export default SearchInputFilterDropdown;
