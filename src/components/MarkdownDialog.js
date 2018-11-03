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
import renderHTML from 'react-render-html';
import ClipLoader from 'react-spinners/ClipLoader';

const styles = {
    appBar: {
        position: 'relative',
        backgroundColor: '#a261c052',
    },
    flex: {
        flex: 1,
        textAlign: "center",
        fontSize: "2rem",
    },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}


class FullScreenDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markdownText: null,
            markdownHtml: null,
        };
    }

    /**
     * Handle to close the dialog.
     */
    handleClose = () => {
        this.props.onClose()
    };

    /**
     * Check if the markdown is ready, if it is not already displayed a loading spinner.
     */
    isLoaded = () => {
        if (this.props.loaded) {
            return renderHTML(this.props.markdownHTML)
        }
        return <div className={"spinner"} style={{textAlign: "center"}}>
            <ClipLoader
                sizeUnit={"px"}
                size={150}
                color={"#123abc"}
            />
        </div>
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Dialog
                    fullScreen={true}
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
                    <div style={{marginTop: "2rem"}}>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Paper style={{padding: "5rem 5rem 5rem 5rem", width: this.props.paperWidth, opacity: 0.95, minHeight: "10rem"}}
                                   elevation={24}>
                                <div>
                                    {this.isLoaded()}
                                </div>
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
