import { Navbar } from "../components/Navbar"



const Index = ({ children }: { children: React.ReactNode }) => {
   return (
      <>
         <Navbar />

         <main>
            {children}
         </main>
      </>
   )
}

export default Index