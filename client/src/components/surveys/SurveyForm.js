// SurveyForm shows a form for a user to add input
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';

const FIELDS = [
  { label: 'Survey Title', name: 'title'},
  { label: 'Subject Line', name: 'subject'},
  { label: 'Email Body', name: 'body'},
  { label: 'Recipient List', name: 'emails'},
]

class SurveyForm extends Component {
  renderFields() {
    return FIELDS.map( ({ label, name }) =>
		  <Field key={name} component={SurveyField} type="text" label={label} name={name} />
		);
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
            {this.renderFields()}
            <button type="submit" className="btn btn-warning">Submit</button>
        </form>
      </div>
    );
  };
};

export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);