import React, {Component} from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import BetterTable from './components/Table';

function Info(author, gitHub, repository) {
    this.author = author;
    this.gitHub = gitHub;
    this.repository = repository;
}

function showInfo() {
    var me = new Info("Alejandroid17", "https://github.com/Alejandroid17", "https://github.com/Alejandroid17/better");
    console.table(me);
}

// Call to show the console log table.
showInfo();

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

/**
 * DATAS
 *
 * Markdown => {
 *                  name: 'name',
 *                  tags: ['tag1', 'tag2,],
 *                  button: {type: 'markDown', markdownPath: './...'}
 *             }
 *
 * Web => {
 *              name: 'name',
 *              tags: ['tag1', 'tag2,],
 *              button: {type: 'web', href: 'https://...'}
 *        }
 *
 * GitHub => {
 *              name: 'name',
 *              tags: ['tag1', 'tag2,],
 *              button: {type: 'gitHub', href: 'https://...'}
 *           }
 *
 */

var datas = [
    {
        name: 'GitHub Flavored Markdown Spec',
        tags: ['GitHub', 'Markdown'],
        button: {type: 'web', href: 'https://github.github.com/gfm/'}
    },
];

const elements = datas.map((data, index) => {
    return createData(data.name, data.tags, data.button);
});