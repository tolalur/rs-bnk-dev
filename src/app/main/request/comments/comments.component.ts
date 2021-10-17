import {Component, OnInit} from '@angular/core';
import {IComment} from '../../types/request.model';
import {Observable} from 'rxjs';
import {CommentsService} from '../../services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  newComment = '';

  comments$: Observable<IComment[]>;

  constructor(private service: CommentsService) {
    this.comments$ = this.service.comments$;
  }

  ngOnInit(): void {
  }

  addComment() {
    this.service.addComment(this.newComment);
    this.newComment = '';
  }
}
