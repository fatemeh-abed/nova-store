import {setRequestLocale,getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';import CartView from '@/components/cart/CartView';
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;const t=await getTranslations({locale,namespace:'cart'});return {title:t('metaTitle'),description:t('metaDescription'),robots:{index:false,follow:true}}}
export default async function CartPage({params}:{params:Promise<{locale:string}>}){const {locale}=await params;setRequestLocale(locale);return <CartView/>}
