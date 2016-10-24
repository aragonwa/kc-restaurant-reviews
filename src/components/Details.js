import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {getBusinessApi, getInspectionsApi} from '../api/api';
import StringHelper from '../utils/StringHelper';
// https://github.com/minhtranite/react-modal-bootstrap
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';
import DetailsInspectionRow from './DetailsInspectionRow';

class DetailsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    // State for Component
    this.state = {
     isOpen: true,
     business:[],
     inspections:[],
     activeViolations:[]
    };
    this.openModal = this.openModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.inspectionRowOnClick = this.inspectionRowOnClick.bind(this);
  }

  componentDidMount() {
    getBusinessApi(this.props.params.id).then((response) => {
      this.setState({business: response[0]});
    }, function(error) {
      // TODO: Replace with error handler
      console.error("Failed!", error);
    });
    getInspectionsApi(this.props.params.id).then((response) => {
      this.setState({inspections: response});
    }, function(error) {
      // TODO: Replace with error handler
      console.error("Failed!", error);
    });
  }

  componentWillUnmount() {
    this.setState({business:[]});
    this.setState({inspections:[]});
  }

  openModal() {
    this.setState({isOpen: true});
  }

  hideModal(){
    this.setState({isOpen: false});
    browserHistory.push('/');
  }

  formatDate(str){
    const date = str.slice(0, 10).split('-');
    const year = date[0];
    const month = date[1];
    const day = date[2];
    return month + '/' + day +'/' + year;
  }

  inspectionRowOnClick(id){
    let violationState = this.state.activeViolations;

    if(violationState.indexOf(id) < 0) {
      violationState.push(id);
    } else {
      const index = violationState.indexOf(id);
      violationState.splice(index, 1);
    }
    this.setState({activeViolations: violationState});
  }

  render() {
    const {isOpen} = this.state;
    const {business} = this.state;
    const {inspections} = this.state;
    const inspectionsRows = inspections.map((inspection, index) => {
      return (
        <DetailsInspectionRow inspection={inspection} formatDate={this.formatDate} activeViolations={this.state.activeViolations} key={index} inspectionIndex={index} inspectionRowOnClick={this.inspectionRowOnClick}/>
      );
    });

    // for(let i = 0; i < inspections.length;i++) {
    //   let dataToggle = null;
    //   let dataTarget = null;
    //   let rowClass = null;
    //   let showIcon = 'hidden';
    //   let clickHandler = null;
    //   if(inspections[i].violation.length > 0){
    //     dataToggle = 'collapse';
    //     dataTarget = '#'+i;
    //     rowClass = 'info';
    //     showIcon = 'show';
    //     clickHandler = () => this.inspectionRowOnClick(inspections[i].inspection.inspectionSerialNum);
    //   }
    //   inspectionsRows.push(
    //     <tr className={rowClass} data-toggle={dataToggle} data-target={dataTarget} onClick={clickHandler} key={inspections[i].inspection.inspectionSerialNum}>
    //       <td>{inspections[i].inspection.inspectionType}</td>
    //       <td>{this.formatDate(inspections[i].inspection.inspectionDate)}</td>
    //       <td>{inspections[i].inspection.inspectionScore}<span className={"pull-right " + showIcon}><span className={(this.state.activeViolations.indexOf(inspections[i].inspection.inspectionSerialNum) < 0) ? 'fa fa-plus': 'fa fa-minus'}/></span></td>
    //     </tr>
    //     );
    //   if(inspections[i].violation.length > 0){
    //     for(let j = 0; j < inspections[i].violation.length; j++) {
    //       inspectionsRows.push(
    //         <tr className="collapse" id={i} key={i}>
    //           <td colSpan="2">{inspections[i].violation[j].violationDescr} </td>
    //           <td colSpan="1">{inspections[i].violation[j].violationPoints}</td>
    //         </tr>
    //       );
    //     }
    //   }
    // }

    // Replace with show no results or error
    if (business.length === 0) {
       return (
         <Modal isOpen={isOpen} onRequestHide={this.hideModal} size={"modal-lg"}>
          <span className="fa fa-spinner fa-spin fa-4x" />
        </Modal>
      );
    }
    return (
      <Modal isOpen={isOpen} onRequestHide={this.hideModal} size={"modal-lg"}>
        <ModalHeader>
          <ModalClose onClick={this.hideModal}/>
          <ModalTitle>{business.businessName}</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <div className="call-out-text call-out-text-primary m-t-0">
            <div className="row">
              <div className="col-xs-6">
                <p>{StringHelper.capitalCase(business.businessAddress)} <br />
                {business.businessCity}, WA {StringHelper.capitalCase(business.businessLocationZip)}</p>
              </div>
              <div className="col-xs-6">
                <p><span className="fa fa-phone"/> 555-555-5555</p>
              </div>
            </div>
          </div>

            <table className="table table-bordered table-striped table-hover">
              <thead>
                <tr>
                  <th>Inspection type</th>
                  <th>Date</th>
                  <th>Score</th>
                </tr>
              </thead>
              {inspectionsRows}
            </table>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={this.hideModal}>
            Close
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

DetailsPage.propTypes = {
  params: PropTypes.object.isRequired
};

export default DetailsPage;
