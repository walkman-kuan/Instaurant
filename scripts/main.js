var DishCategoryRow = React.createClass({
    render: function() {
        return (
            <div className="col-xs-12">
                <h2>{this.props.category}</h2>
            </div>
        );
    }
});

var NumberSpinner = React.createClass({
    render: function() {
        return (
            <div className="input-group number-spinner">
                <span className="input-group-btn data-dwn">
                    <button className="btn btn-default btn-info" onClick={this.props.onMinus} disabled={this.props.disabled}>
                        <span className="glyphicon glyphicon-minus"></span>
                    </button>
                </span>
                <input type="text" className="form-control text-center" value={this.props.dishCopyNumber} readOnly/>
                <span className="input-group-btn data-up">
                    <button className="btn btn-default btn-info" onClick={this.props.onPlus} disabled={this.props.disabled}>
                        <span className="glyphicon glyphicon-plus"></span>
                    </button>
                </span>
            </div>
        );
    }
})

var DishRow = React.createClass({
    getInitialState: function() {
        return {
            dishCopyNumber: this.props.dish.copies
        }
    },

    handleMinusCopy: function() {
        this.setState({
            dishCopyNumber: (this.state.dishCopyNumber > 1) ?
                            this.state.dishCopyNumber - 1:
                            this.state.dishCopyNumber
        })
    },

    handlePlusCopy: function() {
        this.setState({
            dishCopyNumber: this.state.dishCopyNumber + 1,
        })
    },

    handleDelete: function() {
        this.props.onOrderDelete(this.props.dish);
    },

    render: function() {
        var name = this.props.ordered ?
            <span style={{color: 'red'}}>
                {this.props.dish.name}
            </span> :
            this.props.dish.name;

        var price = this.props.ordered ?
            <span style={{color: 'red'}}>
                {"$"+this.props.dish.price}
            </span> :
            "$"+this.props.dish.price;
        
        var deleteBtn = this.props.ordered ?
            <input type="button" className="btn btn-default btn-info" value="Ordered" disabled={true}/> :
            <input type="button" className="btn btn-default btn-info" value="Delete" onClick={this.handleDelete} disabled={false}/>

        var numberSpinner = this.props.ordered ?
            <NumberSpinner 
                dishCopyNumber={this.state.dishCopyNumber} 
                onMinus={this.handleMinusCopy}
                onPlus={this.handlePlusCopy} 
                disabled={true}
            /> :
            <NumberSpinner 
                dishCopyNumber={this.state.dishCopyNumber} 
                onMinus={this.handleMinusCopy}
                onPlus={this.handlePlusCopy}
                disabled={false} 
            />

        return (
            <div className="col-xs-12 jumbotron">
                <img src={this.props.dish.imageURL} style={{"width":"100%", "height":"100%"}} />
                <p className="text-center">{name}</p>
                <p className="text-center">{price}</p>
                <div className="row">
                    <div className="col-xs-6">{deleteBtn}</div>
                    <div className="col-xs-6">{numberSpinner}</div>
                </div>
            </div>
        );
    }
});

var DishTable = React.createClass({
    render: function() {
        var displayItems = [];
        var lastCategory = null;
        this.props.dishes.forEach(function(dish) {
            if (dish.category !== lastCategory) {
                displayItems.push(<DishCategoryRow category={dish.category} key={dish.category} />);
            }
            if (this.props.sentDishNames.indexOf(dish.name) === -1) {
                displayItems.push(<DishRow dish={dish} key={dish.name} onOrderDelete={this.props.onOrderDelete} ordered={false}/>);
            } else {
                displayItems.push(<DishRow dish={dish} key={dish.name} ordered={true}/>);
            }
            lastCategory = dish.category;
        }.bind(this));
        return (
            <div>
                {displayItems}
            </div>
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
        this.props.onOrderNow(newDishNames);
    },

    render: function() {
        return (
            <div className="col-xs-12">
                <Subtotal dishes={this.props.dishes} />
                <input
                    type="button" 
                    value="Order Now"
                    ref="submitOrderInput" 
                    onClick={this.handleClick}
                    className="btn btn-default btn-info"
                />
            </div>
        );

    }
});

var DeletableDishTable = React.createClass({
    getInitialState: function() {
        return {
            sentDishNames: [],
            orderedDishes: this.props.dishes
        };
    },

    handleOrderNow: function(newItem) {
        this.setState({ 
            sentDishNames: this.state.sentDishNames.concat(newItem),
        });
    },

    handleOrderDelete: function(deleteItem) {
        var newOrderedDishes = this.state.orderedDishes;
        var index = newOrderedDishes.indexOf(deleteItem);
        newOrderedDishes.splice(index, 1);
        this.setState({
            orderedDishes: newOrderedDishes, 
        });
    },

    render: function() {
        return (
            <div className="container">
                <DishTable 
                    dishes={this.state.orderedDishes} 
                    sentDishNames={this.state.sentDishNames}
                    onOrderDelete={this.handleOrderDelete}
                />
                <SubtotalAndOrder 
                    dishes={this.state.orderedDishes} 
                    sentDishNames={this.state.sentDishNames}
                    onOrderNow={this.handleOrderNow}
                />
            </div>
        );
    }
});

var DISHES = [
    {category: 'Chicken', price: '10.99', imageURL: '/img/gongbao_chicken.jpg', name: 'Gongbao Chicken', copies: 2},
    {category: 'Chicken', price: '9.99', imageURL: '/img/fried_chicken_wing.jpg', name: 'Chicken Wing', copies: 3},
    {category: 'Chicken', price: '12.99', imageURL: '/img/mcnuggets.jpg', name: 'McNugget', copies: 1},
    {category: 'Beef', price: '8.99', imageURL: '/img/beef_stew.jpg', name: 'Beef Stew', copies: 3},
    {category: 'Beef', price: '6.99', imageURL: '/img/beef_burger.jpg', name: 'Beef Burger', copies: 2},
    {category: 'Lamb', price: '7.99', imageURL: '/img/whole_lamb.jpg', name: 'BBQ Whole Lamb', copies: 4}
];


ReactDOM.render(
    <DeletableDishTable dishes={DISHES} />,
    document.getElementById('container')
);