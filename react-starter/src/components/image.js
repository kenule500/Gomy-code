import product from './../product';
const Image = () => <img src={product.image} alt={product.name} className="img-fluid rounded shadow-sm" />;
export default Image;