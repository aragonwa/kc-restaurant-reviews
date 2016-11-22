import React, {PropTypes} from 'react';
import DetailsViolationRow from './DetailsViolationRow';

class DetailsInspectionRow extends React.Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      isOpen: false
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.setState({isOpen:!this.state.isOpen});
  }

  render() {
    const {inspection, formatDate, inspectionIndex} = this.props;

    let opts = {
      dataToggle: null,
      dataTarget: null,
      showIcon: 'hidden',
      clickHandler: null
    };
    let violationRows = [];

    //TODO: create a better key and indexId
    if(inspection.violations.length > 0) {
      opts.dataToggle = 'collapse';
      opts.dataTarget = '.'+inspectionIndex;
      opts.showIcon = 'show';
      //TODO: make sure the fix worked (see below)
      // Remove this to Fix bug with render, but need to figure out how to activate the plus/minus sign
      //opts.clickHandler = this.clickHandler();
      violationRows = inspection.violations.map((item) => {
        return (
          <DetailsViolationRow violation={item} index={inspectionIndex} key={item.violationRecordId} />
        );
      });
    }
    let inspectionRows = [];

    let inspectionType = null;
    switch(Number(inspection.inspectionType)) {
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
      <tr data-toggle={opts.dataToggle} data-target={opts.dataTarget} onClick={this.clickHandler} key={inspection.inspectionSerialNum}>
        <td>{inspectionType}</td>
        <td>{formatDate(inspection.inspectionDate)}</td>
        <td><strong>{inspection.inspectionScore}</strong><span className={"pull-right " + opts.showIcon}><span className={(!this.state.isOpen) ? 'fa fa-plus': 'fa fa-minus'}/></span></td>
      </tr>
    );
    inspectionRows.push(violationRows);

    return (
      <tbody>
        {inspectionRows}
      </tbody>
    );
  }
}
// const DetailsInspectionRow = ({inspection, formatDate, inspectionIndex, activeViolations, inspectionRowOnClick}) => {
//   let opts = {
//     dataToggle: null,
//     dataTarget: null,
//     showIcon: 'hidden',
//     clickHandler: null
//   };
//   let violationRows = [];

//   //TODO: create a better key and indexId
//   if(inspection.violations.length > 0) {
//     opts.dataToggle = 'collapse';
//     opts.dataTarget = '.'+inspectionIndex;
//     opts.showIcon = 'show';
//     // Remove this to Fix bug with render, but need to figure out how to activate the plus/minus sign
//     opts.clickHandler = () => inspectionRowOnClick(inspection.inspectionSerialNum);
//     violationRows = inspection.violations.map((item) => {
//       return (
//         <DetailsViolationRow violation={item} index={inspectionIndex} key={item.violationRecordId} />
//       );
//     });
//   }
//   let inspectionRows = [];

//   let inspectionType = null;
//   switch(Number(inspection.inspectionType)) {
//     case 128:
//       inspectionType = "Routine Inspection/Field Review"; //remove field review
//       break;
//     case 129:
//       inspectionType = "Return Inspection"; // Keep as is
//       break;
//     case 136:
//       inspectionType = "Consultation/Education - Field"; //remove field
//       break;
//   }

//   inspectionRows.push(
//     <tr data-toggle={opts.dataToggle} data-target={opts.dataTarget} onClick={opts.clickHandler} key={inspection.inspectionSerialNum}>
//       <td>{inspectionType}</td>
//       <td>{formatDate(inspection.inspectionDate)}</td>
//       <td><strong>{inspection.inspectionScore}</strong><span className={"pull-right " + opts.showIcon}><span className={(activeViolations.indexOf(inspection.inspectionSerialNum) < 0) ? 'fa fa-plus': 'fa fa-minus'}/></span></td>
//     </tr>
//   );
//   inspectionRows.push(violationRows);

//   return (
//     <tbody>
//       {inspectionRows}
//     </tbody>
//   );
// };

DetailsInspectionRow.propTypes = {
  inspection: PropTypes.object.isRequired,
  formatDate: PropTypes.func.isRequired,
  inspectionIndex: PropTypes.number.isRequired
 // activeViolations: PropTypes.array
 // inspectionRowOnClick: PropTypes.func.isRequired
};

export default DetailsInspectionRow;
