import classes from '@/app/meals/page.module.css'
import Link from 'next/link'
import MealsGrid from '../components/meals/meals-grid'
import getMeals from '@/lib/meals'
import { Suspense } from 'react';
import classesLoading from './loading.module.css'

function Meals(){
    const meals = getMeals();
    return  <MealsGrid meals={meals}/>

}
export default function MealsPage(){
    return <>
        <header className={classes.header}>
        <h1>Meals created by <span className={classes.highlight}>you</span></h1>
        <p>Choose your recipe</p>
        <p className={classes.cta}>
            <Link href={'/meals/share'}>Share your favorite recipe</Link>
        </p>
        </header>
        <main className={classes.main}>
           <Suspense fallback={<p className={classesLoading.loading}>Fetching meals...</p>}>
           <Meals />
           </Suspense>
        </main>
    </>
}