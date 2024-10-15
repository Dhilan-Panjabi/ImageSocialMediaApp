import React, { useCallback, useReducer } from 'react';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/components/util/validators';
import Button from '../../shared/components/FormElements/Button';
import './NewPlace.css';

const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for(const inputId in state.inputs) {
                if(inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {value: action.value, isValid: action.isValid}
                },
                isValid: formIsValid
            };
            default:
                return state;
        }}

const NewPlaces = () => {

    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            }
        },
        isValid: false
    });

    const placeSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    }

    const titleInputHandler = useCallback((id, value, isValid) => {
        dispatch({type: 'INPUT_CHANGE', value: value, isValid: isValid, inputId: id});
    }, []);

    const descriptionInputHandler = useCallback((id, value, isValid) => {
        dispatch({type: 'INPUT_CHANGE', value: value, isValid: isValid, inputId: id});
    }, []);

    return( <form className='place-form' onSubmit={placeSubmitHandler}>
        <Input 
        id='title'
        element='input' 
        type='text' 
        label='Title' 
        validators = {[VALIDATOR_REQUIRE()]}
        errorText='Please Enter A Valid Title.'
        onInput={titleInputHandler}
        />
        <Input 
        id = 'description'
        element='textarea' 
        label='Description' 
        validators = {[VALIDATOR_MINLENGTH(5)]}
        errorText='Please Enter A Valid Title With At Least 5 Characters.'
        onInput={descriptionInputHandler}
        />
        <Input 
        id = 'address'
        element='input' 
        label='Address' 
        validators = {[VALIDATOR_REQUIRE()]}
        errorText='Please Enter A Valid Address.'
        onInput={descriptionInputHandler}
        />
        <Button type='submit' disabled={!formState.isValid}>ADD PLACE</Button>
    </form>

    );
}

export default NewPlaces;
