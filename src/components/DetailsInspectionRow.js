import React, {PropTypes} from 'react';
import DetailsViolationRow from './DetailsViolationRow';

const DetailsInspectionRow = ({inspection, formatDate, inspectionIndex, activeViolations, inspectionRowOnClick}) => {
  let opts = {
    dataToggle: null,
    dataTarget: null,
    //rowClass: null,
    showIcon: 'hidden',
    clickHandler: null
  };
  let violationRows = [];

  if(inspection.violation.length > 0) {
    opts.dataToggle = 'collapse';
    opts.dataTarget = '.'+inspectionIndex;
    //opts.rowClass = 'info';
    opts.showIcon = 'show';
    opts.clickHandler = () => inspectionRowOnClick(inspection.inspection.inspectionSerialNum);
    violationRows = inspection.violation.map((item) => {
      return (
        <DetailsViolationRow violation={item} index={inspectionIndex} key={item.violationRecordId} />
      );
    });
  }
  let inspectionRows = [];
  inspectionRows.push(
    <tr data-toggle={opts.dataToggle} data-target={opts.dataTarget} onClick={opts.clickHandler} key={inspection.inspection.inspectionSerialNum}>
      <td>{inspection.inspection.inspectionType}</td>
      <td>{formatDate(inspection.inspection.inspectionDate)}</td>
      <td>{inspection.inspection.inspectionScore}<span className={"pull-right " + opts.showIcon}><span className={(activeViolations.indexOf(inspection.inspection.inspectionSerialNum) < 0) ? 'fa fa-plus': 'fa fa-minus'}/></span></td>
    </tr>
  );
  inspectionRows.push(violationRows);

  return (
    <tbody>
      {inspectionRows}
    </tbody>
  );
};

DetailsInspectionRow.propTypes = {
  inspection: PropTypes.object.isRequired,
  formatDate: PropTypes.func.isRequired,
  inspectionIndex: PropTypes.number.isRequired,
  activeViolations: PropTypes.array.isRequired,
  inspectionRowOnClick: PropTypes.func.isRequired
};

export default DetailsInspectionRow;
