import GovernoratesSection from "./GovernoratesSection";
import Hero from "./Hero";
import HotelSection from "./HotelsSection";
import NavBar from "../layout/NavBar";
import ContactSection from "./ContactSection";
export default function HomePage(){
    return(
        <main>
            {/* <NavBar/> */}
            <Hero/>
            <GovernoratesSection/>
            <HotelSection/>
            <ContactSection/>
        </main>
    )
}   