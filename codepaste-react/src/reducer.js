import {combineReducers} from "redux";
import {PASTE_LOADED, RECEIVE_LANGUAGES} from "./actions";

function languages(state = [{name: 'none', label: 'Default'}], action) {
    if(action.type === RECEIVE_LANGUAGES) {
        return action.languages;
    }
    return state;
}

function paste(state = {}, action) {
    if(action.type === PASTE_LOADED) {
        return {
            ...state,
            [action.paste.alias]: action.paste
        };
    }
    return state;
}

export default combineReducers({
    paste,
    languages
});
