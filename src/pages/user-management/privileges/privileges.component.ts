import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PagetitleComponent } from '../../../components/pageTitle/page-title.component';
import { ButtonFieldComponent } from '../../../components/button-field/button-field.component';
import { DropDownComponent } from '../../../components/drop-down/drop-down.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from '../../../components/search/search.component';
import { FabButtonFieldComponent } from '../../../components/fab-button-field/fab-button-field.component';
import { TableComponent } from '../../../components/table/table.component';
import { MatTableDataSource } from '@angular/material/table';
import { exportPriviledgesData, exportRolesData } from '../../export-data';
import { privilegesData, roleData } from '../../sample';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { getIcon } from '../../../util/font-awesome-icons';

@Component({
  selector: 'app-privileges',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    PagetitleComponent,
    ButtonFieldComponent,
    DropDownComponent,
    ReactiveFormsModule,
    SearchComponent,
    FabButtonFieldComponent,
    TableComponent,
    FontAwesomeModule,
  ],
  templateUrl: './privileges.component.html',
  styleUrl: './privileges.component.scss',
})
export class PrivilegesComponent {
  getIcon = getIcon;
  userData: any[] = [];
  fileName = 'Privileges';
  columnsToExport = exportPriviledgesData;
  params: any[] = [];
  actionItems = ['update'];
  sortCols = ['Privilege Code', 'Privilege Type', 'Status'];

  get formParameters() {
    return this.getParameters.bind(this);
  }
  constructor() {}

  myTableData: {
    displayedColumns: string[];
    dataSource: MatTableDataSource<any>;
  }[] = [];

  ngOnInit(): void {
    this.getTableData();
  }

  getTableData() {
    let responseData = [];
    const response = privilegesData;

    response.data.map((item) => {
      let dataList = {};
      response.headers.map((header) => {
        dataList = { ...dataList, [header.label]: item[header.key] };
      });
      responseData.push(dataList);
    });

    this.sortCols = response.headers.map((header: any) => header.label);
    this.myTableData = [
      {
        displayedColumns: response.headers.map((header: any) => header.label),
        dataSource: new MatTableDataSource<any>(responseData),
      },
    ];
  }
  getParameters() {
    return this.params;
  }

  onSubmit() {
    console.log();
  }
}
