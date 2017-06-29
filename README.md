# Problem Set NodeJS

Problem set NodeJS ini adalah aplikasi managemen kontak berbasis REST API dengan MongoDB, Express, AngularJS & NodeJS (MEAN) stack.

Sumber Tantangan dari [codepolitan]

Demo App [Kontakplus in heroku] or [Kontakplus in zeit]

### Todo

* upgrade to webpack v2 (feat: code splitting)

### Installation

Membutuhkan [Node.js](https://nodejs.org/) v7+ dan sintaks ES6(ECMAScript 2015) pada client dalam hal ini menggunakan Babel sebagai transpiler & webpack sebagai bundle tool. Di lokal environment menggunakan node versi 8.0.0 yang lebih banyak support ES6 & ES7 (async function & new feature NodeJS API).

Install dependencies dan devDependencies dan jalankan server.

```sh
$ cd nodejs-problemset
$ npm install -d atau npm i
$ npm run dev
```

### Build aplikasi

```sh
$ cd nodejs-problemset
$ npm install -d atau npm i
$ npm run build
$ npm start
```


### Cara tes server
Setelah server berjalan pada localhost dengan port 3000. maka bisa menjalankan tes untuk servernya.

```sh
$ npm run test:server
```

### Cara tes client

```sh
$ npm run test:client
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
   [Kontakplus in heroku]: <https://kontakplus.herokuapp.com>
   [Kontakplus in zeit]: <https://kontakplus.now.sh>
