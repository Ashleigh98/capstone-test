import React from "react";
import Login from "../components/Login";
import { BrowserRouter } from "react-router-dom";
import renderer from 'react-test-renderer';

//I tested the login page to see if it renders correctly
test('renders correctly', () =>{
    const tree = renderer
    .create(<BrowserRouter><Login/></BrowserRouter>) //because the component has links it needs to be wrapped in the BrowserRouter
    .toJSON();
    expect(tree).toMatchSnapshot();
});

