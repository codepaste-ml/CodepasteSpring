import React, {Component} from 'react';
import Select from "react-select";
import {connect} from "react-redux";
import {RECEIVE_LANGUAGES} from "../actions";
import {Api} from "../api";

const mapStateToProps = ({languages}) => ({
    options: languages
});

const mapDispatchToProps = dispatch => ({
    onLanguagesLoad: languages => dispatch({type: RECEIVE_LANGUAGES, languages})
});

class LangSelector extends Component {
    componentDidMount() {
        Api.getLanguages().then(languages => {
            this.props.onLanguagesLoad(languages.map(({name: value, alias: label}) => ({value, label})));
        })
    }

    render() {
        const {onChange, options, value = 'none'} = this.props;
        return <Select value={value} onChange={onChange} options={options}/>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LangSelector)