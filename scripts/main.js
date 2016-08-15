var DishCategoryRow = React.createClass({
    render: function() {
        return (<tr><th colSpan='2'>{this.props.category}</th></tr>);
    }
});

var DishRow = React.createClass({
    render: function() {
        var name = this.props.ordered ?
            <span style={{color: 'red'}}>
                {this.props.dish.name}
            </span> :
            this.props.dish.name;
        return (
            <tr>
                <td><img src={this.props.dish.imageURL} height="42" width="42" /></td>
                <td>{name}</td>
                <td>{this.props.dish.price}</td>
            </tr>
        );
    }
});

var DishTable = React.createClass({
    render: function() {
        var rows = [];
        var lastCategory = null;
        this.props.dishes.forEach(function(dish) {
            if (dish.category !== lastCategory) {
                rows.push(<DishCategoryRow category={dish.category} key={dish.category} />);
            }
            if (this.props.sentDishNames.indexOf(dish.name) === -1) {
                rows.push(<DishRow dish={dish} key={dish.name} ordered={false}/>);
            } else {
                rows.push(<DishRow dish={dish} key={dish.name} ordered={true}/>);
            }
            lastCategory = dish.category;
        }.bind(this));
        return (
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
});

var Subtotal = React.createClass({
    render: function() {
        var subtotal = 0;
        var HST = 0;
        this.props.dishes.forEach(function(dish) {
            subtotal += parseFloat(dish.price);
        });
        HST = subtotal * 0.13;
        return (
            <table>
                <tbody>
                    <tr>{'Subtotal: ' + subtotal.toFixed(2)}</tr>
                    <tr>{'HST: ' + HST.toFixed(2)}</tr>
                </tbody>
            </table>
        );
    }
});

var SubtotalAndOrder = React.createClass({
    handleClick: function() {
        var newDishNames = [];
        this.props.dishes.forEach(function(dish) {
            if (this.props.sentDishNames.indexOf(dish.name) === -1) {
                newDishNames.push(dish.name);
            }
        }.bind(this));
        this.props.onUserInput(newDishNames);
    },

    render: function() {
        return (
            <div>
                <Subtotal dishes={this.props.dishes} />
                <input 
                    type="button" 
                    value="Order Now"
                    ref="submitOrderInput" 
                    onClick={this.handleClick}
                />
            </div>
        );

    }
});

var DeletableDishTable = React.createClass({
    getInitialState: function() {
        return {
            sentDishNames: []
        };
    },

    handleUserInput: function(newItem) {
        this.setState({ 
            sentDishNames: this.state.sentDishNames.concat(newItem),
        });
    },

    render: function() {
        return (
            <div>
                <DishTable dishes={this.props.dishes} sentDishNames={this.state.sentDishNames}/>
                <SubtotalAndOrder 
                    dishes={this.props.dishes} 
                    sentDishNames={this.state.sentDishNames}
                    onUserInput={this.handleUserInput}
                />
            </div>
        );
    }
});

var DISHES = [
    {category: 'Chicken', price: '10.99', imageURL: '/img/gongbao_chicken.jpg', name: 'Gongbao Chicken'},
    {category: 'Chicken', price: '9.99', imageURL: '/img/fried_chicken_wing.jpg', name: 'Chicken Wing'},
    {category: 'Chicken', price: '12.99', imageURL: '/img/mcnuggets.jpg', name: 'McNugget'},
    {category: 'Beef', price: '8.99', imageURL: '/img/beef_stew.jpg', name: 'Beef Stew'},
    {category: 'Beef', price: '6.99', imageURL: '/img/beef_burger.jpg', name: 'Beef Burger'},
    {category: 'Lamb', price: '7.99', imageURL: '/img/whole_lamb.jpg', name: 'BBQ Whole Lamb'}
];


ReactDOM.render(
    <DeletableDishTable dishes={DISHES} />,
    document.getElementById('container')
);