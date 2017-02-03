import React, {PropTypes} from 'react';
// import {browserHistory} from 'react-router';
import {getBusinessApi, getInspectionsApi} from '../api/api';
import StringHelper from '../utils/StringHelper';
import Ratings from '../utils/Ratings';
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
      business: [],
      inspections: [],
      //activeViolations: [],
      loading: true,
      inspectionsLoading: true,
      errorLoading: false
    };
    this.openModal = this.openModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    //this.inspectionRowOnClick = this.inspectionRowOnClick.bind(this);
  }

  componentDidMount() {
    getBusinessApi(this.props.params.id).then((response) => {
      this.setState({loading: false});
      this.setState({business: response[0]});
    }).catch(error=> {
      this.setState({errorLoading: true});
      this.setState({loading: false});
      throw(error+'1');
    });
    getInspectionsApi(this.props.params.id).then((response) => {
      this.setState({loading: false, inspectionsLoading: false});
      this.setState({inspections: response});
    }).catch(error=> {
      this.setState({errorLoading: true});
      this.setState({loading: false});
      throw(error);
    });
  }

  componentWillUnmount() {
    this.setState({loading: true});
    this.setState({business: []});
    this.setState({inspections: []});
  }

  openModal() {
    this.setState({isOpen: true});
  }

  hideModal() {
    this.setState({isOpen: false});
    //browserHistory.push('/');
    this.props.history.push('/');
  }

  formatDate(str) {
    const date = str.slice(0, 10).split('-');
    const year = date[0];
    const month = date[1];
    const day = date[2];
    return month + '/' + day + '/' + year;
  }

  // inspectionRowOnClick(id) {
  //   let violationState = this.state.activeViolations;

  //   if (violationState.indexOf(id) < 0) {
  //     violationState.push(id);
  //   } else {
  //     const index = violationState.indexOf(id);
  //     violationState.splice(index, 1);
  //   }
  //   this.setState({activeViolations: violationState});
  // }

  render() {
    const {isOpen, business, inspections, loading, errorLoading, inspectionsLoading} = this.state;
    const rating = Ratings.getRatings(business.businessGrade);

    //TODO: add to stylesheet
    const style = {display: 'inline'};

    if (loading) {
      return (
        <Modal isOpen={isOpen} onRequestHide={this.hideModal} size={"modal-lg"}>
          <div className="text-center">
            <span className="fa fa-spinner fa-spin fa-4x"/>
          </div>
        </Modal>
      );
    }
    if (errorLoading || business.length <= 0) {
      return (
        <Modal isOpen={isOpen} onRequestHide={this.hideModal} size={"modal-lg"}>
          <div className="col-sm-12">
            <div className="alert alert-danger"><h2>An error occurred while loading restaurant information.</h2></div>
          </div>
        </Modal>
      );
    }

    //Sort inspections by Date
    inspections.sort(function(a,b){
      return new Date(b.inspectionDate) - new Date(a.inspectionDate);
    });

    let inspectionsRows = '';
    if(inspectionsLoading) {
      inspectionsRows = (
        <div className="text-center">
          <span className="fa fa-spinner fa-spin fa-4x"/>
        </div>
      );
    } else {
      const x = inspections.map((inspection, index) => {
        return (
          <DetailsInspectionRow
            inspection={inspection}
            formatDate={this.formatDate}
            key={index}
            inspectionIndex={index}
          />
        );
      });
      inspectionsRows = (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Inspection type</th>
                <th>Date</th>
                <th>Score</th>
              </tr>
            </thead>
            {x}
          </table>
      </div>);
    }

    return (
      <Modal isOpen={isOpen} onRequestHide={this.hideModal} size={"modal-lg"}>
        <ModalHeader>
          <ModalClose onClick={this.hideModal}/>
          <ModalTitle>{business.businessName}{(business.businessProgramIdentifier) ? ', '+business.businessProgramIdentifier: ''}</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-sm-6">
              <div className="call-out-text call-out-text-primary m-t-0">
                <div className="row">
                  <div className="col-xs-6">
                    <p>{StringHelper.capitalCase(business.businessAddress)} <br />
                      {StringHelper.capitalCase(business.businessCity)}, WA {business.businessLocationZip}</p>
                    <p className={(business.businessPhone) ? 'show' : 'hidden'}><span
                      className="fa fa-phone"/> {StringHelper.phoneNumFormat(business.businessPhone)}</p>
                  </div>
                  <div className="col-xs-6 text-center">
                      <p><img style={style} className="img-rounded" alt={rating.string} src={require('../assets/img/'+rating.img+'_70.gif')}/></p>
                      <p>{rating.string}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="call-out-text call-out-text-default m-t-0">
                <p><span className="fa fa-color-danger fa-exclamation-circle" /> Critical violation</p>
                <p><span className="fa fa-color-info fa-cog" /> Maintenance &amp; sanitation violation</p>
                <p><a href="//www.kingcounty.gov/healthservices/health/ehs/foodsafety/inspections/system.aspx" target="_blank">Learn more about violations</a></p>
              </div>
            </div>
          </div>
          {inspectionsRows}
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
  params: PropTypes.object.isRequired,
  history: React.PropTypes.object
};

export default DetailsPage;
