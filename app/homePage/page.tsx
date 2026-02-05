import HeroLogin from "@/components/home/HeroLogin";
import GovernoratesSection from "@/components/home/GovernoratesSection";
import HotelSection from "@/components/home/HotelsSection";
import Card from "@/components/Infor-hotel/Card";
import ContactSection from "@/components/home/ContactSection";
export default function HomePage(){
    return(
        <main>
            <HeroLogin/>
            <GovernoratesSection/>
            <HotelSection/>
            <ContactSection/>
            
        </main>
    )
} 


  