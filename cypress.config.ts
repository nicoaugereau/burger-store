import { defineConfig } from 'cypress'
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor'
import { preprocessor } from '@badeball/cypress-cucumber-preprocessor/browserify'

async function setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions): Promise<Cypress.PluginConfigOptions> {
    // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
    await addCucumberPreprocessorPlugin(on, config)

    on(
        'file:preprocessor',
        preprocessor(config, {
            typescript: require.resolve('typescript')
        })
    )

    on(
        'before:browser:launch',
        (
            browser = {
                name: '',
                family: 'chromium',
                channel: '',
                displayName: '',
                version: '',
                majorVersion: '',
                path: '',
                isHeaded: false,
                isHeadless: false
            },
            launchOptions
        ) => {
            console.log('launching browser %s is headless? %s', browser.name, browser.isHeadless)

            console.log('the viewport size is %d x %d', config.viewportWidth, config.viewportHeight)
            const width = 1440
            const height = 900
            console.log('setting the browser window size to %d x %d', width, height)

            // Browser options
            // https://peter.sh/experiments/chromium-command-line-switches/
            if (browser.family === 'chromium' && browser.name !== 'electron') {
                //launchOptions.args.push('--auto-open-devtools-for-tabs')
                //launchOptions.args.push('--start-maximized')
                //launchOptions.args.push('--start-fullscreen')
                //launchOptions.args.push('--cast-initial-screen-width=' + width)
                //launchOptions.args.push('--cast-initial-screen-height=' + height)
                //launchOptions.args.push(`--window-size=${width},${height}`)
                launchOptions.args.push('--force-device-scale-factor=1')
                launchOptions.args.push('--disable-dev-shm-usage')
                launchOptions.args.push('--ignore-certificate-errors-spki-list')
                launchOptions.args.push('--noerrdialogs')
                launchOptions.args.push('--disable-popup-blocking')
                launchOptions.args.push('--allow-insecure-localhost')
                //launchOptions.args.push('--no-sandbox')
                //launchOptions.args.push('--disable-setuid-sandbox')
                //launchOptions.args.push('--incognito') // navigation privée
                // change download directory
                // https://docs.cypress.io/api/plugins/browser-launch-api.html#Change-download-directory
                // https://github.com/cypress-io/cypress/issues/949
                launchOptions.preferences.default.profile = { default_content_settings: { popups: 0 }, default_content_setting_values: { automatic_downloads: 1 } }
                launchOptions.preferences.default['download'] = { default_directory: config.downloadsFolder }

                return launchOptions
            }

            if (browser.family === 'firefox') {
                //launchOptions.args.push('-devtools')
                // launchOptions.args.push(`--width=${width}`)
                // launchOptions.args.push(`--height=${height}`)
                launchOptions.preferences['browser.download.dir'] = config.downloadsFolder
                launchOptions.preferences['browser.download.folderList'] = 2
                // needed to prevent download prompt for text/csv files.
                launchOptions.preferences['browser.helperApps.neverAsk.saveToDisk'] = 'text/csv'

                return launchOptions
            }
            if (browser.name === 'electron') {
                // launchOptions.preferences is a `BrowserWindow` `options` object
                // launchOptions.preferences.width = width
                // launchOptions.preferences.height = height
                //launchOptions.preferences.frame = false
                launchOptions.preferences.useContentSize = true
                launchOptions.preferences.fullscreen = false
                //launchOptions.preferences.darkTheme = true

                launchOptions.preferences.webPreferences.session = { downloaditem: config.downloadsFolder }

                return launchOptions
            }

            if (browser.family === 'webkit' && browser.name == 'safari') {
                // auto open devtools
                launchOptions.args.push('--auto-open-devtools-for-tabs')
                launchOptions.args.find(arg => arg.slice(0, 23) === '--remote-debugging-port')

                return launchOptions
            }
        }
    )

    on('task', {
        getConfiguration(environment) {
            const environments = JSON.parse(fs.readFileSync(`./cypress/config/environments.json`))
            config.env.backendUrl = environments[environment].backendUrl
            config.env.frontendUrl = environments[environment].frontendUrl

            return config.env
        }
    })

    on('task', {
        screen({ device, mode }) {
            const devices = JSON.parse(fs.readFileSync('./cypress/config/devices.json'))
            let d = devices.sizes.hasOwnProperty(device)
            let configOptions =
                d == true
                    ? mode != ''
                        ? mode == 'paysage' && device.includes('iphone')
                            ? {
                                  viewportWidth: devices.sizes[device].viewportHeight,
                                  viewportHeight: devices.sizes[device].viewportWidth,
                                  userAgent: devices.sizes[device].useragent
                              }
                            : mode == 'portrait' && !device.includes('iphone')
                            ? {
                                  viewportWidth: devices.sizes[device].viewportHeight,
                                  viewportHeight: devices.sizes[device].viewportWidth,
                                  userAgent: devices.sizes[device].useragent
                              }
                            : {
                                  viewportWidth: devices.sizes[device].viewportWidth,
                                  viewportHeight: devices.sizes[device].viewportHeight,
                                  userAgent: devices.sizes[device].useragent
                              }
                        : // si viewport trouvé mais sans mode, mode par défaut du device
                          { viewportWidth: devices.sizes[device].viewportWidth, viewportHeight: devices.sizes[device].viewportHeight }
                    : // si viewport non trouvé ou non renseigné, mode par défaut
                      { viewportWidth: 1280, viewportHeight: 720 }

            config.viewportHeight = configOptions.viewportHeight
            config.viewportWidth = configOptions.viewportWidth
            config.userAgent = configOptions.userAgent

            return config
        }
    })

    let shouldSkip = false
    on('task', {
        resetShouldSkipFlag() {
            shouldSkip = false
            return null
        },
        shouldSkip(value) {
            if (value != null) shouldSkip = value
            return shouldSkip
        }
    })

    on('task', {
        clearFolder(folder) {
            const opsys = process.platform
            fs.emptyDirSync(folder)
            return [opsys, folder]
        }
    })

    on('task', {
        'db:seed'() {
            const dbSeed = path.join(__dirname, './db', 'db-seed.json')
            const filePath = path.join(__dirname, './db', 'db.json')

            return new Promise((resolve, reject) => {
                fs.copyFile(dbSeed, filePath, err => {
                    if (err) return reject(err)
                    resolve('db-seed.json was copied to db.json')
                    console.log('db-seed.json was copied to db.json')
                })
            })
        }
    })

    // Make sure to return the config object as it might have been modified by the plugin.
    return config
}

const fs = require('fs-extra')
const path = require('path')

export default defineConfig({
    // setupNodeEvents can be defined in either
    projectId: 'eqvpoq',
    env: {
        COMMAND_DELAY: 50,
        VISIT_DELAY: 2000
    },
    defaultCommandTimeout: 4000,
    execTimeout: 60000,
    taskTimeout: 60000,
    pageLoadTimeout: 60000,
    requestTimeout: 5000,
    responseTimeout: 30000,
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
        configFile: 'reporter-config.json'
    },
    video: false,
    trashAssetsBeforeRuns: true,
    chromeWebSecurity: false,
    // the e2e or component configuration
    e2e: {
        specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx,feature,features}',
        testIsolation: false,
        experimentalStudio: true,
        experimentalWebKitSupport: true,
        setupNodeEvents
    }
})
