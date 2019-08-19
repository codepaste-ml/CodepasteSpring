import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'prismjs/themes/prism.css'

import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

import React, {Component} from 'react';

import Prism from 'prismjs';
import ReactDOM from 'react-dom';
import {Redirect, Route, Switch} from 'react-router';
import {Button, Col, Container, FormControl, FormGroup, FormLabel, Nav, Navbar, Row} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {BrowserRouter} from 'react-router-dom';
import Select from "react-select";
import Scroll from "react-scroll";

class Api {
    static host = '/api';

    static post(path, body) {
        return fetch(`${Api.host}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body)
        }).then(r => r.json());
    }

    static get(path) {
        return fetch(`${Api.host}${path}`).then(r => r.json());
    }

    static getLanguages() {
        return Api.get('/lang');
    }

    static getPaste(alias) {
        return Api.get(`/get/${alias}`);
    }

    static createPaste({source, name, language}) {
        return Api.post('/create', {
            source, name, language
        });
    }
}

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
        this.highlight();
    }

    componentDidUpdate() {
        this.highlight();
    }

    highlight() {
        Prism.highlightElement(this.domNode);
    }

    render() {
        return (
            <pre className="source-pre line-numbers">
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
        Api.getPaste(this.props.alias)
            .then(response => this.setState({
                paste: response
            }));
    }

    render() {
        const {paste} = this.state;

        return (!paste ? <Container/> :
                <div className="content">
                    <Container fluid={true}>
                        <h2 className="text-center header-text">{paste.name || "Untitled"}</h2>
                        <div className="code-area">
                            <PrismCode language={paste.language.name} source={paste.source}/>
                        </div>
                        <h3 className="text-center header-text">
                            <a className="raw-link" href={`codepaste.ml/raw/${paste.alias}`}>
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
                </div>
        );
    }
}

class ToTopButton extends Component {

    static scrollToTop() {
        Scroll.animateScroll.scrollToTop({
            duration: 800
        });
    }

    updateScroll = () => {
        this.setState({
            scroll: window.pageYOffset
        });
    };

    componentDidMount() {
        window.addEventListener('scroll', this.updateScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.updateScroll);
    }

    render() {
        return this.state && this.state.scroll > 100 && (
            <button className="to-top" onClick={ToTopButton.scrollToTop}>
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
    }

    componentDidMount() {
        Api.getLanguages().then(languages => {
            this.setState({
                options: languages.map(lang => ({
                    value: lang.name,
                    label: lang.alias
                }))
            });
        })
    }

    changeValue = value => {
        this.props.onChange(value.value);
        this.setState({
            language: value
        })
    };

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
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            language: null,
            source: '',

            created: null
        }
    }

    handleChange = event => {
        const target = event.target;
        this.setState({
            [target.name]: target.value
        });
    };

    handleLangChange = value => {
        this.setState({
            language: value
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const {source, language, name} = this.state;
        Api.createPaste({source, language, name}).then(paste => {
            this.setState({
                created: paste.alias
            })
        });
    };

    langChangeComponent = () => (
        <LangSelector onChange={this.handleLangChange}/>
    );

    render() {
        const created = this.state.created;

        return created ? <Redirect to={created}/> : (
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