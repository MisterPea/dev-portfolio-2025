import Header from "./components/Header.tsx";

export function Index() {

    return (
        <>
            <Header />
            <h1>Main page</h1>
            <p>Something else</p>
            <a href="/some-page">Next</a>
        </>
    );
}

export const render = Index;