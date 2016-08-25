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
    handleMinusCopy: function() {
        this.props.onOrderLess(this.props.dish);
    },

    handlePlusCopy: function() {
        this.props.onOrderMore(this.props.dish);
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
                dishCopyNumber={this.props.dish.copies} 
                onMinus={this.handleMinusCopy}
                onPlus={this.handlePlusCopy} 
                disabled={true}
            /> :
            <NumberSpinner 
                dishCopyNumber={this.props.dish.copies} 
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
                displayItems.push(<DishRow 
                                    dish={dish} 
                                    key={dish.name}
                                    onOrderMore={this.props.onOrderMore}
                                    onOrderLess={this.props.onOrderLess}
                                    onOrderDelete={this.props.onOrderDelete}
                                    ordered={false}
                />);
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
            subtotal += parseFloat(dish.price * dish.copies);
        });
        HST = subtotal * 0.13;
        // Include HST in the subtotal
        subtotal += HST;
        return (
            <table>
                <tbody>
                    <tr>{'Subtotal: ' + subtotal.toFixed(2) + ' (Including HST)'}</tr>
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
            sentDishNames: React.addons.update(this.state.sentDishNames, {$push: newItem}),
        });
    },

    handleOrderDelete: function(deleteItem) {
        // Make the change according to Kuan's recommendation
        // Using the React Immutability Helper so that 
        // original state array won't be modified due to the JS
        // pass by reference property
        var index = this.state.orderedDishes.indexOf(deleteItem);
        this.setState({
            orderedDishes: React.addons.update(this.state.orderedDishes, {$splice: [[index, 1]]}),
        });
    },

    handleOrderMore: function(orderItem) {
        var newOrderedDishes = this.state.orderedDishes;
        var index = newOrderedDishes.indexOf(orderItem);
        newOrderedDishes[index].copies += 1;
        this.setState({
            orderedDishes: React.addons.update(this.state.orderedDishes, {$set: newOrderedDishes}),
        }); 
    },

    handleOrderLess: function(orderItem) {
        var newOrderedDishes = this.state.orderedDishes;
        var index = newOrderedDishes.indexOf(orderItem);
        newOrderedDishes[index].copies = newOrderedDishes[index].copies > 1 ?
                                         newOrderedDishes[index].copies - 1 :
                                         newOrderedDishes[index].copies;
        this.setState({
            orderedDishes: React.addons.update(this.state.orderedDishes, {$set: newOrderedDishes}), 
        }); 
    },

    render: function() {
        return (
            <div className="container">
                <DishTable 
                    dishes={this.state.orderedDishes} 
                    sentDishNames={this.state.sentDishNames}
                    onOrderDelete={this.handleOrderDelete}
                    onOrderMore={this.handleOrderMore}
                    onOrderLess={this.handleOrderLess}
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