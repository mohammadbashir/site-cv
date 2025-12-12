import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <main>
        <Hero />
        <Highlights />
        <Contact />
      </main>
    </div>
  );
}

export default App;
