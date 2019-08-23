import React, {Component} from "react";
import Prism from "prismjs";

class PrismCode extends Component {
    componentDidMount = this.highlight;
    componentDidUpdate = this.highlight;

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

export default PrismCode;