import { createContext, useState } from 'react';

export const AppContext = createContext();

function AppProvider({ children }) {
    const [isCreatePostVisible, setIsCreatePostVisible] = useState(false);
    const [loaderVisible, setLoaderVisible] = useState(false);

    return (
        <AppContext.Provider value={{ isCreatePostVisible, setIsCreatePostVisible, loaderVisible, setLoaderVisible }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;
