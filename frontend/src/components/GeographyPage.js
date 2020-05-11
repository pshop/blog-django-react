import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
  setupGeography,
  incrementCounter,
  addAnswer,
  incrementScore,
  setType} from "../actions/geographyActions";


class GeographyPage extends Component {

  // state = {type:'ftc'}

  componentDidMount = () => {
    this.setup()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    const paramType = this.props.match.params.type.toUpperCase()
    const prevPropType = prevProps.type

    console.log(prevProps.type)

    if (prevState.type !== type){
      // this.setState({type:type})
      this.props.setType(type)
      this.setup()
    }
  }

  setup = async () => {
    let type = await this.props.match.params.type
    await this.props.setType(type)
    // await this.setState({type:type})
    this.props.setupGeography(this.props.type)
  }

  handleAnswer = (country) => {
    const nameToGuess = this.props.setup[this.props.counter].name_to_guess
    if (country === nameToGuess) {
      this.props.incrementScore()
      this.props.addAnswer(country, true)
    } else {
      this.props.addAnswer(country, false)
    }
    this.props.incrementCounter()
  }

  displayChoices(entry_choices) {
    return entry_choices.map(country => {
      return <button onClick={() => this.handleAnswer(country)} type="button" className="btn btn-link btn-lg"
                     key={country}>{country}</button>
    })

  }

  displayQuestion = (counter) => {
    if (this.props.setup.length > 0) {
      const {name_to_guess, flag_to_guess, entry_choices} = this.props.setup[counter]
      return (
        <div className={"container mt-3"}>
          <div className={"row justify-content-md-center"}>
            <div className={"col-6"}>
              <img className={"img-fluid shadow"} src={"http://127.0.0.1:8000" + flag_to_guess + "/"}/>
            </div>
          </div>
          <div className={"row justify-content-md-center mt-3"}>
            {this.displayChoices(entry_choices)}
          </div>
        </div>
      )
    }
  }

  displayResulsts = () => {

    let index = 0

    return (
      <div className={"container"}>
        <div className="row">
          <h2>Your score is {this.props.score} of 12</h2>
        </div>
        <div className="row mt-3">
          {this.props.answers.map((answer) => {
            const countryName = this.props.setup[index].name_to_guess
            const flagUrl = this.props.setup[index].flag_to_guess
            let bgColor = "bg-primary"
            index++
            if (answer.answer){
              bgColor = "bg-success"
            } else {
              bgColor = "bg-danger"
            }
            return (
              <div className="col-md-2 mt-5" key={countryName}>
                <div className="card">
                  <img className={"card-img-top"} src={"http://127.0.0.1:8000" + flagUrl + "/"}/>
                  <div className={"card-body " + bgColor}>
                    <p className="card-text text-center">{countryName}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

    )
  }

  displayContent = (counter) => {
    if (counter < this.props.setup.length) {
      return this.displayQuestion(counter)
    } else {
      return this.displayResulsts()
    }
  }

  render() {
    return (
      <div className={"container"}>
        <div className={"row justify-content-md-center mt-3"}>
          <h2>Find the country</h2>
        </div>
        {this.displayContent(this.props.counter)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    setup: state.geo.setup,
    counter: state.geo.counter,
    answers: state.geo.answers,
    score: state.geo.score,
    type: state.geo.type,
  };
}

export default connect(
  mapStateToProps, {
    setupGeography,
    incrementCounter,
    addAnswer,
    incrementScore,
    setType}
)(GeographyPage);