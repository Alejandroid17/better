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

const defaultNumRows = 5;

let id = 0;

function createData(name, tags, action) {
    id += 1;
    return {id, name, tags, action};
}

const rows = [
    createData('Frozen yoghurt', ['Isla', 'Hola', 'Adios', 'Uno mas'], {type: 'web', href: 'https://www.google.com'}),
    createData('Ice cream sandwich', ['kiik', 'Lorem', 'suite', 'amelo'], {type: 'gitHub', href: 'www.google.com'}),
    createData('Eclair', ['A', 'B', 'C', 'D'], {type: 'markDown', markdownPath: './markdown/README.md'}),
    createData('Eclair', ['AA', 'BB', 'CC', 'DD'], {type: 'markDown', markdownPath: './markdown/README.md'}),
    createData('Eclair', ['AAA', 'BBB', 'CCC', 'DDD'], {type: 'markDown', markdownPath: './markdown/README.md'}),
    createData('Eclair', ['AAAA', 'BBBB', 'CCCC', 'DDDD'], {type: 'markDown', markdownPath: './markdown/README.md'}),
    createData('Eclair', ['1', '2', '3', '4'], {type: 'markDown', markdownPath: './markdown/README.md'}),
    createData('Eclair', ['1', '2', '3', '4'], {type: 'markDown', markdownPath: './markdown/README.md'}),
    createData('Eclair', ['1', '2', '3', '4'], {type: 'markDown', markdownPath: './markdown/README.md'}),
    createData('Eclair', ['1', '2', '3', '4'], {type: 'markDown', markdownPath: './markdown/README.md'}),
    createData('Eclair', ['1', '2', '3', '4'], {type: 'markDown', markdownPath: './markdown/README.md'}),
    createData('Eclair', ['1', '2', '3', '4'], {type: 'markDown', markdownPath: './markdown/README.md'}),
    createData('Eclair', ['1', '2', '3', '4'], {type: 'markDown', markdownPath: './markdown/README.md'}),
    createData('Eclair', ['1', '2', '3', '4'], {type: 'markDown', markdownPath: './markdown/README.md'}),
    createData('Eclair', ['1', '2', '3', '4'], {type: 'markDown', markdownPath: './markdown/README.md'}),
    createData('Eclair', ['1', '2', '3', '4'], {type: 'markDown', markdownPath: './markdown/README.md'}),
    createData('Eclair', ['1', '2', '3', '4'], {type: 'markDown', markdownPath: './markdown/README.md'}),
    createData('Eclair', ['1', '2', '3', '4'], {type: 'markDown', markdownPath: './markdown/README.md'}),
    createData('Eclair', ['1', '2', '3', '4'], {type: 'markDown', markdownPath: './markdown/README.md'}),
    createData('Eclair', ['1', '2', '3', '4'], {type: 'markDown', markdownPath: './markdown/README.md'}),
    createData('Eclair', ['1', '2', '3', '4'], {type: 'markDown', markdownPath: './markdown/README.md'}),
    createData('Eclair', ['1', '2', '3', '4'], {type: 'markDown', markdownPath: './markdown/README.md'}),
    createData('Eclair', ['1', '2', '3', '4'], {type: 'markDown', markdownPath: './markdown/README.md'}),
    createData('Eclair', ['1', '2', '3', '4'], {type: 'markDown', markdownPath: './markdown/README.md'}),
    createData('Eclair', ['1', '2', '3', '4'], {type: 'markDown', markdownPath: './markdown/README.md'}),
    createData('Eclair', ['1', '2', '3', '4'], {type: 'markDown', markdownPath: './markdown/README.md'}),
];


export default class BetterTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markdownDialogStatus: false,    // To define the status of the dialog (close or open)
            markdownText: "",               // Text of the markdown that will be rendered.
            markdownTitle: "",              // Title of the markdown.
            numFilteredRows: defaultNumRows,
            rowsFiltered: rows.slice(0, defaultNumRows),
        };
    }

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
                numFilteredRows: 5,
                rowsFiltered: rows.slice(0, 5),
            });
        }
    };

    /**
     * Filters the rows by name or tags.
     * @param input: string by which to filter the search.
     * @returns {*[]}: list of rows filtered.
     */
    filterData = (input) => {
        let rowsFiltered = rows.filter((row) => {
            var inputLower = input.toLowerCase();
            if(row.name.toLowerCase().includes(inputLower) || row.tags.find(a => a.toLowerCase().includes(inputLower)) != null){
                return true;
            }
        });
        return rowsFiltered;
    };

    /**
     * Gets the number of filtered rows and total.
     * @returns {string} "filtered rows / total".
     */
    countItemNumber = () => {
        return this.state.numFilteredRows + '/' + rows.length + " elements";
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
            return <Chip key={index} label={tag} style={{marginRight: 5}}/>
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
                       style={{margin: "1rem", textAlign: "center"}}
                       onChange={this.handleSearch("search")}
                />
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell variant={'head'} style={{width: '30%'}}>Element</TableCell>
                                <TableCell variant={'head'} style={{width: '60%'}}>Tags</TableCell>
                                <TableCell variant={'head'} style={{width: '10%'}}>{this.countItemNumber()}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.rowsFiltered.map(row => {
                                return (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
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
                </Paper>
                <MarkdownDialog open={this.state.markdownDialogStatus}
                                markdownText={this.state.markdownText}
                                title={this.state.markdownTitle}
                                onClose={this.handleCloseDialog}/>
            </div>
        );
    }
};
