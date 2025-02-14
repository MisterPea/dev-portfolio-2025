import icon from './icons';

type link = {
  label: string,
  url: string,
};

interface DescriptionRoleToolsProps {
  description: any;
  links: link[];
  tools: string[];
  roles: string[];
  className?: string;
}

export default function DescriptionRoleTools({ description, links, tools, roles, className }: DescriptionRoleToolsProps) {

  return (
    <section className='project-section-wrapper-desc'>
      <div className={`project_page-desc_role_tools${className ? " " + className : ""}`}>
        <div className="project_page-desc_links">
          <p className="project_page-description">{description}</p>
          <div className="project_page-links">
            {links.map(({ label, url }) => (
              <a key={url} href={url}>
                <div className="project_page-links-label">
                  <p>{label}</p>
                  <div className='project_page-links-icon'>
                    <icon.upArrow />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
        <hr className='hide_on_tablet' />
        <div className="project_page-tools_roles">
          <div className='project_page-tools_roles--tools'>
            <h3>Tools</h3>
            <p>{tools.join(', ')}</p>
          </div>
          <hr />
          <div className='project_page-tools_roles--role'>
            <h3>My Role</h3>
            <p>{roles.join(', ')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}