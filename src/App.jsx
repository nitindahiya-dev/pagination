import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0)

  const fetchApi = async () => {
    try {
      const data = await fetch(`https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`);
      const res = await data.json();

      console.log(res.products);
      console.log(data);
      if (res && res.products) {
        setProduct(res.products);
        setTotalPages(res.total/10)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [page]);

  const selectPage = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= totalPages && selectedPage !== page) {
      setPage(selectedPage);
    }
  };

  return (
    <div className='container'>
      {product.length > 0 && (
        <div className="products">
          {product.map((prod) => {
            return (
              <div className="product__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <p>{prod.title}</p>
              </div>
            );
          })}
        </div>
      )}
      {product.length > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination__disable"}
            onClick={() => selectPage(page - 1)}>⬅️</span>
          {[...Array(Math.ceil(totalPages))].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? 'pageination__selected' : ''}
                onClick={() => selectPage(i + 1)}
                key={i}>{i + 1}</span>
            );
          })}
          <span
            className={page < totalPages ? "" : "pagination__disable"}
            onClick={() => selectPage(page + 1)}>➡️</span>
        </div>
      )}
    </div>
  );
}

export default App;
