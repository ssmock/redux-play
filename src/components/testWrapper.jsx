var React = require("react");
var _ = require("lodash");

var comp = React.createClass({
    render() {
        return (<div>
            <span ref={this.Ref1}>Ref 1</span>
            <input ref="FirstInput" placeholder="Focus" />
            <input placeholder="No focus" />
            <button onClick={this.Focus}>Click me</button>
            <button onClick={this.DebouncedButtonClicked}>Debounced</button>
            <input ref="DebouncedInput" onChange={this.DebouncedInputChanged} />
        </div>);
    },
    componentWillMount(){
        this.DebouncedButtonClicked = _.debounce(this.DebouncedButtonClicked, 500);
        this.DebouncedInputChanged = _.debounce(this.DebouncedInputChanged, 1000);
    },
    Focus() {
        var input = this.refs.FirstInput.getDOMNode();
        
        input.focus();
        input.select();
    },
    Ref1(ref) {
        var node = ref.getDOMNode();

        node.style.textDecoration = "underline";
    },
    DebouncedButtonClicked() {
        console.log("Debounced button clicked");
    },
    DebouncedInputChanged(e) {
        console.log(e);

        var input = this.refs.DebouncedInput.getDOMNode();

        console.log("Debounced input changed", input.value);
    }
});

module.exports = comp;