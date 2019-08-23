import React, {Component} from "react";
import {connect} from "react-redux";
import {Api} from "../api";
import {Container, FormControl, FormGroup} from "react-bootstrap";
import PrismCode from "./PasteCore";
import {PASTE_LOADED} from "../actions";

const mapStateToProps = ({paste}, {alias}) => ({
    paste: paste[alias]
});

const mapDispatchToProps = dispatch => ({
    onPasteLoad: paste => dispatch({type: PASTE_LOADED, paste})
});

class Paste extends Component {
    componentDidMount() {
        const {paste, alias} = this.props;
        if (!paste) {
            Api.getPaste(alias).then(paste => {
                this.props.onPasteLoad(paste);
            })
        }
    }

    render() {
        const {paste} = this.props;
        return (
            <div className="content">
                {!paste ?
                <h1>Loading...</h1>
                :
                <Container fluid={true}>
                    <h2 className="text-center header-text">{paste.name || "Untitled"}</h2>
                    {paste.source && <div className="code-area">
                        <PrismCode language={paste.language.prismClassName} source={paste.source}/>
                    </div>}
                    <h3 className="text-center header-text">
                        <a className="raw-link" href={`/raw/${paste.alias}`}>
                            <i className="fas fa-link fa-sm" aria-hidden="true"/>
                        </a>
                        Raw code
                    </h3>
                    <FormGroup>
                        <FormControl as="textarea"
                                     className="raw code-area"
                                     rows={20}
                                     readOnly
                                     title="Raw code"
                                     value={paste.source}/>
                    </FormGroup>
                </Container>
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Paste);