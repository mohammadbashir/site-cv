import TopBar from './components/TopBar';
import Cover from './components/Cover';
import Numbers from './components/Numbers';
import SelectedWork from './components/SelectedWork';
import Experience from './components/Experience';
import Stack from './components/Stack';
import Certifications from './components/Certifications';
import Education from './components/Education';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <main>
        <Cover />
        <Numbers />
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
