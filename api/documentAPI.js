const express=require("express");
const router=express.Router();
const fs = require('fs');
const request = require('request');
var path = require('path');

const multer  = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
})


var upload = multer({ storage: storage });

router.post('/upload',upload.single('file') , function(req,res){
    
    auth = "Basic " + Buffer.from("AIZ67DUSNZ8TGWJV4DZ7DI3T5Z2LN2W2" + ":" + "ASN9AVKHU6HF41KTU71G3KNXLG1ET7BC").toString("base64");

    const options = {
        method: "POST",
        url: "https://ext.digio.in:444/v2/client/document/upload",
        headers: {
            "Authorization": auth,
            "Content-Type": "multipart/form-data"
        },
        formData : {
            "file" : fs.createReadStream("./uploads/"+req.file.filename),
            "request":JSON.stringify(JSON.parse(req.body.request))
        }
    };
    request(options, function (err, reqResponse, reqResponseBody) {
        if(err) console.log(err);
        // console.log(reqResponse.body)
        // console.log(body)
        var reqResponseBodyObject=JSON.parse(reqResponseBody)
        res.status(200).json({
            ...reqResponseBodyObject
        })
    });
    
})

module.exports=router