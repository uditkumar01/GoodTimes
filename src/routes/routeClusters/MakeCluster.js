import { NavBar, Footer, SearchField } from "..";

export function MakeCluster({ children, searchDisplay, setSearchDisplay }) {
    return (
        <>
            <SearchField
                searchDisplay={searchDisplay}
                setSearchDisplay={setSearchDisplay}
            />
            <header className="nav-container">
                <NavBar
                    searchDisplay={searchDisplay}
                    setSearchDisplay={setSearchDisplay}
                />
            </header>
            <br className="navbar-void" />
            {children}
        </>
    );
}
