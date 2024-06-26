import { CommonModule } from '@angular/common';
import {
  Component,
  ViewChild,
  AfterViewInit,
  Input,
  Output,
  OnInit,
  EventEmitter,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ToggleSliderComponent } from '../toggle-slider/toggle-slider.component';
import { MatDialog } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { getIcon } from '../../util/font-awesome-icons';
import { ShiftEndPopUpComponent } from '../../pages/reports/shift-end/shift-end-pop-up/shift-end-pop-up.component';
import { SearchComponent } from '../search/search.component';
import { ExportService } from '../../services/export.service';
import { ExportPdfService } from '../../services/export-pdf.service';
import { FabButtonFieldComponent } from '../fab-button-field/fab-button-field.component';
@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    ToggleSliderComponent,
    FontAwesomeModule,
    SearchComponent,
    FabButtonFieldComponent,
  ],
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input() tableData: {
    displayedColumns: string[];
    dataSource: MatTableDataSource<any>;
  }[];
  @Input() actions: string[] = [];
  @Input() sortCols: string[] = [];
  @Input() fileName: string = '';
  @Input() columnsToExport = [];
  @Input() formParameters: Function;
  @Output() onActionClick = new EventEmitter<any>();
  @Output() addItemClicked = new EventEmitter<void>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() displaySecondRowColumns: string[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  actionColWidth = '';
  getIcon = getIcon;
  icon: any;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
    private exportService: ExportService,
    private exportPdfService: ExportPdfService
  ) {}

  openViewDialog(element: any) {
    const dialogRef = this.dialog.open(ShiftEndPopUpComponent, {
      data: element,
    });
    console.log(element);
    dialogRef.afterClosed().subscribe();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.tableData.forEach((data) => {
      data.dataSource.sort = this.sort;
      data.dataSource.paginator = this.paginator;
    });
  }

  addItem(): void {
    this.addItemClicked.emit();
  }

  editItem(element: any): void {
    const data = {
      action: 'update',
      value: element,
    };
    this.onActionClick.emit(data);
  }

  deleteItem(element: any): void {
    const data = {
      action: 'delete',
      value: element,
    };
    this.onActionClick.emit(element);
  }

  viewItem(element: any): void {
    const data = {
      action: 'view',
      value: element,
    };
    // this.onActionClick.emit(data);
    this.openViewDialog(element);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getStatusStyle(status: string) {
    return status === 'In-Active' ? { color: 'red' } : { color: 'green' };
  }

  onExcelClicked() {
    this.exportService.exportToExcel(
      this.tableData[0].dataSource.data,
      this.fileName,
      this.columnsToExport,
      this.formParameters()
    );
  }

  onPdfClicked() {
    this.exportPdfService.exportToPDF(
      this.tableData[0].dataSource.data,
      this.fileName,
      this.columnsToExport,
      this.formParameters()
    );
  }

  applyFilter(filterValue: string): void {
    // Convert the filter value to lowercase for case-insensitive filtering
    const normalizedFilterValue = filterValue.trim().toLowerCase();

    // Apply the filter to each table's data source
    this.tableData.map((data) => {
      data.dataSource.filter = normalizedFilterValue;
    });
  }
}
