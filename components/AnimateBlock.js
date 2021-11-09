import classNames from 'classnames';
import { useInView } from 'react-intersection-observer';

function AnimateBlock({ children }) {
    const { inView, ref } = useInView({
        trackVisibility: true,
        delay: 100,
        triggerOnce: true
    });
    const show = inView;
    return (
        <div ref={ref}>
            <div
                style={{
                    willChange: 'transform',
                    transitionDuration: '1500ms'
                }}
                className={classNames(
                    'transition-all transform origin-bottom',
                    show ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                )}>
                {children}
            </div>
        </div>
    );
}

export default AnimateBlock;
