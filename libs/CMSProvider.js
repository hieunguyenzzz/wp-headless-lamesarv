const { createContext, useContext } = require('react');

const CMSContext = createContext({});

const CMSProvider = ({ pageProps = {}, children }) => {
    return (
        <CMSContext.Provider value={{ state: pageProps }}>
            {children}
        </CMSContext.Provider>
    );
};
export const useCMS = () => {
    return useContext(CMSContext);
};
export default CMSProvider;
