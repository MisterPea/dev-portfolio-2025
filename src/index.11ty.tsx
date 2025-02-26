import AboutImage from "./components/AboutImage.tsx";
import Footer from "./components/Footer.tsx";
import Header from "./components/Header.tsx";
import LandingProject from "./components/LandingProject.tsx";
import { placeholder } from "./components/placeholder.tsx";
import SectionDivider from "./components/SectionDivider.tsx";

export function Index() {
    return (<>
        <Header showHome={false} />
        <div className="main_wrapper">
            <h1 className="landing-headline">I&apos;m Perry, a Design-Minded Developer and Programmatic Pixel Pusher based in Brooklyn, NY.&nbsp;
                <span><button title="Send an email" aria-label="Send email" className="render-mail">Say Hello!</button></span>
            </h1>
            <section className="landing-projects_section">
                <SectionDivider label="Selected Works" className="landing-divider" />
                <LandingProject
                    images={this.getImageLinks("word_salad_sifter_hero.png", "project_hero", "partial screen view of the Word Salad Sifter extension.", "100vw", placeholder.projWordSalad)}
                    title="Word Salad Sifter: Uncovering the important parts of job postings."
                    description="A Chrome Extension that gives users the power to uncover the important facets of job postings."
                    imageAlignment="one"
                    link="/projects/word-salad-sifter"
                />
                <LandingProject
                    images={this.getImageLinks("times_pilot_hero_single.png", "project_hero", "Screen view of The Times Pilot Webpage.", "100vw", placeholder.projTimesPilot)}
                    title="the.times.pilot: Tailoring Your NY Times Digest"
                    description="Seamlessly curate and receive the stories that matter to you with a custom news aggregator and subscriber-focused daily email service."
                    imageAlignment="two"
                    link="/projects/the-times-pilot"
                />
                <LandingProject
                    images={this.getImageLinks("circuit_hero.png", "project_hero", "3-up of image of Circuit project", "100vw", placeholder.projCircuitHero)}
                    title="Circuit App: Time Management for Creatives"
                    description="An iOS app to empower creatives by bettering focus and eliminating burnout."
                    imageAlignment="three"
                    link="/projects/circuit-app"
                />
            </section>
            <section className="landing-about_section">
                <SectionDivider label="About" className="landing-divider" />
                <div className="landing-about_section-wrapper">
                    <div className="about_image_wrapper">
                        <AboutImage />
                    </div>
                    <p className="about_text">
                        I&apos;m a multi-disciplinary developer and designer with multiple-years of experience based in New York City. With a foundation in advertising design and a focus on front-end development, I specialize in creating uncomplicated, user-focused experiences.<br /><br />
                        Outside of work, I enjoy drawing, playing the piano, and being an inquisitive musicophile.<br /><br />
                        If you&apos;re curious about my aural explorations, I&apos;m currently listening to: <span className="about-spotify_inline">Die Explosion im Festspielhaus</span> by <span className="about-spotify_inline">Einstürzende Neubauten</span> on Spotify.
                    </p>
                    <section className="colophon">
                        <p className="about-colophon-header">Colophon:</p>
                        <p className="about-colophon-text">Site hand-coded using .tsx as a templating language, CSS/SCSS for styling, vanilla TypeScript for interactions, and <a href="https://www.11ty.dev" rel="noreferrer" target="_blank">11ty</a> to pull it all together. Typography is set in the <a href="https://fonts.google.com/specimen/Rubik" rel="noreferrer" target="_blank">Rubik</a> typeface.</p>
                    </section>
                </div>
            </section>
        </div>
        <Footer />
    </>
    );
}

export const render = Index;