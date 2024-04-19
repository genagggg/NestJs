import { News } from "src/news/news.service";

export function renderNewsAll(news: News[]){
    let newsListHtml = ``;
    for(const newsItem of news){
        newsListHtml+=renderNewsBlock(newsItem)
    }
    return `<h1>Список новостей</h1>
    <div class="row">
     ${newsListHtml}
    </div>
   
    `
}


 function renderNewsBlock(news: News){ return  `<div class="col-lg-4">
  <div class="card" style="width: 18rem;">
 ${news.cover? `<img src = '${news.cover}'>`:''}
 
    <div class="card-body">
      <h5 class="card-title">${news.title}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${news.author}</h6>
      <p class="card-text">${news.description}</p>
      <a href="#" class="card-link">Ссылка карты</a>
      <a href="#" class="card-link">Другая ссылка</a>
    </div>
  </div>
  </div>`}
