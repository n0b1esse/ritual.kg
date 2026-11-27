'use client';
import { useState } from 'react';
import Navbar from './Navbar';
import Services from './Services';
import Gallery from './Gallery';
import Testimonials from './Testimonials';
import ContactCTA from './ContactCTA';
import Footer from './Footer';
import FloatingInstagram from './FloatingInstagram';
import LeadModal from './LeadModal';
import { MotionProvider } from './motion';
import { Product } from '@/data/products';

type Kind = 'services' | 'works' | 'reviews' | 'contacts';

export default function StandalonePage({ kind }: { kind: Kind }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [service, setService] = useState<string | undefined>(undefined);

  function openGeneric() {
    setProduct(null);
    setService(undefined);
    setModalOpen(true);
  }

  function openService(s: string) {
    setProduct(null);
    setService(s);
    setModalOpen(true);
  }

  return (
    <MotionProvider>
      <Navbar onOrder={openGeneric} />
      <main className="pt-16 md:pt-20">
        {kind === 'services' && <Services onOrderService={openService} />}
        {kind === 'works' && <Gallery />}
        {kind === 'reviews' && <Testimonials />}
        {kind === 'contacts' && <ContactCTA onOrder={openGeneric} />}
      </main>
      <Footer />
      <FloatingInstagram />
      <LeadModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        presetProduct={product}
        presetService={service}
      />
    </MotionProvider>
  );
}
