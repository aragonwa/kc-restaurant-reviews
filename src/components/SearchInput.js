import React, { PropTypes } from 'react';
import SearchInputDropdown from './SearchInputDropdown';
import SearchInputFilterDropdown from './SearchInputFilterDropdown';
import { Popover, OverlayTrigger } from 'react-bootstrap';

class SearchInput extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      textVal: this.props.searchTerm || '',
      searchType: 'name'
      // inputError: false
    };
    this.restaurantReviewsFilterKeyUp = this.restaurantReviewsFilterKeyUp.bind(this);
    this.searchInputKeypress = this.searchInputKeypress.bind(this);
    this.searchInputOnClick = this.searchInputOnClick.bind(this);
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.setSearchType = this.setSearchType.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchTerm) {
      this.setState({ textVal: nextProps.searchTerm });
    }
  }

  restaurantReviewsFilterKeyUp(e) {
    if (e.charCode === 13) {
      this.updateSearch();
    }
  }

  searchInputKeypress(e) {
    if (e.charCode === 13 && !this.state.inputError) {
      this.updateSearch();
    } else {
      this.setState({ textVal: e.target.value });
    }
  }

  searchInputOnClick() {
    this.updateSearch();
  }
  setSearchType(type) {
    this.setState({ searchType: type });
    this.setState({ textVal: '' });
    this.props.setSearchType(type);
  }

  clearSearch() {
    this.props.updateSearchTerm('');
    this.setState({ textVal: '' });
    this.props.setRatingFilter(1234);
    // this.props.history.push('/');
  }

  updateSearchTerm() {
    this.props.updateSearchTerm(this.state.textVal);
    // this.props.setActiveItem(null);
    // this.props.history.push('/search/' + this.state.textVal);
  }
  updateSearch(){
    this.props.setActiveItem(null);
    const {textVal} = this.state;
    this.updateSearchTerm();
    this.props.searchRestaurants(textVal, true);
  }

  render() {
    const { textVal, inputError, searchType } = this.state;
    const filters = ((this.props.ratingFilter+"").split("")).map(num => Number(num));
    const popoverRatingFilter = (
      <Popover id="inspection-type-popover">
        <SearchInputFilterDropdown setRatingFilter={this.props.setRatingFilter} ratingFilter={this.props.ratingFilter} />
      </Popover>
      );

    // TODO: move to function above
    let searchTypeText;
    switch (searchType) {
      case 'name':
        searchTypeText = 'Restaurant name ';
        break;
      case 'zip':
        searchTypeText = 'Zip code ';
        break;
      case 'city':
        searchTypeText = 'City ';
        break;
    }
    return (
      <div>
        <div className="col-sm-12 location-input">
          <label htmlFor="restaurantInput">Search</label>
          <div className={(inputError) ? 'has-error' : ''}>
            <div className="input-group">
              <SearchInputDropdown searchTypeText={searchTypeText} setSearchType={this.setSearchType} searchType={searchType}/>
              <input type="text" className="form-control" id="restaurantInput" placeholder="Search"
              value={textVal} onChange={this.searchInputKeypress} onKeyPress={this.restaurantReviewsFilterKeyUp} />
              <span className="input-group-btn">
                <button className={(inputError) ? 'btn btn-danger' : 'btn btn-primary'} type="button" onClick={this.searchInputOnClick} aria-label="Search restaurant inspections"><span className="fa fa-search" /></button>
              </span>
            </div>
            <label className={'help-block text-danger ' + ((inputError) ? 'show' : 'hidden')} htmlFor="restaurantInput">Enter at least 2 characters</label>
          </div>
          <button style={{  marginRight: "10px" }} className={'btn btn-danger btn-xs' + ((textVal) ? '' : ' hidden')} onClick={this.clearSearch} type="button">Clear search</button>
          <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popoverRatingFilter} >
            <span className="fa fa-sliders" style={{paddingRight: "3px", marginBottom: '15px'}} />
          </OverlayTrigger>
          {filters.map(rating =>{
              if(rating === 1) return (<img alt="Excellent" key={rating} style={{paddingRight: "3px", display:'inline'}} src={require('../assets/img/excellent_25.gif')} />);
              if(rating === 2) return (<img key={rating} style={{paddingRight: "3px", display:'inline'}} alt="Good" src={require('../assets/img/good_25.gif')} />);
              if(rating === 3) return (<img key={rating} style={{paddingRight: "3px", display:'inline'}} alt="Okay" src={require('../assets/img/okay_25.gif')} />);
              if(rating === 4) return (<img key={rating} style={{paddingRight: "3px", display:'inline'}} alt="Needs to improve" src={require('../assets/img/needstoimprove_25.gif')}/>);
            })
          }
        </div>
      </div>
    );
  }
}

SearchInput.propTypes = {
  name: PropTypes.string.isRequired,
  updateSearchTerm: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  setActiveItem: PropTypes.func.isRequired,
  setSearchType: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  history: React.PropTypes.object,
  searchTerm: PropTypes.string,
  searchRestaurants: PropTypes.func,
  searchCity: PropTypes.func,
  searchZip: PropTypes.func,
  setRatingFilter: PropTypes.func,
  ratingFilter: PropTypes.number
};

export default SearchInput;
