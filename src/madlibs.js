import {
  FIELD_NAMES,
} from "./constants";
import {
  getTextTemplates
} from './helpers';


// Action types
// ----------------------------------------------------------------------------

export const SUBMIT_FIELD = "MADLIBS.SUBMIT_FIELD";
export const SWITCH_EDIT = "MADLIBS.SWITCH_EDIT";
export const START_OVER = "MADLIBS.START_OVER";


// Initial state
// ----------------------------------------------------------------------------

export const INITIAL_STATE = {
  fieldOrder: [
    FIELD_NAMES.hometown,
    FIELD_NAMES.favoriteFood,
    FIELD_NAMES.loveToDo,
    FIELD_NAMES.music,
    FIELD_NAMES.messageIf,
    FIELD_NAMES.bar,
  ],

  fieldAnswers: {},
  essayText: "",
  essayMap: new Map(),  //map to recorder every text of a field
  editText: "",   //plain text without bold
  editMap: new Map(),  
  edit: false,  //flag to route to preview page
};


// Reducer
// ----------------------------------------------------------------------------

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SUBMIT_FIELD: {
      state.fieldAnswers[action.payload.fieldName] = action.payload.answer;
      const essay = generateEssay(state.essayMap, state.editMap, state.fieldAnswers, action.payload.fieldName, getTextTemplates);
      return {
        ...state,
        essayText: essay.result,
        editText: essay.edit_result,
        essayMap: essay.essayMap,
        editMap: essay.editMap,
      }
    };

    case SWITCH_EDIT: {
      return {
        ...state,
        edit: !state.edit
      }
    }

    case START_OVER: {
      return {
        ...state,
        essayText: '',
        editText: '',
        essayMap: new Map(),
        editMap: new Map(),
      };
    }

    default:
      return state;
  }
}

function getSample(texts) {
  return texts[Math.floor(Math.random() * texts.length)]
}

function generateEssay(essayMap, editMap, answers, answer, getTextTemplates) {
   let result = '';
   let edit_result = '';

   let texts = getTextTemplates(answer);
   let sample = getSample(texts);
   let edit = sample;
   sample = sample.replace('$answer', `_#${answers[answer]}_`)   //put # to mark bold, put _ for split bold fonts from normal
   edit = edit.replace('$answer', answers[answer]) 

   essayMap.set(answer, sample);
   editMap.set(answer, edit);

   essayMap.forEach(essay=>{
     result = `${result} ${essay}`
   }) 

   editMap.forEach(essay=>{
    edit_result = `${edit_result} ${essay}`
  }) 
     
   return {essayMap, editMap, result, edit_result};
}


// Action creators
// ----------------------------------------------------------------------------

export function submitField({ id, answer }) {
  return { type: SUBMIT_FIELD, payload: { fieldName: id, answer } };
}

export function startOver() {
  return { type: START_OVER }
}

export function switchEdit() {
  return { type: SWITCH_EDIT }
}