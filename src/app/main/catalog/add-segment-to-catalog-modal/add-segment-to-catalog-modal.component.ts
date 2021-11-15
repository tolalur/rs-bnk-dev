import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CatalogService} from "../../services/catalog.service";
import {untilDestroyed} from "@ngneat/until-destroy";

@Component({
  selector: 'app-add-segment-to-catalog-modal',
  templateUrl: './add-segment-to-catalog-modal.component.html',
  styleUrls: ['./add-segment-to-catalog-modal.component.scss']
})
export class AddSegmentToCatalogModalComponent implements OnInit {

  name = '';

  constructor(
    public dialogRef: MatDialogRef<AddSegmentToCatalogModalComponent>,
    private service: CatalogService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.name = this.data?.name ? this.data.name : '';
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    console.log(this.data?.edit);
    if( this.name && this.data?.edit ) {
      this.service.editCatalogSegment(this.data.id, this.name)
        .pipe(untilDestroyed(this))
        .subscribe(
          value => {console.log(value)}
        );

    } else if ( this.name && !this.data?.edit ){
      this.service.addCatalogSegment(this.name)
        .pipe(untilDestroyed(this))
        .subscribe(
          value => {console.log(value)}
        );
    }
    this.dialogRef.close();
  }

}
