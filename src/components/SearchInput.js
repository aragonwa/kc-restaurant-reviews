import React, {PropTypes} from 'react';

class SearchInput extends React.Component {
  constructor (props, context) {
    super(props, context);
      this.state = {
      textVal: ''
    };
    this.restaurantReviewsFilterKeyUp = this.restaurantReviewsFilterKeyUp.bind(this);
    this.searchInputKeypress = this.searchInputKeypress.bind(this);
    this.searchInputOnClick = this.searchInputOnClick.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
  }

  restaurantReviewsFilterKeyUp(e) {
    if (e.charCode === 13) {
      this.updateFilter();
    }
  }

  searchInputKeypress(e) {
     if (e.charCode==13) {
       this.updateFilter(this.state.textVal);
    } else {
      this.setState({textVal: e.target.value});
    }
  }

  searchInputOnClick() {
     this.updateFilter();
  }

  updateFilter() {
    this.props.updateFilter(this.state.textVal);
  }

  render() {
    const {textVal} = this.state;
    return (
    <div>
      <div className="col-sm-12 location-input">
        <br />
        <label htmlFor="restaurantInput">Restaurant name</label>
        <div className="input-group">
          <input type="text" className="form-control" id="restaurantInput" placeholder="Name" value={textVal} onChange={this.searchInputKeypress} onKeyPress={this.restaurantReviewsFilterKeyUp}/>
          <span className="input-group-btn">
            <button className="btn btn-primary" type="button" onClick={this.searchInputOnClick}><span className="fa fa-search" /></button>
          </span>
        </div>
      </div>
    </div>
    );
  }
}

SearchInput.propTypes = {
  name: PropTypes.string.isRequired,
  updateFilter: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default SearchInput;
