module.exports = {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || (process.env.NODE_ENV === 'production' ? 80 : 8084),
    apiHost: process.env.APIHOST || 'localhost',
    apiPort: process.env.APIPORT || '8088',
    dbHost: 'localhost',
    dbPort: '27017',
    app: {
        title: 'Grant\'s Demo',
        description: 'A react demo by grant',
        head: {
            titleTemplate: 'demo',
            meta: [
                {
                    name:'description',
                    content:'react demo by grant'
                },
                {
                    charset:'utf-8'
                }
            ]
        }
    }
}