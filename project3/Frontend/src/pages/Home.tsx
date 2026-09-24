import picture from '../assets/picture.png';
import './Home.css';

export default function Home() {
	return (
        <main className="home-page">
            <section className="home-page__content">
                <h1>Meetings made simple</h1>
                <p>Transform the way your team connects with this platform, the intelligent meeting and scheduling platform built by our team. Designed to eliminate the hassle of back-and-forth coordination, our solution simplifies how you book, manage, and execute digital syncs. With seamless calendar integrations, automated workflows, and a user-first interface, the platform ensures every conversation is effortless, organized, and focused on what truly matters—collaboration.</p>
            </section>
            <img
                className="home-page__image"
                src={picture}
                alt="Team collaborating around a table"
            />
        </main>
    );
}
