import {setRequestLocale} from 'next-intl/server';import LandingPage from '@/components/home/LandingPage';
type Props={params:Promise<{locale:string}>};
export default async function HomePage({params}:Props){const {locale}=await params;setRequestLocale(locale);return <LandingPage/>;}
