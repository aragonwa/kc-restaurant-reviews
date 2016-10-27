import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {getBusinessApi, getInspectionsApi} from '../api/api';
import StringHelper from '../utils/StringHelper';
// import _ from 'underscore';
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
     activeViolations:[],
     loading: true,
     errorLoading: false
    };
    this.openModal = this.openModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.inspectionRowOnClick = this.inspectionRowOnClick.bind(this);
  }

  componentDidMount() {
    getBusinessApi(this.props.params.id).then((response) => {
      this.setState({loading: false});
      this.setState({business: response[0]});
    }).catch(error=> {
      this.setState({errorLoading: true});
      this.setState({loading: false});
      throw(error);
    });
    getInspectionsApi(this.props.params.id).then((response) => {
        this.setState({loading: false});
        this.setState({inspections: response});
      }).catch(error=> {
        this.setState({errorLoading: true});
        this.setState({loading: false});
        throw(error);
    });
  }

  componentWillUnmount() {
    this.setState({loading: true});
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
    const {loading} = this.state;
    const {errorLoading} = this.state;

    if (loading) {
       return (
         <Modal isOpen={isOpen} onRequestHide={this.hideModal} size={"modal-lg"}>
          <div  className="text-center">
            <span className="fa fa-spinner fa-spin fa-4x" />
          </div>
        </Modal>
      );
    }
    if (errorLoading || business.length <= 0) {
       return (
         <Modal isOpen={isOpen} onRequestHide={this.hideModal} size={"modal-lg"}>
          <div className="col-sm-12">
            <div className="alert alert-danger"><h2>An error occured while loading restaurant information.</h2></div>
          </div>
        </Modal>
      );
    }

    let inspectionsBySerialNum = inspections.reduce(function(arr, item) {
      const key = item.inspection.inspectionSerialNum;
      arr[key] = arr[key] || [];
      arr[key].push(item);
      return arr;
    }, []);
    let transformedObj = [];
    Object.keys(inspectionsBySerialNum).forEach((element) => {
      let obj = {};
      let violations = [];
      inspectionsBySerialNum[element].forEach((element) => {
        if(element.violation[0]) {
          violations.push(element.violation[0]);
        }
      });
      obj.violation = violations;
      obj.inspection = inspectionsBySerialNum[element][0].inspection;
      transformedObj.push(obj);
    }, this);

    // console.log(inspections);
    // console.log(transformedObj);
    const inspectionsRows = transformedObj.map((inspection, index) => {
      return (
        <DetailsInspectionRow inspection={inspection} formatDate={this.formatDate} activeViolations={this.state.activeViolations} key={index} inspectionIndex={index} inspectionRowOnClick={this.inspectionRowOnClick}/>
      );
    });

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
                {StringHelper.capitalCase(business.businessCity)}, WA {business.businessLocationZip}</p>
              </div>
              <div className="col-xs-6">
                <p><span className="fa fa-phone"/> 555-555-5555</p>
              </div>
            </div>
          </div>

            <table className="table table-bordered table-hover">
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
