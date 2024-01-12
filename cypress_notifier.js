/**
 * Gestion des notifications pour le runner Cypress
 */

var request = require('superagent')
var { projects } = require('./project-infos.json')
var infosTest = {}
var report, status, color, totalPercent

function teams(datas) {
    var nbfeatures = `${datas.totalSuites} dont ${datas.totalFailed} echec(s)`
    var nbtests = `${datas.totalTests} dont ${datas.totalPassed} réussi(s), ${datas.totalSkipped} non exécuté(s), ${datas.totalPending} ignoré(s)`
    var env = datas.env == '**' ? 'i1, r1, r2' : datas.env == 'r*' ? 'r1 et r2' : datas.env
    var typeTests = Object.values(datas._)
    typeTests = typeTests.some(e => e.includes('e2e')) ? 'End-to-End' : typeTests.some(e => e.includes('regression')) ? 'Régression' : ''

    var datastring = {
        '@type': 'MessageCard',
        '@context': 'http://schema.org/extensions',
        summary: 'Tests automatisés',
        themeColor: `${datas.color}`,
        sections: [
            {
                activityTitle: `Tests Automatisés ${projects[datas.app].name} ${typeTests}`,
                activitySubtitle: 'Résultat des tests',
                facts: [
                    { name: 'Statut', value: `${datas.status}` },
                    { name: 'Ratio', value: `${datas.totalPercent} %` },
                    { name: 'Environnement', value: `${env}` },
                    { name: 'Navigateur', value: `${datas.browser}` },
                    { name: "Temps d'exécution", value: `${datas.execTime}` },
                    { name: 'Nb cas de tests (features)', value: `${nbfeatures}` },
                    { name: 'Nb de tests (scenarios)', value: `${nbtests}` }
                ],
                markdown: true
            }
        ],
        potentialAction: [
            {
                '@type': 'OpenUri',
                name: 'Consulter le rapport',
                targets: [{ os: 'default', uri: `https://....gitlab.io/-/.../-/jobs/${datas.ciBuildId}/artifacts/reports/cucumberreports/index.html` }]
            }
        ]
    }
    var options = {
        url: 'https://...',
        body: datastring
    }

    //request(options, callback)
    request
        .post(options.url)
        .send(options.body)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
            if (err && res.statusCode != 200) {
                console.log(res.body)
            }
        })
}

function jsTests() {
    // Fichier contenant le détail du résultat des tests
    report = require('./reports/mochareports/report.json')
    // Calcul du ratio
    totalPercent = Number(report.stats.pendingPercent) + Number(report.stats.passPercent)
    var statusVal = ratio(totalPercent)

    infosTest = {
        totalSuites: report.stats.suites,
        totalTests: report.stats.tests,
        totalPassed: report.stats.passes,
        totalFailed: report.stats.failures,
        totalSkipped: report.stats.skipped,
        totalPending: report.stats.pending,
        pendingPercent: Number(report.stats.pendingPercent),
        passPercent: Number(report.stats.passPercent),
        execTime: report.totalTime,
        status: statusVal.status,
        totalPercent: totalPercent,
        color: statusVal.color
    }

    return infosTest
}

function gherkinTests() {
    // Fichier contenant le détail du résultat des tests
    report = require('./reports/cucumberreports/report.json')
    // Calcul du ratio
    totalPercent = Number(report.featureCount.passedPercentage) + Number(report.featureCount.pendingPercentage)
    var statusVal = ratio(totalPercent)

    infosTest = {
        // Suites
        totalSuites: report.featureCount.total,
        totalFailed: report.featureCount.failed,
        // Scenarios
        totalTests: report.scenarios.total,
        totalPassed: report.scenarios.passed,
        //totalFailed = report.scenarios.failed
        totalSkipped: report.scenarios.skipped,
        totalPending: report.scenarios.pending,
        pendingPercent: Number(report.featureCount.pendingPercentage),
        passPercent: Number(report.featureCount.passedPercentage),
        execTime: report.totalTime,
        status: statusVal.status,
        totalPercent: totalPercent,
        color: statusVal.color
    }

    return infosTest
}

function ratio(total) {
    switch (true) {
        case total < 20:
            status = '\u{1F525} ' // \u{1F525} '🔥'
            color = '#FF0000'
            break
        case total < 40:
            status = '\u{1F327}\u{FE0F} ' // \u{1F327}\u{FE0F} '🌧️ '
            color = '#EB5500'
            break
        case total < 60:
            status = '\u{2601}\u{FE0F} ' // \u{2601}\u{FE0F} '☁️ '
            color = '#FFB000'
            break
        case total < 80:
            status = '\u{26C5}' // \u{26C5} '⛅ '
            color = '#F2E600'
            break
        case total < 100:
            status = '\u{1F324}\u{FE0F} ' // \u{1F324}\u{FE0F} '🌤️ '
            color = '#7AEA48'
            break
        case total == 100:
            status = '\u{2600}\u{FE0F} ' // \u{2600}\u{FE0F} '☀️ '
            color = '#05FF44'
            break
        default: // warning ⚠️
            status = '\u{26A0}\u{FE0F} '
            color = '#000000'
    }
    return { status, color }
}

function notifier(options) {
    var reportingDatas = options.spec == 'js' ? jsTests() : gherkinTests()

    if (options.hasOwnProperty('ciBuildId')) {
        var datas = {
            ...options,
            ...reportingDatas
        }
        teams(datas)
    }
}

module.exports = { notifier }
