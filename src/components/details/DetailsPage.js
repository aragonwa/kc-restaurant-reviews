import React from 'react';
import {browserHistory} from 'react-router';
// https://github.com/minhtranite/react-modal-bootstrap
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';

class DetailsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
     isOpen: true
    };
    this.openModal = this.openModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  openModal() {
    // $.ajax({
    //   url: this.props.url,
    //   dataType: 'json',
    //   cache: false,
    //   success: function(data) {
    //     this.setState({audits: data.data.reports, filteredAudits: data.data.reports, depts: data.data.depts});
    //   }.bind(this),
    //   error: function(xhr, status, err) {
    //     console.error(this.props.url, status, err.toString());
    //   }.bind(this)
    // });
    this.setState({isOpen: true});
  }

  hideModal(){
    this.setState({isOpen: false});
    browserHistory.push('/');
  }

  render() {
    const {isOpen} = this.state;

    return (
      <Modal isOpen={isOpen} onRequestHide={this.hideModal}>
        <ModalHeader>
          <ModalClose onClick={this.hideModal}/>
          <ModalTitle>{this.props.params.id}</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <p>Ab ea ipsam iure perferendis! Ad debitis dolore excepturi
            explicabo hic incidunt placeat quasi repellendus soluta,
            vero. Autem delectus est laborum minus modi molestias
            natus provident, quidem rerum sint, voluptas!</p>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-default" onClick={this.hideModal}>
            Close
          </button>
        </ModalFooter>
      </Modal>
    );
    // let item = this.props.data[this.props.params.id];
    // return (
    //   <div className="modal fade" tabIndex="-1" role="dialog" id={this.props.params.id}>
    //     <div className="modal-dialog" role="document">
    //       <div className="modal-content">
    //         <div className="modal-header">
    //           <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleClick}><span aria-hidden="true">&times;</span></button>
    //           <h4 className="modal-title">{item.businessName}</h4>
    //         </div>
    //         <div className="modal-body">
    //           <p>{item.businessName}</p>
    //           <p>{item.businessAddress}</p>
    //           <p>{item.businessCity}</p>
    //           <p>{item.businessLocationZip}</p>
    //         </div>
    //         <div className="modal-footer">
    //           <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.handleClick}>Close</button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // );
  }
}

export default DetailsPage;
