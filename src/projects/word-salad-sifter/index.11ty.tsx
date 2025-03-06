import DescriptionRoleTools from "../../components/DescriptionRoleTools";
import Header from "../../components/Header";
import InfoTextbox from "../../components/InfoTextbox";
import { placeholder } from "../../components/placeholder";
import ProjectHeadline from "../../components/ProjectHeadline";
import SectionDivider from "../../components/SectionDivider";
import icon from '../../components/icons';
import Footer from "../../components/Footer";
import flowchart from "../../components/flowchart";

export function Index() {
  return (<>
    <Header />
    <div className="main_wrapper-word_salad_sifter" data-barba="container" data-barba-namespace="project">
      <ProjectHeadline
        headline="Word Salad Sifter"
        subHeadline="Uncovering The Important Parts In Job Postings"
        image={this.getImageLinks("word_salad_sifter_page_hero.png", "project_page_hero", "Screen view of Word Salad Sifter", "100vw", placeholder.projWordSaladHero)}
        className="page_word-salad-sifter"
      />
      <DescriptionRoleTools
        description={<>I designed, developed, and launched <span>Word Salad Sifter</span> — a Chrome Extension that integrates Google Docs and Anthropic&apos;s API to give users the ability to discover the important facets embedded within job postings.</>}
        links={[{ label: "GitHub Repo", url: "https://github.com/MisterPea/word-salad-sifter" }, { label: "Chrome Store", url: "https://chromewebstore.google.com/detail/unartful-labs-word-salad/fhfndnjlnahfnnnocegccejjfpigiioo" }]}
        tools={["Figma", "React", "TypeScript", "Webpack", "Anthropic SDK", "Google Docs API", "Google Drive API", "Chrome Extension API"]}
        roles={["Conception", "Planning", "Design", "Development", "Approvals Process", "Deployment"]}
        className="page_word-salad-sifter"
      />
      <section className="project-section-problem">
        <SectionDivider label="Problem" className="project_space-one" />
        <article className="project-section-problem-article full-width">
          <InfoTextbox
            headline="Created by Humans, Influenced by Machines"
            bodyText="With the infusion of automation into the talent acquisition world, job seekers need to be more fastidious about creating keyword-focused resumes/cover letters in order to stand out. This is in addition to their task of illuminating personal aspects—the kind that shine through in one&apos;s  writing and help the applicant stand out from the crowd. In concept, this task is not difficult. It is, however, time-consuming. It requires the job seeker to most likely read through verbose, boilerplatey language, while trying to pay attention to what words might be keywords, what skills are needed, what the tone of the job posting is…etc. Complicating matters is the fact that job seekers need to fill out an inordinate amount of applications to compensate for how many people apply to each job."
          />
        </article>
      </section>
      <section className="project-section-approach">
        <SectionDivider label="Approach" className="project_space-one" />
        <article className="project-section-approach-article right-image">
          <InfoTextbox
            headline="Baked into the Browser, Available with a Right-Click"
            bodyText="As a Chrome extension, Word Salad Sifter gains native access to webpage content that is  otherwise off-limits. This integration eliminates the need for a standalone application while maintaining a minimal browser footprint. What&apos;s more, this lower-level integration allows users to operate the app through a simple, right-click menu option."
          />
          <figure className="page_word-salad-sifter-approach-one-wrap">
            <div className="page_word-salad-sifter-approach-one-img limit-width">
              <icon.modalVector />
            </div>
          </figure>
        </article>
        <article className="project-section-approach-article left-image">
          <InfoTextbox
            headline="Continuous Feedback. Start to Finish"
            bodyText="Word Salad Sifter keeps users informed throughout the processing task. Because processing time varies by text length and other factors, we calculate a completion time per job and provide feedback about the task&apos;s current state."
          />
          {this.embedVideo("word_salad_sifter-in_progress.mp4", placeholder.projWordSaladVideo, "word_salad-video")}
        </article>
        <article className="project-section-approach-article right-image">
          <InfoTextbox
            headline="Bring Your Own Voice"
            bodyText="While an LLM could generate keyword-optimized resumes and cover letters from job postings, such documents lack the authentic voice that makes each candidate unique. Instead, Word Salad Sifter provides an easily scannable framework that equips users with the content to craft a personally tailored, yet targeted application."
          />
          <figure className="page_word-salad-sifter-approach-three-wrapper">
            {this.getImageLinks("word_salad_sifter-resume_sample.png", "page_word-salad-sifter-approach-three-img", "An example of the output that Word Salad Sifter appends to your Google Doc", "100vw", placeholder.projWordSaladResume)}
          </figure>
        </article>
        <article className="project-section-approach-article hide_on_mobile three-width-full-img">
          <InfoTextbox
            headline="High-Level App Flow"
            bodyText="The three systems that comprise Word Salad Sifter:"
            orderedItems={[
              <><u>Google O-Auth</u> - This gives us access to the user's Google Docs, and browser integrations (tabs, script running, side panel, context menus)</>,
              <><u>Google Docs API / Google Drive API</u> - Copying/duplication requires Google Drive and populating requires Google Docs API</>,
              <><u>Anthropic API</u> - Processing and interpretation of the job description</>
            ]}
          />
          <figure className="page_word-salad-sifter-approach-flowchart">
            <flowchart.wordSaladSifter />
          </figure>
        </article>
      </section>
      <section className="project-section-word_salad-challenges">
        <SectionDivider label="Challenges/Considerations" className="project_space-one" />
        <article className="word_salad-challenges">
          <InfoTextbox
            className="word_salad-challenges-one"
            headline="Bringing Order to Chaos"
            bodyText="Job postings come in many formats and structures. This makes normalization and standardization crucial to create a predictable, usable product. After evaluating various approaches like resume annotations and narrative summaries, we chose tabular data presentation. This format transforms varied job listings into a consistent, scannable matrix—ensuring that every parsed posting follows a predictable, standardized structure regardless of its original format."
          />
          <InfoTextbox
            className="word_salad-challenges-two"
            headline="Determining Essential Information"
            bodyText="The opacity of hiring processes presents a unique challenge: without application outcome feedback, it's impossible to empirically determine what information truly impacts success. To address this, we developed a comprehensive yet focused set of data points relevant across industries:"
            listItems={["Company name and job title", "Education requirements", "Required software knowledge", "Core job themes", "Key requirements", "Essential soft skills", "Prioritized critical skills", "Experience requirements", "Cultural indicators and tone", "Position's unique elements", "Critical keywords and phrases", "Special application instructions", "Source URL"]}
          />
          <InfoTextbox
            className="word_salad-challenges-three"
            headline="Platform Considerations: Message Passing and State Management"
            bodyText={<>Chrome extension architecture presents unique challenges in data flow and persistence. The extension operates in two distinct contexts: a view layer (for UI components like popups and side panels) and a background service worker. Since the service worker can't directly access the DOM, any interaction between these contexts requires orchestration through Chrome's internal messaging.<br /><br />This architectural split means temporary data gathered in the view layer—like user selections or analysis results—will be lost when panels are closed unless explicitly preserved. To maintain state, strategic implementation of Chrome's storage API was employed, ensuring crucial information persists across UI sessions."
            </>} />
        </article>
      </section>
    </div>
    <Footer />
  </>);
}


export const render = Index;