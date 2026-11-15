'use client';
import {useState} from 'react';
import type {FormEvent} from 'react';
import styled from 'styled-components';
import {ShoppingBag, ShoppingCart, Menu, X, Search, Moon, Sun} from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';
import {Link, usePathname, useRouter} from '@/i18n/navigation';
import {useTheme} from '@/context/ThemeContext';
import {useCartStore} from '@/storage/useCartStore';
import {useCartHydrated} from '@/storage/useCartHydrated';
import {routes} from '@/utils/routes';
const Bar=styled.header`background:${({theme})=>theme.colors.surface};border-block-end:1px solid ${({theme})=>theme.colors.border};position:sticky;top:0;z-index:30;`;
const Inner=styled.div`max-width:${({theme})=>theme.tokens.sizes.content};margin:auto;padding:12px 20px;min-height:72px;display:flex;align-items:center;justify-content:space-between;gap:20px;`;
const Brand=styled(Link)`display:inline-flex;align-items:center;gap:5px;font-size:29px;font-weight:900;letter-spacing:-1.5px;text-decoration:none;white-space:nowrap;direction:ltr;`;
const Navigation=styled.nav`display:flex;align-items:center;gap:24px;font-size:14px;font-weight:700;@media(max-width:900px){display:none;}`;
const SearchBox=styled.form`display:flex;align-items:center;background:${({theme})=>theme.colors.subtle};border:1px solid ${({theme})=>theme.colors.border};border-radius:${({theme})=>theme.tokens.radii.pill};padding-inline:14px;max-width:280px;flex:1;input{background:transparent;border:0;outline:0;min-width:0;width:100%;padding:10px;color:${({theme})=>theme.colors.text};} @media(max-width:650px){display:none;}`;
const Actions=styled.div`display:flex;align-items:center;gap:12px;`;
const IconButton=styled.button`border:0;background:transparent;color:${({theme})=>theme.colors.text};min-width:40px;min-height:44px;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;`;
const CartLink=styled(Link)`position:relative;display:inline-flex;align-items:center;justify-content:center;min-width:44px;min-height:44px;`;
const Count=styled.span`position:absolute;top:0;inset-inline-start:0;background:${({theme})=>theme.tokens.colors.orange};color:white;border-radius:100px;min-width:18px;height:18px;text-align:center;font-size:11px;font-weight:700;`;
const Mobile=styled.div`display:none;@media(max-width:900px){display:block;}`;
const Drawer=styled.nav`position:absolute;inset-inline:0;top:100%;padding:22px;background:${({theme})=>theme.colors.surface};box-shadow:${({theme})=>theme.tokens.shadows.card};display:grid;gap:20px;a{text-decoration:none;font-weight:700;}`;
export default function Header({onSearch}:{onSearch?:(value:string)=>void}){
 const t=useTranslations('nav');const locale=useLocale();const path=usePathname();const router=useRouter();const {mode,toggleTheme}=useTheme();const [open,setOpen]=useState(false);const [query,setQuery]=useState('');
 const hydrated=useCartHydrated();const count=useCartStore(s=>s.items.reduce((sum,item)=>sum+item.quantity,0));
 const links=[{href:routes.home,label:t('home')},{href:routes.home+'#products',label:t('products')},{href:routes.home+'#categories',label:t('categories')}];
 function submit(e:FormEvent){e.preventDefault();onSearch?.(query);if(path!==routes.home)router.push(routes.home+'?q='+encodeURIComponent(query));}
 return <Bar><Inner><Mobile><IconButton aria-label={open?t('close'):t('menu')} aria-expanded={open} onClick={()=>setOpen(v=>!v)}>{open?<X/>:<Menu/>}</IconButton></Mobile><Brand href={routes.home}>NOVA <ShoppingBag size={29} fill="#ff6a24" stroke="#ff6a24"/></Brand><Navigation aria-label={t('menu')} >{links.map(l=><Link key={l.label} href={l.href}>{l.label}</Link>)}</Navigation><SearchBox role="search" onSubmit={submit}><input aria-label={t('search')} placeholder={t('search')} value={query} onChange={e=>{setQuery(e.target.value);if(path===routes.home)onSearch?.(e.target.value);}}/><button type="submit" aria-label={t('search')} style={{background:'none',border:0,cursor:'pointer',color:'inherit'}}><Search size={19}/></button></SearchBox><Actions><IconButton aria-label={t('language')} onClick={()=>router.replace(path,{locale:locale==='fa'?'en':'fa'})}>{locale==='fa'?'EN':'FA'}</IconButton><IconButton aria-label={t('theme')} onClick={toggleTheme}>{mode==='light'?<Moon size={20}/>:<Sun size={20}/>}</IconButton><CartLink href={routes.cart} aria-label={t('cart')}><ShoppingCart size={24}/>{hydrated&&count>0&&<Count aria-label={t('cartCount')}>{count}</Count>}</CartLink></Actions></Inner>{open&&<Mobile><Drawer aria-label={t('menu')}>{links.map(l=><Link key={l.label} href={l.href} onClick={()=>setOpen(false)}>{l.label}</Link>)}<form onSubmit={submit}><input aria-label={t('search')} placeholder={t('search')} value={query} onChange={e=>setQuery(e.target.value)}/><button type="submit"><Search size={18}/></button></form></Drawer></Mobile>}</Bar>;
}
