const fecth = require('node-fetch')

fecth('API')
.then(response => {
    return response.json()
})
.then(data => {
    console.log(data)
})

