function getAllBooks(){
    fetch("http://huset-kbh.smartbrand.dk/wp-json/wp/v2/events123?_embed&per_page=11")
    .then(res=>res.json())
    .then(showBooks)
}

function getSingleBookById(myId){
    fetch("https://t7.kea-alt-del.dk/wp-json/wp/v2/books/"+myId+"?_embed")
    .then(res=>res.json())
    .then(showSingleBook);
}

function showSingleBook(json){
    console.log(json);
    let img = document.querySelector("img");
    let h1 = document.querySelector("#single h1").textContent= "json.title.rendered;"
    document.querySelector("#single .price span").textContent=json.acf.price;
    img.setAttribute("src", json._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);

}




function showBooks(data){
    let list = document.querySelector("#list");
    let template =
    document.querySelector("#bookTemplate").content;


    data.forEach(function(theBook){

        console.log(theBook);
        let clone = template.cloneNode(true);
        let title = clone.querySelector("h1");
        let excerpt = clone.querySelector(".excerpt");
        let price = clone.querySelector(".price span");
        let date = clone.querySelector(".date span");
        let time = clone.querySelector(".time span");
        let img = clone.querySelector(".image img");
        let link = clone.querySelector("a.read-more");


        title.textContent= theBook.title.rendered;
        img.setAttribute("src", theBook._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);

        link.setAttribute("href", "book.html?id="+theBook.id);

        price.textContent= theBook.acf.price;
        date.textContent= theBook.acf.date;
        time.textContent= theBook.acf.time;

        list.appendChild(clone);

    })

}




let searchParams = new URLSearchParams(window.location.search);
let id = searchParams.get("id");

if(id){
    getSingleBookById(id);
}
else{
  getAllBooks();
}

