import { Component, inject, Input } from '@angular/core'
import { Product } from '../../models/product.interface'
import { CommonModule } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
import { ProductService } from '../../services/product.service'

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  private activatedRoute = inject(ActivatedRoute)
  private productService = inject(ProductService)

  private id = this.activatedRoute.snapshot.params['id']

  product: Product

  constructor() {
    this
      .productService
      .getProductById(this.id)
      .subscribe(
        data => this.product = data
      )
  }

}
