const express = require('express');
const app = express();

const bodyParser   = require('body-parser');

const MongoClient  = require('mongodb').MongoClient;
const ObjectID     = require('mongodb').ObjectID;
const DBurl        = "mongodb://127.0.0.1:27017/";
const DBname       = "dbsiswa";

let dbo = null;

MongoClient.connect(DBurl, (error, db) => {
    if (error) throw error;
    dbo = db.db(DBname);
});

app.use(bodyParser.urlencoded({extended: false}))

app.get('/siswa', (request, response) => {
    dbo.collection("siswa").find().toArray((error, response) => {
        if(error) throw error;
        response.json(response);
    })
});

//endpoint insert data ke database
app.post('/siswa', (request, respone)=>{
    let namaSiswa = request.body.nama;
    let alamatSiswa = request.body.alamat;
    dbo.collection("siswa").insertOne({
        nama : namaSiswa,
        alamat : alamatSiswa
    }, (error, response)=>{
        if(!error){
            response.json(response);
            response.end("data berhasil masuk");
        }else{
            throw error;//apabila error akan di lempar ke node js
        }
    }) 
});

//endpoint delete data dari database
app.delete('/siswa/:id', (request, response)=>{
    let id = request.params.id;
    let id_object = new ObjectID(id);
    dbo.collection("siswa").deleteOne({//perintah hapus mongodb
        _id : id_object //mengambil id data untuk dihapus
    },(error, response)=>{
        if(error) throw error;
        response.end("data berhasil dihapus");
    
    })
});

//endpoint update data diri database
app.put('/siswa/:id', (request, response)=>{
    let id = request.params.id;
    let id_object = new ObjectID(id);
    let namaSiswa = request.body.nama;
    let kelasSiswa = request.body.kelas;
    let jurusanSiswa = request.body.jurusan;
    dbo.collection("siswa").updateOne({
        _id : id_object
    }, {$set : {
        nama : namaSiswa,
        kelas : kelasSiswa,
        jurusan : jurusanSiswa
    }},
        (error, response)=>{
            if(error) throw error;
            response.end("data berhasil diupdate");
    })
});


//app.get('/siswa/:nama', (request, response)=>{
//    let namaSiswa = request.params.nama;
//    response.end("menampilkan nama siswa "+ namaSiswa);
//});

//app.post('/siswa', (request, response)=>{
//    let namaSiswa = request.body.name;
//    let alamat = request.body.adress;
//    response.end('menampilkan siswa baru ' + namaSiswa + ', yang beralamat di ' + alamat);
//});

//app.delete('/siswa/:id', (request, response)=>{
//    let id = request.body.id; //let sebuah parameter
//    let namaSiswa = request.body.nama;
//    response.end('id '+ id + ' telah dihapus, dengan nama: '+namaSiswa);
//});

//app.put('/siswa/:id', (request, response)=>{
//    let id = request.body.id;
//    let namaSiswa = request.body.nama;
//    let alamat = request.body.alamat;
//    response.end('siswa dengan id '+id+ ' telah diupdate');
//});

app.listen('8080', (e)=>{
    console.log(e);
});