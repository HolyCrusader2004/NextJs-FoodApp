
import Link from "next/link";
import logoImg from '@/assets/logo.png'
import classes from '@/app/main-header.module.css'
import Image from "next/image";
import NavLink from "./components/NavLink";

export default function MainHeader(){
    

    return <header className={classes.header}>
        <Link href={'/'} className={classes.logo}>
            <Image src={logoImg} alt="logo-image" priority/>
            Next level food
        </Link>
        <nav className={classes.nav}>
            <ul>
                <li><NavLink href={'/meals'}>Browse Meals</NavLink></li>
                <li><NavLink href={'/community'}>Community</NavLink></li>
            </ul>
        </nav>
    </header>   
}