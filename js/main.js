function getAllBooks(){
    fetch("http://huset-kbh.smartbrand.dk/wp-json/wp/v2/events123?_embed")
    .then(res=>res.json())
    .then(showBooks)
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
        let img = clone.querySelector("img");
        let link = clone.querySelector("a.read-more");


        title.textContent= theBook.title.rendered;

        img.setAttribute("src", theBook._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);

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

