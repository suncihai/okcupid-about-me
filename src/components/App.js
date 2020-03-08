import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { submitField, switchEdit, startOver } from "../madlibs";

import Row from '../common/Row';
import Label from '../common/Label';
import Button from '../common/Button';
import Input from '../common/Input';
import TextArea from '../common/TextArea';

import { FIELDS, FIELD_NAMES } from '../constants'
import _ from 'lodash'

require("../style/App.scss");

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  state = {
    hometown: '',
    hometownBlur: false,  //record if blurred flag
    favoriteFood: '',
    favoriteFoodBlur: false,
    loveToDo: '',
    loveToDoBlur: false,
    messageIf: '',
    messageIfBlur: false,
    editText: ''
  }

  onChange = (id, e) => {
     this.setState({[id]: e.target.value});
  }

  onChangeEdit = (e) => {
     this.setState({editText: e.target.value});
  }

  switchEdit = () => {
    this.setState({editText: this.props.editText})
    this.props.dispatch(switchEdit());
  }

  startOver = () => {
    this.props.dispatch(switchEdit());
    this.setState({
      hometown: '',
      hometownBlur: false,
      favoriteFood: '',
      favoriteFoodBlur: false,
      loveToDo: '',
      loveToDoBlur: false,
      messageIf: '',
      messageIfBlur: false,
      editText: ''
    })
    this.props.dispatch(startOver());
  }

  onBlur = (id) => {
     if(this.state[id]) {
       this.props.dispatch(submitField({id, answer: this.state[id]}))
       this.setState({[`${id}Blur`]: true})
     }
  }

  render() {
    const fields = ['hometown','favoriteFood','loveToDo', 'messageIf']
    return (
      <Row className="matchArea">
        <Row className="container">
           <Row className={_.compact(['input-page', this.props.edit && 'hide']).join(' ')}>
               <Row className="form-col">
                  <Label bold className="dark-gray-m">About Me</Label>
                  <Row className="form">
                     {
                        fields.map((field, index)=>{
                           return (
                              <Input
                                 key={index}
                                 label={FIELDS[field]}
                                 onBlur={()=>this.onBlur(FIELD_NAMES[field])} 
                                 onChange={e=>{this.onChange(FIELD_NAMES[field], e)}} 
                                 value={this.state[field]}
                              />
                           )
                        })
                     }
                  </Row>
               </Row>
               <Row className="text-col">
                  <Label bold className="dark-gray-m" block mb>Your essay text</Label>
                  <Row className="text-container">
                        {/* after split('_'), format like ['Origin from','#Narnia',...] # indicates bold font*/}
                        {this.props.essayText.split('_').map((text, index) => {
                           let next = this.props.essayText.split('_')[index+1];
                           if(text[0] !== '#') {
                              return <Label 
                                        className="light-gray-m" 
                                        inline 
                                        key={index} 
                                        mr={!(text === ' ' && index === 0)}
                                     >{text}</Label>
                           } else {
                              return <Label 
                                        className="light-gray-m" 
                                        inline 
                                        bold 
                                        key={index} 
                                        mr={next[0] !== '.' && next[0] !== ','}
                                     >{text.substring(1)}</Label>
                           }
                        })}
                  </Row>
                  <Button 
                     onClick={()=>{this.switchEdit()}}
                     className={_.compact([
                        'submit',
                        this.state.hometown && this.state.hometownBlur &&
                        this.state.favoriteFood && this.state.favoriteFoodBlur &&
                        this.state.loveToDo && this.state.loveToDoBlur &&
                        this.state.messageIf && this.state.messageIfBlur ? 
                        'show' : ''
                     ]).join(' ')
                     }>Edit</Button>
               </Row>
           </Row>
           
           <Row className={_.compact(['preview-page', this.props.edit === true && 'show']).join(' ')}>
               <Row className="text-col">
                  <Label bold className="dark-gray-m" block mb>Your essay text</Label>
                  <Row className="text-container">
                     <TextArea value={this.state.editText} onChange={e=>this.onChangeEdit(e)}/>
                  </Row>
                  <Button className="submit show" onClick={()=>{this.startOver()}}>Start over</Button>
               </Row>
           </Row>
        </Row>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);
