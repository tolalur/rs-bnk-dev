import {Component, Input, OnInit} from '@angular/core';
import {RequestService} from '../../services/request.service';
import {IRequestPosition, RequestPositionTypeEnum} from '../../types/request.model';
import {DictionariesService} from '../../services/dictionaries.service';
import {UserService} from '../../../user/user.service';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit {
  isReadOnly$;
  positionTypeEnum = RequestPositionTypeEnum;

  @Input() position: IRequestPosition | undefined

  constructor(public service: RequestService, public dictionaryService: DictionariesService, public user: UserService) {
    this.isReadOnly$ = this.service.isReadOnly$
  }

  ngOnInit(): void {
  }
}
