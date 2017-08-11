import React from 'react';
import PropTypes from 'prop-types';

const SearchInputDropDown = ({ searchTypeText, setSearchType, searchType }) => {
  //TODO: MOVE TO STYLESHEET
  const styles = { borderBottom: 'none' };
  const items = [{ type: 'name', text: 'Restaurant name' }, { type: 'city', text: 'City' }, { type: 'zip', text: 'Zip' }].map((type) => {
    return (
      <li key={type.text} className={(searchType === type.type) ? 'active' : ''}>
        <a href="#" style={styles}
          onClick={(e) => {
            e.preventDefault;
            return setSearchType(type.type);
          }}>
          {type.text}
        </a>
      </li>
    );
  });

  return (
    <div className="input-group-btn">
      <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{searchTypeText}<span className="fa fa-chevron-down" /></button>
      <ul className="dropdown-menu">
        {items}
      </ul>
    </div>
  );
};

SearchInputDropDown.propTypes = {
  searchTypeText: PropTypes.string.isRequired,
  setSearchType: PropTypes.func.isRequired,
  searchType: PropTypes.string.isRequired
};

export default SearchInputDropDown;
