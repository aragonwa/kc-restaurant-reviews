import React, { PropTypes } from 'react';
import Paginate from '../containers/Paginate';

const App = (props) => {
//{props.children && React.cloneElement(props.children, {data: data})}
  return (
      <div>
        {props.children}
        <Paginate />
      </div>
    );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
