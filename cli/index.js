import { program } from 'commander'
import select from '@inquirer/select'
import chalk from 'chalk'
import path from 'path'
import { fileURLToPath } from 'url'

import createPost from './commands/createPost.js'
import createLink from './commands/createLink.js'
import createChangelog from './commands/createChangelog.js'

import addProject from './commands/addProject.js'
import addGame from './commands/addGame.js'
import fetchLego from './commands/fetchLego.js'
import fetchComics from './commands/fetchComics.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
const __siteroot = __dirname.replace('/cli', '');

const runWizard = async () => {
        console.log(chalk.hex('#e33d94')`............................................................
............................................................
..................@@@@@@@@@@@@@@,..&@@@@@,..................
..................@@@@@@@@@@@@@...@@@@@@....................
........................@@@@@@...@@@@@@.....................
.......................@@@@@@...@@@@@@......................
.....................%@@@@@*..%@@@@@*.......................
.......................@@@@@@...@@@@@@......................
........................@@@@@@...@@@@@@.....................
..................@@@@@..@@@@@@...@@@@@@....................
..................@@@@@...#@@@@@/..#@@@@@/..................
............................................................
.......................rknight.me...........................
............................................................
`)

    const type = await select({
        message: 'What do you want to do?',
        choices: [
            {
                name: 'Create a new post',
                value: 'post',
                description: 'Create a new post',
            },
            {
                name: 'Create a new link post',
                value: 'link',
                description: 'Create a new link post',
            },
            {
                name: 'Create a new changelog entry',
                value: 'changelog',
                description: 'Create a new changelog entry',
            },
            {
                name: 'Add a new project',
                value: 'project',
                description: 'Add a new project',
            },
            {
                name: 'Add a new game',
                value: 'game',
                description: 'Add a new game',
            },
            {
                name: 'Fetch Lego collection',
                value: 'lego',
                description: 'Fetch Lego collection',
            },
            {
                name: 'Fetch comic collection',
                value: 'comic',
                description: 'Fetch comic collection',
            },
        ],
    })

    switch (type) {
        case 'post':
            createPost(__siteroot)
            break
        case 'link':
            createLink(__siteroot)
            break
        case 'changelog':
            createChangelog(__siteroot)
            break
        case 'project':
            addProject(__siteroot)
            break
        case 'game':
            addGame(__siteroot)
            break
        case 'lego':
            fetchLego(__siteroot)
            break
        case 'comic':
            fetchComics(__siteroot)
            break
    }
}

program
    .command('run')
    .description('🧙‍♂️ run the site wizard')
    .action(() => runWizard())

program
    .command('post')
    .description('📝 Create a new post')
    .action(() => createPost(__siteroot))

program
    .command('post')
    .description('🔗 Create a new link')
    .action(() => createLink(__siteroot))

program
    .command('changelog')
    .description('🛠️ Create a new changelog entry')
    .action(() => createChangelog(__siteroot))

program
    .command('project')
    .description('🌟 Add a new project')
    .action(() => addProject(__siteroot))

program
    .command('game')
    .description('🎮 Add a new game')
    .action(() => addGame(__siteroot))

program
    .command('lego')
    .description('🧱 Fetch Lego collection')
    .action(() => fetchLego(__siteroot))

program
    .command('comics')
    .description('🧱 Fetch comic collection')
    .action(() => fetchComics(__siteroot))

program.parse()