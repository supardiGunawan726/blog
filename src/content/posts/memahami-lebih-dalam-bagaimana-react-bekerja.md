---
title: "Memahami lebih dalam bagaimana ReactJS bekerja"
createdAt: "2 Jul 2023"
image: "/posts/react.png"
description: "Memahami lebih dalam bagaimana ReactJS bekerja untuk mengetahui apa yang menjadi kelebihan dan kekurangannya."
---

React/ReactJS adalah sebuah library javascript yang sangat populer digunakan oleh para pengembang web untuk membuat sebuah tampilan antarmuka web. Dengan menggunakan React, pengembang bisa memecah bagian-bagian pada sebuah tampilan kedalam sebuah _reusable_ `component`.

Pada artikel ini, saya akan lebih fokus membahas bagaimana React bekerja, seperti `JSX` dan`Virtual DOM` pada React. 

## JSX - Javascript Syntax Extension

Berikut adalah contoh sebuah komponen pada aplikasi React:

```js
function HelloWorld(){
  return (
    <p className="hello-world">Hello world</p>
  )
}
```

Jika kamu perhatikan, terdapat beberapa kode sintax yang sangat mirip sekali dengan HTML, yaitu terdapat tag `p`. Kode tersebut sebenarnya bukan sintax HTML, melainkan adalah JSX.

JSX atau Javascript Syntax Extension adalah sebuah ektensi syntax yang membuat pengembang bisa menulis kode markup yang mirip HTML didalam file javascript. Pengembang juga bisa menulis ekspresi javascript di dalam JSX menggunakan tanda kurung kurawal diawal dan akhir ekspresi seperti berikut:

```js
function Hello(){
  const name = "Supardi";

  return (
    <p className="hello-world">Hello {name}</p>
  )
}
```

Tentu saja JSX bukan merupakan fitur bawaan dari standar javascript, sehingga jika kamu jalankan contoh kode pertama pada browser, maka browser tidak akan mengenalinya:

![ReactJS jsx code on browser dev console](/images/react-on-dev-console.png)

Bisa terlihat terdapat sintaks error, ini dikarenakan JSX bukan merupakan sintaks standar javascript pada browser. Untuk itu, diperlukan alat tambahan seperti `babel` atau `SWC` untuk melakukan transformasi kode dari JSX menjadi kode yang dimengerti browser. Sebagai contoh, jika kamu menyalin kode pertama diatas ke [SWC Playground](https://play.swc.rs/?version=1.3.66&code=H4sIAAAAAAAAA0srzUsuyczPU%2FBIzcnJD88vyknR0KzmUlAoSi0pLcpT0AAyFRRsChSScxKLi%2F0Sc1NtlTJASnXLQWqV7MD6FMAcG%2F0CO6ByTa5aACtSC4FWAAAA&config=H4sIAAAAAAAAA1WPSQ7CMAxF9z1F5DVbWHCHHsIKbpUqk%2BJUIqp6d9JMwM7%2Bg598TELAxhKe4shjXjwGpjD2rHCyEd9ZAZIGWQblI9y6u%2FFlxbBTUc5qQMSwUiwlvrc0aOeYsragZmqaUVYt6ZcnnfGBmP%2BDVxTtqke%2F4qaGBONeezHbHzF5qvgHfEMdNg6D4rk3yxPnB%2BvJL0oTAQAA) dan mengaktifkan JSX, maka hasil kode yang terkompilasi terlihat seperti berikut:

![SWC playground showing jsx transformation](/images/swc_playground.png)

Seperti yang kamu lihat, tag `p` diubah oleh `SWC` menjadi sebuah fungsi dari React yaitu `React.createElement` yang berguna untuk membuat `node` atau `element` `virtual DOM` React. Fungsi `React.createElement` menerima tiga parameter atau argument, yaitu:

- Pada parameter pertama adalah jenis element yang ingin dibuat, bisa berupa `div`, `h1`, atau `p` seperti pada contoh diatas
- Lalu parameter kedua adalah sebuah objek yang berisi atribut yang ingin ditambahkan kedalam element ReactJS tersebut. Atribut pada elemen ReactJS hampir sama dengan atribut elemen `HTML`, namun biasanya dirubah bentuk menjadi `camelCase`. Contoh atribut elemen ReactJS adalah `id`, `value`, `onChange`, `onBlur`, dan lain-lain. Atribut yang digunakan untuk memberikan class ke elemen ReactJS adalah `className`, ini berbeda dengan HTML biasa yang menggunakan keyword `class` saja. Hal ini dikarenakan keyword `class` merupakan salah satu dari [JavaScript Reserved Words](https://www.w3schools.com/js/js_reserved.asp) yang tidak bisa digunakan sebagai nama variabel, fungsi ataupun labels.
- Kemudian parameter terakhir adalah isi atau child dari element tersebut. Child atau children pada ReactJS, dapat berupa text, element lain, ataupun komponen ReactJS. Namun pada kasus ini, children dari element `p` adalah text `Hello world`.

Mungkin kamu tidak menyadarinya, tapi inilah yang terjadi dibelakang layar saat kamu menulis kode JSX didalam aplikasi ReactJS. JSX tersebut akan  di `transform` menjadi kode sebenarnya yang dimengerti oleh browser, dalam hal ini adalah fungsi `React.createElement`. Dengan menggunakan JSX, , kmu tidak perlu menulis fungsi tersebut berulang-ulang. Kmu hanya perlu menulis kode JSX untuk membuat element ReactJS yang lebih mudah dipahami karena mirip dengan sintaks kode HTML.

Namun JSX juga memiliki kekurangan jika dibandingkan dengan template sintaks yang lain seperti `vue` atau `angular`. Jika sebuah komponen ReactJS yang dibuat menjadi sangat kompleks, maka kode tersebut juga akan cukup susah untuk di kembangkan. Hal ini dikarenakan pada ReactJS, markup disatukan dengan logic dalam satu komponen yang membuat kompleksitas program bertambah. Beberapa developer berpendapat bahwa memisahkan setiap kepentingan (_separation of concern_) dalam program merupakan hal yang penting dalam memelihara program sehingga lebih mudah dikembangkan.

## Virtual DOM pada React

Sebelumnya kita mengetahui bahwa JSX pada ReactJS, diubah menjadi elemen ReactJS. Kumpulan dari elemen-elemen ReactJS tersebut digunakan React untuk membangun virtual DOM yang disimpan di memori. Virtual DOM pada ReactJS adalah rekayasa virtual dari DOM yang nyata pada browser.

Pada saat membuat aplikasi ReactJS, pengembang biasanya memecah tampilan menjadi beberapa bagian dengan menggunakan komponen. Pada setiap komponen, terdapat state. State digunakan untuk menyimpan dan mengelola perubahan pada sebuah komponen. Pada saat state berubah, komponen tersebut akan diperbarui dengan state yang terbaru.

<a href="https://twitter.com/i/status/1616115618356379663" style="display: block; width: 100%; max-width: 400px">
  <img src="/images/reconciliation.gif" alt="Animasi reconciliation oleh @asidorenko_"/>
</a>

Komponen yang mengalami perubahan data tersebut tidak langsung berinteraksi dengan DOM yang nyata untuk memperbarui tampilan. Melainkan, virtual DOM tree dengan state/data terbaru akan dibuat. Kemudian, virtual DOM tree yang terbaru akan dibandingkan (_diffing_) dengan virtual DOM tree yang lama secara rekursif dari setiap elemen untuk mengetahui elemen atau atribut mana saja yang berubah. Kemudian ReactJS hanya akan mengubah elemen atau atribut yang benar-benar dibutuhkan saja sehingga tidak mengurangi performa aplikasi. Proses ini disebut dengan _reconciliation_ pada ReactJS.

## Kesimpulan

Dalam kombinasi, JSX dan Virtual DOM menjadi kekuatan utama ReactJS dalam pengembangan tampilan antarmuka web yang efisien dan mudah dikembangkan. JSX memungkinkan pengembang untuk menulis kode yang terstruktur dan mudah dipahami, sedangkan Virtual DOM memastikan bahwa perubahan tampilan diterapkan secara efisien, mengoptimalkan performa aplikasi secara keseluruhan. Dengan menggunakan kedua fitur ini, pengembang dapat membangun aplikasi web yang responsif, skalabel, dan mudah dipelihara.

Kekurangan-kurangan dari JSX dan Virtual DOM dalam pengembangan dengan ReactJS adalah kompleksitas program yang meningkat saat komponen React menjadi kompleks, kurangnya pemisahan kepentingan (separation of concerns) antara markup dan logika dalam kode JSX, overhead komputasi yang diperlukan dalam proses diffing Virtual DOM, dan penggunaan memori yang signifikan untuk menyimpan Virtual DOM tree, terutama dalam aplikasi dengan tampilan yang kompleks atau jumlah komponen yang besar. 