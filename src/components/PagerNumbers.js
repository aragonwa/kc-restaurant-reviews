import React from 'react';
import PropTypes from 'prop-types';

class PagerNumbers extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render(){
    const {pagerNum, itemsPerPage, count} = this.props;
    const itemsStart = 1 + (itemsPerPage  * (pagerNum - 1));
    const itemsEnd = itemsPerPage * pagerNum;

    return (
      <span>
      Showing {itemsStart}-{(count < itemsEnd)? count:itemsEnd} of {count}
      </span>
    );
  }

}

PagerNumbers.propTypes = {
  pagerNum: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
}
export default PagerNumbers;
