import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ISearchResultsVariants, ISearchResultsVariantsNetworkConnectionResults} from '../../types/request.model';
import {DictionariesService} from '../../services/dictionaries.service';

@Component({
  selector: 'app-search-results-edit',
  templateUrl: './search-results-edit.component.html',
  styleUrls: ['./search-results-edit.component.scss']
})
export class SearchResultsEditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SearchResultsEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ISearchResultsVariants,
              public dictionaryService: DictionariesService
              ) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  addNetworkConnection() {
    const networkConnection: ISearchResultsVariantsNetworkConnectionResults = {
      commutatorName: '',
      commutatorPort: ''
    }

    this.data.networkConnectionResults.push(networkConnection)
  }
}
