import {Component, OnInit} from '@angular/core';
import {RequestService} from '../../services/request.service';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit {
  targetMachineRoom = 'one';
  isReadOnly$;
  typePosition = 'set';

  constructor(private service: RequestService) {
    this.isReadOnly$ = this.service.isReadOnly$
  }

  ngOnInit(): void {
  }
}
