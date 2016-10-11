import React, {PropTypes} from 'react';
import RestaurantListItem from './RestaurantListItem';

class RestaurantList extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  _capitalCase (str) {
    return str.toLowerCase().replace(/\b[a-z]/g,function(char) { return char.toUpperCase();});
  }
  render() {
    let rows = [];
    let data = this.props.data;
    let len = data.length;
    for(let i=0; i < len; i++){
      let item = data[i];
      item.businessName = this._capitalCase(item.businessName);
      item.businessAddress = this._capitalCase(item.businessAddress);
      item.businessCity = this._capitalCase(item.businessCity);
      rows.push(<RestaurantListItem key={i} item={item} id={i}/>);
    }
  return (
    <div>
      {rows}
    </div>
    );
  }
}
RestaurantList.propTypes = {
  data: PropTypes.array.isRequired
};

export default RestaurantList;
