import React, { PropTypes } from 'react';
// import {browserHistory} from 'react-router';
import { getRestaurantsApi} from '../api/api';
import StringHelper from '../utils/StringHelper';
import Ratings from '../utils/Ratings';
import { Modal, Popover, OverlayTrigger } from 'react-bootstrap';
import DetailsInspectionRow from './DetailsInspectionRow';

class DetailsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    // State for Component
    this.state = {
      showModal: true,
      business: [],
      inspections: [],
      loading: true,
      inspectionsLoading: true,
      errorLoading: false
    };
    this.openModal = this.openModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount() {
    getRestaurantsApi('business', this.props.params.id, 0, 0).then((response) => {
      this.setState({ loading: false });
      this.setState({ business: response[0] });
    }).catch(error => {
      this.setState({ errorLoading: true });
      this.setState({ loading: false });
      throw (error + '1');
    });
    getRestaurantsApi('inspections', this.props.params.id, 0, 0).then((response) => {
      this.setState({ loading: false, inspectionsLoading: false });
      this.setState({ inspections: response });
    }).catch(error => {
      this.setState({ errorLoading: true });
      this.setState({ loading: false });
      throw (error);
    });
  }

  componentWillUnmount() {
    this.setState({ loading: true });
    this.setState({ business: [] });
    this.setState({ inspections: [] });
  }

  openModal() {
    this.setState({ showModal: true });
  }

  hideModal() {
    this.setState({ showModal: false });
    this.props.history.push('/');
  }

  formatDate(str) {
    const date = str.slice(0, 10).split('-');
    const year = date[0];
    const month = date[1];
    const day = date[2];
    return month + '/' + day + '/' + year;
  }
  loadingModal() {
    return (
      <Modal show={this.state.showModal} onHide={this.hideModal} bsSize="large">
        <div className="text-center">
          <span className="fa fa-spinner fa-spin fa-4x" />
        </div>
      </Modal>
    );
  }

  loadingModalError() {
    return (
      <Modal show={this.state.showModal} onHide={this.hideModal} bsSize="large">
        <div className="col-sm-12">
          <div className="alert alert-danger"><h2>An error occurred while loading restaurant information.</h2></div>
        </div>
      </Modal>
    );
  }
  getInspectionRows(inspectionsLoading, inspections) {
    if (inspectionsLoading) {
      return (
        <div className="text-center">
          <span className="fa fa-spinner fa-spin fa-4x" />
        </div>
      );
    } else {
      const detailsInspectionRows = inspections.map((inspection, index) => {
        return (
          <DetailsInspectionRow
            inspection={inspection}
            formatDate={this.formatDate}
            key={index}
            inspectionIndex={index}
          />
        );
      });
      const popoverInspectionType = (
        <Popover id="inspection-type-popover">
          <p>Businesses receive 1-3 inspections per year. Routine inspections are scored and unannounced. Return inspections occur as needed to address violations observed during routine inspections. <br />
          Many businesses receive an unscored Consultation/Educational visit each year.</p>
        </Popover>
      );
      const popoverViolations = (
        <Popover id="violations-popover">
          <p><span className="fa fa-color-danger fa-exclamation-circle" /> High risk violations are for food safety requirements that prevent you from getting sick.</p>
          <p><span className="fa fa-color-info fa-cog" /> Low risk violations are less likely to cause illness.</p>
          <p><a href="//www.kingcounty.gov/depts/health/environmental-health/food-safety/inspection-system/reporting.aspx" target="_blank">Learn more</a></p>
        </Popover>
      );
      const popoverResults = (
        <Popover id="results-popover">
          <p>Zero is a perfect score.</p>
          <p>Scores over 35 may result in a return inspection.</p>
          <p>Scores over 90 may result in closure until the items are resolved.</p>
          <p><a href="//www.kingcounty.gov/depts/health/environmental-health/food-safety/inspection-system/reporting.aspx" target="_blank">More details about scoring.</a></p>
        </Popover>
      );
      return (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="bg-primary">
              <tr>
                <th>Date</th>
                <th>Inspection type&nbsp;
                  <OverlayTrigger trigger="click" rootClose placement="top" overlay={popoverInspectionType}>
                    <span className="fa fa-question-circle" />
                  </OverlayTrigger>
                  &nbsp;/Violation list&nbsp;
                  <OverlayTrigger trigger="click" rootClose placement="top" overlay={popoverViolations}>
                    <span className="fa fa-question-circle" />
                  </OverlayTrigger>
                </th>
                <th>
                  Score&nbsp;
                  <OverlayTrigger trigger="click" rootClose placement="top" overlay={popoverResults}>
                    <span className="fa fa-question-circle" />
                  </OverlayTrigger>
                </th>
              </tr>
            </thead>
            {detailsInspectionRows}
          </table>
        </div>);
    }
  }

  render() {
    const { business, inspections, loading, errorLoading, inspectionsLoading } = this.state;
    const rating = Ratings.getRatings(business.businessGrade);

    const popoverRiskCategory = (
      <Popover id="risk-category-popover">
        <p>Risk categories are determined by the complexity of the businesses' food processing and handling. </p>
      </Popover>
    );

    if (loading) {
      return this.loadingModal();
    }
    if (errorLoading || business.length <= 0) {
      return this.loadingModalError();
    }

    //Sort inspections by Date
    inspections.sort(function (a, b) {
      return new Date(b.inspectionDate) - new Date(a.inspectionDate);
    });

    const inspectionsRows = this.getInspectionRows(inspectionsLoading, inspections);

    return (
      <Modal show={this.state.showModal} onHide={this.hideModal} bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title><img className="img-non-responsive" alt={rating.string} src={require('../assets/img/' + rating.img + '_25.gif')} />  {business.businessName}{(business.businessProgramIdentifier) ? ', ' + business.businessProgramIdentifier : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-sm-4 col-xs-6">
              <p><strong>{StringHelper.capitalCase(business.businessName)}</strong> <br />
                {StringHelper.capitalCase(business.businessAddress)} <br />
                {StringHelper.capitalCase(business.businessCity)}, WA {business.businessLocationZip}<br />
                <span className={(business.businessPhone) ? 'show' : 'hidden'}><span
                  className="fa fa-phone" /> {StringHelper.phoneNumFormat(business.businessPhone)}</span></p>
              <p>
                {business.businessEstablishmentDescr}&nbsp;
          <OverlayTrigger trigger="click" rootClose placement="top" overlay={popoverRiskCategory}>
                  <span className="fa fa-question-circle fa-color-primary" />
                </OverlayTrigger>
              </p>
              <p><a target="_blank" href={"//www.google.com/maps/dir//" + StringHelper.capitalCase(business.businessAddress) + "+" + StringHelper.capitalCase(business.businessCity) + "+" + business.businessLocationZip}>Get directions <span className="fa fa-car" /></a></p>
            </div>
            <div className="col-sm-4 col-xs-6">
              <p className="text-center"><img alt={rating.string} src={require('../assets/img/dial_' + rating.img + '.jpg')} /> <br />
                <strong>{rating.string}</strong>
              </p>
            </div>
            <div className="col-sm-4 col-xs-12">
              <div className="call-out-text call-out-text-default m-t-0">
                <p>The rating is based on the average of <span className="fa fa-color-danger fa-exclamation-circle" /> high risk violations from the last 4 routine inspections.</p>
                <p><a href="//www.kingcounty.gov/depts/health/environmental-health/food-safety/inspection-system/food-safety-rating.aspx" target="_blank">Learn more about the rating system</a></p>
              </div>
            </div>
          </div>
          {inspectionsRows}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={this.hideModal}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

DetailsPage.propTypes = {
  params: PropTypes.object.isRequired,
  history: React.PropTypes.object
};

export default DetailsPage;
