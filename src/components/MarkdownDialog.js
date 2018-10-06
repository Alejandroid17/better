import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons/index';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ReactMarkdown from 'react-markdown';
import DinoToCat from './../media/images/dinotocat.png'
import DeckFailCat from './../media/images/deckfailcat.png'

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}


class FullScreenDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isMarkdownLoaded: false,
            markdownText: null,
        };
    }

    /**
     * Handle to close the dialog.
     */
    handleClose = () => {
        this.props.onClose()
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Dialog
                    fullScreen
                    open={this.props.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                {this.props.title}
                            </Typography>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <FontAwesomeIcon icon={faTimesCircle} size={'1x'}/>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <div style={{marginTop: "1%"}}>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Paper style={{padding: "5rem 5rem 5rem 5rem", width: "55rem"}}>
                                <ReactMarkdown source={this.props.markdownText}/>
                            </Paper>
                        </Grid>
                    </div>
                </Dialog>
            </div>
        );
    }
}

FullScreenDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);
