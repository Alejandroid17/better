import React from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import BetterTable from './components/Table';
import BeatLoader from 'react-spinners/BeatLoader';


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


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            elements: [],
            loaded: false,
        };

        this.readData();
    }

    /**
     * Read the data of a data.json file and prepare the elements to show in the table.
     */
    readData = () => {
        fetch("./data.json")
            .then(res => res.json())
            .then((result) => {
                    var elements = result.data.map((data, index) => {
                        return createData(data.name, data.tags, data.button);
                    });
                    this.setState({
                        elements: elements,
                        loaded: true,
                    });
                }
            );
    };

    /**
     * Render the table is the datas are prepared, otherwise show a loading spinner.
     */
    renderOrLoad = () => {
        if (this.state.loaded) {
            return <BetterTable elements={this.state.elements}/>
        }
        return <div style={{marginTop: "20rem"}}>
            <BeatLoader
                sizeUnit={"px"}
                size={110}
                margin={"55px"}
                color={'#12bc8d'}
                loading={!this.state.loaded}
            />
        </div>
    };

    render() {
        return (
            <div className="App">
                <div className="App-intro">
                    <Grid container alignItems="center" justify="center">
                        <Grid item xs={10}>
                            {this.renderOrLoad()}
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
 * Structure of the data
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