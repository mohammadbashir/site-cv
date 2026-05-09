import Hero from './components/Hero';
import SelectedWork from './components/SelectedWork';
import Experience from './components/Experience';
import Stack from './components/Stack';
import Certifications from './components/Certifications';
import Education from './components/Education';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <SelectedWork />
        <Experience />
        <Stack />
        <Certifications />
        <Education />
        <Contact />
      </main>
    </div>
  );
}

export default App;
