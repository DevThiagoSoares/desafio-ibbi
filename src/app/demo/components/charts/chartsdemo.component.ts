import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../service/api.service';

@Component({
  templateUrl: './chartsdemo.component.html'
})
export class ChartsDemoComponent implements OnInit, OnDestroy {

  pieData: any;
  pieOptions: any;
  barData: any;
  barOptions: any;
  subscription: Subscription;
  products: any[] = [];
  productsStocks: any[] = []

  constructor(private api: ApiService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.fetchPieChartData();
    this.fetchBarChartData();
    this.fetchProductData();
    this.fetchProductsStockData();
  }

  fetchPieChartData() {
    this.api.topCategories().subscribe(
      (data) => {
        this.setPieChart(data);
      },
      (error) => {
        console.error('Error fetching pie chart data:', error);
      }
    );
  }

  fetchBarChartData() {
    this.api.topSellingProducts().subscribe(
      (data) => {
        this.setBarChart(data);
      },
      (error) => {
        console.error('Error fetching bar chart data:', error);
      }
    );
  }

  fetchProductData() {
    this.api.recentSales().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching product data:', error);
      }
    );
  }
  fetchProductsStockData() {
    this.api.lowStockProducts().subscribe(
      (data) => {
        this.productsStocks = data;
      },
      (error) => {
        console.error('Error fetching product data:', error);
      }
    );
  }

  setPieChart(data: any[]) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.pieData = {
      labels: data.map(item => item.category_name),
      datasets: [{
        data: data.map(item => item.total_quantity),
        backgroundColor: [
          documentStyle.getPropertyValue('--indigo-500'),
          documentStyle.getPropertyValue('--purple-500'),
          documentStyle.getPropertyValue('--teal-500'),
          documentStyle.getPropertyValue('--orange-500')
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue('--indigo-400'),
          documentStyle.getPropertyValue('--purple-400'),
          documentStyle.getPropertyValue('--teal-400'),
          documentStyle.getPropertyValue('--orange-400')
        ]
      }]
    };

    this.pieOptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };
  }

  setBarChart(data: any[]) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    const backgroundColors = this.generateRandomColors(data.length);

    this.barData = {
      labels: data.map(item => item.product_name),
      datasets: [{
        label: 'Quantidade',
        backgroundColor: backgroundColors,
        borderColor: backgroundColors,
        data: data.map(item => item.total_quantity)
      }]
    };

    this.barOptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColor,
            font: {
              weight: 100
            }
          },
          grid: {
            display: false,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColor
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.05)',
            drawBorder: false
          }
        }
      },
    };

    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  generateRandomColors(numColors: number): string[] {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
      colors.push(color);
    }
    return colors;
  }
}