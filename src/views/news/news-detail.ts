import { Comment } from "src/news/comments/comments.interface";
import { News } from "src/news/news.interface";

export function renderNewsDetail(news: News, comment: Comment[]): string {
    return `
    <div class="container">
    <img src = "${news.cover}" style="width: 40px" all="">
    <h1>${news.title}</h1>
    <div>${news.description}</div>
    <div class = "text-muted">${news.author ? news.author : 'Автора нет'}</div>
    ${comment ? renderNewsComments(comment) : 'Нет комментариев'}
    </div>
    `
}

export function renderNewsComments(comments: Comment[]): string {
    let html = ''
    for (const comment of comments) {
        html += `
        <div class="row">
       <div class = "col-lg-2"></div>
    <div class = "col-lg-8">
       <div>${comment.author}</div>
       <div>${comment.message}</div>
       </div>
        </div>
        `
    }
    return html
}