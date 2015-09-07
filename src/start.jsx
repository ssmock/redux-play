var React = require("react");
var Provider = require("react-redux").Provider;

var Store = require("./store/store.js");

var Main = require("./components/main.jsx");

React.render(
    (<Provider store={Store}>
        {() => <Main />}
    </Provider>),
    document.getElementById("Main"));