import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | Sunrise TVNews",
    description: "Privacy Policy for Sunrise TVNews - Learn how we collect, use, and protect your information.",
};

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy for Sunrise TVNews</h1>

                <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">1. Overview</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            This Privacy Policy explains how Sunrise TVNews ("we," "us," "our") collects, uses, shares,
                            and protects information when you visit and use our website{" "}
                            <a href="https://sunrisetvnews.com" className="text-primary hover:underline">
                                sunrisetvnews.com
                            </a>{" "}
                            and the Sunrise TVNews mobile application. Your privacy is important to us and we are
                            committed to protecting the information you share with us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>

                        <h3 className="text-xl font-semibold mb-3 mt-6">2.1 Personal Information</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            We may collect personal information only when you voluntarily provide it. This includes
                            information such as your name, email address, phone number, or any other information you
                            submit through contact forms or feedback forms.
                        </p>

                        <h3 className="text-xl font-semibold mb-3 mt-6">2.2 Non-Personal Information</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            We automatically collect non-personal information about your use of the site or app. This
                            may include device type, browser type, IP address, operating system, pages visited, and time
                            spent on pages. This helps us improve performance and user experience. This practice is
                            common among news platforms.
                        </p>

                        <h3 className="text-xl font-semibold mb-3 mt-6">2.3 Cookies and Tracking Technologies</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            We may use cookies and similar technologies to collect information that helps us analyze
                            trends, track users' movements around the site, and improve our services. You can set your
                            browser to refuse cookies, but this may affect how some features work.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                            We use collected information for the following purposes:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>To operate and maintain our services.</li>
                            <li>To respond to your inquiries, feedback, or support requests.</li>
                            <li>To understand how users engage with our content and improve functionality.</li>
                            <li>To comply with legal obligations.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">4. Third Party Services</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We may use third party services such as analytics providers or advertising partners. These
                            services may collect data in accordance with their own privacy practices. We encourage you
                            to review their privacy policies independently.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">5. Advertising</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Advertising partners may collect information to provide relevant ads. We do not control how
                            third parties use this data, and it is governed by their respective privacy practices.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We implement reasonable technical and administrative safeguards to protect your information.
                            However, no method of transmission or electronic storage is fully secure, and absolute
                            protection cannot be guaranteed.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We retain your information only as long as needed to provide services and comply with legal
                            obligations.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We do not knowingly collect personal information from children under the age of 13. If you
                            believe that a child has provided us with personal information, please contact us so we can
                            remove it.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">9. Your Rights</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Depending on your location, you may have rights to access, update, or request deletion of
                            your personal information. You can contact us to exercise these rights.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">10. Changes to This Policy</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We may update this Privacy Policy from time to time. Any changes will be posted on this page
                            with an updated effective date. Continued use of the app or website after changes constitutes
                            acceptance of the updated policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                            If you have questions about this Privacy Policy, please contact us at:
                        </p>
                        <div className="bg-muted p-4 rounded-lg">
                            <p className="text-muted-foreground">
                                <strong>Email:</strong>{" "}
                                <a href="mailto:kalbhairabmedia908@gmail.com" className="text-primary hover:underline">
                                    kalbhairabmedia908@gmail.com
                                </a>
                            </p>
                            <p className="text-muted-foreground mt-2">
                                <strong>Website:</strong>{" "}
                                <a href="https://sunrisetvnews.com/" className="text-primary hover:underline">
                                    https://sunrisetvnews.com/
                                </a>
                            </p>
                        </div>
                    </section>

                    <section className="mt-12 pt-8 border-t">
                        <p className="text-sm text-muted-foreground italic">
                            Last Updated: February 2, 2026
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
