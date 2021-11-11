import Container from './Container';
import SideBar from './SideBar';
import StickyColumn from './StickyColumn';

function TwoColumnsWithSidebar({ children, pageProps }) {
    return (
        <Container className="flex w-full flex-col lg:flex-row lg:space-x-[30px] py-16 lg:py-[110px] gap-y-16 items-start">
            <div className="flex-1 ">{children}</div>
            <StickyColumn offsetTop={120} offsetBottom={20}>
                <SideBar pageProps={pageProps} />{' '}
            </StickyColumn>
        </Container>
    );
}

export default TwoColumnsWithSidebar;
