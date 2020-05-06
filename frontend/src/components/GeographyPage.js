import React, {Component} from 'react';
import {connect} from 'react-redux';

import {setupGeography} from "../actions/geographyActions";


class GeographyPage extends Component {

  componentDidMount() {
    this.props.setupGeography()
  }

  render() {
    return (
      <div>
        <h1>Geography</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,{setupGeography}
)(GeographyPage);