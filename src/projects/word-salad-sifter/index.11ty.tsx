import DescriptionRoleTools from "../../components/DescriptionRoleTools";
import Header from "../../components/Header";
import InfoTextbox from "../../components/InfoTextbox";
import { placeholder } from "../../components/placeholder";
import ProjectHeadline from "../../components/ProjectHeadline";
import SectionDivider from "../../components/SectionDivider";
import icon from '../../components/icons';
import Footer from "../../components/Footer";

export function Index() {
  return (<>
    <Header showHome={true} />
    <div className="main_wrapper">
      <ProjectHeadline
        headline="Word Salad Sifter"
        subHeadline="Uncovering The Important Parts In Job Postings"
        accentColor="#13952D"
        image={this.getImageLinks("word_salad_sifter_page_hero.png", "project_page_hero", "Screen view of Word Salad Sifter", "100vw", placeholder.projWordSaladHero)}
        className="page_word-salad-sifter"
      />
      <DescriptionRoleTools
        description={<>I designed, developed and launched <span>Word Salad Sifter</span> — a Chrome Extension that integrates Google Docs and Anthropic&apos;s API to gives users the ability to discover the important facets embed within job postings.</>}
        links={[{ label: "GitHub Repo", url: "#" }, { label: "Chrome Store", url: "#" }]}
        tools={["Figma", "React", "TypeScript", "Webpack", "Anthropic SDK", "Google Docs API", "Google Drive API", "Chrome Extension API"]}
        roles={["Conception", "Planning", "Design", "Development", "Approvals Process", "Deployment"]}
        className="page_word-salad-sifter"
      />
      <section className="project-section-problem">
        <SectionDivider label="Problem" className="project_space-one" />
        <article className="project-section-problem-article full-width">
          <InfoTextbox
            headline="Created By Humans, Influenced By Machines"
            bodyText="With the ascendancy of automation and technology into the talent acquisition world, job seekers need to create keyword-focused resumes and cover letters, while retaining the personal aspects that make them stand out from the crowd. In concept, this task is not difficult. However, it is time consuming and requires the job seeker to read through excessively verbose, boiler-plate language, while trying to pay attention to what words might be keywords, what skills are needed, what the tone of job posting is, etc. Complicating matters more is the fact that job seekers need to fill out an inordinate amount of applications to compensate for how easy it is to apply for a job."
          />
        </article>
      </section>
      <section className="project-section-approach">
        <SectionDivider label="Approach" className="project_space-one" />
        <article className="project-section-approach-article right-image">
          <InfoTextbox
            headline="Baked Into The Browser, Available With A Right-Click"
            bodyText="As a Chrome extension, Word Salad Sifter gains native access to webpage content that would otherwise be off-limits. This integration also eliminates the need for a standalone application while maintaining a minimal browser footprint. What’s more, it can function as simply as a right-click menu option."
          />
          <figure className="page_word-salad-sifter-approach-one-wrap">
            <div className="page_word-salad-sifter-approach-one-img limit-width">
              <icon.modalVector />
            </div>
          </figure>
        </article>
        <article className="project-section-approach-article left-image">
          <InfoTextbox
            headline="Provide Continuous Feedback"
            bodyText="Word Salad Sifter keeps users informed throughout the process. Because parsing time varies based on text length and network conditions, users receive status updates throughout the process."
          />
          {this.embedVideo("word_salad_sifter-in_progress.mp4", "word_salad-video")}
        </article>
        <article className="project-section-approach-article right-image">
          <InfoTextbox
            headline="Bring Your Own Voice"
            bodyText="While an LLM could generate keyword-optimized resumes and cover letters from job postings, such documents would lack the authentic voice that makes each candidate unique. Instead, Word Salad Sifter provides an easily scannable framework that equips users with the content to craft a personally tailored, yet targeted application."
          />
          <figure className="page_word-salad-sifter-approach-three-wrapper">
            {this.getImageLinks("word_salad_sifter-resume_sample.png", "page_word-salad-sifter-approach-three-img", "An example of the output that Word Salad Sifter appends to your Google Doc", "100vw", placeholder.projWordSaladResume)}
          </figure>
        </article>
        <article className="project-section-approach-article hide_on_mobile three-width-full-img">
          <InfoTextbox
            headline="High-Level App Flow"
            bodyText="There are essentially 3 systems working in conjunction in Word Salad Sifter:"
            orderedItems={[
              "Google O-Auth - This gives us access to the user's Google Docs, and browser integrations (tabs, script running, side panel, context menus)",
              "Google Docs API / Google Drive API - Copying/duplication requires Google Drive and populating requires Google Docs API",
              "Anthropic API"
            ]}
          />
          <figure>
            {this.getImageLinks("word_salad_sifter-flowchart.png", "page_word-salad-sifter-approach-flowchart", "High-level app flow for Word Salad Sifter", "100vw", placeholder.projWordSaladFlowchart)}
          </figure>
        </article>
      </section>
      <section className="project-section-word_salad-challenges">
        <SectionDivider label="Challenges/Considerations" className="project_space-one" />
        <article className="word_salad-challenges">
          <InfoTextbox
            className="word_salad-challenges-one"
            headline="Bringing Order To Chaos"
            bodyText="Job postings come in countless formats and structures, making standardization crucial. After evaluating various approaches like resume annotations and narrative summaries, we chose tabular data presentation. This format transforms varied job listings into a consistent, scannable matrix—ensuring that every parsed posting follows a predictable, standardized structure regardless of its original format."
          />
          <InfoTextbox
            className="word_salad-challenges-two"
            headline="Determining Essential Information"
            bodyText="The opacity of hiring processes presents a unique challenge: without application outcome feedback, it's impossible to empirically determine what information truly impacts success. To address this, we developed a comprehensive yet focused set of data points relevant across industries:"
            listItems={["Company name and job title", "Education requirements", "Required software knowledge", "Core job themes", "Key requirements", "Essential soft skills", "Prioritized critical skills", "Experience requirements", "Cultural indicators and tone", "Position's unique elements", "Critical keywords and phrases", "Special application instructions", "Source URL"]}
          />
          <InfoTextbox
            className="word_salad-challenges-three"
            headline="Platform Considerations: Message Passing And State Management"
            bodyText={<>Chrome extension architecture presents unique challenges in data flow and persistence. The extension operates in two distinct contexts: a view layer (for UI components like popups and side panels) and a background service worker. Since the service worker can't directly access the DOM, any interaction between these contexts requires orchestration through Chrome's internal messaging.<br /><br />This architectural split means temporary data gathered in the view layer—like user selections or analysis results—will be lost when panels are closed unless explicitly preserved. To maintain state, strategic implementation of Chrome's storage API was employed, ensuring crucial information persists across UI sessions."
            </>} />
        </article>
      </section>
    </div>
    <Footer />
  </>);
}


export const render = Index;