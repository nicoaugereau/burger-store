/**
 * Cypress runner
 *
 * Command : node ./cypress_runner.js <env> <browser> <device> <orientation> <spec>
 *
 * Pour les tests cucumber, préférer l'utilisation suivante (exemple exécution tests non Electron) :
 * npx cypress-tags run -e TAGS='not @isNotElectron' -e configFile=local
 *
 * https://medium.com/cypress-io-thailand/generate-a-beautiful-test-report-from-running-tests-on-cypress-io-371c00d7865a
 */

const cypress = require('cypress')
const yargs = require('yargs')
const { initReports, reporter } = require('./cypress_reporter')

const argv = yargs
    .scriptName('cypress_runner')
    .usage('Usage: $0 -a [application] -e [env] -b [browser] -s [spec] [option: testname]')
    .example('burger-store js test : node ./cypress_runner.js -e local -b chrome -s js creer-commande-po.spec')
    .example('burger-store feature test : node ./cypress_runner.js -e local -b chrome creer-commande-fr')
    .example('cypress app js test: node ./cypress_runner.js -a cypress -e 1-getting-started -b chrome -s js todo.spec')
    .options({
        app: {
            alias: 'a',
            describe: 'Application to test (default burger-store)',
            default: 'burger-store',
            choices: ['burger-store', 'cypress']
        },
        env: {
            alias: 'e',
            describe: 'Environment (default local)',
            default: 'local',
            choices: ['local', 'internet']
        },
        browser: {
            alias: 'b',
            describe: 'Browser (default electron)',
            default: 'electron',
            choices: ['chrome', 'electron', 'firefox', 'edge']
        },
        spec: {
            alias: 's',
            describe: 'JS or feature tests ? (default feature)',
            default: 'feature',
            choices: ['js', 'feature']
        },
        tags: {
            alias: 't',
            describe: 'Execute les tests selon les tags'
        },
        visual: {
            alias: 'v',
            describe: 'Visual regression (default actual) : base = take screenshots ; actual = comparaison',
            default: 'none',
            choices: ['none', 'base', 'actual']
        }
    })
    .help().argv

// Initialize reports folder
initReports()

var specs = argv._ != '' ? `cypress/e2e/${argv.app}/${argv.env}/${argv._}.${argv.spec}` : `cypress/e2e/${argv.app}/${argv.env}/**/*.${argv.spec}`
var tags = argv['tags'] == undefined ? '' : `TAGS=${argv.tags}`
var regression = argv['visual'] == 'none' ? '' : argv['visual'] == 'base' ? 'type=base' : 'type=actual'
var cibuildid = argv['ci-build-id'] != null ? 'ci-build-id=' + argv['ci-build-id'] : ''
var envConfig = [cibuildid, regression, tags]

cypress
    .run({
        env: envConfig.filter(val => val).join(','),
        browser: argv.browser,
        spec: specs
    })
    .then(infos => {
        // Création du rapport de tests
        try {
            reporter({ infos: infos, spec: argv.spec, app: argv.app })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => {
        console.error('errors: ', error)
        process.exit(1)
    })
