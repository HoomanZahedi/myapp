import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import ApolloProvider from './ApolloProvider';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//    <ApolloProvider/>
// );
ReactDOM.render(ApolloProvider,document.getElementById('root'))
reportWebVitals();
