import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {CatalogService} from "../../services/catalog.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {AddToCatalogModalComponent} from "../add-to-catalog-modal/add-to-catalog-modal.component";
import {CatalogListModel} from "../../types/catalog.model";

@UntilDestroy()
@Component({
  selector: 'app-engine-room',
  templateUrl: './engine-room.component.html',
  styleUrls: ['./engine-room.component.scss']
})
export class EngineRoomComponent implements OnInit {

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
    const dialogAddRef = this.dialog.open(AddToCatalogModalComponent, {
      width: '320px'
    });

    dialogAddRef.afterClosed().subscribe(result => {
      console.log(result);
      this.getData();
    });
  }

  edit(id: string, name: string, netboxName: string) {
    this.dialog.open(AddToCatalogModalComponent, {
      width: '320px',
      data: {name: name, netboxName: netboxName, edit: true}
    });
  }

  getData() {
    this.service
      .getListCatalogMashzals()
      .pipe(untilDestroyed(this))
      .subscribe((catalogList: CatalogListModel[]) => {
        this.isLoadingResults = false;
        // @ts-ignore
        this.dataSource = catalogList;
      });
  }
}
