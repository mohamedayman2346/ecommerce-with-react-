import './home.css'
import Landing from '../../components/website/landing/Landing';
import LastSaleProducts from '../../components/website/product/saleProducts/LatestSaleProduct';
import { Container } from 'react-bootstrap';
import ShowLatestProducts from '../../components/website/product/latestProduct/ShowLatestProduct';
import ShowTopRated from '../../components/website/product/ShowTopRated';

export default function HomePage() {

  return (
    <div>
      <Landing />
      <LastSaleProducts />
      <Container>
        <div className = 'd-flex flex-wrap my-5 align-items-start'>
          <ShowTopRated />
          <ShowLatestProducts />
        </div>
      </Container>
    </div>
  );
}
