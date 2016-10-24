import React, {PropTypes} from 'react';

const DetailsInspectionRow = ({violation, index}) => {

  return (
    <tr className="collapse" id={index} key={index}>
      <td colSpan="2">{violation.violationDescr} </td>
      <td colSpan="1">{violation.violationPoints}</td>
    </tr>
  );
};

DetailsInspectionRow.propTypes = {

};

export default DetailsInspectionRow;
