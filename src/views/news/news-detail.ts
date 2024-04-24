import { News } from "src/news/news.service";

export function renderNewsDetail(news: News): string{
    
    return `<div class="container">
    <img style="width: 40px; height: 56px" src="${news.cover}"
    <h1>${news.title}</h1>
    <div>${news.description}</div>
    <div class="text-muted">Автор: ${news.author}</div>
    </div>
   `
}


 