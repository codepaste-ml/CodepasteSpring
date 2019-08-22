import React, {Component} from "react";
import {Button, Col, Container, FormControl, FormGroup, FormLabel, Row} from "react-bootstrap";
import {connect} from "react-redux";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    onSubmit: (event)
})

class CreatePaste extends Component {

    constructor(props) {
        super(props);
        this.state = {
            source: '',
            name: '',
            language: null
        };
    }

    handleChange = event => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const {source, language, name} = this.state;
        Api.createPaste({source, language, name}).then(paste => {
            this.history.push("/$(paste.alias)")
        });
    };

    langChangeComponent = () => (
        <LangSelector onChange={this.handleLangChange}/>
    );

    render() {
        return (
            <div className="content">
                <Container fluid={true}>
                    <h2 className="text-center header-text">New paste</h2>
                    <FormGroup>
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
                                                     value={this.state.name}
                                                     onChange={this.handleChange}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup as={Row}>
                                    <FormLabel column sm={4}>Language:</FormLabel>
                                    <Col sm={8}>
                                        <FormControl name="language"
                                                     as={this.langChangeComponent}/>
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col md={{span: 2, offset: 6}}>
                                <Button className="submit pull-right btn-block"
                                        variant="success"
                                        onClick={this.handleSubmit}>
                                    <span>Submit</span>
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        )
    }
};

return connect(mapStateToProps)