const express = require("express")
const { getPdf, getCode } = require("./pdf")
const PORT = process.env.PORT || 5000

const app = express()

app.get("/pdf", async (req, res) => {
    const { url } = req.query
    const pdf = await getPdf(url)
    res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length })
    res.send(pdf)
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
