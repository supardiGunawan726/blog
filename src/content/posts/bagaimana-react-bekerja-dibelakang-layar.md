---
title: "Bagaimana reactjs bekerja dibelakang layar"
createdAt: "2 Jul 2023"
image: "/posts/react.png"
description: "Memahami apa itu reactjs dan bagaimana iya bekerja untuk mengetahui apa yang menjadi kelebihan dan kekurangannya."
---

React/Reactjs adalah sebuah library javascript yang sangat populer digunakan oleh web developer untuk membuat sebuah tampilan antarmuka web. Dengan menggunakan react, developer bisa memecah bagian-bagian pada sebuah tampilan yang disebut dengan `component`.

Pada artikel ini, mari kita memahami bagaimana sebenarnya react bekerja dan apa yang menjadi kelebihan dan kekurangan dari library tersebut.

## JSX - Javascript Syntax Extension

Berikut adalah contoh sebuah komponen pada aplikasi react:

```js
export default function HelloWorld(){
  return (
    <p className="hello-world">Hello world</p>
  )
}
```

Jika kita perhatikan, terdapat beberapa kode sintax yang sangat mirip sekali dengan HTML, yaitu terdapat tag `p`. Kode tersebut sebenarnya bukan sintax HTML, melainkan adalah JSX.

JSX atau Javascript Syntax Extension adalah sebuah ektensi syntax yang membuat pengembang bisa menulis kode markup yang mirip HTML didalam file javascript. Pengembang juga bisa menulis ekspresi javascript di dalam JSX menggunakan tanda kurung kurawal diawal dan akhir ekspresi.

Tentu saja JSX bukan merupakan fitur bawaan dari standar javascript, sehingga jika kita jalankan kode diatas pada browser, maka browser tidak akan mengenalinya. Kode tersebut harus dikompilasi terlebih dahulu menjadi kode javascript standar dengan menggunakan alat tambahan seperti `babel`, `vite`, ataupun `swc`.

Sebagai contoh, jika kamu menyalin kode diatas ke [SWC Playground](https://play.swc.rs/?version=1.3.66&code=H4sIAAAAAAAAA0utKMgvKlFISU1LLM0pUUgrzUsuyczPU%2FBIzcnJD88vyknR0KzmUlAoSi0pLcpT0AAyFRRsChSScxKLi%2F0Sc1NtlTJASnXLQWqV7MD6FMAcG%2F0CO6ByTa5aAJeCx2xlAAAA&config=H4sIAAAAAAAAA1WPSQ7CMAxF9z1F5DVbWHCHHsIKbpUqk%2BJUIqp6d9JMwM7%2Bg598TELAxhKe4shjXjwGpjD2rHCyEd9ZAZIGWQblI9y6u%2FFlxbBTUc5qQMSwUiwlvrc0aOeYsragZmqaUVYt6ZcnnfGBmP%2BDVxTtqke%2F4qaGBONeezHbHzF5qvgHfEMdNg6D4rk3yxPnB%2BvJL0oTAQAA) dan mengaktifkan JSX, maka hasil kode yang terkompilasi terlihat seperti berikut:

```js
export default function HelloWorld() {
    return React.createElement("p", {
        className: "hello-world"
    }, "Hello world");
}
```

Seperti yang kamu lihat, tag `p` diubah oleh `SWC` menjadi sebuah fungsi dari React yaitu `React.createElement` yang berguna untuk membuat `node` atau `element` `virtual DOM` react. Pada parameter pertama adalah jenis element yang ingin dibuat, yaitu tag `p`. Lalu parameter kedua adalah sebuah objek yang berisi atribut yang ingin ditambahkan kedalam element tersebut, dalam kasus ini adalah `className` dengan value `hello-world`. Kemudian parameter terakhir adalah isi atau child dari element tersebut. Child atau children pada react, dapat berupa text, element lain, ataupun komponen react. Namun pada kasus ini, children dari element `p` adalah text `Hello world`.

Mungkin kamu tidak menyadarinya, tapi inilah yang terjadi dibelakang layar saat kamu menulis kode JSX didalam aplikasi react. JSX tersebut akan  di `transform` menjadi kode sebenarnya yang dimengerti oleh browser. Dengan menggunakan JSX, kita dapat dengan lebih cepat dan juga mudah dipahami dalam membuat `DOM virtual`.

## Virtual DOM pada React

Sebelumnya kita mengetahui bahwa JSX pada react, diubah menjadi elemen react. Kumpulan dari elemen-elemen react tersebut digunakan React untuk membangun virtual DOM yang disimpan di memori. Virtual DOM pada react adalah rekayasa virtual dari DOM yang nyata pada browser.

Pada saat membuat aplikasi react, developer biasanya memecah tampilan menjadi beberapa bagian dengan menggunakan komponen. Pada setiap komponen, terdapat state. State digunakan untuk menyimpan dan mengelola perubahan pada sebuah komponen. Pada saat state berubah, komponen tersebut akan diperbarui dengan state yang terbaru sehingga tampilan antarmuka pun berubah. Proses ini biasa disebut dengan `re-render`.

Komponen yang mengalami perubahan data tersebut tidak langsung berinteraksi dengan DOM yang nyata untuk memperbarui tampilan. Melainkan, virtual DOM dengan state terbaru akan dibuat. Kemudian, virtual DOM yang terbaru akan dibandingkan (_diffing_) dengan virtual DOM yang lama untuk mengetahui elemen atau atribut mana saja yang berubah. Kemudian react hanya akan mengubah elemen atau atribut yang benar-benar dibutuhkan saja sehingga tidak mengurangi performa aplikasi. Proses ini disebut dengan _reconciling_ pada react.

## Kesimpulan

