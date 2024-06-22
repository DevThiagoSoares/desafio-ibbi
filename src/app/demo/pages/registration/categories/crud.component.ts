import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/demo/service/api.service';

interface Category {
  id?: string;
  name: string;
  description: string;
}

@Component({
  templateUrl: './crud.component.html',
  providers: [MessageService]
})
export class CrudComponent implements OnInit {
  categoryDialog: boolean = false;
  deleteCategoryDialog: boolean = false;
  deleteCategoriesDialog: boolean = false;

  categories: Category[] = [];
  category: Category = { id: '', name: '', description: '' };

  selectedCategories: Category[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  rowsPerPageOptions = [5, 10, 20];

  constructor(private categoryService: ApiService, private messageService: MessageService) {}

  ngOnInit() {
    this.categoryService.listCategories().subscribe((data) => (this.categories = data));

    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'description', header: 'Description' }
    ];
  }

  openNew() {
    this.category;
    this.submitted = false;
    this.categoryDialog = true;
  }

  deleteSelectedCategories() {
    this.deleteCategoriesDialog = true;
  }

  editCategory(category: Category) {
    this.category = { ...category };
    this.categoryDialog = true;
  }

  deleteCategory(category: Category) {
    this.deleteCategoryDialog = true;
    this.category = { ...category };
  }

  confirmDeleteSelected() {
    this.deleteCategoriesDialog = false;
    this.selectedCategories.forEach((category) => {
      this.categoryService.deleteCategory(category.id!).subscribe(() => {
        this.categories = this.categories.filter((val) => val.id !== category.id);
      });
    });
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Categorias Deletadas', life: 3000 });
    this.selectedCategories = [];
  }

  confirmDelete() {
    this.deleteCategoryDialog = false;
    this.categoryService.deleteCategory(this.category.id!).subscribe(() => {
      this.categories = this.categories.filter((val) => val.id !== this.category.id);
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Categoria Deletada', life: 3000 });
      this.category;
    });
  }

  hideDialog() {
    this.categoryDialog = false;
    this.submitted = false;
  }

  saveCategory() {
    this.submitted = true;
  
    if (this.category.name.trim() && this.category.description.trim()) {
      if (this.category.id) {
        this.categoryService.updateCategory(this.category.id, this.category).subscribe((data) => {
          this.categories[this.findIndexById(this.category.id!)] = data;
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Categoria Atualizada', life: 3000 });
          this.categories = [...this.categories];
          this.categoryDialog = false;
          this.category = { id: '', name: '', description: '' };
        });
      } else {
        this.categoryService.createCategory(this.category).subscribe((data) => {
          this.categories.push(data);
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Categoria Criada', life: 3000 });
          this.categories = [...this.categories];
          this.categoryDialog = false;
          this.category = { id: '', name: '', description: '' };
        });
      }
    }
  }
  

  findIndexById(id: string): number {
    return this.categories.findIndex((category) => category.id === id);
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
