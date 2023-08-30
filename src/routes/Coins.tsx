import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { fetcher } from "../api";
import { Helmet } from "react-helmet";
import { useSetRecoilState,useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
padding:0px 20px;
max-width: 480px;
margin: 0 auto;
`;
const Header = styled.header`
height: 10vh;
display: flex;
align-items: center;
justify-content: center;
position: relative;
button{
  position: absolute;
  right:0;
  background-color: #eee;
  border:1px solid black;
  border-radius: 4px;
  cursor: pointer;
}
`;
const CoinList = styled.ul``;
const Coin = styled.li`
background-color:${(props)=>props.theme.cardBgColor};
border: 1px solid white;
color:${(props)=>props.theme.textColor};
margin-bottom: 10px;
border-radius: 14px;
a{
  padding: 20px;
  transition:color 0.5s ease-in;
  display: flex;
  align-items: center;
}
&:hover{
  a{
    color:${(props)=>props.theme.accentColor};
  }
}
`;

const Title = styled.h1`
  font-size:48px;
  color:${(props)=>props.theme.accentColor}
`;
const Loader = styled.div`
text-align:center;
`;

const Img = styled.img`
width: 35px;
height: 35px;
margin-right: 10px;
`;

interface CoinInterface {
    id: string,
    name:string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

function Coins(){
  const {isLoading, data}=useQuery<CoinInterface[]>("allCoins", fetcher);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = ()=>setDarkAtom((prev)=>!prev);
  const isDark = useRecoilValue(isDarkAtom);
  
 /*  const [coins, setCoins]=useState<CoinInterface[]>([]);
  const [loading, setLoading]= useState(true);
  useEffect(()=>{
    (async()=>{
      const response = await (await fetch("https://api.coinpaprika.com/v1/coins")).json();

     setCoins(response.slice(0,100));
     setLoading(false);
    })();
  },[]); */
  
  return(
    <Container>
    <Helmet><title>Coin Lists</title></Helmet>
    <Header><Title>Coin Lists</Title> <button onClick={toggleDarkAtom}>{isDark? "Dark Mode":"Light Mode"}</button></Header>
    {isLoading ? (<Loader>Loading....</Loader>):  (<CoinList>
      {data?.slice(0,100).map((v)=>(
      <Coin key={v.id}><Link to={{
        pathname:`/${v.id}`,
        state:{name: v.name, symbol:v.symbol.toLowerCase()}
      }}>
      <Img src={`https://coinicons-api.vercel.app/api/icon/${v.symbol.toLowerCase()}`} />
      {v.name} &rarr;</Link></Coin>
      ))}
    </CoinList>)}
    </Container>
  )
}

export default Coins;