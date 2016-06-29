var Body = React.createClass({
    getInitialState() {
        return { items: [] }
    },


    componentDidMount() {
        $.getJSON('/api/v1/items.json', (response) => { this.setState({ items: response }) });
        //this.setState({items: [{"id":12,"name":"How are you?","description":"Good Good!","created_at":"2016-06-29T05:48:24.567Z","updated_at":"2016-06-29T05:48:24.567Z"}]})
    },

    handleDelete(id) {
        $.ajax({
            url: '/api/v1/items/'+id,
            type: 'DELETE',
            success:() => {
               this.removeItemClient(id);
            }
        });
    },

    removeItemClient(id) {
        var newItems = this.state.items.filter((item) => {
            return item.id != id;
        });

        this.setState({ items: newItems });
    },

    handleSubmit(item) {
        var newState = this.state.items.concat(item);
        this.setState({ items: newState })
    },



    render() {
        return (
            <div>
                <NewItem handleSubmit={this.handleSubmit}/>
                <AllItems  items={this.state.items} handleDelete={this.handleDelete} />
            </div>
        )
    }
});