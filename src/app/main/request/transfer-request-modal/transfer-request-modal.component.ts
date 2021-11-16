import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-transfer-request-modal',
  templateUrl: './transfer-request-modal.component.html',
  styleUrls: ['./transfer-request-modal.component.scss']
})
export class TransferRequestModalComponent implements OnInit {
  selectedId: number | undefined;
  // ToDo: получение данных с бэка
  data = [
    {
      name: 'Петров Петр Петрович',
      email: 'pppetrov@gmail.ru',
      id: 4
    },
    {
      name: 'Петров Петр Петрович',
      email: 'pppetrov@gmail.ru',
      id: 3
    },
    {
      name: 'Петров Петр Петрович',
      email: 'pppetrov@gmail.ru',
      id: 7
    }
  ];

  constructor(public dialogRef: MatDialogRef<TransferRequestModalComponent>) { }

  ngOnInit(): void {
    this.selectedId = this.data[0].id;
  }

  selectPerson(id: number) {
    this.selectedId = id;
  }

  transfer() {
    // ToDo: отправка выбранного сотрудника
    this.dialogRef.close();
  }
}
