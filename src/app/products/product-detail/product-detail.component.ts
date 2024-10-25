import { Component, inject, Input } from '@angular/core'
import { Product } from '../../models/product.interface'
import { CommonModule } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router'
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
  private router = inject(Router)

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

  deleteProduct() {
    this
      .productService
      .deleteProduct(this.product.id)
      .subscribe(
        () => {
          console.log('Product deleted')
          this.productService.initProducts()
          this.router.navigateByUrl('/products')
        }
      )
  }

}
