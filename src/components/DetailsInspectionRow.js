import React, {PropTypes} from 'react';
import DetailsViolationRow from './DetailsViolationRow';

const DetailsInspectionRow = ({inspection, formatDate, inspectionIndex, activeViolations, inspectionRowOnClick}) => {
  let opts = {
    dataToggle: null,
    dataTarget: null,
    showIcon: 'hidden',
    clickHandler: null
  };
  let violationRows = [];

  //TODO: create a better key and indexId
  if(inspection.violation.length > 0) {
    opts.dataToggle = 'collapse';
    opts.dataTarget = '.'+inspectionIndex;
    opts.showIcon = 'show';
    opts.clickHandler = () => inspectionRowOnClick(inspection.inspection.inspectionSerialNum);
    violationRows = inspection.violation.map((item) => {
      return (
        <DetailsViolationRow violation={item} index={inspectionIndex} key={item.violationRecordId} />
      );
    });
  }
  let inspectionRows = [];

  let inspectionType = null;
  switch(Number(inspection.inspection.inspectionType)) {
    case 128:
      inspectionType = "Routine Inspection/Field Review"; //remove field review
      break;
    case 129:
      inspectionType = "Return Inspection"; // Keep as is
      break;
    case 136:
      inspectionType = "Consultation/Education - Field"; //remove field
      break;
  }

  inspectionRows.push(
    <tr data-toggle={opts.dataToggle} data-target={opts.dataTarget} onClick={opts.clickHandler} key={inspection.inspection.inspectionSerialNum}>
      <td>{inspectionType}</td>
      <td>{formatDate(inspection.inspection.inspectionDate)}</td>
      <td><strong>{inspection.inspection.inspectionScore}</strong><span className={"pull-right " + opts.showIcon}><span className={(activeViolations.indexOf(inspection.inspection.inspectionSerialNum) < 0) ? 'fa fa-plus': 'fa fa-minus'}/></span></td>
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
  activeViolations: PropTypes.array,
  inspectionRowOnClick: PropTypes.func.isRequired
};

export default DetailsInspectionRow;