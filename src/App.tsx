import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import RootComponent from "./RootComponent";

function App() {
  return (
    <>
      <ShoppingCartProvider>
        <RootComponent />
      </ShoppingCartProvider>
    </>
  );
}

export default App;
