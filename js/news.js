let searchInput1 = document.querySelector("#news-search-input");
let searchBtn1 = document.querySelector("#news-search-btn");
let prev = document.querySelector("#prev");
let next = document.querySelector("#next");
let current = document.querySelector("#current");

let currentPage = 1;
let prevPage = 0;
let nextPag = 2;
let totalPages = 5;

let newsUrl = "https://newsapi.org/v2/top-headlines?category=General&page=1&sortBy=popularity&apiKey=367b833f122d4dd2a7f351680d0e960a";
printNews();

//search news
searchBtn1.addEventListener("click", function () {
  newsUrl = "https://newsapi.org/v2/everything?q=" + searchInput1.value + "&page=1&sortBy=popularity&apiKey=367b833f122d4dd2a7f351680d0e960a";
  currentPage = 1;
  prevPage = 0;
  nextPag = 2;
  totalPages = 5;
  current.innerHTML = currentPage;
  printNews();
});

// change category
$("ul.navbar-nav > li").click(function (e) {
  e.preventDefault();
  var getItem = $(this).text();
  var id = this.id;
  currentPage = 1;
  prevPage = 0;
  nextPag = 2;
  totalPages = 5;
  current.innerHTML = currentPage;
  newsUrl = "https://newsapi.org/v2/top-headlines?category=" + id + "&sortBy=popularity&page=1&apiKey=367b833f122d4dd2a7f351680d0e960a";
  printNews();
});

function printNews() {
  lastUrl = newsUrl;
  fetch(newsUrl).then((response) => {
    response.json().then((res) => {
      document.querySelector("#newsCard").innerHTML = res.articles
        .map(
          (articale) =>
            `
             <div class="col-md-6 col-lg-4">
             <!-- news card -->
             <div class="card  text-center shadow rounded-3 mb-5 py-2" id="myCard">
                 <div class="card-body">
                   <img src="${
                     articale.urlToImage
                   }" class="img-fluid rounded-3 pb-3" id ="news-img" alt="">
                 <p class="card-text"> ${articale.publishedAt.split("T")[0]}</p>
                 <h3 class="card-title"> ${articale.title}</h3>
                 <p class="card-text text-muted" >${articale.description}</p>
                 <p class="card-text text-left "> ${articale.author}</p>
             </div>
             <div class="card-footer bg-transparent ">  <a href="${articale.url}" class=" btn fw-bold" id="more-btn"> READ MORE</a>
             </div>
         </div>
       </div>
             `
        )
        .join("");
    });
  });

  // pagination
  if (currentPage <= 1) {
    prev.classList.add("disabled");
    next.classList.remove("disabled");
  } else if (currentPage >= totalPages) {
    prev.classList.remove("disabled");
    next.classList.add("disabled");
  } else {
    prev.classList.remove("disabled");
    next.classList.remove("disabled");
  }
}

// pagination  (next)
next.addEventListener("click", () => {
  if (nextPag <= totalPages) {
    nextPag++;
    prevPage++;
    currentPage++;
    newsUrl = "https://newsapi.org/v2/top-headlines?category=General&page=" + currentPage + "&sortBy=popularity&apiKey=367b833f122d4dd2a7f351680d0e960a";
    current.innerHTML = currentPage;
    printNews();
  }
});

// pagination  (prev)
prev.addEventListener("click", () => {
  if (prevPage > 0) {
    nextPag--;
    prevPage--;
    currentPage--;
    newsUrl = "https://newsapi.org/v2/top-headlines?category=General&page=" + currentPage + "&sortBy=popularity&apiKey=367b833f122d4dd2a7f351680d0e960a";
    current.innerHTML = currentPage;
    printNews();
  }
});
