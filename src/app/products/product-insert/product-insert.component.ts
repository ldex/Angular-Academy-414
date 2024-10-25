import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-product-insert',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-insert.component.html',
  styleUrl: './product-insert.component.css'
})
export class ProductInsertComponent {

  private router = inject(Router)
  private productService = inject(ProductService)

  onSubmit(newProduct: Product) {
    this
      .productService
      .insertProduct(newProduct)
      .subscribe(
        product => {
          this.productService.initProducts()
          console.log('New product saved on the server with id: ' + product.id)
          this.router.navigateByUrl('/products')
        }
      )
  }

}
