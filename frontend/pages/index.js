import Home from '../components/Home';
import Login from './login'
import { useSelector } from 'react-redux';

function Index() {
  const isConnected = useSelector((state) => state.user.isConnected)
  console.log(isConnected);
  return isConnected ? <Home /> : <Login />;
}

export default Index;
