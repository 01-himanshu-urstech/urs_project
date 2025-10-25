import React from "react";

const page = () => {
	return (
		<div className="bg-white text-[#070344] min-h-screen">
			<div
				className="h-[300px] bg-cover opacity-80 bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/Media/2.webp')" }}>
			
				<h1 className="text-4xl md:text-5xl font-bold text-[#070344] ">
					Terms and Conditions
				</h1>
			</div>
			<div className="max-w-5xl mx-auto py-16 px-4 space-y-10">
				<p className="text-[#070344]  text-lg">
					These Terms and Conditions (“Terms”) govern your use of the website
					<a
						href="https://www.rahanemedia.com"
						className="text-blue-600 underline"
					>
						www.rahanemedia.com
					</a>{" "}
					(“Website”) operated by <strong>Rahane Media Private Limited</strong>{" "}
					(“Rahane media”, “we”, “our”, “us”). By accessing or using the
					Website, you agree to comply with these Terms.
				</p>
				<section>
					<h2 className="text-2xl font-semibold mb-3">
						1. Acceptance of Terms
					</h2>
					<p className="text-[#070344] ">
						By using this Website, you confirm that you have read, understood,
						and agree to be bound by these Terms and our Privacy Policy. If you
						do not agree with these Terms, please do not use the Website.
					</p>
				</section>
				<section>
					<h2 className="text-2xl font-semibold mb-3">2. Use of Website</h2>
					<ul className="list-disc list-inside text-[#070344]  space-y-1">
						<li>You must use this Website for lawful purposes only.</li>
						<li>
							You agree not to misuse, damage, or interfere with the Website's
							operation.
						</li>
						<li>
							Rahane Media reserves the right to modify, suspend, or discontinue
							any part of the Website without notice.
						</li>
					</ul>
				</section>
				<section>
					<h2 className="text-2xl font-semibold mb-3">
						3. Intellectual Property
					</h2>
					<p className="text-[#070344] ">
						All content on this Website, including text, images, logos,
						graphics, and software, is the property of Rahane Media or its
						licensors and is protected by applicable intellectual property laws.
						You may not copy, reproduce, or distribute any content without our
						written consent.
					</p>
				</section>
				<section>
					<h2 className="text-2xl font-semibold mb-3">4. Property Listings</h2>
					<p className="text-[#070344] ">
						Property listings and related information on this Website are for
						informational purposes only and do not constitute an offer. Rahane
						media does not guarantee the accuracy or completeness of listings
						and reserves the right to modify or remove listings at any time.
					</p>
				</section>
				<section>
					<h2 className="text-2xl font-semibold mb-3">
						5. Limitation of Liability
					</h2>
					<p className="text-[#070344] ">
						Rahane Media is not liable for any direct, indirect, incidental, or
						consequential damages resulting from your use or inability to use
						the Website, including but not limited to data loss or system
						failure.
					</p>
				</section>
				<section>
					<h2 className="text-2xl font-semibold mb-3">6. Third-Party Links</h2>
					<p className="text-[#070344] ">
						Our Website may contain links to third-party websites for your
						convenience. We do not control or endorse the content of these
						websites and are not responsible for their practices or policies.
					</p>
				</section>
				<section>
					<h2 className="text-2xl font-semibold mb-3">7. Privacy</h2>
					<p className="text-[#070344] ">
						Your use of the Website is also governed by our Privacy Policy,
						which outlines how we collect, use, and protect your personal data.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-3">8. Changes to Terms</h2>
					<p className="text-[#070344] ">
						We may update these Terms from time to time. Continued use of the
						Website after changes are posted constitutes your acceptance of the
						revised Terms.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-3">9. Governing Law</h2>
					<p className="text-[#070344] ">
						These Terms are governed by and construed in accordance with the
						laws of India. Any disputes arising shall be subject to the
						jurisdiction of the courts in Pune, Maharashtra.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-3">10. Contact Us</h2>
					<p className="text-[#070344] ">
						For any questions or concerns regarding these Terms, please contact
						us:
					</p>
					<p className="text-[#070344]  mt-2">
						<strong>Email:</strong> info@rahanemedia.com
						<br />
						<strong>Phone:</strong> +91 9990800500
					</p>
				</section>
			</div>
		</div>
	);
};

export default page;
