import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Errors, Product, ProductService, UserService } from 'src/app/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-job',
  templateUrl: './createJob.component.html',
  styleUrls: ['./createJob.component.css'],
  standalone: true,
  imports: [
    RouterModule,
    RouterLink,
    CommonModule,
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class createJobComponent implements OnInit {
  products: Product[] = [];
  isSubmitting = false;
  errors: Errors = { errors: {} };
  authForm: FormGroup;

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.authForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      id_cat: [null, Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      images: [undefined],
      img: [undefined]
    });
  }

  ngOnInit(): void { }

  submitForm() {
    this.isSubmitting = true;
    this.errors = { errors: {} };

    const credentials = this.authForm.value;
    // console.log(credentials);

    const user = this.userService.getCurrentUser();
    // console.log(`user: `, user);

    this.productService.create_product_company(user.username, credentials).subscribe(
      data => {
        console.log(data);
        // Mostrar el SweetAlert
        Swal.fire({
          title: 'Éxito',
          text: 'El producto se ha creado correctamente.',
          icon: 'success', // Icono de éxito
          confirmButtonText: 'OK' // Texto del botón
        }).then((result) => {
          // Al hacer clic en "OK", redirigir al usuario
          if (result.isConfirmed) {
            this.router.navigateByUrl('companyDashboard');
          }
        });
      });
  }
}
