import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-warning-modal',
  templateUrl: './warning-modal.component.html',
  styleUrls: ['./warning-modal.component.scss']
})
export class WarningModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<WarningModalComponent>, @Inject(MAT_DIALOG_DATA) public data: string[]) { }

  ngOnInit(): void {
  }

}
