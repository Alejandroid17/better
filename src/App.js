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
        name: 'GitHud Flavored Markdown Spec',
        tags: ['GitHub', 'Markdown'],
        button: {type: 'web', href: 'https://github.github.com/gfm/'}
    },
    {
        name: 'Semantic Commit Messages',
        tags: ['Semantic', 'Commit', 'Git'],
        button: {type: 'web', href: 'https://seesparkbox.com/foundry/semantic_commit_messages'}
    },
    {
        name: 'Django Snippets',
        tags: ['Django', 'Snippets', 'Python', 'Collaborative'],
        button: {type: 'web', href: 'https://djangosnippets.org/'}
    },
    {
        name: 'Coolors',
        tags: ['Colors', 'HTML', 'Template', 'Hexadecimal'],
        button: {type: 'web', href: 'https://coolors.co/app'}
    },
    {
        name: 'HackMD',
        tags: ['Markdown', 'Documentation', 'GitHub'],
        button: {type: 'web', href: 'https://hackmd.io/'}
    },
    {
        name: 'Codrops',
        tags: ['Styles', 'CSS', 'Efects', 'Tutorials', 'Design', 'Collaborative'],
        button: {type: 'web', href: 'https://tympanus.net/codrops/'}
    },
    {
        name: 'Design notes',
        tags: ['Design', 'Collaborative', 'Library'],
        button: {type: 'web', href: 'https://www.designnotes.co/'}
    },
    {
        name: 'Brusher',
        tags: ['JavaScript', 'Paint', 'Wallpaper'],
        button: {type: 'gitHub', href: 'https://github.com/kamranahmedse/brusher/'}
    },
    {
        name: 'React & GitHub-Pages',
        tags: ['React', 'GitHub-Pages', 'Static', 'Web'],
        button: {type: 'medium', href: 'https://codeburst.io/deploy-react-to-github-pages-to-create-an-amazing-website-42d8b09cd4d'}
    },
    {
        name: 'Codewars',
        tags: ['Challenges', 'Code', 'Competition', 'Game'],
        button: {type: 'web', href: 'https://www.codewars.com/'}
    },
    {
        name: 'Overthewire',
        tags: ['Challenges', 'Competition', 'Security', 'Game'],
        button: {type: 'web', href: 'http://overthewire.org/wargames/'}
    },
    {
        name: 'The silver searcher',
        tags: ['grep', 'search', 'fast', 'filter'],
        button: {type: 'gitHub', href: 'https://github.com/ggreer/the_silver_searcher'}
    },
];

const elements = datas.map((data, index) => {
    return createData(data.name, data.tags, data.button);
});
