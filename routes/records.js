const express = require("express");
const router = express.Router();
const dataPath = './seed.json';
const fs = require('fs');

router.get("/", (req, res) => {
    try{
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
              throw err;
            }
            let records = JSON.parse(data)
            const page = parseInt(req.query.page)
            const limit = parseInt(req.query.limit)
            const startIndex = (page - 1) * limit
            const endIndex = page * limit

            const results = {}
            if(endIndex < records.length){
                results.next = {
                    page : page + 1,
                    limit : limit
                }
            }
            
            if(startIndex > 0){
                results.previous = {
                    page : page - 1,
                    limit : limit 
                }
            }
            results.results = records.slice(startIndex, endIndex)
            results.Ids = records.map(e => e.id)
            results.Open = records.filter(e => e.disposition === "open")
            results.ClosedCount = records.filter(e => ((e.disposition === "closed") && (e.color == "blue" || e.color == "red" || e.color == "yellow"))).length
            results.PreviousPage = (results.previous) ? results.previous.page : null
            results.NextPage = results.next.page
            res.send(results);
        });
    }catch(error){
        res.send(error)
    }
   
});

module.exports = router;