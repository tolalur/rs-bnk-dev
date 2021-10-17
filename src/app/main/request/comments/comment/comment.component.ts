import {Component, Input, OnInit} from '@angular/core';
import {IComment} from '../../../types/request.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment: IComment | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
