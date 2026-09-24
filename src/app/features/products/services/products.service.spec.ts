import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductsService, MOCK_PRODUCTS } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ProductsService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return products collection via HttpClient', () => {
    service.getProducts().subscribe((products) => {
      expect(products.length).toBe(MOCK_PRODUCTS.length);
      expect(products[0].name).toBe('Santal Mystique');
    });

    const req = httpTesting.expectOne('/products');
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_PRODUCTS);
  });
});
