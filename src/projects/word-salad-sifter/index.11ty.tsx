import Header from "../../components/Header";

export function Index() {
  return (<>
    <Header showHome={true} />
    <div className="main_wrapper">
      Hello
    </div>
  </>);
}


export const render = Index;