import { Component, Input, Output, HostBinding } from '@angular/core'
import { Product } from '../product.model'

@Component({
  selector: 'product-row',
  template: `<div class="content">
  <img class="product-img" width=200 src="{{product.imageUrl}}" />
  <div class="header">{{ product.name }}</div>
  <div class="meta">
    <div class="product-sku">SKU #{{ product.sku }}</div>
  </div>
  <div class="description">
    <span *ngFor="let name of product.department; let i=index">
      <a href="#">{{ name }}</a>
      <span>{{i < (product.department.length-1) ? '>' : ''}}</span>
    </span>
  </div>
  <div class="price">Price: {{ product.price }}</div>
</div>`,
  styleUrls: ['./product-row.component.css']
})
export class ProductRowComponent {
  @Input() product: Product
  @HostBinding('attr.class') cssCLass = 'item'
  
  constructor() { }

}