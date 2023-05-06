import { News } from "src/news/news.interface";

export function renderNewsAll(news: News[]) {
    let newsListHtml = ''
    for (const newsItem of news) {
        newsListHtml += renderNewsBlock(newsItem)
    }
    return `<h1>Список новостей</h1>
    ${newsListHtml}
    `
}

function renderNewsBlock(news: News) {
    return `
    <div class="col-lg-6">
<div class="card">
<div class="card-body">
${news.cover ? `<img src="${news.cover}" style="width: 30px; height: 30px;" alt="">` : ''}
<h5 class="card-title">${news.title}</h5>
<h6 class="card-subtitle mb-2 text-muted">
Автор: ${news.author}
</h6>
<h6 class="card-subtitle mb-2 text-muted">
Дата создания: 
</h6>
<p class="card-text">${news.description}</p>
</div>
</div>
</div>
    `
}