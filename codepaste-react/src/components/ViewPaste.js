import React, {Component} from "react";
import Paste from "./Paste";
import ToTopButton from "./ToTopButton";


class ViewPaste extends Component {
    render() {
        return (
            <div>
                <Paste alias={this.props.match.params.alias}/>
                <ToTopButton/>
            </div>
        );
    }
}

export default ViewPaste;

