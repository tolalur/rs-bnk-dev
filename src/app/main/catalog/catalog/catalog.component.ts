import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddToCatalogModalComponent} from "../add-to-catalog-modal/add-to-catalog-modal.component";
import {MatTableDataSource} from "@angular/material/table";
import {switchMap} from "rxjs/operators";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {MatSort} from "@angular/material/sort";
import {CatalogService} from "../../services/catalog.service";
import {CatalogListModel} from "../../types/catalog.model";

@UntilDestroy()
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  dataSource = new MatTableDataSource([]);
  displayedColumns: string[] = [
    'id',
    'name',
  ];
  isLoadingResults = false;
  sortBy = 'id';
  sortDir = 'asc';

  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private service: CatalogService) { }

  ngAfterViewInit() {
    // @ts-ignore
    this.sort?.sortChange
      .pipe(
        // @ts-ignore

        switchMap(val => {
          this.sortBy = val.active === 'active' ? 'isActive' : val.active;
          this.sortDir = val.direction;
          this.isLoadingResults = true;

          return this.service.getListCatalog(this.sortBy, this.sortDir);
        }),
        untilDestroyed(this)
      )
      .subscribe(res => {
        // @ts-ignore
        this.dataSource = res;
        this.isLoadingResults = false;
      });
  }

  ngOnInit(): void {
    this.service
      .getListCatalog(this.sortBy, this.sortDir)
      .pipe(untilDestroyed(this))
      .subscribe((catalogList: CatalogListModel[]) => {
        this.isLoadingResults = false;
        // @ts-ignore
        this.dataSource = catalogList;
      });
  }

  add() {
    this.dialog.open(AddToCatalogModalComponent, {
      width: '320px'
    });
  }

  delete(id: string) {

  }

  edit(id: string) {

  }
}
