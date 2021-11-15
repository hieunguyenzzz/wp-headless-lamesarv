import Container from './Container';

export function Banner({ heading, subHeading, description }) {
    return (
        <div key={heading} className="py-9 animated fadeIn">
            <div className="content_wrap">
                <div className="sc_layouts_column sc_layouts_column_align_center">
                    <Container>
                        <div className="flex flex-col items-center justify-center text-center mx-[12px] my-[9px]">
                            <div className="text-[#122947]">
                                <h1
                                    itemProp="headline"
                                    className="text-[27px] lg:text-[52px] xl:leading-[67px] font-bold leading-normal">
                                    {heading}
                                </h1>
                                {description && (
                                    <div className="max-w-3xl mx-auto">
                                        {description}
                                    </div>
                                )}
                            </div>
                            <div className="lg:text-[18px] lg:leading-[22px]  ">
                                {subHeading}
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    );
}
