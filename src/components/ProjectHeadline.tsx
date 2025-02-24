interface ProjectHeadlineProps {
  headline: string;
  subHeadline: string;
  image: any | any[];
  className?: string;
}

export default function ProjectHeadline({ headline, subHeadline, image, className }: ProjectHeadlineProps) {

  return (
    <>
      <div className={`project-headline-wrapper${className ? " " + className : ""}`}>
        <h1 className="project-headline">{headline}</h1>
        <h2 className="project-sub_headline">{subHeadline}</h2>
      </div>
      <div className={`project_page-image-wrapper${className ? " " + className + "--image" : ""}`}>
        {Array.isArray(image) === false ? image : (
          <div className={`${className ? className + "-hero_wrap" : ""}`}>
            {image.map((node, index) => (
              <figure key={`hero-wrap-${index}`}>
                {node}
              </figure>
            ))}
          </div>
        )}

      </div >
    </>
  );
}