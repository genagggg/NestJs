import { Injectable } from '@nestjs/common';
import { Comment, CommentEdit } from './comments.interface';
import { getRandomInt } from '../news.service';

@Injectable()
export class CommentsService {
    private readonly comments = {
        1: [],
        66271: [{
            id: 1,
            message: "Сообщение",
            author: "Vlad"
        }],
    }

    create(idNews: number, comment: Comment) {
        if (!this.comments[idNews]) {
            this.comments[idNews] = []
        }

        const newComment = { ...comment, id: getRandomInt() }
        this.comments[idNews].push(newComment)
        return newComment
    }

    edit(idNews: number, idComment: number, comment: CommentEdit) {
        const indexComment = this.comments[idNews]?.findIndex((c) => c.id === idComment) === -1
        if (!this.comments[idNews]) {
            if (this.comments[idNews] || idComment) {
                return false
            }

        }
        this.comments[idNews][indexComment] = {
            ...this.comments[idNews][idComment],
            comment
        }
        return 'Комментарий был создан'
    }

    find(idNews: number): Comment[] | null {
        return this.comments[idNews] || null
    }

    remove(idNews: number, idComment: number): Comment[] | null {
        if (!this.comments[idNews]) {
            return null
        }

        const indexComment = this.comments[idNews].findIndex(
            (c) => c.id === idComment,

        )
        if (indexComment === -1) {
            return null
        }
        return this.comments[idNews].splice(idComment, 1)
    }
}
