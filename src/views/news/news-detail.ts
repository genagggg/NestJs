import { Comment } from "src/news/comments/comments.service";
import { News } from "src/news/news.service";

export function renderNewsDetail(news: News, comment: Comment[]): string{
    
    return `<div class="container">
    <img style="width: 40px; height: 56px" src="${news.cover}"
    <h1>${news.title}</h1>
    <div>${news.description}</div>
    <div class="text-muted">Автор: ${news.author}</div>
    ${comment ? renderNewsComments(comment):'К сожалению нет комментариев'}
    </div>
   `
}

export function renderNewsComments(comment: Comment[]):string{
    let html = ``
    for(const comments of comment){
        html+=`
        <div class="row">
        <div class="col-lg-2">
        <div style="width: 50px; height: 50px; background: #ccc; border-radius: 6px;" class="rounded-lg"></div>
        </div>
        <div class="col-lg-8">
        <div>${comments.author}</div>
        <div>${comments.message}</div>
        </div>
        </div>`
    }
    return html
}


 