import React from 'react';


class Flipper extends React.Component {

    static defaultProps = {
        orientation: "horizontal", // "vertical"
        flipped: false
    }


    render(){
        return (
            <div className={"flipper-container "+ this.props.orientation}>
                <div className={"flipper" + (this.props.flipped ? " flipped" : "")} >

                     <div className="front tile">
                        {this.props.children[0]}
                    </div>

                    <div className="back tile">
                        {this.props.children[1]}
                    </div>

                </div>
            </div>
        )
    }

}

Flipper

export default Flipper;
