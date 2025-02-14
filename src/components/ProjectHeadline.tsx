interface ProjectHeadlineProps {
  headline: string;
  subHeadline: string;
  accentColor: string;
  image: any;
  className?: string;
}

export default function ProjectHeadline({ headline, subHeadline, accentColor, image, className }: ProjectHeadlineProps) {
  return (
    <>
      <div className={`project-headline-wrapper${className ? " " + className : ""}`}>
        <h1 className="project-headline">{headline}</h1>
        <h2 className="project-sub_headline">{subHeadline}</h2>
      </div>
      <div className="project_page-image-wrapper">
        {image}
      </div>
    </>
  );
}