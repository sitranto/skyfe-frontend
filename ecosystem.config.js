module.exports = {
    apps: [
        {
            name: 'Skyfe_client',
            exec_mode: 'cluster',
            instances: 'max',
            script: "node_modules/nuxt-start/bin/nuxt-start.js",
            args: 'start'
        }
    ]
}
