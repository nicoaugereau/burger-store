/**
 * Cypress reporter
 * Mocha reporter / Cucumber reporter
 *
 */
const shell = require('shelljs')

let { projects } = require('./project-infos.json')

/**
 * Format date
 * @param {*} datetime
 * @returns
 */
function toLocalDateTime(datetime) {
    var dt = new Date(datetime),
        cdate = dt.getDate(),
        cmonth = dt.getMonth() + 1,
        cyear = dt.getFullYear(),
        chrs = dt.getHours(),
        cmins = dt.getMinutes(),
        csecs = dt.getSeconds(),
        fulldatetime
    var tz_offset_min = dt.getTimezoneOffset(),
        offset_hrs = parseInt(Math.abs(tz_offset_min / 60)),
        offset_min = Math.abs(tz_offset_min % 60),
        tz_standard

    // Add 0 before date, month, hrs, mins or secs if they are less than 0
    cdate = cdate < 10 ? '0' + cdate : cdate
    cmonth = cmonth < 10 ? '0' + cmonth : cmonth
    chrs = chrs < 10 ? '0' + chrs : chrs
    cmins = cmins < 10 ? '0' + cmins : cmins
    csecs = csecs < 10 ? '0' + csecs : csecs

    if (offset_hrs < 10) offset_hrs = '0' + offset_hrs
    if (offset_min < 10) offset_min = '0' + offset_min
    // Add an opposite sign to the offset
    // If offset is 0, it means timezone is UTC
    if (tz_offset_min < 0) tz_standard = '+' + offset_hrs + ':' + offset_min
    else if (tz_offset_min > 0) tz_standard = '-' + offset_hrs + ':' + offset_min
    else if (tz_offset_min == 0) tz_standard = 'Z'

    fulldatetime = `${cdate}-${cmonth}-${cyear} ${chrs}:${cmins}:${csecs} (GMT${tz_standard})`
    return fulldatetime
}
function toTotalDuration(duration) {
    d = Number(duration) / 1000 // milliseconds
    var h = Math.floor(d / 3600)
    var m = Math.floor((d % 3600) / 60)
    var s = Math.floor((d % 3600) % 60)

    var hDisplay = h > 0 ? h + ' h ' : ''
    var mDisplay = m > 0 ? m + ' m ' : ''
    var sDisplay = s > 0 ? s + ' s ' : ''
    return hDisplay + mDisplay + sDisplay
}

function initReports() {
    // delete all existing report files
    shell.rm('-rf', `reports/**/*.json`)
    shell.rm('-rf', `reports/*.xml`)
}
/**
 * Génération du rapport de tests
 * @param {*} options : éléments de tests passés par cypress_runner
 */
function reporter(options) {
    /**
     * Rapport des tests cucumber (feature)
     */
    const htmlReportDir = `reports/cucumberreports`
    const report = require('multiple-cucumber-html-reporter')
    // Ajout les captures écrans au rapport
    //const addScreenshots = require('./cucumber-report')
    addScreenshots()

    let deviceName = 'Desktop'
    report.generate({
        jsonDir: './reports/cucumber/',
        saveRunInfos: true,
        reportPath: htmlReportDir,
        displayDuration: true,
        totalTime: toTotalDuration(options.infos.totalDuration),
        totalDuration: options.infos.totalDuration,
        saveCollectedJSON: false,
        useCDN: false,
        pageTitle: 'Tests automatisés',
        reportName: `Rapport des tests automatisés`,
        metadata: {
            browser: {
                name: options.infos.browserName,
                version: options.infos.browserVersion
            },
            device: deviceName,
            platform: {
                name: options.infos.osName,
                version: options.infos.osVersion
            }
        },
        customData: {
            title: 'Run infos',
            data: [
                { label: 'Début', value: toLocalDateTime(options.infos.startedTestsAt) },
                { label: 'Fin', value: toLocalDateTime(options.infos.endedTestsAt) },
                { label: "Temps d'exécution : ", value: toTotalDuration(options.infos.totalDuration) },
                { label: 'Projet', value: projects[options.app].name },
                { label: 'Version', value: projects[options.app].version }
            ]
        }
    })
}

module.exports = { initReports, reporter }
