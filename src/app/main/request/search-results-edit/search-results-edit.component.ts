import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {
  ISearchResultsVariants,
  ISearchResultsVariantsNetworkConnectionResults
} from '../../types/request.model';

@Component({
  selector: 'app-search-results-edit',
  templateUrl: './search-results-edit.component.html',
  styleUrls: ['./search-results-edit.component.scss']
})
export class SearchResultsEditComponent implements OnInit {
  networkConnectionResults: ISearchResultsVariantsNetworkConnectionResults | undefined;
  constructor(public dialogRef: MatDialogRef<SearchResultsEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ISearchResultsVariants,) { }

  ngOnInit(): void {
    if (this.data.networkConnectionResults) {
      this.networkConnectionResults = this.data.networkConnectionResults[0];
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
