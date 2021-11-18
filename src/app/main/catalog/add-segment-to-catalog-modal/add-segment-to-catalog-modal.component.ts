import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CatalogService} from "../../services/catalog.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'app-add-segment-to-catalog-modal',
  templateUrl: './add-segment-to-catalog-modal.component.html',
  styleUrls: ['./add-segment-to-catalog-modal.component.scss']
})
export class AddSegmentToCatalogModalComponent implements OnInit {

  name = '';
  netboxName = '';
  constructor(
    public dialogRef: MatDialogRef<AddSegmentToCatalogModalComponent>,
    private service: CatalogService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.name = this.data?.name ? this.data.name : '';
    this.netboxName = this.data?.netboxName ? this.data.netboxName : '';
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    console.log(this.data?.edit);
    if( this.name && this.data?.edit ) {
      this.service.editCatalogSegment(this.data.id, this.name, this.netboxName)
        .pipe(untilDestroyed(this))
        .subscribe(
          value => {console.log(value)}
        );

    } else if ( this.name && !this.data?.edit ){
      this.service.addCatalogSegment(this.name, this.netboxName)
        .pipe(untilDestroyed(this))
        .subscribe(
          value => {console.log(value)}
        );
    }
    this.dialogRef.close();
  }

}
