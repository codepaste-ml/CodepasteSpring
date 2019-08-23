import React, {Component} from "react";
import Scroll from "react-scroll";

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

export default ToTopButton;