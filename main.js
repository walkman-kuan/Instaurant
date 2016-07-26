var DishCategoryRow = React.createClass({
    render: function() {
        return (<tr><th colSpan='2'>{this.props.category}</th></tr>);
    }
})

var DishPicture = React.createClass({
    render: function() {
        return (<td><img src={this.props.imageURL} /></td>)
    }
})

var DishRow = React.createClass({
    render: function() {
        return (
            <tr>
                <td><img src={this.props.product.imageURL} /></td>
                <td>{this.props.product.name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        )
    }
})
var DISHES = [
    {category: 'Chicken', price: '10.99', imageURL: '\img\gongbao_chicken.jpg', name: 'Gongbao Chicken'},
    {category: 'Chicken', price: '9.99', imageURL: '\img\fried_chicken_wing.jpg', name: 'Fried Chicken Wing'},
    {category: 'Chicken', price: '12.99', imageURL: '\img\mcnuggets.jpg', name: 'McNugget'},
    {category: 'Beef', price: '8.99', imageURL: '\img\beef_stew.jpg', name: 'Beef Stew'},
    {category: 'Beef', price: '6.99', imageURL: '\img\beef_burger.jpg', name: 'Beef Burger'},
    {category: 'Lamb', price: '7.99', imageURL: '\img\whole_lamg.jpg', name: 'BBQ Whole Lamb'}
];