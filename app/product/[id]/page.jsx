
import ProductDetails from "@/Components/Products/ProductDetails"

const Productpage = async({params}) => {
    const resolvedParams = await params;

    return(
        <>
        <ProductDetails id={resolvedParams.id}/>
        </>
    )
}
export default Productpage;