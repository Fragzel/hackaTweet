import TrendsList from '../components/TrendsList';
import Login from './login'
import { useSelector } from 'react-redux';

function TrendsPage() {
  const isConnected = useSelector((state) => state.user.isConnected)
  console.log(isConnected);
  return isConnected ? <TrendsList /> : <Login />;
}

export default TrendsPage;
