/// <reference types="cypress" />

/**
 * Cypress customize browsers
 * https://docs.cypress.io/guides/guides/launching-browsers#Customize-available-browsers
 *
 * Browsers à déposer dans le répertoire racine du projet sesame-tests : ./browsers
 *
 */
const execa = require('execa')
const path = require('path')
const fs = require('fs')
const { platform, version } = require('os'),
    osType = platform()
let newBrowser, fullVersion, majorVersion
let browsersList = []

/**
 * Find Windows browsers in the ./browsers folder
 * Add <fullVersion>.manifest file in each browser folcer
 */
const winBrowsers = () => {
    const browserPath = path.join(__dirname, '../..', 'browsers')

    const directoriesInDirectory = fs
        .readdirSync(browserPath, { withFileTypes: true })
        .filter(item => item.isDirectory())
        .map(item => item.name)

    for (const element of directoriesInDirectory) {
        let dirCont = fs.readFileSync(`${browserPath}/${element}`)
        let files = dirCont.filter(function (elm) {
            return elm.match(/.*\.manifest/gi)
        })
        if (files.length > 0) {
            ;[, fullVersion] = /(\d+\.\d+\.\d+\.\d+\.)/.exec(files)
            majorVersion = parseInt(fullVersion.split('.'[0]))
        } else {
            fullVersion = '74.0.0.0'
            majorVersion = 74
        }

        exeName = element.toLowerCase() == 'chromium' ? 'chrome' : element
        newBrowser = {
            name: element,
            channel: 'stabble',
            family: 'chromium',
            displayName: element,
            version: fullVersion,
            path: `${browserPath}\\${element}\\${exeName}.exe`,
            majorVersion: majorVersion
        }
        browsersList = browsersList.concat(newBrowser)
    }
    return browsersList
}

/**
 * Find MacOS browsers in the /Applications folder
 */
const macBrowsers = () => {
    // the path is hard-coded for simplicity
    //const browserPath = '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser'
    browserPath = '/Applications/'
    browsersList = ['Brave Browser'] // Browsers not in the Cypress default list

    const directoriesInDirectory = fs
        .readdirSync(browserPath, { withFileTypes: true })
        .filter(item => item.isDirectory())
        .map(item => item.name)

    for (const element of directoriesInDirectory) {
        browserPath = `/Applications/${element}.app/Contents/MacOS/${element}`
        return execa(browserPath, ['--version']).then(result => {
            // STDOUT will be like "Brave Browser 77.0.69.135"
            ;[, fullVersion] = /.*(\d+\.\d+\.\d+\.\d+)/.exec(result.stdout)
            majorVersion = parseInt(fullVersion.split('.')[0])

            newBrowser = {
                name: element,
                channel: 'stabble',
                family: 'chromium',
                displayName: element,
                version: fullVersion,
                path: browserPath,
                majorVersion: majorVersion
            }
            return newBrowser
        })
        //browsersList = browsersList.concat(newBrowser)
    }
    return browsersList
}

function findBrowsers() {
    if (osType == 'win32') {
        return winBrowsers()
    } else {
        return macBrowsers()
    }
}
console.log(findBrowsers())
// function addCustomBrowsers(config) {
//     findBrowser(config)
// }

// module.exports = addCustomBrowsers
