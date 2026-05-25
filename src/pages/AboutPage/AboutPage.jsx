import "./AboutPage.scss";

const AboutPage = () => {
    return (
        <main className="about-page">
            <h1 className="about-page__title">About</h1>
            <p className="about-page__text about-page__text--intro">
                Hi, I'm Ella, amateur full-stack developer and worst player in my DSR
                static — and I've got the data to back that up. I struggled hard during
                DSR prog, which prompted me to start writing down my mistakes and the
                causes of our wipes. I realized that since I was calling out myself more
                than anyone else, I could share my google doc as a resource for everyone
                to benefit from. ProgLog is an evolution of that idea.
            </p>
            <p>This project is...</p>

            <h2 className="about-page__subheading">⚹ Non-toxic</h2>
            <p className="about-page__text">
                Or, well, as non-toxic as a giant list of our fuckups can be. The goal
                is not to shame people, but to give us a concrete picture of areas we
                can improve on. We're going in with the expectation that, collectively,
                we'll make hundreds of mistakes before we get everything right.
            </p>

            <h2 className="about-page__subheading">⚹ Subjective and imperfect</h2>
            <p className="about-page__text">
                All data comes from my personal observations, so it's prone to human
                error. Plus, some things are up to interpretation — for instance, if
                two people kill each other with spread markers, is one person at fault,
                or are both equally responsible?
            </p>

            <h2 className="about-page__subheading">⚹ Collaborative</h2>
            <p className="about-page__text">
                We are a team of eight, and one person cannot be the single source of
                truth. If I get something wrong or if you disagree with my
                interpretations, you can edit it yourself.
            </p>

            <h2 className="about-page__subheading">⚹ Continually growing</h2>
            <p className="about-page__text">
                This will probably look a little bit different each time you check in.
                I've got an endless list of tweaks, UI improvements, and new features to
                be added. Please look forward to it.
            </p>
        </main>
    );
};

export default AboutPage;