var React = require("react/addons");
var Connect = require("react-redux").connect;
var _ = require("Lodash");

var Store = require("../store/store.js");

var Main = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    getInitialState: function () {
        return { SearchText: "programmingasfasf" };
    },
    render: function () {
        console.log(this.props);
        
        return (<div>
            <div>
                <input name="name" type="text" valueLink={this.linkState("SearchText")}
                       placeholder="Enter a subreddit name" />
                <button onClick={this.Search}>Search</button>
                <br />
                <em>Click to search for {this.state.SearchText}</em>
            </div>
            <div>
                {this.props.IsLoadingPosts ? "Loading..." : ""}
            </div>
            <div>
                {this.GetPosts()}
            </div>
        </div>);
    },
    Search: function () {
        var searchText = this.state.SearchText;

        Store.dispatch(function (dispatch) {
            dispatch({ type: "LOAD", sub: searchText });

            return fetch("http://www.reddit.com/r/" + searchText + ".json")
                .then(function (response) {
                    return response.json();
                })
                .then(function (json) {
                    dispatch({ type: "LOADED", sub: searchText, payload: json });
                })
                .catch(function (error) {
                    dispatch({ type: "LOAD_FAILED", sub: searchText });
                });
        });
    },
    GetPosts: function () {
        console.log("Getting post entries: ", this.props.Posts);

        return this.props.Posts.map(function (post) {
            return (<div key={post.id}>{post.data.title}</div>);
        });
    }
});

    function select(state) {
        return state;
    }

    module.exports = Connect(select)(Main);