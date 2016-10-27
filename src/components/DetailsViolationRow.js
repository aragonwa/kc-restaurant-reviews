import React, {PropTypes} from 'react';

const DetailsInspectionRow = ({violation, index}) => {
  //http://stackoverflow.com/questions/4374822/javascript-regexp-remove-all-special-characters
  return (
    <tr className={"collapse " + index} key={index}>
      <td colSpan="2" className="p-l-lg">{violation.violationDescr.replace(/[^\w\s]/gi, '')} </td>
      <td colSpan="1">{violation.violationPoints}</td>
    </tr>
  );
};

DetailsInspectionRow.propTypes = {
  violation: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};

export default DetailsInspectionRow;
