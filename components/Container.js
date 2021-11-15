import cn from 'classnames';

const Container = ({ children, className, el = 'div', clean }) => {
    const rootClassName = cn(
        {
            'container max-w-[1270px] w-full mx-auto  px-6 lg:px-[50px]': !clean
        },
        className
    );

    let Component = el;

    return <Component className={rootClassName}>{children}</Component>;
};

export default Container;
