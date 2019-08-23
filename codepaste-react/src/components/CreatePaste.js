import React, {Component} from "react";
import {Alert, Button, Col, Container, FormControl, FormGroup, FormLabel, Row} from "react-bootstrap";
import LangSelector from "./LangSelect";
import {Api} from "../api";

export default class CreatePaste extends Component {
    state = {
        source: '',
        name: '',
        language: null
    };

    handleChange = ({target: {name, value}}) => {
        this.setState({...this.state, [name]: value});
    };

    handleLangChange = value => {
        this.setState({...this.state, language: value});
    };

    handleSubmit = event => {
        event.preventDefault();

        this.setState({
            error: null
        });

        const {source, language: langObject, name} = this.state;
        const {value: language = null} = langObject || {};
        Api.createPaste({source, language, name}).then(paste => {
            const {alias, message: error} = paste;
            if (alias) {
                this.props.history.push(`/${alias}`)
            } else {
                this.setState({error});
            }
        });
    };

    render() {
        const {name, language, error} = this.state;
        return (
            <div className="content">
                <Container fluid={true}>
                    <h2 className="text-center header-text">New paste</h2>
                    <FormGroup as={Row}>
                        <textarea
                            name="source"
                            className="form-control code-area"
                            rows="20"
                            title="New Paste"
                            onChange={this.handleChange}/>
                    </FormGroup>
                    <div className="controls">
                        <Row>
                            <Col md={4}>
                                <FormGroup as={Row}>
                                    <FormLabel column sm={4}>Name:</FormLabel>
                                    <Col sm={8}>
                                        <FormControl name="name"
                                                     type="text"
                                                     placeholder="Untitled"
                                                     value={name}
                                                     onChange={this.handleChange}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup as={Row}>
                                    <FormLabel column sm={4}>Language:</FormLabel>
                                    <Col sm={8}>
                                        <FormControl name="language"
                                                     value={language}
                                                     onChange={this.handleLangChange}
                                                     as={LangSelector}/>
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col md={{span: 2, offset: 6}}>
                                <FormGroup as={Row}>
                                    <Button className="submit pull-right btn-block"
                                            variant="success"
                                            onClick={this.handleSubmit}>
                                        <span>Submit</span>
                                    </Button>
                                </FormGroup>
                                {error && <Row>
                                    <Alert variant="danger">{error}</Alert>
                                </Row>}
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        )
    }
}
