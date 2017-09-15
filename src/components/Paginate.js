import React, {PropTypes} from 'react';
import {PAGER_ITEMS_PER_PAGE as itemsPerPage} from '../constants/appSettings';
import PagerNumbers from './PagerNumbers';

class Paginate extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.decreasePagerNum = this.decreasePagerNum.bind(this);
    this.increasePagerNum = this.increasePagerNum.bind(this);
  }

  decreasePagerNum (e){
    e.preventDefault();
    const {pagerNum} = this.props;
    if(pagerNum <= 1){
      return;
    }
    this.props.decreasePagerNum(pagerNum - 1);
    this.props.setActiveItem(null);
  }

  increasePagerNum (e){
    e.preventDefault();
    const {pagerNum, count} = this.props;
    if(pagerNum * itemsPerPage >= count){
      return;
    }
    this.props.increasePagerNum(pagerNum + 1);
    this.props.setActiveItem(null);
  }

  render() {
    const {pagerNum, count} = this.props;

    let previousDisabledClass = '';
    let nextDisabledClass = '';

    if(pagerNum <= 1) {
      previousDisabledClass = 'previous disabled';
    } else {
      previousDisabledClass = 'previous';
    }
    if(pagerNum * itemsPerPage >= this.props.count) {
      nextDisabledClass = 'next disabled';
    } else {
      nextDisabledClass = 'next';
    }

    return (
      <div>
        <div className="col-xs-6" style={{margin: '20px 0'}}>
          <PagerNumbers pagerNum={pagerNum} itemsPerPage={itemsPerPage} count={count}/>
        </div>
        <div className="col-xs-6">
          <nav className="pull-right">
            <ul className="pagination">
              <li className={previousDisabledClass} onClick={this.decreasePagerNum}><a href="#">Previous</a></li>
              <li className={nextDisabledClass} onClick={this.increasePagerNum}><a href="#">Next</a></li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

Paginate.propTypes = {
  decreasePagerNum: PropTypes.func.isRequired,
  increasePagerNum: PropTypes.func.isRequired,
  pagerNum: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  restaurants: PropTypes.array.isRequired,
  setActiveItem: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number,
  count: PropTypes.number
};

export default Paginate;
