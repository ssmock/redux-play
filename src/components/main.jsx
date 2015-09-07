var React = require("react");
var Connect = require("react-redux").connect;
var _ = require("Lodash");

var Store = require("../store/store.js");

var Main = React.createClass({
    render: function () {
        console.log(this.props);

        return (<div>
            <button onClick={this.inc}>+</button>
            <button onClick={this.dec}>-</button>
            <span>{this.props.c}</span>
        </div>);
    },
    inc: function (args) {
        Store.dispatch({ type: "INCREMENT" });
    },
    dec: function (args) {
        Store.dispatch({ type: "DECREMENT" });
    }
});

function select(state) {
    console.log(arguments);

    return state;
}

module.exports = Connect(select)(Main);