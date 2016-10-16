import React, {PropTypes} from 'react';

const TextInput = (props) => {
  const handleChange = (e) => {
    props.onChange(e.target.value);
  };

  return (
  <div>
    <div className="col-sm-12" style={{backgroundColor:'#CCC', marginBottom: '15px'}}>
      <br />
      <label htmlFor="restaurantInput">Restaurant name and location</label>
      <div className="input-group" style={{paddingBottom: '20px'}}>
        <input type="text" className="form-control" id="restaurantInput" placeholder="Location" value={props.value} onChange={handleChange}/>
        <span className="input-group-btn">
          <button className="btn btn-primary" type="button"><span className="fa fa-search" /></button>
        </span>
      </div>
    </div>
  </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default TextInput;
