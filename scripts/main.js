var DishCategoryRow = React.createClass({
    render: function() {
        return (<tr><th colSpan='2'>{this.props.category}</th></tr>);
    }
});

// var DishPicture = React.createClass({
//     render: function() {
//         return (<td><img src={this.props.imageURL} /></td>)
//     }
// })

var DishRow = React.createClass({
    render: function() {
        return (
            <tr>
                <td><img src={this.props.dish.imageURL} height="42" width="42" /></td>
                <td>{this.props.dish.name}</td>
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
            rows.push(<DishRow dish={dish} key={dish.name} />);
            lastCategory = dish.categoty;
        });
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

// var Subtotal = React.createClass({
//     render: function() {

//     }
// })

var DeletableDishTable = React.createClass({
    render: function() {
        return (
            <div>
                <DishTable dishes={this.props.dishes} />
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