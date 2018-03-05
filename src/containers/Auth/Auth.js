import React,  { Component } from 'react';

import classes from './Auth.css';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        }
    };

    checkValidity (value, rules) {
        let isValid = true;
        
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
    
        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
    
        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
    
        return isValid;
    }

    render() {
        const formElements = [];

        for (let key in this.state.controls) {
            formElements.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        const form = formElements.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                errorMessage={'Please, enter a valid ' + formElement.id}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ));

        return(
            <div className={classes.Auth}>
                <form>
                    {form}
                    <Button btnType="Success">Sign in</Button>
                </form>
            </div>
        );
    }
}

export default Auth;