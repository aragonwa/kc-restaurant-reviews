import React, {PropTypes} from 'react';
var _ = require('underscore');

class Paginate extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.decreasePagerNum = this.decreasePagerNum.bind(this);
    this.increasePagerNum = this.increasePagerNum.bind(this);
  }

  decreasePagerNum (e){
    e.preventDefault();
    const pagerNum = this.props.pagerNum;
    if(pagerNum <= 1){
      return
    }
    this.props.decreasePagerNum(pagerNum - 1)
  }

  increasePagerNum (e){
    e.preventDefault();
    if(this.props.pagerNum * this.props.itemsPerPage >= this.props.restaurants.length){
      return
    }
    this.props.increasePagerNum(this.props.pagerNum + 1);
  }

  render() {
    const {pagerNum} = this.props;
    const {restaurants} = this.props;
    const itemsPerPage = 10;
    let paginationItems = [];

    let itemsStart = (((pagerNum-1) * 10) + 1);
    let itemsEnd = (itemsStart + _.first((_.rest(restaurants, [(pagerNum - 1) * itemsPerPage])), itemsPerPage).length) - 1;
    let activePageNumClass = '';
    let paginationVisible;
    let previousDisabledClass = '';
    let nextDisabledClass = '';

    if(pagerNum <= 1) {
      previousDisabledClass = 'previous disabled';
    } else {
      previousDisabledClass = 'previous';
    }
    if(pagerNum * itemsPerPage >= restaurants.length) {
      nextDisabledClass = 'next disabled';
    } else {
      nextDisabledClass = 'next';
    }

    for(let i = 0; i < Math.ceil(restaurants.length/itemsPerPage); i++) {
      //If page num is equal to current page add class .active
      if(pagerNum === (i+1))
      {
        activePageNumClass = 'active';
      } else {
        activePageNumClass = '';
      }
      paginationItems.push(<li key={i} className={activePageNumClass}><a href="#" data-page-id={i}>{i+1}</a></li>)
    };

    return (
      <div className="col-xs-12">
        <nav className="center-block">
          <ul className="pagination">
            <li className={previousDisabledClass} onClick={this.decreasePagerNum}><a href="#">Previous</a></li>
            {paginationItems}
            <li className={nextDisabledClass} onClick={this.increasePagerNum}><a href="#">Next</a></li>
          </ul>
        </nav>
      </div>
    );
  }
}

Paginate.propTypes = {

};

export default Paginate;
