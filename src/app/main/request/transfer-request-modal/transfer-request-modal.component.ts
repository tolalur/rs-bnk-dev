import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {UsersService} from "../../services/users.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {User} from "../../types/users.model";

@UntilDestroy()
@Component({
  selector: 'app-transfer-request-modal',
  templateUrl: './transfer-request-modal.component.html',
  styleUrls: ['./transfer-request-modal.component.scss']
})
export class TransferRequestModalComponent implements OnInit {
  selectedId: number | undefined;
  data: User[] | undefined;

  constructor(public dialogRef: MatDialogRef<TransferRequestModalComponent>,
              private service: UsersService) { }

  ngOnInit(): void {
    this.service.getUsers()
      .pipe(untilDestroyed(this))
      .subscribe( (users: User[]) => {
        this.data = users;
        this.selectedId = this.data[0].id;
      });
  }

  selectPerson(id: number | undefined) {
    this.selectedId = id;
  }

  transfer() {
    if(this.selectedId) {
      this.service.setResponsibleUser(this.selectedId).pipe(untilDestroyed(this))
        .subscribe( (resp) => {
          console.log(resp);
        });
      this.dialogRef.close();
    }
  }
}
