// components/ContactSection.tsx
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

const ContactSection = () => {
  return (
    <section className="bg-[#0c0c3e] p-6 rounded-3xl max-w-6xl h-210 lg:h-113 md:h-113 mx-auto flex flex-col md:flex-row gap-4 mb-5 lg:mb-10 shadow-lg shadow-blue-950">
      <ContactForm />
      <ContactInfo />
    </section>
  );
};

export default ContactSection;
