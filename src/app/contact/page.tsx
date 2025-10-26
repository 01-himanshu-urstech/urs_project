"use client";
import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, X, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        if (e.target.name === "phone") {
            let cleaned = e.target.value.replace(/\D/g, "");
            if (cleaned.length > 10) cleaned = cleaned.slice(0, 10);
            setFormData({ ...formData, phone: cleaned });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitMessage({
                    type: "success",
                    text: "Thank you! Your message has been sent successfully. We'll get back to you soon."
                });
                setShowModal(true);
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: ""
                });
            } else {
                throw new Error("Failed to send message");
            }
        } catch (error) {
            setSubmitMessage({
                type: "error",
                text: "Invalid credentials. Please try again."
            });
            setShowModal(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setSubmitMessage(null);
    };

    return (
        <section className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-800">
            {/* Success/Error Modal Popup */}
            <AnimatePresence>
                {showModal && submitMessage && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeModal}
                            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-3 sm:p-4"
                        >
                            {/* Modal */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.8, opacity: 0, y: 20 }}
                                transition={{ type: "spring", duration: 0.5 }}
                                onClick={(e) => e.stopPropagation()}
                                className={`bg-white rounded-2xl shadow-2xl max-w-sm w-full p-4 sm:p-6 md:p-8 ${
                                    submitMessage.type === "success"
                                        ? "border-t-4 border-green-500"
                                        : "border-t-4 border-red-500"
                                }`}
                            >
                                {/* Icon */}
                                <div className="flex justify-center mb-3 sm:mb-4">
                                    {submitMessage.type === "success" ? (
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center">
                                            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    ) : (
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center">
                                            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                {/* Title */}
                                <h3 className={`text-lg sm:text-xl md:text-2xl font-bold text-center mb-2 sm:mb-3 ${
                                    submitMessage.type === "success" ? "text-green-600" : "text-red-600"
                                }`}>
                                    {submitMessage.type === "success" ? "Success!" : "Error!"}
                                </h3>

                                {/* Message */}
                                <p className="text-sm sm:text-base text-gray-600 text-center mb-4 sm:mb-6 leading-relaxed">
                                    {submitMessage.text}
                                </p>

                                {/* Close Button */}
                                <button
                                    onClick={closeModal}
                                    className={`w-full py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base text-white transition-all duration-300 ${
                                        submitMessage.type === "success"
                                            ? "bg-green-500 hover:bg-green-600"
                                            : "bg-red-500 hover:bg-red-600"
                                    }`}
                                >
                                    Close
                                </button>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Hero Banner */}
            <div className="w-full min-h-[20vh] sm:min-h-[25vh] md:min-h-[30vh] lg:min-h-[40vh] relative flex items-center overflow-hidden">
                <Image
                    src="/About/contact-us.jpg"
                    alt="Contact Us"
                    fill
                    priority
                    className="object-cover"
                    quality={90}
                    sizes="100vw"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70 z-[1]" />

                <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10 w-full max-w-6xl mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10"
                >
                    <h1 className="text-white font-extrabold text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl drop-shadow-lg">
                        Get In Touch
                    </h1>
                    <p className="text-white/90 mt-1 sm:mt-2 text-xs xs:text-sm sm:text-base md:text-lg drop-shadow-md">
                        We'd love to hear from you. Send us a message!
                    </p>
                </motion.div>
            </div>

            {/* Contact Section */}
            <div className="max-w-6xl mx-auto px-3 xs:px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6 sm:space-y-8"
                    >
                        <div>
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                                Contact <span className="text-[#ff7722]">Information</span>
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                Have questions? We're here to help! Reach out to us through any of the following channels or fill out the form.
                            </p>
                        </div>

                        {/* Contact Cards */}
                        <div className="space-y-4 sm:space-y-6">
                            {/* Email */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            >
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#ff7722]/10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff7722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1">Email</h3>
                                    <a href="mailto:connect@infosurgeexpert.co.in" className="text-xs sm:text-sm text-gray-600 hover:text-[#ff7722] transition-colors break-words">
                                        connect@infosurgeexpert.co.in
                                    </a>
                                </div>
                            </motion.div>

                            {/* Phone */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            >
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#ff7722]/10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff7722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1">Phone</h3>
                                    <a href="tel:+919811255599" className="text-xs sm:text-sm text-gray-600 hover:text-[#ff7722] transition-colors">
                                        +91 98112 55599
                                    </a>
                                </div>
                            </motion.div>

                            {/* Address */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            >
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#ff7722]/10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff7722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1">Address</h3>
                                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                        Infosurge Expert LLP<br />
                                        15th Floor, E SQUARE, C2, Sector 96,<br />
                                        Noida, Uttar Pradesh 201304
                                    </p>
                                </div>
                            </motion.div>

                            {/* Social Media */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            >
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#ff7722]/10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff7722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-2">Follow Us</h3>
                                    <div className="flex gap-2 sm:gap-3">
                                        <a href="#" className="text-gray-600 hover:text-[#ff7722] transition-colors">
                                            <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </a>
                                        <a href="#" className="text-gray-600 hover:text-[#ff7722] transition-colors">
                                            <X className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </a>
                                        <a href="#" className="text-gray-600 hover:text-[#ff7722] transition-colors">
                                            <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </a>
                                        <a href="#" className="text-gray-600 hover:text-[#ff7722] transition-colors">
                                            <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-xl"
                    >
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                            Send Us a <span className="text-[#ff7722]">Message</span>
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7722] focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                                    placeholder="John Doe"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7722] focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                                    placeholder="john@example.com"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    pattern="^[6-9]\d{9}$"
                                    maxLength={10}
                                    required
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7722] focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                                    placeholder="+91 9876543210"
                                    inputMode="numeric"
                                    autoComplete="tel"
                                />
                            </div>

                            {/* Subject */}
                            <div>
                                <label htmlFor="subject" className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
                                    Subject *
                                </label>
                                <select
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7722] focus:border-transparent outline-none transition-all"
                                >
                                    <option value="">Select a subject</option>
                                    <option value="general">General Inquiry</option>
                                    <option value="trainer">Become a Trainer</option>
                                    <option value="course">Course Information</option>
                                    <option value="partnership">Partnership</option>
                                    <option value="support">Technical Support</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7722] focus:border-transparent outline-none transition-all resize-none placeholder:text-gray-400"
                                    placeholder="Tell us how we can help you..."
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#fc6f18] hover:bg-[#ff7722] text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 text-sm sm:text-base rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
                            >
                                {isSubmitting ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>

            {/* Map Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto px-3 xs:px-4 sm:px-6 md:px-8 pb-8 sm:pb-12 md:pb-16"
            >
                <div className="bg-white rounded-xl shadow-xl overflow-hidden h-[300px] sm:h-[350px] md:h-[400px]">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.946651800328!2d77.34424067469004!3d28.541323188218175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce78562399a11%3A0xa7d3ecda2c6869f!2sUrsTech%20Solution!5e0!3m2!1sen!2sin!4v1761034267542!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </motion.div>
        </section>
    );
}
