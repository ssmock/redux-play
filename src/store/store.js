var Redux = require("redux");
var Thunk = require("redux-thunk");
var _ = require("lodash");
require("whatwg-fetch");

var initialState = {
    IsLoadingPosts: false,
    Posts: [],
    LoadMessage: ""
};

function reduce(prev, action) {
    var next = _.assign({}, prev);

    console.log("Reducing via ", action);

    switch (action.type) {
        case "LOAD":
            next.IsLoadingPosts = true;
            break;
        case "LOADED":
            next.IsLoadingPosts = false;
            next.Posts = action.entries.data.children;
            next.LoadMessage = "Success.";
            break;
        case "LOAD_FAILED":
            next.IsLoadingPosts = false;
            next.Posts = [];
            next.LoadMessage = "Failure!";
    }

    return next;
}

var createThunkableStore = Redux.applyMiddleware(Thunk)(Redux.createStore)

var store = createThunkableStore(reduce, initialState);

module.exports = store;