import Header from "./components/Header";
import Footer from "./components/Footer";
//imd  import destructing
import { Container } from "react-bootstrap";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Container className="py-5">
        <h1>This is a main</h1>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
