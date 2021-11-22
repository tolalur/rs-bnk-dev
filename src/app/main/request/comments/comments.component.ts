import {Component, Input, OnInit} from '@angular/core';
import {IComment} from '../../types/request.model';
import {CommentsService} from '../../services/comments.service';
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() requestId = '';
  newComment = '';

  comments: IComment[] | undefined;

  constructor(private service: CommentsService) {
  }

  ngOnInit(): void {
    this.getComment();
  }

  addComment() {
    this.service.addComment(this.requestId, this.newComment)
      .pipe(untilDestroyed(this))
      .subscribe( () => {
        this.newComment = '';
        this.getComment();
      });
  }

  getComment() {
    this.service.getComment(this.requestId)
      .pipe(untilDestroyed(this))
      .subscribe( (res: IComment[]) => this.comments = res);
  }
}
