import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {userRequest} from '../requestMethods';
import {useSelector} from 'react-redux'
import { mobile } from "../responsive";
import StripeCheckOut from 'react-stripe-checkout';
import { useState } from "react";
import { useEffect } from "react";
// import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';


const KEY = process.env.REACT_APP_STRIPE

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  margin-bottom: 10px;
  border-bottom: 1px solid gray;
  
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  margin-bottom:5px
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;



const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  margin-left: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  
  const cart = useSelector(state => state.cart);


   // payment system

  console.log(cart.products)
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory()

  const onToken = (token) => {
    setStripeToken(token)
  }
 
    useEffect(() => {
            const makeRequest = async () => {
              try{
                 const res = await userRequest.post('/checkout/payment', {
                  tokenId: stripeToken,
                  amount: cart.total *100,
                 
                 })
                 history.push('/success', {data: res.data})
              }catch(err){}
            }
            makeRequest()
    },[stripeToken, cart.total, history])



    // payment system end
  return (
    <Container>
      <Announcement />
      <Navbar />
      
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          
             {/* <Link to='/products'> */}
                <TopButton>CONTINUE SHOPPING</TopButton>
             {/* </Link> */}
         
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
           {
            //  cart.products.map 
              cart?.products?.map((product) =>(
                
                <Product key={product?.product._id}>
                <ProductDetail>
                  <Image src={product?.product.img}/>
                  <Details>
                    <ProductName>
                      <b>Product:</b>{product?.product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product?.product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                          
                        
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove />
                  </ProductAmountContainer>
                  <ProductPrice>Tk. {product.price * product.quantity}</ProductPrice>
                  <hr />
                </PriceDetail>
                  
              </Product>
              
               
              ))}
              
           
           
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal :</SummaryItemText>
              <SummaryItemPrice>Tk. {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Delivery Cost :</SummaryItemText>
              <SummaryItemPrice>Tk. 5.90</SummaryItemPrice>
            </SummaryItem>
            {/* <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>Tk. -5.90</SummaryItemPrice>
            </SummaryItem> */}
            <SummaryItem type="total">
              <SummaryItemText>Total :</SummaryItemText>
              <SummaryItemPrice>Tk. {cart.total + 5.90} </SummaryItemPrice>
            </SummaryItem>


            {/* payment system start */}

            
            <StripeCheckOut 
              name= "N&N SHOP"
              image="https://i.postimg.cc/2yPsL1c3/flame-1964066.png"
              billingAddress
              shippingAddress
              description={`Your total is Tk. ${cart.total + 5.90}`}
              amount= {(cart.total + 5.90)}
              token={onToken}
              stripeKey={KEY}
            >
                 <Button>CHECKOUT NOW</Button>
            </StripeCheckOut>



            {/* payment system end  */}
            
            {/* <Link to='/success'>
                <Button>CHECKOUT NOW</Button>
            </Link> */}





          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
