import Header from "./components/Header";
import Footer from "./components/Footer";
//imd  import destructing
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Container className="py-5">
       <HomeScreen/>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
