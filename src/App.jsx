import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectHighlights from './components/ProjectHighlights';
import PaymentSimulator from './components/PaymentSimulator';
import GalleryLocation from './components/GalleryLocation';
import LeadContactSection from './components/LeadContactSection';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';

export default function App() {
  const [simulationContext, setSimulationContext] = useState(null);
  const [legalTab, setLegalTab] = useState(null); // null | 'policy' | 'notice'

  return (
    <div className="min-h-screen bg-sand-50 text-palm-900">
      <Navbar />
      <main>
        <Hero />
        <ProjectHighlights />
        <PaymentSimulator onSelectSimulation={setSimulationContext} />
        <GalleryLocation />
        <LeadContactSection
          simulationContext={simulationContext}
          onOpenLegal={(tab) => setLegalTab(tab)}
        />
      </main>
      <Footer onOpenLegal={(tab) => setLegalTab(tab)} />
      <LegalModal
        activeTab={legalTab}
        onClose={() => setLegalTab(null)}
        onSwitchTab={(tab) => setLegalTab(tab)}
      />
    </div>
  );
}
