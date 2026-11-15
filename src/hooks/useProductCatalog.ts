'use client';
import {useMemo, useState} from 'react';
import {ProductSort} from '@/types/enums/ProductSort';
import type {Product} from '@/types/product.types';
import {selectProducts} from '@/utils/productCatalog';
export function useProductCatalog(products: readonly Product[], initialSearch = '') {
 const [search,setSearch]=useState(initialSearch);const [category,setCategory]=useState<string|null>(null);
 const [sort,setSort]=useState<ProductSort>(ProductSort.TitleAsc);const [page,setPage]=useState(1);
 const result=useMemo(()=>selectProducts(products,{search,category,sort,page,pageSize:6}),[products,search,category,sort,page]);
 return {search,category,sort,page,result,setPage,setSearch:(value:string)=>{setSearch(value);setPage(1)},setCategory:(value:string|null)=>{setCategory(value);setPage(1)},setSort:(value:ProductSort)=>{setSort(value);setPage(1)}};
}
