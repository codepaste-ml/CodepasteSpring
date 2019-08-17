import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, {Component} from 'react';

import Prism from 'prismjs';
import ReactDOM from 'react-dom';
import {Route, Switch} from 'react-router';
import {Button, Col, Container, FormControl, FormGroup, FormLabel, Nav, Navbar, Row} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {BrowserRouter} from 'react-router-dom';
import Select from "react-select";


class Api {
    constructor(host) {
        this.host = host;
    }

    request(path) {
        return fetch(`${this.host}${path}`).then(r => r.json());
    }

    getLanguages() {
        return this.request('/lang');
    }

    getPaste(alias) {
        return this.request(`/get/${alias}`);
    }
}

const api = new Api('/api');

class CodepasteNavbar extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">
                    <img src="/favicon.png" height={40} className="d-inline-block" alt="Codepaste"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="codepaste-navbar"/>
                <Navbar.Collapse id="codepaste-navbar">
                    <Nav className="mr-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <Nav.Link href="https://t.me/codepaste_bot">Telegram Bot</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

class PrismCode extends Component {
    componentDidMount() {
        this.highlight()
    }

    componentDidUpdate() {
        this.highlight()
    }

    highlight() {
        Prism.highlightElement(this.domNode, true)
    }

    render() {
        return (
            <pre>
                <code ref={node => this.domNode = node}
                      className={`language-${this.props.language}`}>
                    {this.props.source}
                </code>
            </pre>
        );
    }
}

class Paste extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paste: null
        };
    }

    componentDidMount() {
        api.getPaste(this.props.alias)
            .then(response => this.setState({
                paste: response
            }));
    }

    render() {
        const {paste} = this.state;
        console.log(paste);
        return (!paste ? <Container/> :
                <Container fluid={true}>
                    <h2 className="text-center header-text">{paste.name}</h2>
                    <div className="code-area">
                        <PrismCode language={paste.language} source={paste.source}/>
                    </div>
                    {/*<h3 className="text-center header-text">*/}
                    {/*    <a className="raw-link" href="{% host_url 'view_source_raw' alias=alias host 'raw' %}">*/}
                    {/*        <span className="link glyphicon glyphicon-link" aria-hidden="true"></span>*/}
                    {/*    </a>*/}
                    {/*    Raw code*/}
                    {/*</h3>*/}
                    {/*<div className="form-group">*/}
                    {/*    <textarea className="form-control raw code-area" rows="20" readOnly title="Raw code"></textarea>*/}
                    {/*</div>*/}
                </Container>
        );
    }
}

class ToTopButton extends Component {
    render() {
        return (
            <button className="to-top">
                <span className="checkmark"/>
            </button>
        );
    }
}

class LangSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'none',
            options: [{
                value: 'none',
                label: 'Default'
            }]
        };

        this.changeValue = value => {
            this.setState({
                language: value
            })
        };
    }

    componentDidMount() {
        api.getLanguages().then(languages => {
            this.setState({
                options: languages.map(lang => ({
                    value: lang.name,
                    label: lang.alias
                }))
            });
        })
    }

    render() {
        return (
            <Select
                value={this.state.language}
                onChange={this.changeValue}
                options={this.state.options}
            />
        )
    }
}

class PastePage extends Component {
    render() {
        let {match} = this.props;
        return (
            <>
                <Paste alias={match.params.alias}/>
                <ToTopButton/>
            </>
        );
    }
}

class HomePage extends Component {
    render() {
        return (
            <div className="content">
                <Container fluid={true}>
                    <h2 className="text-center header-text">New paste</h2>
                    <FormGroup>
                        <textarea className="form-control code-area" rows="20" title="New Paste"/>
                    </FormGroup>
                    <div className="controls">
                        <Row>
                            <Col md={4}>
                                <FormGroup as={Row}>
                                    <FormLabel column sm={4}>Name:</FormLabel>
                                    <Col sm={8}>
                                        <FormControl type="text" placeholder="Untitled"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup as={Row}>
                                    <FormLabel column sm={4}>Language:</FormLabel>
                                    <Col sm={8}>
                                        <FormControl as={LangSelector}/>
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col md={{ span: 2, offset: 6 }}>
                                <Button className="submit pull-right btn-block" variant="success">
                                    <span>Submit</span>
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        );
    }
}


const App = () => (
    <BrowserRouter>
        <CodepasteNavbar/>
        <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route path="/:alias" component={PastePage}/>
        </Switch>
    </BrowserRouter>
);

ReactDOM.render(<App/>, document.getElementById("root"));