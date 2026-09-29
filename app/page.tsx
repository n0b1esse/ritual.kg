'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Catalog from '@/components/Catalog';
import Services from '@/components/Services';
import Gallery from '@/components/Gallery';
import Advantages from '@/components/Advantages';
import Testimonials from '@/components/Testimonials';
import ContactCTA from '@/components/ContactCTA';
import Footer from '@/components/Footer';
import FloatingInstagram from '@/components/FloatingInstagram';
import LeadModal from '@/components/LeadModal';
import { MotionProvider } from '@/components/motion';
import { Product } from '@/data/products';

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [service, setService] = useState<string | undefined>(undefined);

  function openGeneric() {
    setProduct(null);
    setService(undefined);
    setModalOpen(true);
  }

  function openProduct(p: Product) {
    setProduct(p);
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
      <main>
        <Hero onConsult={openGeneric} />
        <Catalog onOrder={openProduct} />
        <Services onOrderService={openService} />
        <Gallery />
        <Advantages />
        <Testimonials />
        <ContactCTA onOrder={openGeneric} />
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
