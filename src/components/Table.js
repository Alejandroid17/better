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
import {faGithub, faMarkdown, faMedium} from '@fortawesome/free-brands-svg-icons';
import Input from '@material-ui/core/Input';
import TablePagination from '@material-ui/core/TablePagination';

const defaultNumRows = 8;

export default class BetterTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markdownDialogStatus: false,                    // To define the status of the dialog (close or open).
            markdownHTML: "",                               // Markdown HTML to render.
            markdownLoaded: false,                          // Flag to know if the markdown is loaded or not.
            markdownTitle: "",                              // Title of the markdown.
            numFilteredRows: this.props.elements.length,    // Number of rows filtered.
            rowsFiltered: this.props.elements,              // Filtered rows.
            currentPage: 0,                                 // Current page.
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
                numFilteredRows: this.props.elements.length,
                rowsFiltered: this.props.elements,
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
     * Handle to open the dialog.
     * When the dialog is opened, the markdown file is read.
     */
    handleOpenDialog = (row) => {
        const gitUrl = "https://api.github.com/markdown";

        // Read the markdown file... and open the modal...
        fetch(row.action.markdownPath)
            .then(res => res.text())
            .then((result) => {
                    if (row.action.type == "markDown") { // If the type is "markdown" ...
                        fetch(gitUrl, {
                            method: 'post',
                            headers: {'Content-Type': 'text/plain'},
                            body: JSON.stringify({
                                "text": result,
                                "mode": "gfm",
                            })
                        }).then((response) => {
                            return response.text();
                        }).then((data) => {
                            this.setState({
                                markdownHTML: data.replace(/\n/g, ''),
                                markdownLoaded: true,
                                paperWidth: "55rem",
                                markdownDialogStatus: true,
                                markdownTitle: row.name,
                            });
                        });
                    } else { // If the type is "markdowm html" ...
                        this.setState({
                            markdownHTML: result,
                            markdownLoaded: true,
                            paperWidth: "110rem",
                            markdownDialogStatus: true,
                            markdownTitle: row.name,
                        });
                    }

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
            markdownHTML: "",
            markdownTitle: "",
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
     * Renders the different buttons in the table. Each button has different actions.
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
                return <Button variant="contained" onClick={() => this.handleOpenDialog(row)}>
                    <FontAwesomeIcon icon={faMarkdown} size={'2x'}/>
                </Button>;
            case "medium":
                return <Button variant="contained" href={row.action.href} target="_blank">
                    <FontAwesomeIcon icon={faMedium} size={'2x'}/>
                </Button>;
            case "markDownHtml":
                return <Button variant="contained" onClick={() => this.handleOpenDialog(row)}>
                    <FontAwesomeIcon icon={faMarkdown} size={'2x'}/>
                </Button>;
            default:
                return ""
        }
    };

    render() {
        var currentPage = this.state.currentPage;
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
                            {this.state.rowsFiltered.slice(defaultNumRows * currentPage, defaultNumRows * currentPage + defaultNumRows).map(row => {
                                return (
                                    <TableRow key={row.id} className={'values-tr'}>
                                        <TableCell style={{fontSize: "1.2rem", fontWeight:"bold"}}>
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
                        count={this.state.numFilteredRows}
                        rowsPerPage={defaultNumRows}
                        page={this.state.currentPage}
                        labelRowsPerPage={''}
                        rowsPerPageOptions={[]}
                        onChangePage={this.handleChangePage}
                    />
                </Paper>
                <MarkdownDialog open={this.state.markdownDialogStatus}
                                loaded={this.state.markdownLoaded}
                                markdownHTML={this.state.markdownHTML}
                                title={this.state.markdownTitle}
                                paperWidth={this.state.paperWidth}
                                onClose={this.handleCloseDialog}/>
            </div>
        );
    }
};
