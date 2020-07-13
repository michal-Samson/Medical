const express = require('express')
const cors = require('cors')
const axios = require('axios')
const sendMedicineMassage = require('./MedicineReminderService');
const app = express()
const port = 3000
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const headers = {
    'Content-Type': 'application/json'
}

app.route('/api/MedicineReminder').post(sendMedicineMassage);

app.get('/api/test', (req, res) => {
    console.log('get into')
})

app.post("/meds", (req, res) => {
    let data = {
        healthServices: false,
        orderBy: 0,
        pageIndex: req.body.page,
        prescription: false,
        val: req.body.content
    }
    axios.post("https://esb.gov.il/GovServiceList/IDRServer/SearchByName", data, {
        headers
    }).then(({ data }) => {
        res.send(data)
    }
    ).catch(e => {
        res.status(404)
        res.send(e)
    })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))