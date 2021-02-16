const app = require('express')();
const express = require('express');
const path = require('path')

app.use(express.static(__dirname + '/public'));

app.listen(8080)
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname + '/index.html'));
})