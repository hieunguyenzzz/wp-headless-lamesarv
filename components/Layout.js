import Container from './Container';
import { Header } from './Header';
const Layout = ({ pageProps, children }) => {
    return (
        <div className="flex flex-col w-full fit">
            <Header pageProps={pageProps} />
            <main className="flex-1">
                <a className="hidden" href="#top">
                    top
                </a>
                {children}
            </main>
            <footer className="bg-[#00255a] min-h-[100px] text-[#8c8987]">
                <Container className="py-8 text-sm text-center ">
                    {pageProps.copyright}
                </Container>
            </footer>
        </div>
    );
};
export default Layout;
