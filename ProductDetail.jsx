import { useContext } from "react";
import { useParams } from "react-router-dom";
import ProductContext from "../contextApi/ProductContext";

function ProductDetail() {

    // const { id } = useParams();

    const { productData } = useContext(ProductContext)

    console.log(productData);


    // const { productData } = useContext(ProductContext);

    // const product = productData.find(
    //     (item) => item.id === Number(id)
    // );

    // if (!product) {
    //     return <h1>Product Not Found</h1>;
    // }

    return (
        <div>

            {
                productData.map((v) => {

                    console.log(v);

                    return (
                        <div key={v.id}>
                            <img
                                src={v.image}
                                alt={v.name}
                                width="400"
                            />

                            <h1>{v.name}</h1>

                            <h2>{v.price}</h2>

                            <p>{v.description}</p>

                        </div>

                    )
                })
            }


        </div>
    )
}

export default ProductDetail;
