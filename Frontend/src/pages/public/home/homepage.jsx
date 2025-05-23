import { Link } from 'react-router-dom';
import styles from './homepage.module.css';
import { Calendar, Users, BarChart3, CheckCircle, Clock, Shield } from 'lucide-react';

export default function AbsenceTrackerHome() {
    const features = [


        {
            icon: <BarChart3 className={styles.featureIcon} />,
            title: "Detailed Reports",
            description: "Generate comprehensive reports to analyze absence patterns and trends."
        },

        {
            icon: <Clock className={styles.featureIcon} />,
            title: "Real-time Updates",
            description: "Get instant   updates on absence requests and approvals."
        },
        {
            icon: <Shield className={styles.featureIcon} />,
            title: "Secure & Reliable",
            description: "Your data is protected with enterprise-grade security and reliability."
        }
    ];

    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <h1 className={styles.heroTitle}>Simplify Absence Management</h1>
                <p className={styles.heroText}>
                    Easily manage student leave requests, approvals, and absence history with our simple and efficient tracking system
                </p>
                <div className={styles.heroButtons}>
                    <button className={styles.buttonPrimary}><Link to="/login">Get Started</Link></button>
                    <button className={styles.buttonSecondary}>Watch Demo</button>
                </div>
            </section>

            <section className={styles.features}>
                <div className={styles.featuresHeading}>
                    <h2 className={styles.featuresTitle}>Everything You Need</h2>
                    <p className={styles.featuresText}>
                        Powerful features designed to make absence students management effortless for groups of all sizes
                    </p>
                </div>
                <div className={styles.featuresGrid}>
                    {features.map((feature, index) => (
                        <div key={index} className={styles.featureCard}>
                            {feature.icon}
                            <h3 className={styles.featureTitle}>{feature.title}</h3>
                            <p className={styles.featureDescription}>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className={styles.stats}>
                <div className={styles.statsGrid}>
                    <div>
                        <div className={styles.statValue}>10,000+</div>
                        <p className={styles.statLabel}>Active Users</p>
                    </div>
                    <div>
                        <div className={styles.statValue}>99.9%</div>
                        <p className={styles.statLabel}>Uptime</p>
                    </div>
                    <div>
                        <div className={styles.statValue}>50%</div>
                        <p className={styles.statLabel}>Time Saved</p>
                    </div>
                </div>
            </section>

            <section className={styles.cta}>
                <h2 className={styles.ctaTitle}>Ready to Get Started?</h2>
                <p className={styles.ctaText}>
                    Join thousands of institution who trust our absence tracking solution to keep their workforce organized and efficient
                </p>
                <div className={styles.ctaButtons}>
                    <button className={styles.buttonPrimary}>Start Your Free Trial</button>
                    <button className={styles.ctaLink}>Contact Sales</button>
                </div>
            </section>
        </div>
    );
}
