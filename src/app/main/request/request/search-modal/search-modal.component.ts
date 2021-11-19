import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss']
})
export class SearchModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SearchModalComponent>,
    private router: Router,
  ) {}

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
    this.router.navigate(['/request/list']);
  }
}
