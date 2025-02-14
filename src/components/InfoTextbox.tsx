interface InfoTextboxProps {
  headline: string;
  bodyText: string | any;
  listItems?: string[];
  orderedItems?: string[];
  className?: string;
}
export default function InfoTextbox({ headline, bodyText, listItems, orderedItems, className }: InfoTextboxProps) {
  return (
    <div className={`project-info_textbox${className ? " " + className : ""}`}>
      <h4>{headline}</h4>
      <p>{bodyText}</p>
      {listItems && (
        <ul>
          {listItems.map((item) => (
            <li className="unordered_list_item">{item}</li>
          ))}
        </ul>
      )}
      {orderedItems && (
        <ol>
          {orderedItems.map((item) => (
            <li className="ordered_list_item">{item}</li>
          ))}
        </ol>
      )}
    </div>
  );
}