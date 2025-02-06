import AboutImage from "./components/AboutImage.tsx";
import Footer from "./components/Footer.tsx";
import Header from "./components/Header.tsx";
import LandingProject from "./components/LandingProject.tsx";
import { placeholder } from "./components/placeholder.tsx";
import SectionDivider from "./components/SectionDivider.tsx";

export function Index() {

    return (<>
        <Header showHome={true} />
        <div className="main_wrapper">
            <h1 className="landing-headline">I&apos;m Perry, a Design-Minded Developer and Programmatic Pixel Pusher based in Brooklyn, NY.&nbsp;
                <span><button>Say Hello!</button></span>
            </h1>
            <SectionDivider label="Selected Works" />
            <section className="landing-projects_section">

                <LandingProject
                    images={this.getImageLinks("word_salad_sifter_proj.png", "project_hero", "partial screen view of the Word Salad Sifter extension.", "100vw", placeholder.projWordSalad)}
                    title="Word Salad Sifter: Uncovering the important parts of job postings."
                    description="A Chrome Extension that gives users the power to uncover the important facets of job postings."
                    imageAlignment="left"
                    link="#"

                />
                <LandingProject
                    images={this.getImageLinks("times_pilot_proj.WEBP", "project_hero", "Screen view of The Times Pilot Webpage.", "100vw", placeholder.projTimesPilot)}
                    title="the.times.pilot: Tailoring Your NY Times Digest"
                    description="Seamlessly curate and receive the stories that matter to you with a custom news aggregator and subscriber-focused daily email service."
                    imageAlignment="right"
                    link="#"
                />
                <LandingProject
                    images={this.getImageLinks("circuit_proj.png", "project_hero", "3-up of image of Circuit project", "100vw", placeholder.projCircuit)}
                    title="Circuit App: Time Management for Creatives"
                    description="An iOS app to empower creatives by bettering focus and eliminating burnout."
                    imageAlignment="left"
                    link="#"
                />
            </section>
            <SectionDivider label="About" />
            <section className="landing-about_section">
                <div className="landing-about_section-wrapper">
                    <div className="about_image_wrapper">
                        <AboutImage />
                    </div>
                    <p className="about_text">
                        I&apos;m a multi-disciplinary developer and designer with multiple-years of experience based in New York City. With a foundation in advertising design and a focus on front-end development, I specialize in creating uncomplicated, user-focused experiences.<br /><br />
                        Outside of work, I enjoy drawing, playing the piano, and being an inquisitive musicophile.<br /><br />
                        If you&apos;re curious about my aural explorations, I&apos;m currently listening to: <span className="about-spotify_inline">Die Explosion im Festspielhaus</span> by <span className="about-spotify_inline">Einstürzende Neubauten</span> on Spotify.
                    </p>
                </div>
            </section>
        </div>
        <Footer />
    </>
    );
}

export const render = Index;