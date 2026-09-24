import './Pages.css';

export default function About() {
	return (
        <main className="about-page">
            <span className="form-page__eyebrow">About the platform</span>
            <h1>Better meetings, less friction.</h1>
            <div className="about-page__grid">
                <p>We create tools that simplify collaboration and help teams stay organized, focused, and connected.</p>
                <p>Our platform makes it easier to schedule, manage, and update meetings in one clear workspace.</p>
            </div>
            <div className="about-page__contact">
                <strong>Produced by Elad Cohen</strong>
                <span>eladcohen80@gmail.com</span>
                <span>0544703022</span>
            </div>

        </main>
    );
}
