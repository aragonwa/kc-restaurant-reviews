import React from 'react';
import {browserHistory} from 'react-router';

class DetailsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount () {
    $('#'+this.props.params.id).modal();
  }
  componentDidUpdate () {
    $('#'+this.props.params.id).modal();
  }

  handleClick(event) {
    browserHistory.push('/');
  }

  render() {
    let item = this.props.data[this.props.params.id];
    return (
      <div className="modal fade" tabIndex="-1" role="dialog" id={this.props.params.id}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleClick}><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">{item.businessName}</h4>
            </div>
            <div className="modal-body">
              <p>{item.businessName}</p>
              <p>{item.businessAddress}</p>
              <p>{item.businessCity}</p>
              <p>{item.businessLocationZip}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.handleClick}>Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailsPage;
