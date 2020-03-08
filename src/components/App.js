import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { submitField, switchEdit, startOver } from "../madlibs";

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
    hometownBlur: false,
    favoriteFood: '',
    favoriteFoodBlur: false,
    loveToDo: '',
    loveToDoBlur: false,
    messageIf: '',
    messageIfBlur: false,
    editText: ''
  }

  onChange = (id, e) => {
    switch(id) {
       case 'hometown':
          this.setState({ hometown: e.target.value});
          break;
       case 'favoriteFood':
          this.setState({ favoriteFood: e.target.value});
          break;
       case 'loveToDo':
          this.setState({ loveToDo: e.target.value});
          break;
       case 'messageIf':
          this.setState({ messageIf: e.target.value});
          break;
       default:
          break;
    }
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
    switch(id) {
      case 'hometown':
         if(this.state.hometown) {
            this.props.dispatch(submitField({id: 'hometown', answer: this.state.hometown}))
            this.setState({hometownBlur: true})
         } 
         break;
      case 'favoriteFood':
         if(this.state.favoriteFood) {
            this.props.dispatch(submitField({id: 'favoriteFood', answer: this.state.favoriteFood}))
            this.setState({favoriteFoodBlur: true})
         }
         break;
      case 'loveToDo':
         if(this.state.loveToDo) {
            this.props.dispatch(submitField({id: 'loveToDo', answer: this.state.loveToDo}))
            this.setState({loveToDoBlur: true})
         }
         break;
      case 'messageIf':
         if(this.state.messageIf) {
            this.props.dispatch(submitField({id: 'messageIf', answer: this.state.messageIf}))
            this.setState({messageIfBlur: true})
         }
         break;
      default:
         break;
   }
  }

  render() {
    return (
      <div className="matchArea">
        <div className="container">
           <div className={_.compact(['input-page', this.props.edit && 'hide']).join(' ')}>
               <div className="form-col">
                  <Label bold className="dark-gray-m">About Me</Label>
                  <div className="form">
                     <Input label={FIELDS.hometown} 
                            onBlur={()=>this.onBlur(FIELD_NAMES.hometown)} 
                            onChange={e=>{this.onChange(FIELD_NAMES.hometown, e)}} 
                            value={this.state.hometown}
                        />
                     <Input label={FIELDS.favoriteFood} 
                            onBlur={()=>this.onBlur(FIELD_NAMES.favoriteFood)} 
                            onChange={e=>{this.onChange(FIELD_NAMES.favoriteFood, e)}} 
                            value={this.state.favoriteFood}
                     />
                     <Input label={FIELDS.loveToDo} 
                            onBlur={()=>this.onBlur(FIELD_NAMES.loveToDo)} 
                            onChange={e=>{this.onChange(FIELD_NAMES.loveToDo, e)}} 
                            value={this.state.loveToDo}
                     />
                     <Input label={FIELDS.messageIf} 
                            onBlur={()=>this.onBlur(FIELD_NAMES.messageIf)}
                            onChange={e=>{this.onChange(FIELD_NAMES.messageIf, e)}} 
                            value={this.state.messageIf}
                        /> 
                  </div>
               </div>
               <div className="text-col">
                  <Label bold className="dark-gray-m" block mb>Your essay text</Label>
                  <div className="text-container">
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
                  </div>
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
               </div>
           </div>
           
           <div className={_.compact(['preview-page', this.props.edit === true && 'show']).join(' ')}>
               <div className="text-col">
                  <Label bold className="dark-gray-m" block mb>Your essay text</Label>
                  <div className="text-container">
                     <TextArea value={this.state.editText} onChange={e=>this.onChangeEdit(e)}/>
                  </div>
                  <Button className="submit show" onClick={()=>{this.startOver()}}>Start over</Button>
               </div>
           </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);
