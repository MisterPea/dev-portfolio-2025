interface LandingProjectProps {
  title: string;
  description: string;
  imageAlignment: 'left' | 'right˝';
  link: 'string';
}

export default function LandingProject({ images, title, description, imageAlignment, link}) {

  return (
    <article className="landing-project_card">
      {images}
      <div className="landing-project_card-text">
        <h3 className="landing-project_card-h3">{title}</h3>
        <p>{description}</p>
      </div>
      {/* </a> */}

    </article>
  );
}
