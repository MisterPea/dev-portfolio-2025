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
        headline="the.times.pilot"
        subHeadline="Tailoring Your NY Times Digest"
        image={this.getImageLinks("times_pilot_page_hero.png", "project_page_hero", "Tablet and mobile view of the.times.pilot", "100vw", placeholder.projTimesPilotHero)}
        className="page_the-times-pilot"
      />
      <DescriptionRoleTools
        description={<>I created <span>the.times.pilot</span> as a way for users to curate what stories they&apos;re exposed to and what types of stories end up in their inbox. Utilizing the New York Times Top-Stories API, were able to address inherent limitations to customization and place some of the editorial power in to the users&apos; hands.</>}
        links={[
          { label: "GitHub Repo", url: "https://github.com/MisterPea/times-pilot" },
          { label: "Storybook.js Components", url: "https://65d287f2e2f0d9b863b88cfa-tvijbshvmk.chromatic.com/?path=/story/article-article-group--primary" },
          { label: "Website", url: "https://times-pilot.vercel.app/home" }
        ]}
        tools={["Figma", "TypeScript", "React", "Next.js", "Storybook", "SCSS", "Firebase NoSQL", "Node.js", "GCP Cloud Functions", "GCP Cloud Scheduler", "Twilio SendGrid"]}
        roles={["Conception", "Planning", "Design", "Development", "Deployment"]}
        className="page_the-times-pilot"
      />
      <section className="project-section-problem">
        <SectionDivider label="Problem" className="project_space-one" />
        <article className="project-section-problem-article full-width">
          <InfoTextbox
            headline="Handling A World Of Information"
            bodyText="For most users, there is a struggle with the time commitment required to sift through the multiple sections and placement hierarchies to find stories that match their interests. Additionally, there's an absence of customizability in the daily New York Times top-stories email."
          />
        </article>
      </section>
      <section className="project-section-approach">
        <SectionDivider label="Approach" className="project_space-one" />
        <article className="project-section-approach-article right-image">
          <InfoTextbox
            headline="Provide A Way For Users To Personalize Their Daily Email Digest"
            bodyText="With the subscribe/unsubscribe feature, users are able to curate their daily email content based on their interests. This is a step away from the traditional, most popular model. This significantly improves user engagement by promoting a more interactive approach to the news."
          />
          {this.embedVideo("the_times_pilot_selections.mp4", placeholder.projTimesPilotSelection, "times_pilot-video--selection")}
        </article>
        <article className="project-section-approach-article left-image">
          <InfoTextbox
            headline="Level Content Accessibility"
            bodyText="Moving from a print-derived hierarchy to one of content equality, users are impelled to explore articles without the influence of page prominence."
          />
          <figure className="the_times_pilot-access_equality">
            <icon.timesPilotAccessEquality />
          </figure>
        </article>
        <article className="project-section-approach-article right-image">
          <InfoTextbox
            headline="Provide Choice in What Sections Are Visible"
            bodyText="When users are afforded the options to tailor their news intake, we facilitate a deeper relationship between themselves and the content that interests them. With that, the user is able to omit content they may find triggering, which furthers their feeling of control and connection."
          />
          <figure className="page_times_pilot-approach-three-wrapper">
            {this.getImageLinks("times_pilot_section_selection.png", "page_word-salad-sifter-approach-three-img", "A closeup view of how the user can toggle each section into or out of view", "100vw", placeholder.projTimesPilotSectionToggle)}
          </figure>
        </article>
        <article className="project-section-approach-article left-image">
          <InfoTextbox
            headline="Easy Access Settings"
            bodyText="Everything the user needs to manage their account, from updating news topics, preferences, account info, or bookmarked stories, is available in one click."
          />
          {this.embedVideo("the_times_pilot_settings.mp4", placeholder.projTimesPilotSettings, "times_pilot-video--settings")}
        </article>
        <article className="project-section-approach-article hide_on_mobile three-width-full-img">
          <InfoTextbox
            headline="High-level site flow"
            bodyText="It's important that users are able to get a sense of what the site has to offer without going through the signup process. Too often users are forced through a signup funnel only to find out they're not interested in the product. To allow this, the site is set up in a tiered fashion, where an unauthenticated user can still look around, but they will be unable to save articles or subscribe to email topics, as those functions require an email address."
          />
          <figure>
            {this.getImageLinks("times_pilot_flowchart.png", "page_times_pilot-approach-flowchart", "High-level site flow for the.times.pilot", "100vw", placeholder.projTimesPilotFlowchart)}
          </figure>
        </article>
      </section>
      <section className="project-section-times_pilot-challenges">
        <SectionDivider label="Challenges/Considerations" className="project_space-one" />
        <article className="times_pilot-challenges-one--article">
          <InfoTextbox
            className="times_pilot-challenges-one"
            headline="Rate Limit? LRU To The Rescue"
            bodyText="With rate limits placed on API calls, an LRU cache was implemented. The cache stores API fetches for 12 minutes, thus allowing every section to be requested once (in a 12-minute period).  This allows multiple users to request the same content without running afoul of the API rate limit and with the benefit of delivering a low-latency experience."
          />
        </article>
        <article className="times_pilot-challenges-two--article">
          <InfoTextbox
            className="times_pilot-challenges-two"
            headline="Article Cards: Desktop vs. Mobile"
            bodyText="With limited real estate and gesture-based navigation, the mobile implementation for bookmarking  is able to use a side-to-reveal interaction. Without these concerns, the desktop version is able to have a simple bookmark toggle."
          />
          <div className="times_pilot-challenges-two-video_wrap">
            <div className="times_pilot-challenges-two-video--one">
              <figcaption>Mobile Implementation</figcaption>
              {this.embedVideo("the_times_pilot_mobile_add.mp4", placeholder.projTimesPilotAddMobile, "times_pilot-challenges-two-video_main")}
            </div>
            <div className="times_pilot-challenges-two-video--two">
              <figcaption>Desktop Implementation</figcaption>
              {this.embedVideo("the_times_pilot_tablet_add.mp4", placeholder.projTimesPilotAddDesktop, "times_pilot-challenges-two-video_main")}
            </div>
          </div>
        </article>
        <article className="times_pilot-challenges-three--article">
          <InfoTextbox
            className="times_pilot-challenges-three"
            headline="Optimizing Article Layout"
            bodyText="When organizing article summaries, there was a focus on  creating a consistent, unbiased article flow. This included addressing layout gaps caused by too few articles to fill the space. This was solved by calculating headline and description lengths, which allowed the prioritization of the five longest summaries to fill any excess space."
          />
          <figure className="times_pilot-challenges-three--figure">
            <icon.timesPilotArticleLayout />
          </figure>

        </article>
      </section>
    </div>
    <Footer />
  </>);
}


export const render = Index;