import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css'],
})
export class RecordComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData') || '[]');
    this.displayedData = this.getPaginatedData();
    this.totalPages = Math.ceil(this.userData.length / this.itemsPerPage);
  }

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumber: string = '';
  searchInput: string = '';

  userData: any[] = [];
  displayedData: any[] = [];

  update: number = -1;
  submitBtnText: boolean = false;

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;

  addData(): void {
    if (!this.firstName || !this.lastName || !this.email || !this.phoneNumber) {
      alert('All fields are required.');
      return;
    }

    if (this.update > -1) {
      this.userData[this.update] = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phoneNumber: this.phoneNumber,
      };
      this.update = -1;
    } else {
      let newUser = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phoneNumber: this.phoneNumber,
      };
      this.userData.push(newUser);
    }

    localStorage.setItem('userData', JSON.stringify(this.userData));
    this.totalPages = Math.ceil(this.userData.length / this.itemsPerPage);
    this.displayedData = this.getPaginatedData();
    this.resetForm();
  }

  clearList() {
    this.userData = [];
    localStorage.setItem('userData', JSON.stringify(this.userData));
    this.totalPages = Math.ceil(this.userData.length / this.itemsPerPage);
    this.displayedData = this.getPaginatedData();
  }

  deleteIndex(index: number) {
    this.userData.splice(index, 1);
    localStorage.setItem('userData', JSON.stringify(this.userData));


    this.totalPages = Math.ceil(this.userData.length / this.itemsPerPage);
    this.displayedData = this.getPaginatedData();
  }

  duplicateIndex(index: number) {
    let newuser = { ...this.userData[index] };
    this.userData.push(newuser);
    localStorage.setItem('userData', JSON.stringify(this.userData));


    this.totalPages = Math.ceil(this.userData.length / this.itemsPerPage);
    this.displayedData = this.getPaginatedData();
  }

  updateIndex(index: number) {
    this.update = index;
    let indexData = this.userData[index];


    this.firstName = indexData.firstName;
    this.lastName = indexData.lastName;
    this.email = indexData.email;
    this.phoneNumber = indexData.phoneNumber;
  }

  searchData() {
    let dataToSearch = this.searchInput.toString().toLowerCase();


    let filteredData = this.userData.filter((user) => {
      return Object.values(user).some((value: string) => {
        return value.toString().toLowerCase().includes(dataToSearch);
      });
    });

    this.displayedData = dataToSearch ? filteredData : this.getPaginatedData();
  }

  getPaginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.userData.slice(startIndex, endIndex);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.displayedData = this.getPaginatedData();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.displayedData = this.getPaginatedData();
    }
  }

  generatePageNumbers(): number[] {
    return [...Array(this.totalPages).keys()].map(i => i + 1);
  }

  goToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.displayedData = this.getPaginatedData();
  }

  resetForm(): void {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.phoneNumber = '';
  }
}
