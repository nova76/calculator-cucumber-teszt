module.exports = {
    default: {
        formatOptions: {
            snippetInterface: 'async-await'
        },
        paths: [
            'features/*.feature'
        ],
        require: [
            'step_definitions/*.js'
        ],
        format: [
            'progress-bar',
            'json:cucumber_report.json',
            'html:cucumber_report.html'
        ],
        parallel: 1,
        // Timeout beállítások
        timeout: 30000  // 30 másodperc timeout minden step-re
    }
};