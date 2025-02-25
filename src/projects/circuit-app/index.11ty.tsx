import DescriptionRoleTools from "../../components/DescriptionRoleTools";
import Header from "../../components/Header";
import InfoTextbox from "../../components/InfoTextbox";
import { placeholder } from "../../components/placeholder";
import ProjectHeadline from "../../components/ProjectHeadline";
import SectionDivider from "../../components/SectionDivider";
import icon from '../../components/icons';
import Footer from "../../components/Footer";
import flowchart from "../../components/Flowchart";

export function Index() {
  return (<>
    <Header showHome={true} />
    <div className="main_wrapper">
      <ProjectHeadline
        headline="Circuit App"
        subHeadline="Time Management for Creatives"
        image={this.getImageLinks("circuit_hero.png", "project_page_hero", "3 screens prospective screens for Circuit App", "100vw", placeholder.projCircuitHero)}
        className="page_circuit-app"
      />
      <DescriptionRoleTools
        description="Circuit App is designed to address the core tension in creative work: maintaining deep focus, while preventing burnout. By smartly structuring periods of work and breaks, creative professionals can sustain their productivity and well-being."
        links={[
          { label: "Figma Prototype", url: "https://www.figma.com/proto/qbEmJWDw0g55I12bji05AB/Circuit-revisit?type=design&node-id=104-257&t=d5oqzpqqskE6aos1-1&scaling=min-zoom&page-id=86%3A194&starting-point-node-id=90%3A206&show-proto-sidebar=1" },
          { label: "Figma Layout", url: "https://www.figma.com/file/qbEmJWDw0g55I12bji05AB/Circuit-revisit?type=design&node-id=86%3A194&mode=design&t=vRf3qiONLpSwo8ba-1" },
        ]}
        tools={["Figma", "Photoshop", "AfterEffects"]}
        roles={["Conception", "Design"]}
        className="page_circuit-app"
      />
      <section className="project-section-problem">
        <SectionDivider label="The Challenge" className="project_space-one" />
        <article className="project-section-problem-article full-width">
          <InfoTextbox
            headline="Flow And Distraction"
            bodyText="Creative professionals continually face the paradox of maintaining creative flow and focus, while contending with the distractions of hyper-connectivity. This fact is compounded by a tendency to overwork to the point of mental and physical exhaustion."
          />
        </article>
      </section>
      <section className="project-section-empathy hide_on_mobile">
        <SectionDivider label="Understanding The User—Empathy Map" className="project_space-one" />
        <div className="circuit_empathy_map-main">
          {this.getImageLinks("circuit_empathy_map.png", "circuit_empathy_map-main", "Empathy map for Circuit App", "100vw", placeholder.projCircuitEmpathyMap)}
          <div className="empathy_map_overlay-line-one"></div>
          <div className="empathy_map_overlay-line-two"></div>
          <div className="empathy_map_overlay-line-three"></div>
          <p className="empathy_map_overlay-text_one">Pressures to align their creative output to match a real or perceived eddy within the creative market.</p>
          <p className="empathy_map_overlay-text_two">They&apos;re always working against the clock; trying to produce the best product for the time.</p>
          <p className="empathy_map_overlay-text_three">Looking for ways to be quicker and more efficient in the way they work.</p>
          <div className="circuit_empathy_map-takeaways">
            <h4>Insights:</h4>
            <div className="circuit_empathy_map-takeaways-body">
              <div className="circuit_empathy_map-takeaways-left">
                <p>One way to create better work is to allocate more time to it. This reveals how success is tightly interwoven with time and how the user is incentivized to not waste it.</p>
              </div>
              <div className="circuit_empathy_map-takeaways-right">
                <p>Due to the weight that time-constraints place on creatives, managing stress is paramount. This is another instance where time, and its proper management become clear.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="project-section-approach">
        <SectionDivider label="The Proposition" className="project_space-one" />
        <article className="project-section-approach-article right-image section-proposal">
          <InfoTextbox
            headline="Structured, Intuitive Feedback"
            bodyText="With a matrix of circles, we are able visually structure time, so in a glance the user is able to see roughly how far along they are in the current timer/period. This allays anxiety associated with working or resting too long. This matrix configuration also allows the user to have a timing scheme for up to 8 hours, which is the current limit of Apple's Live Activities for iOS."
          />
          <figure className="circuit_proposition-activities">
            <p>Semantically colored circles identify the current activity status (Each circle represents one minute).</p>
            <div className="circuit_proposition-activities-circles">
              <div className="circuit_proposition-activity_line">
                <div className="circuit_proposition-activity_circle active_period" />
                <p>Active Period</p>
              </div>
              <div className="circuit_proposition-activity_line">
                <div className="circuit_proposition-activity_circle rest_period" />
                <p>Rest Period</p>
              </div>
              <div className="circuit_proposition-activity_line">
                <div className="circuit_proposition-activity_circle period_complete" />
                <p>Period Complete</p>
              </div>
              <div className="circuit_proposition-activity_line">
                <div className="circuit_proposition-activity_circle active_in_progress-outer" />
                <p>Active - In Progress</p>
              </div>
              <div className="circuit_proposition-activity_line">
                <div className="circuit_proposition-activity_circle rest_in_progress-outer" />
                <p>Rest - In Progress</p>
              </div>
            </div>
          </figure>
        </article>
        <div className="project-section-approach-stage_wrap">
          {this.getImageLinks("circuit_single_screen_1.png", "circuit_single_img-one", "Initial screen for a basic Pomodoro timer, consisting of 4 - 25 minute active and 5 - 1 minute rest periods.", "50vw", placeholder.projCircuitSingle)}
          <p className="circuit_single_text-one">Initial screen for a basic Pomodoro timer, consisting of 4 x 25 minute active and 5 x 1 minute rest periods.</p>
          {this.getImageLinks("circuit_single_screen_2.png", "circuit_single_img-two", "Initial screen for a basic Pomodoro timer, consisting of 4 - 25 minute active and 5 - 1 minute rest periods.", "50vw", placeholder.projCircuitSingle)}
          <p className="circuit_single_text-two">In progress screen: while in progress, the current minute is animated and bottom text tells the user how much time until the next period.</p>
          {this.getImageLinks("circuit_single_screen_3.png", "circuit_single_img-three", "Initial screen for a basic Pomodoro timer, consisting of 4 - 25 minute active and 5 - 1 minute rest periods.", "50vw", placeholder.projCircuitSingle)}
          <p className="circuit_single_text-three">Circuit completed: Once completed, the user is offered the option to reset the timer, or finish and view their progress.</p>
        </div>
        <article className="circuit_video-right">
          <InfoTextbox
            headline="Easy Selection, Easy Modification"
            bodyText="Eliminate visual clutter to facilitate quick program selections and straightforward modifications. Prioritize legibility and accessibility of essential information for quick scanning."
          />
          {this.embedVideo("circuit_edit.mp4", placeholder.projCircuitSingle, "circuit_single_video")}
        </article>
        <article className="circuit_video-left">
          <InfoTextbox
            headline="Custom Circuit Creation"
            bodyText="Creating a bespoke program (Circuit) is simple: pick a title, define the active/rest durations and the repetition count—that&apos;s it. A total duration (active + rest, multiplied by repeats) is shown at the base of the input area, providing users with the total time commitment."
          />
          {this.embedVideo("circuit_add.mp4", placeholder.projCircuitSingle, "circuit_single_video")}
        </article>
        <article className="project-section-approach-article hide_on_mobile three-width-full-img">
          <InfoTextbox
            headline="High-level site flow"
            bodyText="The app is divided into 3 screens and 1 large-detent sheet. User data can be stored within the device&apos;s persistent storage which would allow transferring or offloading of data to different devices. This app should also make use of Apple&apos;s Live Activities for iOS. This would allow the user to view progress from their iPhone lockscreen without explicitly opening the Circuit app."
          />
          <figure className="page_times_pilot-approach-flowchart">
            <flowchart.circuit />
          </figure>
        </article>
      </section>
      <section className="circuit-design_considerations">
        <SectionDivider label="Design Considerations" className="project_space-one" />
        <div className="circuit-design_considerations-opening">
          <p className="circuit-design_considerations-element element_left"><span>Glanceable Interface:</span> The UI strips away complexity, revealing only contextually relevant information. Critical data like session time and breaks are instantly decipherable from a distance, eliminating the cognitive load of interpreting complex dashboards.</p>
          <p className="circuit-design_considerations-element element_left"><span>Smart Presets:</span> In addition to user-created presets, Circuit app also comes pre-configured with default presets that can fit any number of activities—from studying to writing to coding, for easy, out-of-the-box operation.</p>
          <p className="circuit-design_considerations-element element_right"><span>Progress Tracking:</span> To help track work patterns and progress, Circuit App provides users with a rolling tally of their progress as well as a calendar view.</p>
          <p className="circuit-design_considerations-element element_right"><span>Native Integration:</span> By leveraging iOS 16+ LiveActivities, Circuit provides awareness through the Dynamic Island and Lock Screen. This allows users to stay informed about their work rhythm without the disruption of opening the app.</p>
        </div>
        <div className="circuit-design_consideration-layout_wrap">
          <div className="circuit-design_consideration_diagram-one">
            <h4>Circuit Picker Screen</h4>
            <div className="line-group-one">
              <p className="text">Access to usage history</p>
              <div className="line" />
            </div>
            <div className="line-group-two">
              <p className="text">Easily view current Circuit&apos;s specs and tap to edit them</p>
              <div className="line" />
            </div>
            <div className="line-group-three">
              <p className="text">Access to preset and custom Circuits</p>
              <div className="line" />
            </div>
            <div className="line-group-four">
              <p className="text">Quickly add a custom Circuit</p>
              <div className="line" />
            </div>
            {this.getImageLinks("circuit_consideration_one.png", "circuit_single_consideration-one", "Initial screen for a basic Pomodoro timer, consisting of 4 - 25 minute active and 5 - 1 minute rest periods.", "50vw", placeholder.projCircuitSingle)}
          </div>
          <div className="circuit-design_consideration_diagram-two">
            <h4>Session Recap Screen</h4>
            <div className="line-group-one">
              <div className="line" />
              <p className="text">Post recent activity to social media</p>
            </div>
            {this.getImageLinks("circuit_consideration_two.png", "circuit_single_consideration-one", "Initial screen for a basic Pomodoro timer, consisting of 4 - 25 minute active and 5 - 1 minute rest periods.", "50vw", placeholder.projCircuitSingle)}
          </div>
          <div className="circuit-design_consideration_diagram-three">
            <h4>Session Detail Screen</h4>
            <div className="line-group-one">
              <p className="text">View by date range</p>
              <div className="line" />
            </div>
            <div className="line-group-two">
              <p className="text">Show daily activity</p>
              <div className="line" />
            </div>
            {this.getImageLinks("circuit_consideration_three.png", "circuit_single_consideration-one", "Initial screen for a basic Pomodoro timer, consisting of 4 - 25 minute active and 5 - 1 minute rest periods.", "50vw", placeholder.projCircuitSingle)}
          </div>
        </div>
      </section>
      <section className="circuit-alternatives">
        <SectionDivider label="Alternative Matrix Designs" className="project_space-one" />
        <article className="circuit_alternative-article">
          <div className="circuit_alternative-div left">
            {this.getImageLinks("circuit_alternative_one.png", "circuit_alternative-one", "Initial screen for a basic Pomodoro timer, consisting of 4 - 25 minute active and 5 - 1 minute rest periods.", "50vw", placeholder.projCircuitSingle)}
            <InfoTextbox
              headline="Alternate Matrix One"
              bodyText="In this iteration the rest periods are grouped together. Doing so presents the user with an alternative sectional representation, which augments the description via semantic color. From a development point of view, this may be a slightly more complex route to take as we&apos;re essentially treating time in 2 different ways: by minimal instance (minute dots) and by section (rest lines)."
            />
          </div>
          <div className="circuit_alternative-div right">
            {this.getImageLinks("circuit_alternative_two.png", "circuit_alternative-two", "Initial screen for a basic Pomodoro timer, consisting of 4 - 25 minute active and 5 - 1 minute rest periods.", "50vw", placeholder.projCircuitSingle)}
            <InfoTextbox
              headline="Alternate Matrix Two"
              bodyText="In this iteration the active and rest periods are treated the same. This allows us to treat all measurements of time the same. By bridging the dots we create cohesive areas that are easy to visually discern by color or density. Another issue for users is that this format may read too closely to text-placeholder graphics."
            />
          </div>
        </article>
      </section>

    </div>
    <Footer />
  </>);
}


export const render = Index;