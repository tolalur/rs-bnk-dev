import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ISearchResults} from '../../types/request.model';

@Component({
  selector: 'app-search-results-edit',
  templateUrl: './search-results-edit.component.html',
  styleUrls: ['./search-results-edit.component.scss']
})
export class SearchResultsEditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SearchResultsEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ISearchResults,) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
