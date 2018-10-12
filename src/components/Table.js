import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import MarkdownDialog from './MarkdownDialog';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGlobe} from '@fortawesome/free-solid-svg-icons';
import {faGithub, faMarkdown} from '@fortawesome/free-brands-svg-icons';
import Input from '@material-ui/core/Input';
import TablePagination from '@material-ui/core/TablePagination';

const defaultNumRows = 6;

export default class BetterTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markdownDialogStatus: false,                                 // To define the status of the dialog (close or open).
            markdownText: "",                                            // Text of the markdown that will be rendered.
            markdownTitle: "",                                           // Title of the markdown.
            numFilteredRows: defaultNumRows,                             // Number of rows filtered.
            rowsFiltered: this.props.elements.slice(0, defaultNumRows),  // Filtered rows.
            currentPage: 0,                                              // Current page.
        };
    }

    /**
     * On `change` page event, the rows are filter by pages.
     * @param event: event launched.
     * @param pageNumber: current page number.
     */
    handleChangePage = (event, pageNumber) => {
        this.setState({
            currentPage: pageNumber,
            rowsFiltered: this.props.elements.slice((defaultNumRows) * pageNumber, defaultNumRows * pageNumber + defaultNumRows)
        });
    };

    /**
     * On `change` event, the rows are filtered and the status is updated.
     * @param inputType: type of input.
     * @param event: event launched.
     */
    handleSearch = inputType => event => {
        let input = event.target.value;
        if (input.length >= 2) {
            let rowsFiltered = this.filterData(input);
            this.setState({
                numFilteredRows: rowsFiltered.length,
                rowsFiltered: rowsFiltered,
            })
        } else {
            this.setState({
                numFilteredRows: defaultNumRows,
                rowsFiltered: this.props.elements.slice(0, defaultNumRows),
            });
        }
    };

    /**
     * Filters the rows by name or tags.
     * @param input: string by which to filter the search.
     * @returns {*[]}: list of rows filtered.
     */
    filterData = (input) => {
        let rowsFiltered = this.props.elements.filter((row) => {
            var inputLower = input.toLowerCase();
            if (row.name.toLowerCase().includes(inputLower) || row.tags.find(a => a.toLowerCase().includes(inputLower)) != null) {
                return true;
            }
            return;
        });
        return rowsFiltered;
    };

    /**
     * Gets the number of filtered rows and total.
     * @returns {string} "filtered rows / total".
     */
    countItemNumber = () => {
        return this.state.numFilteredRows + '/' + this.props.elements.length + " elements";
    };

    /**
     * Handle to open the dialog.
     * When the dialog is opened, the markdown file is read.
     */
    handleOpenDialog = (row) => {
        fetch(row.action.markdownPath)
            .then(res => res.text())
            .then((result) => {
                    this.setState({
                        markdownDialogStatus: true,
                        markdownText: result,
                        markdownTitle: row.name,
                    })
                }
            );
    };

    /**
     * Handle to close the dialog.
     * Changes the `markdownDialogStatus` to false.
     */
    handleCloseDialog = () => {
        this.setState({
            markdownDialogStatus: false,
        });
    };

    /**
     * Renders the tags available for each row.
     * @param row: each row that will be rendered.
     * @returns: list of tags (component).
     */
    renderTags = (row) => {
        const tagsList = row.tags.map((tag, index) => {
            return <Chip key={index} label={'#' + tag} style={{
                marginRight: 5,
                background: "#E5D352",
                fontSize: "0.9rem",
                fontWeight: "bold",
            }
            }/>
        });
        return tagsList;
    };

    /**
     * Renders the differents buttons in the table. Each button has differents actions.
     * @param row: row active.
     * @returns: button (component)
     */
    renderAction = (row) => {
        switch (row.action.type) {
            case "web":
                return <Button variant="contained" href={row.action.href} target="_blank">
                    <FontAwesomeIcon icon={faGlobe} size={'2x'}/>
                </Button>;
            case "gitHub":
                return <Button variant="contained" href={row.action.href} target="_blank">
                    <FontAwesomeIcon icon={faGithub} size={'2x'}/>
                </Button>;
            case "markDown":
                return <Button variant="contained"
                               onClick={() => this.handleOpenDialog(row)}>
                    <FontAwesomeIcon icon={faMarkdown} size={'2x'}/>
                </Button>;
            default:
                return ""
        }
    };


    render() {
        return (
            <div className="better-table-container">
                <Input placeholder="Search"
                       autoFocus={true}
                       style={{margin: "1rem", textAlign: "center", color: "white", fontSize: "3.5rem"}}
                       disableUnderline={true}
                       onChange={this.handleSearch("search")}
                />
                <Paper elevation={24} square={false} style={{opacity: 0.85}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell variant={'head'}
                                           style={{width: '30%', fontSize: "1.2rem"}}>Element</TableCell>
                                <TableCell variant={'head'} style={{width: '60%', fontSize: "1.2rem"}}>Tags</TableCell>
                                <TableCell variant={'head'}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.rowsFiltered.map(row => {
                                return (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row" style={{fontSize: "1rem"}}>
                                            {row.name}
                                        </TableCell>
                                        <TableCell>
                                            {this.renderTags(row)}
                                        </TableCell>
                                        <TableCell>
                                            {this.renderAction(row)}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    <TablePagination
                        component="div"
                        count={this.props.elements.length}
                        rowsPerPage={defaultNumRows}
                        page={this.state.currentPage}
                        labelRowsPerPage={''}
                        rowsPerPageOptions={[]}
                        onChangePage={this.handleChangePage}
                    />
                </Paper>
                <MarkdownDialog open={this.state.markdownDialogStatus}
                                markdownText={this.state.markdownText}
                                title={this.state.markdownTitle}
                                onClose={this.handleCloseDialog}/>
            </div>
        );
    }
};
