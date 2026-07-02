import TopBar from './components/TopBar';
import Masthead from './components/Masthead';
import SystemMap from './components/SystemMap';
import MurexAct from './components/MurexAct';
import IndependentAct from './components/IndependentAct';
import LeadershipBand from './components/LeadershipBand';
import Ledger from './components/Ledger';
import Contact from './components/Contact';
import AskDock from './components/AskDock';

function App() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <main>
        <Masthead />
        <SystemMap />
        <MurexAct />
        <IndependentAct />
        <LeadershipBand />
        <Ledger />
        <Contact />
      </main>
      <AskDock />
    </div>
  );
}

export default App;
