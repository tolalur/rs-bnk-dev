import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-to-catalog-modal',
  templateUrl: './add-to-catalog-modal.component.html',
  styleUrls: ['./add-to-catalog-modal.component.scss']
})
export class AddToCatalogModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddToCatalogModalComponent>
  ) { }

  ngOnInit(): void {
  }

}
