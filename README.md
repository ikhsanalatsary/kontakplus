# Problem Set NodeJS

Problem set NodeJS ini adalah Backend aplikasi managemen kontak berbasis REST API dengan ExpressJS dan Mongodb.

Sumber Tantangan dari [codepolitan]

### Depedencies

* Basic-Auth
* Body-Parser
* Btoa
* Lodash
* Mongoose
* Morgan
* [Express]
* akan ada lagi..

### Dev-Depedencies
* Faker
* Babel-cli
* Babel-Preset-Es2015
* Chai
* Ghooks
* JSCS
* Mocha
* Nodemon
* Supertest
* Titlegen
* akan ada lagi...

### Installation

requires [Node.js](https://nodejs.org/) v4+ dan sintaks ES6(ECMAScript 2015) dalam hal ini menggunakan Babel sebagai transpiler language. di lokal repositori menggunakan node versi 6.5.0 yang lebih banyak support ES6.

Install dependencies dan devDependencies dan jalankan server.

```sh
$ cd nodejs-problemset
$ npm install -d atau npm i
$ npm run dev
```

### Cara Tes
Setelah server berjalan pada localhost dengan port 3000. maka bisa menjalankan tesnya.

```sh
$ npm test
```

### Kriteria Utama

 - Database menggunakan collections berikut: name, title, email, phone, address, company
 - Menerapkan HTTP Basic Auth pada setiap request
 - Output berupa response berformat json pada setiap request
 - API melayani request select, insert, edit, dan delete data kontak

### Kriteria Opsional
- Membuat single page application dari backend API yang sudah dibuat sebelumnya menggunakan HTML, CSS serta menerapkan js framework seperti AngularJS atau VueJS
- Menambahkan field lain di luar yang mandatory, atau membuat mekanisme input yang lebih fleksibel
- Satu kontak dapat memuat lebih dari satu data phone, email dan address
Menampilkan pencarian kontak berdasarkan name, email, phone, address, dan company
- Template single page application aplikasi bersifat responsive


   [codepolitan]: <https://www.codepolitan.com/problemset-nodejs-dasar>
