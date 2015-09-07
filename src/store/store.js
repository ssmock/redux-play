var Redux = require("redux");

var initialState = {
    c: 0
};

function reduce(prev, action) {
    var next = { c: prev.c };

    switch (action.type) {
        case "INCREMENT":
            next.c = next.c + 1;
            break;
        case "DECREMENT":
            next.c = next.c - 1;
            break;
        default:
            break;
    }

    return next;
}

var store = Redux.createStore(reduce, initialState);

store.subscribe(function () {
    console.log(store.getState());
});

module.exports = store;