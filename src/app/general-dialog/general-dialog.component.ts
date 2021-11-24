import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-general-dialog',
  templateUrl: './general-dialog.component.html',
  styleUrls: ['./general-dialog.component.scss']
})
export class GeneralDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<GeneralDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string,) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
