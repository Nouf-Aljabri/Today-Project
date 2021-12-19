let searchInput2 = document.querySelector("#news-search-input");
let searchBtn2 = document.querySelector("#news-search-btn");

let newsUrl = "https://newsapi.org/v2/top-headlines?category=General&from=2021-12-19&sortBy=popularity&apiKey=367b833f122d4dd2a7f351680d0e960a";
 printNews();

 //search news 
 searchBtn2.addEventListener("click",function(){
     newsUrl = "https://newsapi.org/v2/everything?q="+searchInput2.value+"&from=2021-12-19&sortBy=popularity&apiKey=367b833f122d4dd2a7f351680d0e960a";
    printNews();
})

// change category 
 $('ul.navbar-nav > li').click(function (e) {
    e.preventDefault();
    var getItem = $(this).text();
    var id = this.id;
    newsUrl = 'https://newsapi.org/v2/top-headlines?' +
    'category='+ id +'&'+
    'from=2021-12-19&' +
    'sortBy=popularity&' +
    'apiKey=367b833f122d4dd2a7f351680d0e960a';
    printNews();
});

  function printNews (){
 
fetch(newsUrl).then((response)=>{
    response.json().then((res)=>{
            document.querySelector("#newsCard").innerHTML= res.articles.map(articale => 
                `
             <div class="col-md-6 col-lg-4">
             <!-- news card -->
             <div class="card  text-center shadow rounded-3 mb-5 py-2" id="myCard">
                 <div class="card-body">
                   <img src="${articale.urlToImage}" class="img-fluid rounded-3 pb-3" id ="news-img" alt="">
                 <p class="card-text"> ${articale.publishedAt.split("T")[0]}</p>
                 <h3 class="card-title"> ${articale.title}</h3>
                 <p class="card-text text-muted" >${articale.description}</p>
                 <p class="card-text text-left "> ${articale.author }</p>
             </div>
             <div class="card-footer bg-transparent ">  <a href="${articale.url}" class=" btn fw-bold" id="more-btn"> READ MORE</a>
             </div>
         </div>
       </div>
             `
           
        
        ).join('');
       });
    });
}


