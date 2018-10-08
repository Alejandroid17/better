import React, {Component} from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import BetterTable from './components/Table'


class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-intro">
                    <div style={{marginTop: "5rem"}}>Extra Effort Today, Saves Pain Tomorrow</div>
                    <Grid container alignItems="center" justify="center">
                        <Grid item xs={10}>
                            <BetterTable/>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default App;
