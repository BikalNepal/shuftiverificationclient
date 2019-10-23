import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Upload extends Component {

  constructor (props) {
    super(props);
    // const currentDate = moment(new Date());
    this.state = {
      name: '',  
      dob: new Date(),
      issue: new Date(),
      expiry: new Date(),
      image: '', 
      imagePreviewUrl: ''
    };
    this.handleDobChange = this.handleDobChange.bind(this);
    this.handleIssueChange = this.handleIssueChange.bind(this);
    this.handleExpiryChange = this.handleExpiryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e){
    e.preventDefault();
    this.setState({name: e.target.value})
  }

  handleDobChange(dobDate) {
    this.setState({
      dob: dobDate
    })
  }

  handleIssueChange(issueDate){
    this.setState({
        issue: issueDate
      })
  }

  handleExpiryChange(expiryDate){
    this.setState({
        expiry: expiryDate
      })
  }

  handleSubmit(e) {
    e.preventDefault();
    let formInfo = Object.assign({}, this.state, {
      imagePreviewUrl: ''
    });
    let formData = new FormData();
    formData.append('file', this.uploadInput.files[0]);
    formData.append('formInfo', formInfo);

    axios
    .post("http://localhost:5000/document/verify", formData)
    .then(res => console.log("RESPONSE: ", res))
    .catch(err => console.warn(err));
}
  

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let image = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        image: image,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(image)
  }

  render() {

    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img style={{width:'300px', height:'300px'}} alt="" src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div>
        <h3>Upload Document:</h3>
        <form onSubmit={ this.handleSubmit }>
          <div className="form-group">
              <label>Name: </label>
              <input ref={(ref)=>{this.name=ref;}} type="text" name='fullname' onChange={this.handleNameChange}/><br/>
              <label>DOB: </label>
                <DatePicker
                ref={(ref)=>{this.dob = ref;}}
                selected={ this.state.dob }
                onChange={ this.handleDobChange }
                name="dob"
                /><br/>
                <label>Issue Date: </label>
                <DatePicker
                ref={(ref)=>{this.issue =ref;}}
                selected={ this.state.issue }
                onChange={ this.handleIssueChange }
                name="issueDate"
                /><br/>
                <label>Expiry Date: </label>
                <DatePicker
                ref={(ref)=>{this.expiry = ref;}}
                selected={ this.state.expiry }
                onChange={ this.handleExpiryChange }
                name="expiryDate"
                /><br/>
                <label>Proof: </label>
                <input ref={(ref)=>{this.uploadInput = ref;}} type="file" onChange={(e)=>this.handleImageChange(e)}/>
          </div>
          <div className="form-group">
            <button className="btn btn-success">Submit</button>
          </div>
        </form>
        <div>
          {$imagePreview}
        </div>
      </div>
    );
  }
}


export default Upload;