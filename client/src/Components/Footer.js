import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {

    render() {
        return (
            <div className="Footer">
                <p>    
                    <a href="https://github.com/austinwgerald/dad-joke">View Source</a>
                    <br />
                    Built using React, Express, and the&nbsp;
                    <a href="https://www.MDBootstrap.com">icanhazdadjoke API</a>
                    <br />
                    &copy; {new Date().getFullYear()} Copyright{" "}
                    austinwgerald
                </p>
            </div>
        );
    }
}

export default Footer;
