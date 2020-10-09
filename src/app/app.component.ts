import { Component, OnInit } from '@angular/core'
import { Product ,RateType} from './product.model'
      
      
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'inventory-app',
  template: `

  <br>
  <br>
  <select name="city" class="rounded-inputs20 select-select col-md-3"
  style="color:black;text-align:center;padding:5px ;width:100px"
  (change)="onChange($event.target.value)">
  <option *ngFor="let country of countries"  [value]="country.id">{{country.name}}</option>
  </select>
  <br>
  <br>
  <br>
  <br>
  <div>
  <product-list class="clearfix" style="color:black;padding:20px ;width:100px"
    [productList]="products"
    (onProductSelected)="productWasSelected($event)">
  </product-list>
</div>

`,
  styles: [`.clearfix{
    float:left,
    padding: 50px;
}`],
})
@Injectable()
export class AppComponent implements OnInit  {
  products: Product[]
  cities = {};
  selectedCountry: any;
  public multiplyingFactor:any;
  countries = [{
    id: 1, name: 'USD', values: 20
  },
  {
    id: 2, name: 'INR', values: 25
  }
  ];
  constructor(private http: HttpClient) {
    this.products = [
      new Product(
        'A-01',
        'Shoes UltraBOOST',
        './assets/shoes.png',
        100
      ),
      new Product(
        'N-01',
        'Bag Air Max',
        './assets/bag.jpg',
        220
      )   ,
      new Product(
        'N-02',
        'Watch',
        './assets/watch.png',
        500
      )      
    ]
  }  
 
  ngOnInit() {
    this.cities = this.countries.filter(x => x.id == 1)[0].values;
  }

  onChange(deviceValue) {
    this.getConfig().toPromise().then(val =>{

      if(deviceValue==1){
      this.multiplyingFactor =val.rates["USD"];}
        else {

      this.multiplyingFactor =1/val.rates["USD"];
        }
    for(var i=0;i<this.products.length;i++){
      this.products[i].price *= this.multiplyingFactor
    }
    });
    this.cities = this.countries.filter(x => x.id == deviceValue)[0].values;
  }

  productWasSelected(halo: Product): void {
    console.log('Product clicked: ', halo);
  }
  getConfig() {
    return this.http.get('https://api.exchangeratesapi.io/latest?base=INR');
  }
}
  