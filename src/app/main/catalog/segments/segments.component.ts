import {Component, OnInit, ViewChild} from '@angular/core';
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {CatalogService} from "../../services/catalog.service";
import {CatalogListModel} from "../../types/catalog.model";
import {AddSegmentToCatalogModalComponent} from "../add-segment-to-catalog-modal/add-segment-to-catalog-modal.component";

@UntilDestroy()
@Component({
  selector: 'app-segments',
  templateUrl: './segments.component.html',
  styleUrls: ['./segments.component.scss']
})
export class SegmentsComponent implements OnInit {

  dataSource = new MatTableDataSource([]);
  displayedColumns: string[] = [
    'id',
    'name',
    'edit'
  ];
  isLoadingResults = false;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private service: CatalogService) { }

  ngOnInit(): void {
    this.getData();
  }

  add() {
    const dialogAddRef = this.dialog.open(AddSegmentToCatalogModalComponent, {
      width: '320px'
    });

    dialogAddRef.afterClosed().subscribe(result => {
      console.log(result);
      this.getData();
    });
  }

  delete(id: string) {
    console.log('delete', id);
  }

  edit(id: string, name: string) {
    this.dialog.open(AddSegmentToCatalogModalComponent, {
      width: '320px',
      data: {name: name, edit: true}
    });

  }

  getData() {
    this.service
      .getListCatalogSegments()
      .pipe(untilDestroyed(this))
      .subscribe((catalogList: CatalogListModel[]) => {
        this.isLoadingResults = false;
        // @ts-ignore
        this.dataSource = catalogList;
      });
  }

}
