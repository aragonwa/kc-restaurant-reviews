import React, {PropTypes} from 'react';

const DetailsInspectionRow = ({violation, index}) => {

  return (
    <tr className={"collapse " + index} key={index}>
      <td colSpan="2" className="p-l-lg">{violation.violationDescr} </td>
      <td colSpan="1">{violation.violationPoints}</td>
    </tr>
  );
};

DetailsInspectionRow.propTypes = {
  violation: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};

export default DetailsInspectionRow;
