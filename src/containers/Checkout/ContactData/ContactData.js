import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Andre',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '41351',
                    country: 'Brazil'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false});
            });
    };

    render() {
        let form = (
            <React.Fragment>
                <h4>Enter your Contact Data</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your name" />
                    <input className={classes.Input} type="email" name="email" placeholder="Your email" />
                    <input className={classes.Input} type="text" name="street" placeholder="Your street" />
                    <input className={classes.Input} type="text" name="postal" placeholder="Your postal code" />
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
            </React.Fragment>
        );

        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                {form}
            </div>
        );
    }
}

//or distribute the props in the render method in Checkout.js
export default withRouter(ContactData);