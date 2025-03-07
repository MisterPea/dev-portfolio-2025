interface LandingProjectProps {
  title: string;
  images: string;
  description: string;
  imageAlignment: string;
  link: string;
  testId: string;
}

export default function LandingProject({ images, title, description, imageAlignment, link, testId }: LandingProjectProps) {

  return (
    <a href={link} className="project-anchor" data-testid={testId}>
      <article className={`landing-project_card card--${imageAlignment}`}>
        {images}
        <div className="landing-project_card-text">
          <h3 className="landing-project_card-h3">{title}</h3>
          <p>{description}</p>
        </div>
      </article>
    </a>
  );
}
