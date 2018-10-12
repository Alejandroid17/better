import React, {Component} from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import BetterTable from './components/Table';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-intro">
                    <Grid container alignItems="center" justify="center">
                        <Grid item xs={10}>
                            <BetterTable elements={elements}/>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default App;



let id = 0;
function createData(name, tags, action) {
    id += 1;
    return {id, name, tags, action};
}

var datas = [
    {name: 'Frozen yoghurt', tags: ['Isla', 'Hola', 'Adios', 'Uno mas'], button: {type: 'markDown', markdownPath: './markdown/README.md'}},
    {name: 'Frozen yoghurt', tags: ['Isla', 'Hola', 'Adios', 'Uno mas'], button: {type: 'web', href: 'https://www.google.com'}},
    {name: 'Frozen yoghurt', tags: ['Isla', 'Hola', 'Adios', 'Uno mas'], button: {type: 'web', href: 'https://www.google.com'}},
    {name: 'Frozen yoghurt', tags: ['Isla', 'Hola', 'Adios', 'Uno mas'], button: {type: 'web', href: 'https://www.google.com'}},
    {name: 'Frozen yoghurt', tags: ['Isla', 'Hola', 'Adios', 'Uno mas'], button: {type: 'web', href: 'https://www.google.com'}},
    {name: 'Frozen yoghurt', tags: ['Isla', 'Hola', 'Adios', 'Uno mas'], button: {type: 'web', href: 'https://www.google.com'}},
    {name: 'Frozen yoghurt', tags: ['Isla', 'Hola', 'Adios', 'Uno mas'], button: {type: 'web', href: 'https://www.google.com'}},
    {name: 'Frozen yoghurt', tags: ['Isla', 'Hola', 'Adios', 'Uno mas'], button: {type: 'web', href: 'https://www.google.com'}},
    {name: 'Frozen yoghurt', tags: ['Isla', 'Hola', 'Adios', 'Uno mas'], button: {type: 'web', href: 'https://www.google.com'}},
];

const elements = datas.map((data, index) => {
   return createData(data.name, data.tags, data.button);
});