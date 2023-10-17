import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { List_Product } from 'src/app/contracts/list_product';
import { ProductService } from 'src/app/services/common/models/product.service';
import {FileService} from "../../../../services/common/file.service";
import {BaseStorageUrl} from "../../../../contracts/base-storage-url";

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  constructor(private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private fileService: FileService         ) { }

  currentPageNo: number;
  totalProductCount: number;
  totalPageCount: number;
  pageSize: number = 12;
  pageList: number[] = [];
  products: List_Product[];

  baseStorageUrl: BaseStorageUrl;

  async ngOnInit() {
    
    this.baseStorageUrl = await this.fileService.getBaseStorageUrl();

    this.activatedRoute.params.subscribe(async params => {
      this.currentPageNo = parseInt(params["pageNo"]);
      if (Number.isNaN(this.currentPageNo))
        this.currentPageNo = 1;
      const data = await this.productService.read(this.currentPageNo - 1, this.pageSize,
        () => {

        },
        errorMessage => {

        });
      this.products = data.products;

      this.products = this.products.map(p => {
        const listProduct : List_Product = {
          id: p.id,
          name: p.name,
          price: p.price,
          stock: p.stock,
          createdDate: p.createdDate,
          updatedDate: p.updatedDate,
          imagePath: p.productImageFiles.length ? p.productImageFiles.find(image => image.showcase).path : '' ,
          productImageFiles: p.productImageFiles
        };
        return listProduct;
      })


      this.totalProductCount = data.totalProductCount;
      this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);
      this.pageList = [];

      if (this.currentPageNo - 3 <= 0) {
        let limit;
        if (this.totalPageCount < 7)
          limit = this.totalPageCount;
        else
          limit = 7

        for (let i = 1; i <= limit; i++)
          this.pageList.push(i);
      }

      else if (this.currentPageNo + 3 >= this.totalPageCount)
        for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++)
          this.pageList.push(i);

      else
        for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++)
          this.pageList.push(i);
    });
  }
}
