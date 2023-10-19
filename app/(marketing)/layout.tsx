import Navbar from "./_components/Navbar";

const MarketingLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return ( 
        <div className="h-full dark:bg-[#131313]">
            <Navbar />
            <main className="h-full pt-40 ">
                {children}
            </main>
        </div>
     );
}
 
export default MarketingLayout;